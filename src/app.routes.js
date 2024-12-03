const { Router } = require("express");
const {authRouter} = require("./modules/auth/user/auth.routes");
const {userRouter} = require("./modules/user/user.routes");
const {authAdminRouter} = require("./modules/auth/admin/auth.admin.routes");
const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/admin', authAdminRouter);

module.exports = router;