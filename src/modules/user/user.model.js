const { Schema, model } = require("mongoose");
const {
  emailValidator,
  nationalCodeValidator,
  shabaNumberValidator,
  cardNumberValidator,
} = require("../../common/utils/validation");

const OTPSchema = new Schema(
  {
    code: { type: String, required: false, default: undefined },
    expiresIn: { type: Number, required: false, default: 0 },
  },
  { _id: false }
);

const transactionSchema = new Schema(
  {
    dateTime: { type: Date, required: false },
    amount: { type: Number, required: false },
    type: {
      type: String,
      enum: ["ثبت نام در تور گردشگری"],
      required: false,
    },
    orderNumber: { type: String, required: false },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    firstName: { type: String, required: false, default: null },
    mobile: { type: String, unique: true, required: true },
    email: {
      type: String,
      required: false,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: emailValidator,
        message: (props) => `${props.value} is not a valid email!`,
      },
      default: null,
    },
    birthday: { type: Date, required: false, default: null },
    nationalCode: {
      type: String,
      required: false,
      unique: true,
      validate: {
        validator: nationalCodeValidator,
        message: (props) =>
          `${props.value} is not a valid national code! It must be exactly 10 digits.`,
      },
      default: null,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: false,
      default: null,
    },
    bankAccount: {
      shabaNumber: {
        type: String,
        required: false,
        validate: {
          validator: shabaNumberValidator,
          message: (props) =>
            `${props.value} is not a valid Shaba number! It must start with "IR" and be 24 digits long.`,
        },
        default: null,
      },
      cardNumber: {
        type: String,
        required: false,
        validate: {
          validator: cardNumberValidator,
          message: (props) => `${props.value} is not a valid card number!`,
        },
        default: null,
      },
      accountNumber: {
        type: String,
        required: false,
        default: null,
      },
    },
    transactions: { type: [transactionSchema], default: [] },
    otp: { type: [OTPSchema], default: [] },
    verifiedMobile: { type: Boolean, required: true, default: false },
    accessToken: { type: String },
  },
  { timestamps: true }
);

const userModel = model("user", userSchema);

module.exports = userModel;
