/**
 * @swagger
 * tags:
 *   name: user
 *   description: User Module and Routes
 */

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     tags:
 *       - user
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
