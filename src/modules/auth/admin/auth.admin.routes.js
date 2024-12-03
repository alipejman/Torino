const { Router } = require('express');
const authAdminController = require('./auth.admin.controller');
const adminAuthorizationGuard = require('../../../common/guard/adminAuthorization.guard');
const router = Router();


router.post('/login', authAdminController.login);
router.post('/get-data', adminAuthorizationGuard, authAdminController.getAdminData);
router.get('/logout', adminAuthorizationGuard, authAdminController.logout);

module.exports = {
    authAdminRouter: router
}