const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const adminModel = require("../../modules/admin/admin.model");
require('dotenv').config();

const adminAuthorizationGuard = async (req, res, next) => {
        try {
        const token = req.cookies.accessToken;
        if (!token) throw new createHttpError.Unauthorized("ادمین وارد نشده");  
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (data?.id) {
            const admin = await adminModel.findById(data.id, { password: 0, __v: 0 }).lean();
            if (!admin) throw new createHttpError.Unauthorized("ادمینی یافت نشد !");
            req.admin = admin;
            return next();
        }
        throw new createHttpError.Unauthorized("ورود ناموفق");
        } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return next(new createHttpError.Unauthorized("توکن نامعتبر است"));
        }
        if (error instanceof jwt.TokenExpiredError) {
            return next(new createHttpError.Unauthorized("توکن منقضی شده است"));
        }
        next(error);
        }};


module.exports = adminAuthorizationGuard;
