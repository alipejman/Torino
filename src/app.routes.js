const { Router } = require("express");
const { authRouter } = require("./modules/auth/auth.routes");
const router = Router();

router.use('/auth', authRouter);

module.exports = router;