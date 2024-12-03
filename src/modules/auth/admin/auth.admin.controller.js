const autoBind = require('auto-bind');
const adminAuthService = require('./auth.admin.service');

class authAdminController {
    #service;
  constructor() {
    autoBind(this);
    this.#service = adminAuthService;
  }
  async login(req, res) {
    const { username, password } = req.body;

    try {
        const result = await this.#service.login(username, password);
        res.cookie('accessToken', result.token, { httpOnly: true, secure: true });
        res.status(200).json({
            message: 'ورود با موفقیت انجام شد',
            admin: result.admin.username,
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}


async getAdminData(req, res) {
    const adminId = req.admin._id;
    try {
        const adminData = await this.#service.getAdminData(adminId);
        res.status(200).json({
            message: 'اطلاعات ادمین با موفقیت دریافت شد',
            admin: adminData,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

async logout(req, res) { 
    try {
        const adminId = req.admin._id;
        const result = await this.#service.logout(adminId);
        res.clearCookie('accessToken');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'خطا در خروج ادمین' });
    }
}   

}

module.exports = new authAdminController();
