const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    image: { type: [String], required: true }, // تصویر
    title: { type: String, required: true }, // عنوان
    duration: { 
        days: { type: Number, required: true }, // تعداد روز
        nights: { type: Number, required: true } // تعداد شب
    },
    price: { type: Number, required: true }, // قیمت
    origin: { type: String, required: true }, // مبدا
    destination: { type: String, required: true }, // مقصد 
    departureDate: { 
        day: { type: Number, required: true }, // روز تاریخ رفت
        month: { type: Number, required: true }, // ماه تاریخ رفت
        year: { type: Number, required: true } // سال تاریخ رفت
    },
    returnDate: { 
        day: { type: Number, required: true }, // روز تاریخ برگشت
        month: { type: Number, required: true }, // ماه تاریخ برگشت
        year: { type: Number, required: true } // سال تاریخ برگشت
    },
    transportType: { type: String, enum: ["سفر با هواپیما", "سفر با کشتی", "سفر با اتوبوس"], required: true }, // نوع حمل و نقل
    capacity: { type: Number, required: true }, // ظرفیت (تعداد نفرات)
    insurance: { type: Boolean, required: true }, // بیمه
    tourStatus: { type: String, enum: ["در حال برگزاری", "به اتمام رسیده"], required: true }, // وضعیت تور
    tourNumber: { type: String, required: true, unique: true },
}, { timestamps: true });

const postModel = model('post', postSchema);

module.exports = postModel;
