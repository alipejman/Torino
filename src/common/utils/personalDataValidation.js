const { body } = require("express-validator");

const nationalCodeValidation = [
  body("nationalCode")
    .optional()
    .matches(/^\d{10}$/)
    .withMessage("کد ملی درست نیست"),
];
const mobileValidator = [
  body("mobile")
    .optional()
    .matches(/^09\d{9}$/)
    .withMessage("شماره موبایل باید با 09 شروع شده و 11 رقم باشد"),
];

const emailValidator = [
  body("email").optional().isEmail().withMessage("ایمیل معتبر نیست"),
];

module.exports = {
  nationalCodeValidation,
  mobileValidator,
  emailValidator,
};
