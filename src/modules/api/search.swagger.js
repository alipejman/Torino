
/**
 * @swagger
 * /api/tours/search:
 *   post:
 *     summary: Tour Search
 *     tags:
 *       - Tours
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origin:
 *                 type: string
 *                 example: "تهران"
 *                 description: مبدا سفر
 *               destination:
 *                 type: string
 *                 example: "مشهد"
 *                 description: مقصد سفر
 *               departureDate:
 *                 type: object
 *                 properties:
 *                   day:
 *                     type: number
 *                     example: 1
 *                     description: روز تاریخ رفت
 *                   month:
 *                     type: number
 *                     example: 10
 *                     description: ماه تاریخ رفت
 *                   year:
 *                     type: number
 *                     example: 2023
 *                     description: سال تاریخ رفت
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               origin:
 *                 type: string
 *                 example: "تهران"
 *                 description: مبدا سفر
 *               destination:
 *                 type: string
 *                 example: "مشهد"
 *                 description: مقصد سفر
 *               departureDate:
 *                 type: object
 *                 properties:
 *                   day:
 *                     type: number
 *                     example: 1
 *                     description: روز تاریخ رفت
 *                   month:
 *                     type: number
 *                     example: 10
 *                     description: ماه تاریخ رفت
 *                   year:
 *                     type: number
 *                     example: 2023
 *                     description: سال تاریخ رفت
 *     responses:
 *       200:
 *         description: لیست تورهای پیدا شده
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: "تور مشهد"
 *                     description: عنوان تور
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 299.99
 *                     description: قیمت تور
 *                   duration:
 *                     type: object
 *                     properties:
 *                       days:
 *                         type: number
 *                         example: 3
 *                         description: تعداد روز
 *                       nights:
 *                         type: number
 *                         example: 2
 *                         description: تعداد شب
 *                   transportType:
 *                     type: string
 *                     enum: ["سفر با هواپیما", "سفر با کشتی", "سفر با اتوبوس"]
 *                     example: "سفر با هواپیما"
 *       400:
 *         description: درخواست نامعتبر - فیلدهای مورد نیاز ناقص یا داده‌های نامعتبر
 *       500:
 *         description: خطای داخلی سرور
 */
