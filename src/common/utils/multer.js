const multer = require('multer');
const path = require('path');

// تنظیمات ذخیره‌سازی
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // مسیر ذخیره‌سازی فایل‌ها
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // نام فایل با زمان فعلی
    },
});

// فیلتر برای نوع فایل
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/; // انواع فایل مجاز
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('فقط تصاویر مجاز هستند!'));
    }
};

// ایجاد middleware multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // حداکثر اندازه فایل 1MB
    fileFilter: fileFilter,
});

module.exports = upload;
