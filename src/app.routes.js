const { Router } = require("express");
const { authRouter } = require("./modules/auth/auth.routes");
const userRouter = require("./modules/user/user.routes");
const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;