/**
 * @swagger
 * /api/reservations/reserve:
 *   post:
 *     summary: ایجاد رزرو تور
 *     tags:
 *       - Reservations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 example: "60d5ec49f1a2c8b1f8c8e4a1"
 *                 description: آیدی تور
 *     responses:
 *       201:
 *         description: رزرو با موفقیت ایجاد شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reservation created successfully"
 *                 reservationId:
 *                   type: string
 *                   example: "60d5ec49f1a2c8b1f8c8e4a2"
 *                   description: آیدی رزرو ایجاد شده
 *       400:
 *         description: درخواست نامعتبر
 *       401:
 *         description: کاربر احراز هویت نشده
 *       404:
 *         description: تور پیدا نشد
 */
/**
 * @swagger
 * /api/reservations/{reservationId}/cancel:
 *   post:
 *     summary: لغو رزرو تور
 *     tags:
 *       - Reservations
 *     parameters:
 *       - name: reservationId
 *         in: path
 *         required: true
 *         description: آیدی رزرو
 *         schema:
 *           type: string
 *           example: "60d5ec49f1a2c8b1f8c8e4a2"
 *     responses:
 *       200:
 *         description: رزرو با موفقیت لغو شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reservation canceled successfully"
 *       404:
 *         description: رزرو پیدا نشد
 *       401:
 *         description: کاربر احراز هویت نشده
 */

/**
 * @swagger
 * /api/reservations/{reservationId}/confirm:
 *   post:
 *     summary: تأیید رزرو تور
 *     tags:
 *       - Reservations
 *     parameters:
 *       - name: reservationId
 *         in: path
 *         required: true
 *         description: آیدی رزرو
 *         schema:
 *           type: string
 *           example: "60d5ec49f1a2c8b1f8c8e4a2"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *               - firstName
 *               - lastName
 *               - nationalCode
 *               - birthday
 *               - gender
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "علی"
 *                 description: نام مسافر
 *               lastName:
 *                 type: string
 *                 example: "احمدی"
 *                 description: نام خانوادگی مسافر
 *               nationalCode:
 *                 type: string
 *                 example: "1234567890"
 *                 description: کد ملی مسافر
 *               birthday:
 *                 type: object
 *                 required:
 *                   - day
 *                   - month
 *                   - year
 *                 properties:
 *                   day:
 *                     type: number
 *                     example: 1
 *                     description: روز تاریخ تولد
 *                   month:
 *                     type: number
 *                     example: 1
 *                     description: ماه تاریخ تولد
 *                   year:
 *                     type: number
 *                     example: 1990
 *                     description: سال تاریخ تولد
 *               gender:
 *                 type: string
 *                 enum: ["male", "female", "other"]
 *                 example: "male"
 *                 description: جنسیت مسافر
 *     responses:
 *       200:
 *         description: رزرو با موفقیت تأیید شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tour successfully purchased"
 *       400:
 *         description: درخواست نامعتبر
 *       404:
 *         description: رزرو پیدا نشد
 *       401:
 *         description: کاربر احراز هویت نشده
 */
