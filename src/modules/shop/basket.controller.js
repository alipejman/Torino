const autoBind = require('auto-bind');
const reservationService = require('../shop/basket.service');
const createHttpError = require("http-errors");

class ReservationController {
    #reserveService;
    constructor() {
        autoBind(this);
        this.#reserveService = reservationService;
    }

    async createReservation(req, res, next) {
        try {
            const { postId, passengerInfo } = req.body;
            const userId = req.user._id;
            const expirationDate = new Date(Date.now() + 5 * 60 * 1000);

            const newReservation = await this.#reserveService.createReservation(userId, postId, expirationDate, passengerInfo);
            res.status(201).json({ message: "تور با موفقیت رزرو شد", notife: 'پنج دقیقه فرصت دارید تا خرید خود را نهایی کنید',reservationId: newReservation._id });
        } catch (error) {
            next(error);
        }
    }

    async cancelReservation(req, res, next) {
        try {
            const { reservationId } = req.params;

            const canceledReservation = await this.#reserveService.cancelReservation(reservationId);
            res.status(200).json({ message: "رزرو با موفقیت لغو شد", reservationId: canceledReservation._id });
        } catch (error) {
            next(error);
        }
    }

    async confirmReservation(req, res, next) {
        try {
            const { reservationId } = req.params;
            const { firstName, lastName, nationalCode, birthday, gender } = req.body;

            const passengerInfo = {
                firstName,
                lastName,
                nationalCode,
                birthday,
                gender
            };

            const confirmedReservation = await this.#reserveService.confirmReservation(reservationId, passengerInfo);
            res.status(200).json({ message: "تور مورد نظر با موفقیت خریداری شد" ,reservationId: confirmedReservation._id });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ReservationController();