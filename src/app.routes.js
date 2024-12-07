const { Router } = require("express");
const {authRouter} = require("./modules/auth/user/auth.routes");
const {userRouter} = require("./modules/user/user.routes");
const {authAdminRouter} = require("./modules/auth/admin/auth.admin.routes");
const { adminRouter } = require("./modules/admin/admin.routes");
const {searchRouter} = require("./modules/api/search.routes");
const { reserveRoute } = require("./modules/shop/basket.routes");
const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/admin', authAdminRouter, adminRouter);
router.use('/api/tours', searchRouter);
router.use('/api/reservations', reserveRoute);

module.exports = router;