const autoBind = require("auto-bind");

const nodeEnv = require("../../common/constant/env.enum");
const userService = require("./user.service");
const User = require("../user/user.model");
const userMessages = require("./user.messages");
class userController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = userService;}
    // رفتن به پروفایل کاربر و گرفتن دیتاهای مورد نیاز برای صفحه مورد نظر
    async getUserProfile(req, res, next) {
      try {
      const user = req.user;
      const { transactions, createdAt, ...userProfile } = user;
      return res.json(userProfile);
      } catch (error) {
      next(error);
      }
    }
    // ست کردن ایمیل کاربر در پروفایلش
    async setUserEmail(req, res, next) {
      try {
      const userId = req.user._id;
      const { email } = req.body;
      const updatedUser = await this.#service.setUserEmail(userId, email);
      return res.json({
        message: userMessages.emailSet,
        email: email,});
      } catch (error) {
      next(error);}
    }
    // ست کردن اطلاعات شخصی کاربر در پروفایل خودش
    async setUserPersonalData(req, res, next) {
      try {
      const userId = req.user._id;
      const { firstName, nationalCode, gender, birthday } = req.body;
      const updatedUser = await this.#service.setUserPesonalData(
        userId,
        firstName,
        nationalCode,
        gender,
        birthday
      );
      return res.json({
        message: userMessages.userPersonalData,
        firstName: updatedUser.firstName,
        nationalCode: updatedUser.nationalCode,
        gender: updatedUser.gender,
        birthday: updatedUser.birthday,
      });} catch (error) {
      next(error);}
    }

    // ثبت کردن اطلاعات بانکی کاربر در پنل کاربریش
    async submitBankAccountDetails(req, res, next) {
      try {
      const userId = req.user._id;
      const {shabaNumber, cardNumber, accountNumber} = req.body;
      const UpdateBankDeatils = await this.#service.submitBankAccountDetails(userId, shabaNumber, cardNumber, accountNumber);
      return res.json({
      message: userMessages.userBankData,
      bankAccount: { 
        shabaNumber, 
        cardNumber, 
        accountNumber} 
        })
      } catch (error) {
      next(error)
      }
    }

}

module.exports = new userController();
