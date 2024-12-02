/**
 * @swagger
 * tags:
 *  name: auth
 *  description: Auth Module and Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     sendOTP:
 *       type: object
 *       required:
 *         - mobile
 *       properties:
 *         mobile:
 *           type: string
 *           example: "09123456789"
 *     checkOTP:
 *       type: object
 *       required:
 *         - mobile
 *         - code
 *       properties:
 *         mobile:
 *           type: string
 *           example: "09123456789"
 *         code:
 *           type: string
 *           example: "12345"
 */

/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     summary: Send OTP for mobile login
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/sendOTP'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/sendOTP'
 *     responses: 
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP sent successfully"
 *                 otp:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: "12345"
 *                     expiresIn:
 *                       type: number
 *                       example: 120000
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid mobile number"
 */

/**
 * @swagger
 * /auth/check-otp:
 *   post:
 *     summary: Check OTP for user login
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/checkOTP'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/checkOTP'
 *     responses: 
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid OTP or mobile number"
 */

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user
 *     tags:
 *       - auth
 *     responses: 
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logged out successfully"
 */
