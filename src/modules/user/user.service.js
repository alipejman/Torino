const autoBind = require("auto-bind");
const userModel = require("../user/user.model");
const createHttpError = require("http-errors");
const userMessages = require("./user.messages");
const { default: mongoose } = require("mongoose");
const postModel = require('../post/post.model');
class userService {
  #model;
  #postModel;
  constructor() {
    autoBind(this);
    this.#model = userModel;
    this.#postModel = postModel;
  }

  // ست کردن ایمیل کاربر در پنل کاربری
  async setUserEmail(userId, email) {
    const updatedUser = await this.#model.findByIdAndUpdate(
      userId,
      { email },
      { new: true, runValidators: true }
    );
    if (!updatedUser) throw createHttpError(404, "کاربر پیدا نشد !!");
    return updatedUser;
  }

  // ست کردن اطلاعات شخصی کاربر در پنل کاربری
  async setUserPesonalData(userId, firstName, nationalCode, gender, birthday) {
    const updatedUser = await this.#model.findByIdAndUpdate(
      userId,
      { firstName, nationalCode, gender, birthday },
      { new: true, runValidators: true }
    );
    if (!updatedUser) throw createHttpError(404, "کاربر پیدا نشد");
    return updatedUser;
  }

  // ست کردن اطلاعات بانکی کاربر در پنل
  async submitBankAccountDetails(
    userId,
    shabaNumber,
    cardNumber,
    accountNumber
  ) {
    const getUser = await this.#model.findById(userId);
    if (!getUser) throw new createHttpError(404, "کاربر پیدا نشد");
    const updatedBankAccount = await this.#model.updateOne(
      { _id: userId },
      {
        bankAccount: {
          shabaNumber,
          cardNumber,
          accountNumber,
        },
      },
      { new: true, runValidators: true }
    );
    if (updatedBankAccount.nModified === 0) {
      throw new createHttpError(400, "اطلاعات بانکی به‌روزرسانی نشد");
    }
    return updatedBankAccount;
  }

  // دریافت تمام کاربران برای ادمین
  async getAllUsers() {
    const allUsers = await this.#model.find().select({
      firstName: 1,
      mobile: 1,
      nationalCode: 1,
      gender: 1,
      birthday: 1,
      bankAccount: 1,
      verifiedMobile: 1,
    });
    return allUsers;
  }
  // حذف کاربر
  async deleteUser(userId) {
    // بررسی اینکه userId یک ObjectId معتبر است
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new createHttpError(400, "Invalid user ID");
    }

    const objectId = new mongoose.Types.ObjectId(userId); // تبدیل به ObjectId
    const checkUser = await this.#model.findById(objectId);
    if (!checkUser) throw new createHttpError(404, userMessages.notFound);

    await this.#model.deleteOne({ _id: objectId }); // حذف کاربر
    return userMessages.deleteUser; // پیام موفقیت
  }

  // user.service.js
  async getTransActions(userId) {
    const user = await this.#model
      .findById(userId)
      .populate("transactions.postId"); // فرض بر این است که postId به یک مدل دیگر مرتبط است
    if (!user) throw createHttpError(404, "کاربر پیدا نشد");

    const tours = user.transactions.map((transaction) => {
      return {
        date: transaction.date,
        amount: transaction.amount,
        transactionType: transaction.transactionType,
        orderNumber: transaction.orderNumber,
        post: transaction.postId, // اطلاعات آگهی
      };
    });

    return tours;
  }

  async getTours(userId) {
    // پیدا کردن کاربر بر اساس userId
    const user = await this.#model.findById(userId);
    if (!user) {
      throw new createHttpError.NotFound("کاربر پیدا نشد!");
    }

    // استخراج postId از آرایه transactions
    const postIds = user.transactions.map((transaction) => transaction.postId);

    // پیدا کردن آگهی‌ها بر اساس postId
    const tours = await this.#postModel.find({ _id: { $in: postIds } }, {__v: 0, _id: 0});

    return tours; // برگرداندن آگهی‌ها
  }
}

module.exports = new userService();
