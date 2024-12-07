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
        return Math.floor(1000000 + Math.random() * 9000000).toString(); // تولید یک شماره 7 رقمی رندوم
    }

    async createReservation(userId, postId, expirationDate, passengerInfo) {
        // بررسی وجود تور
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

        // زمان‌سنج برای حذف رزرو پس از 5 دقیقه
        setTimeout(async () => {
            const reservation = await this.#reserveModel.findById(newReservation._id);
            if (reservation && reservation.status === "pending") {
                await this.#reserveModel.findByIdAndDelete(newReservation._id);
                console.log(`رزرو با آیدی ${newReservation._id} حذف شد.`);
            }
        }, 300000); // 5 دقیقه

        return newReservation;
    }

    async cancelReservation(reservationId) {
        const reservation = await this.#reserveModel.findById(reservationId);
        
        if (!reservation) {
            throw new createHttpError.NotFound("هیچ رزوری پیدا نشد !");
        }

        // بررسی وضعیت رزرو
        if (reservation.status === "confirmed") {
            throw new createHttpError.BadRequest("رزرو تأیید شده قابل لغو نیست.");
        }

        // تغییر وضعیت به "canceled"
        const updatedReservation = await this.#reserveModel.findByIdAndUpdate(reservationId, { 
            status: "canceled" 
        }, { new: true });

        // زمان‌سنج برای حذف رزرو پس از 24 ساعت
        setTimeout(async () => {
            const reservationToDelete = await this.#reserveModel.findById(updatedReservation._id);
            if (reservationToDelete && reservationToDelete.status === "canceled") {
                await this.#reserveModel.findByIdAndDelete(updatedReservation._id);
                console.log(`رزرو با آیدی ${updatedReservation._id} پس از 24 ساعت حذف شد.`);
            }
        }, 86400000); // 24 ساعت

        return updatedReservation;
    }

    async confirmReservation(reservationId, passengerInfo) {
        const updatedReservation = await this.#reserveModel.findByIdAndUpdate(reservationId, { 
            passengerInfo,
            status: "confirmed" 
        }, { new: true });

        if (!updatedReservation) throw new createHttpError.NotFound("هیچ رزروی پیدا نشد !");

        // دریافت اطلاعات آگهی
        const post = await Post.findById(updatedReservation.postId);
        if (!post) throw new createHttpError.NotFound("آگهی پیدا نشد!");

        // اطلاعات مربوط به تراکنش
        const transaction = {
            date: new Date(), // تاریخ و ساعت پرداخت
            amount: post.price, // مبلغ آگهی خریداری شده
            transactionType: post.title, // نوع تراکنش
            orderNumber: this.generateOrderNumber(), // شماره سفارش
            postId: post._id
        };

        // اضافه کردن تراکنش به کاربر
        await User.findByIdAndUpdate(updatedReservation.userId, {
            $push: { transactions: transaction }
        });

        return updatedReservation;
    }
}

module.exports = new ReservationService();
