const { Router } = require('express');
const userController = require('./user.controller');
const authorizationGuard = require('../../common/guard/authorization.guard');
const router = Router();


    router.get('/profile',authorizationGuard, userController.getUserProfile );
    router.put('/setEmail',authorizationGuard, userController.setUserEmail);
    router.put('/personal-data',authorizationGuard, userController.setUserPersonalData);
    router.put('/bank-data',authorizationGuard, userController.submitBankAccountDetails);


const userRouter = router
module.exports = userRouter;