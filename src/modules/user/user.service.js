const autoBind = require("auto-bind");
const userModel = require("../user/user.model");
const createHttpError = require("http-errors");
class userService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = userModel;}

    // ست کردن ایمیل کاربر در پنل کاربری
    async setUserEmail(userId, email) {
      const updatedUser = await this.#model.findByIdAndUpdate(
      userId,
      { email },
      { new: true, runValidators: true });
      if (!updatedUser) throw createHttpError(404, "کاربر پیدا نشد !!");
      return updatedUser;}
                        
    // ست کردن اطلاعات شخصی کاربر در پنل کاربری
    async setUserPesonalData(userId, firstName, nationalCode, gender, birthday) {
      const updatedUser = await this.#model.findByIdAndUpdate(
      userId,
      { firstName, nationalCode, gender, birthday },
      { new: true, runValidators: true }
      );
      if (!updatedUser) throw createHttpError(404, "کاربر پیدا نشد");
      return updatedUser;}

    // ست کردن اطلاعات بانکی کاربر در پنل
    async submitBankAccountDetails(userId, shabaNumber, cardNumber, accountNumber) {
      const getUser = await this.#model.findById(userId);
      if (!getUser) throw new createHttpError(404, 'کاربر پیدا نشد');
      const updatedBankAccount = await this.#model.updateOne(
      { _id: userId },
      {
      bankAccount: {
        shabaNumber,
        cardNumber,
        accountNumber
      }
      },
      { new: true, runValidators: true }
      );
      if (updatedBankAccount.nModified === 0) {
      throw new createHttpError(400, 'اطلاعات بانکی به‌روزرسانی نشد');
      }
      return updatedBankAccount;}


}


module.exports = new userService();
