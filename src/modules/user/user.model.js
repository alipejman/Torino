const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: { type: String, required: false, default: null },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: false, lowercase: true, trim: true, default: null },
    birthday: { 
      day: { type: Number, required: false, default: null },
      month: { type: Number, required: false, default: null },
      year: { type: Number, required: false, default: null },
    },
    nationalCode: { type: String, required: false, default: '' },
    gender: { type: String, enum: ["male", "female", "other"], required: false, default: null },
    bankAccount: {
      shabaNumber: { type: String, required: false, default: null },
      cardNumber: { type: String, required: false, default: null },
      accountNumber: { type: String, required: false, default: null },
    },
    transactions: { type: Array, default: [] },
    otp: { type: Array, default: [] },
    verifiedMobile: { type: Boolean, required: true, default: false },
    accessToken: { type: String },
  },
  { timestamps: true }
);

const userModel = model("user", userSchema);

module.exports = userModel;
