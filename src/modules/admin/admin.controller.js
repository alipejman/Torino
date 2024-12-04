const autoBind = require("auto-bind");
const postService = require("../post/post.service");
const createHttpError = require("http-errors");
const postMessages = require("../post/post.message");
const postModel = require("../post/post.model");
const fs = require('fs');

class adminController {
    #postService;
    #postModel;
    constructor() {
        autoBind(this);
        this.#postService = postService;
        this.#postModel = postModel;
    }
    async createPost(req, res, next) {
        try {
            // بررسی مجوز کاربر
            const { permissions } = req.admin;
            if (!permissions.includes('create-post')) {
                throw createHttpError(403, 'شما مجوز لازم برای ایجاد پست را ندارید.');
            }
    
            // استخراج داده‌ها از درخواست
            const {
                title,
                duration, // اینجا باید یک شیء باشد
                price,
                origin,
                destination,
                departureDate, // اینجا باید یک شیء باشد
                returnDate, // اینجا باید یک شیء باشد
                transportType,
                capacity,
                insurance,
                tourStatus,
                tourNumber,
            } = req.body;
    
            // تبدیل رشته‌های JSON به اشیاء
            const parsedDuration = JSON.parse(duration);
            const parsedDepartureDate = JSON.parse(departureDate);
            const parsedReturnDate = JSON.parse(returnDate);
    
            // بررسی وجود تصویر
            if (!req.file) {
                throw createHttpError(400, 'فایل تصویر الزامی است.');
            }
    
            // ایجاد داده‌های پست
            const postData = {
                image: req.file.path,
                title,
                duration: {
                    days: parseInt(parsedDuration.days, 10) || 0,
                    nights: parseInt(parsedDuration.nights, 10) || 0,
                },
                price: parseFloat(price) || 0,
                origin,
                destination,
                departureDate: {
                    day: parseInt(parsedDepartureDate.day, 10) || 0,
                    month: parseInt(parsedDepartureDate.month, 10) || 0,
                    year: parseInt(parsedDepartureDate.year, 10) || 0,
                },
                returnDate: {
                    day: parseInt(parsedReturnDate.day, 10) || 0,
                    month: parseInt(parsedReturnDate.month, 10) || 0,
                    year: parseInt(parsedReturnDate.year, 10) || 0,
                },
                transportType,
                capacity: parseInt(capacity, 10) || 0,
                insurance: insurance === 'true', // تبدیل به boolean
                tourStatus,
                tourNumber,
            };
    
            // ایجاد پست جدید
            const newPost = await this.#postService.createPost(postData);
    
            // ارسال پاسخ موفقیت‌آمیز
            return res.status(201).json({
                message: 'پست با موفقیت ایجاد شد',
                post: newPost,
            });
        } catch (error) {
            // حذف تصویر در صورت بروز خطا
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error('خطا در حذف تصویر:', err);
                    }
                });
            }
            // مدیریت خطا
            console.error('خطا در ایجاد پست:', error);
            next(error);
        }
    }
    
    
    
    
    
    
}

module.exports = new adminController();