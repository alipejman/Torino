const { Router } = require('express');
const adminController = require('./admin.controller');
const adminAuthorizationGuard = require('../../common/guard/adminAuthorization.guard');
const upload = require('../../common/utils/multer');
const router = Router();


    router.post('/create-post', adminAuthorizationGuard,upload.single('image'),adminController.createPost );



module.exports = {
    adminRouter: router
};