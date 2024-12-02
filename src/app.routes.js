const { Router } = require("express");
const { authRouter } = require("./modules/auth/auth.routes");
const router = Router();

router.get('/auth', authRouter);

module.exports = router;