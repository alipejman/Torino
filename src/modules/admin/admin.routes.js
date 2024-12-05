const { Router } = require('express');
const adminController = require('./admin.controller');
const adminAuthorizationGuard = require('../../common/guard/adminAuthorization.guard');
const upload = require('../../common/utils/multer');
const router = Router();


    router.post('/create-post', adminAuthorizationGuard,upload.single('image'),adminController.createPost );
    router.put('/update-post/:postId', adminAuthorizationGuard,upload.single('image'),adminController.updatePost );
    router.delete('/delete-post/:postId', adminAuthorizationGuard,adminController.deletePost );
    router.get('/get-users', adminAuthorizationGuard,adminController.getAllUsers);
    router.delete('/delete-user/:userId', adminAuthorizationGuard,adminController.deleteUser);



module.exports = {
    adminRouter: router
};