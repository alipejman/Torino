const {Router} = require('express');
const authController = require('./auth.controller');
const authorizationGuard = require('../../../common/guard/authorization.guard');
const {mobileValidator} = require('../../../common/utils/personalDataValidation')
const router = Router();


router.post('/send-otp',mobileValidator, authController.sendOTP);
router.post('/check-otp', authController.checkOTP)
router.get('/logout', authorizationGuard , authController.logout)

module.exports = {
    authRouter: router
}