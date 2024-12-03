const { body } = require("express-validator");

const bankAccountValidations = [
    body('shabaNumber').optional().matches(/^IR\d{24}$/).withMessage('شماره شبا نامعتبر است.'),
    body('cardNumber').optional().matches(/^\d{16}$/).withMessage('شماره کارت نامعتبر است.'),
    body('accountNumber').optional().isNumeric().withMessage('شماره حساب باید عددی باشد').isLength({min: 1}).withMessage('شماره حساب نمیتواند خالی باشد'),
]

module.exports = bankAccountValidations;