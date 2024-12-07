const autoBind = require('auto-bind');
const Reservation = require('./basket.model'); // مدل رزرو
const Post = require('../post/post.model'); // مدل آگهی
const User = require('../user/user.model'); // مدل کاربر
const createHttpError = require("http-errors");

class ReservationService {
    #reserveModel;
    constructor() {
        autoBind(this);
        this.#reserveModel = Reservation;
    }

    generateOrderNumber() {
        return Math.floor(1000000 + Math.random() * 9000000).toString();
    }

    async createReservation(userId, postId, expirationDate, passengerInfo) {
        const post = await Post.findById(postId);
        if (!post) {
            throw new createHttpError.NotFound("تور پیدا نشد!");
        }

        const newReservation = new this.#reserveModel({
            userId,
            postId,
            expirationDate,
            passengerInfo,
        });

        await newReservation.save();

        setTimeout(async () => {
            const reservation = await this.#reserveModel.findById(newReservation._id);
            if (reservation && reservation.status === "pending") {
                await this.#reserveModel.findByIdAndDelete(newReservation._id);
                console.log(`رزرو با آیدی ${newReservation._id} حذف شد.`);
            }
        }, 300000);

        return newReservation;
    }

    async cancelReservation(reservationId) {
        const reservation = await this.#reserveModel.findById(reservationId);
        
        if (!reservation) {
            throw new createHttpError.NotFound("هیچ رزوری پیدا نشد !");
        }

        if (reservation.status === "confirmed") {
            throw new createHttpError.BadRequest("رزرو تأیید شده قابل لغو نیست.");
        }

        const updatedReservation = await this.#reserveModel.findByIdAndUpdate(reservationId, { 
            status: "canceled" 
        }, { new: true });

        setTimeout(async () => {
            const reservationToDelete = await this.#reserveModel.findById(updatedReservation._id);
            if (reservationToDelete && reservationToDelete.status === "canceled") {
                await this.#reserveModel.findByIdAndDelete(updatedReservation._id);
                console.log(`رزرو با آیدی ${updatedReservation._id} پس از 24 ساعت حذف شد.`);
            }
        }, 86400000);

        return updatedReservation;
    }

    async confirmReservation(reservationId, passengerInfo) {
        const updatedReservation = await this.#reserveModel.findByIdAndUpdate(reservationId, { 
            passengerInfo,
            status: "confirmed" 
        }, { new: true });

        if (!updatedReservation) throw new createHttpError.NotFound("هیچ رزروی پیدا نشد !");

        const post = await Post.findById(updatedReservation.postId);
        if (!post) throw new createHttpError.NotFound("آگهی پیدا نشد!");

        const transaction = {
            date: new Date(),
            amount: post.price,
            transactionType: post.title,
            orderNumber: this.generateOrderNumber(),
            postId: post._id
        };

        await User.findByIdAndUpdate(updatedReservation.userId, {
            $push: { transactions: transaction }
        });

        return updatedReservation;
    }
}

module.exports = new ReservationService();
