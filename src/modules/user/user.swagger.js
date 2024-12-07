
/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get User Profile Data
 *     tags:
 *       - User
 *     responses: 
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/setEmail:
 *   put:
 *     summary: Set User Email
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Email updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c85" # ID کاربر
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *       400:
 *         description: Invalid email address
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/personal-data:
 *   put:
 *     summary: Set User Personal Data
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               nationalCode:
 *                 type: string
 *                 example: "1234567890"
 *               gender:
 *                 type: string
 *                 enum: ["male", "female", "other"]
 *                 example: "male"
 *               birthday:
 *                 type: object
 *                 properties:
 *                   day:
 *                     type: number
 *                     example: 1
 *                   month:
 *                     type: number
 *                     example: 1
 *                   year:
 *                     type: number
 *                     example: 1990
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               nationalCode:
 *                 type: string
 *                 example: "1234567890"
 *               gender:
 *                 type: string
 *                 enum: ["male", "female", "other"]
 *                 example: "male"
 *               birthday:
 *                 type: object
 *                 properties:
 *                   day:
 *                     type: number
 *                     example: 1
 *                   month:
 *                     type: number
 *                     example: 1
 *                   year:
 *                     type: number
 *                     example: 1990
 *     responses:
 *       200:
 *         description: Personal data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 nationalCode:
 *                   type: string
 *                   example: "1234567890"
 *                 gender:
 *                   type: string
 *                   example: "male"
 *                 birthday:
 *                   type: object
 *                   properties:
 *                     day:
 *                       type: number
 *                       example: 1
 *                     month:
 *                       type: number
 *                       example: 1
 *                     year:
 *                       type: number
 *                       example: 1990
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/bank-data:
 *   put:
 *     summary: Set User Bank Details
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shabaNumber:
 *                 type: string
 *                 example: "IR060170000000100324200001"
 *               cardNumber:
 *                 type: string
 *                 example: "6219861997105241"
 *               accountNumber:
 *                 type: string
 *                 example: "1350301331202"
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               shabaNumber:
 *                 type: string
 *                 example: "IR-06017 0 000000 100324 200001"
 *               cardNumber:
 *                 type: string
 *                 example: "6219861997105241"
 *               accountNumber:
 *                 type: string
 *                 example: "1350301331202"
 *     responses:
 *       200:
 *         description: Bank details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shabaNumber:
 *                   type: string
 *                   example: "IR-06017 0 000000 100324 200001"
 *                 cardNumber:
 *                   type: string
 *                   example: "6219861997105241"
 *                 accountNumber:
 *                   type: string
 *                   example: "1350301331202"
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /user/get-transactions:
 *   get:
 *     summary: Get User Tours
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-07T12:36:38.523Z"
 *                   amount:
 *                     type: number
 *                     example: 299.99
 *                   transactionType:
 *                     type: string
 *                     example: "تور دبی 1404"
 *                   orderNumber:
 *                     type: string
 *                     example: "1716746"
 *                   post:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6751a0e9c91e96b3528e4be8"
 *                       title:
 *                         type: string
 *                         example: "تور دبی"
 *                       description:
 *                         type: string
 *                         example: "توضیحات تور دبی"
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/tours:
 *   get:
 *     summary: User Tour
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []  # فرض بر این است که از احراز هویت توکن استفاده می‌شود
 *     responses:
 *       200:
 *         description: آگهی‌های کاربر با موفقیت دریافت شد
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: آیدی آگهی
 *                   title:
 *                     type: string
 *                     description: عنوان آگهی
 *                   price:
 *                     type: number
 *                     description: قیمت آگهی
 *                   duration:
 *                     type: object
 *                     properties:
 *                       days:
 *                         type: number
 *                         description: تعداد روز
 *                       nights:
 *                         type: number
 *                         description: تعداد شب
 *                   origin:
 *                     type: string
 *                     description: مبدا
 *                   destination:
 *                     type: string
 *                     description: مقصد
 *                   departureDate:
 *                     type: object
 *                     properties:
 *                       day:
 *                         type: number
 *                         description: روز تاریخ رفت
 *                       month:
 *                         type: number
 *                         description: ماه تاریخ رفت
 *                       year:
 *                         type: number
 *                         description: سال تاریخ رفت
 *                   returnDate:
 *                     type: object
 *                     properties:
 *                       day:
 *                         type: number
 *                         description: روز تاریخ برگشت
 *                       month:
 *                         type: number
 *                         description: ماه تاریخ برگشت
 *                       year:
 *                         type: number
 *                         description: سال تاریخ برگشت
 *                   transportType:
 *                     type: string
 *                     description: نوع حمل و نقل
 *                   capacity:
 *                     type: number
 *                     description: ظرفیت (تعداد نفرات)
 *                   insurance:
 *                     type: boolean
 *                     description: بیمه
 *                   tourStatus:
 *                     type: string
 *                     description: وضعیت تور
 *                   tourNumber:
 *                     type: string
 *                     description: شماره تور
 *       401:
 *         description: کاربر احراز هویت نشده
 *       404:
 *         description: کاربر پیدا نشد
 */
