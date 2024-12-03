const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    image: { type: String, required: true }, // تصویر
    title: { type: String, required: true }, // عنوان
    duration: { type: String, required: true }, // تعداد روز و شب
    price: { type: Number, required: true }, // قیمت
    origin: { type: String, required: true }, // مبدا
    departureDate: { type: Date, required: true }, // تاریخ رفت
    returnDate: { type: Date, required: true }, // تاریخ برگشت
    transportType: { type: String, enum: ["سفر با هواپیما", "سفر با کشتی", "سفر با اتوبوس"] ,required: true }, // نوع حمل و نقل
    capacity: { type: Number, required: true }, // ظرفیت (تعداد نفرات)
    insurance: { type: Boolean, required: true }, // بیمه
    tourStatus: { type: String, enum: ["در حال برگزاری", "به اتمام رسیده"], required: true }, // وضعیت تور
    tourNumber: { type: String, required: true, unique: true },
}, {timestamps: true});

const postModel = model('post', postSchema);

module.exports = postModel;