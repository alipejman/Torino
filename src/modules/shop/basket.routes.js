
const express = require('express');
const authorizationGuard = require('../../common/guard/authorization.guard'); // گارد احراز هویت
const ReservationController = require('./basket.controller');
const router = express.Router();

    router.post('/reserve', authorizationGuard, ReservationController.createReservation);
    router.post('/:reservationId/cancel', authorizationGuard, ReservationController.cancelReservation);
    router.post('/:reservationId/confirm', authorizationGuard, ReservationController.confirmReservation);

module.exports = {
    reserveRoute : router
}
