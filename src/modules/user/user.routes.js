const { Router } = require('express');
const userController = require('./user.controller');
const authorizationGuard = require('../../common/guard/authorization.guard');
const router = Router();


    router.get('/profile',authorizationGuard, userController.getUserProfile );


const userRouter = router
module.exports = userRouter;