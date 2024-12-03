/**
 * @swagger
 * tags:
 *  name: Admin Auth
 *  description: Admin Authentication Module and Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AdminLogin:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           example: "admin"
 *         password:
 *           type: string
 *           example: "password123"
 *     AdminLoginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "ورود با موفقیت انجام شد"
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         admin:
 *           type: string
 *           example: "adminUser"
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Login admin
 *     tags:
 *       - Admin Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/AdminLogin'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminLogin'
 *     responses: 
 *       200:
 *         description: Admin logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminLoginResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   oneOf:
 *                     - example: "ادمین پیدا نشد"
 *                     - example: "در فرایند ورود مشکلی پیش آمده است"
 */

/**
 * @swagger
 * /admin/get-data:
 *   post:
 *     summary: Get data for authenticated admin
 *     tags:
 *       - Admin Auth
 *     security:
 *       - bearerAuth: []
 *     responses: 
 *       200:
 *         description: Data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data retrieved successfully"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access"
 */

/**
 * @swagger
 * /admin/logout:
 *   get:
 *     summary: Logout admin
 *     tags:
 *       - Admin Auth
 *     security:
 *       - bearerAuth: []
 *     responses: 
 *       200:
 *         description: Admin logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "خروج با موفقیت انجام شد"
 */
