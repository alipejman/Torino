const autoBind = require("auto-bind");
const userModel = require("../user/user.model");
const createHttpError = require("http-errors");
const { authMessages } = require("./auth.messages");
const jwt = require("jsonwebtoken");
const { randomInt } = require("crypto");

class authService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = userModel;
  }
  async sendOTP(mobile) {
    const now = new Date().getTime();
    const user = await this.#model.findOne({ mobile });
    const otp = {
      code: randomInt(10000, 99999).toString(),
      expiresIn: now + 1000 * 60 * 2,
    };

    if (!user) {
      console.log("Creating new user with mobile:", mobile);
      try {
        const newUser = await this.#model.create({ mobile, otp: [otp] });
        console.log("User created:", newUser);
        return newUser;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }

  
    const lastOtp = user.otp[user.otp.length - 1];
    if (lastOtp && lastOtp.expiresIn > now) {
      throw new createHttpError.BadRequest(authMessages.otpCodeNotExpireIn);
    }

    
    user.otp[user.otp.length - 1] = otp;
    await user.save();
    return user;
  }

  async checkOTP(mobile, code) {
    const now = new Date().getTime();
    const user = await this.checkExistByMobile(mobile);

    const lastOtp = user.otp[user.otp.length - 1]; // آخرین OTP
    if (!lastOtp || lastOtp.expiresIn < now) {
      throw new createHttpError.Unauthorized(authMessages.otpCodeExpireIn);
    }
    if (lastOtp.code !== code) {
      throw new createHttpError.Unauthorized(authMessages.otpCodeIsIncorrect);
    }
    if (!user.verifiedMobile) {
      user.verifiedMobile = true;
    }
    const accessToken = this.signToken({ mobile, id: user._id });
    user.accessToken = accessToken;
    await user.save();
    return accessToken;
  }

  signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1y" });
  }

  async logout() {}

  async checkExistByMobile(mobile) {
    const user = await this.#model.findOne({ mobile });
    if (!user) throw new createHttpError.NotFound(authMessages.notFound);
    return user;
  }
}

module.exports = new authService();
