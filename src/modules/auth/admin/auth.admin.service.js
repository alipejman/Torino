const adminModel = require('../../admin/admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const autoBind = require('auto-bind');
require('dotenv').config();

class AdminAuthService {
    #model;
  constructor() {
    autoBind(this);
    this.#model = adminModel;
  }
  async login(username, password) {
    const admin = await this.#model.findOne({ username });
    if (!admin) {
        throw new Error('ادمین پیدا نشد');
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        throw new Error('در فرایند ورود مشکلی پیش آمده است');
    }

    const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1y' });

    await this.#model.updateOne({ _id: admin._id }, { accessToken: token });

    return { token, admin };
}

async getAdminData(adminId) {
  // دریافت اطلاعات ادمین بر اساس شناسه
  const admin = await this.#model.findById(adminId, { password: 0, __v: 0 }).lean();
  if (!admin) {
      throw new Error('ادمینی یافت نشد');
  }
  return admin;
}

async logout(adminId) {
    // به‌روزرسانی ادمین برای حذف توکن دسترسی
    await this.#model.updateOne({ _id: adminId }, { accessToken: null });
    return { message: 'خروج با موفقیت انجام شد' };
}

}

module.exports = new AdminAuthService();
