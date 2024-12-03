const { Router } = require('express');
const userController = require('./user.controller');
const authorizationGuard = require('../../common/guard/authorization.guard');
const bankAccountValidations = require('../../common/utils/bank.validation');
const {emailValidator, nationalCodeValidation} = require('../../common/utils/personalDataValidation');
const router = Router();


    router.get('/profile',authorizationGuard, userController.getUserProfile );
    router.put('/setEmail',authorizationGuard, emailValidator,userController.setUserEmail);
    router.put('/personal-data',authorizationGuard,nationalCodeValidation,userController.setUserPersonalData);
    router.put('/bank-data',authorizationGuard,bankAccountValidations, userController.submitBankAccountDetails);


module.exports = {
    userRouter: router
};