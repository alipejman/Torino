/**
 * @swagger
 * tags:
 *   name: Admin Panel
 *   description: Admin Module and Routes
 */

/**
 * @swagger
 * /admin/create-post:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Admin Panel
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload (JPEG, JPG, PNG)
 *               title:
 *                 type: string
 *                 example: "Amazing Tour"
 *               duration:
 *                 type: object
 *                 properties:
 *                   days:
 *                     type: number
 *                     example: 5
 *                   nights:
 *                     type: number
 *                     example: 4
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 299.99
 *               origin:
 *                 type: string
 *                 example: "Tehran"
 *               destination:
 *                 type: string
 *                 example: "Sanandaj"
 *               departureDate:
 *                 type: object
 *                 properties:
 *                   day:
 *                     type: number
 *                     example: 1
 *                   month:
 *                     type: number
 *                     example: 10
 *                   year:
 *                     type: number
 *                     example: 2023
 *               returnDate:
 *                 type: object
 *                 properties:
 *                   day:
 *                     type: number
 *                     example: 6
 *                   month:
 *                     type: number
 *                     example: 10
 *                   year:
 *                     type: number
 *                     example: 2023
 *               transportType:
 *                 type: string
 *                 enum: ["سفر با هواپیما", "سفر با کشتی", "سفر با اتوبوس"]
 *                 example: "سفر با هواپیما"
 *               capacity:
 *                 type: number
 *                 example: 20
 *               insurance:
 *                 type: boolean
 *                 example: true
 *               tourStatus:
 *                 type: string
 *                 enum: ["در حال برگزاری", "به اتمام رسیده"]
 *                 example: "در حال برگزاری"
 *               tourNumber:
 *                 type: string
 *                 example: "T12345"
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post created successfully"
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60d5ec49f1b2c8b1f8e4e1a1"
 *                     title:
 *                       type: string
 *                       example: "Amazing Tour"
 *       400:
 *         description: Bad Request - Missing required fields or invalid data
 *       403:
 *         description: Forbidden - You do not have permission to create a post
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /admin/update-post/{postId}:
 *   put:
 *     summary: Update an existing post
 *     tags:
 *       - Admin Panel
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: The ID of the post to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload (JPEG, JPG, PNG)
 *               title:
 *                 type: string
 *                 example: "Amazing Tour"
 *               duration:
 *                 type: object
 *                 properties:
 *                   days:
 *                     type: number
 *                     example: 5
 *                   nights:
 *                    
 *                     type: number
 *                     example: 4
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 299.99
 *               origin:
 *                 type: string
 *                 example: "Tehran"
 *               destination:
 *                 type: string
 *                 example: "Sanandaj"
 *               departureDate:
 *                 type: object
 *                 properties:
 *                   day:
 *                     type: number
 *                     example: 1
 *                   month:
 *                     type: number
 *                     example: 10
 *                   year:
 *                     type: number
 *                     example: 2023
 *               returnDate:
 *                 type: object
 *                 properties:
 *                   day:
 *                     type: number
 *                     example: 6
 *                   month:
 *                     type: number
 *                     example: 10
 *                   year:
 *                     type: number
 *                     example: 2023
 *               transportType:
 *                 type: string
 *                 enum: ["سفر با هواپیما", "سفر با کشتی", "سفر با اتوبوس"]
 *                 example: "سفر با هواپیما"
 *               capacity:
 *                 type: number
 *                 example: 20
 *               insurance:
 *                 type: boolean
 *                 example: true
 *               tourStatus:
 *                 type: string
 *                 enum: ["در حال برگزاری", "به اتمام رسیده"]
 *                 example: "در حال برگزاری"
 *               tourNumber:
 *                 type: string
 *                 example: "T12345"
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post updated successfully"
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60d5ec49f1b2c8b1f8e4e1a1"
 *                     title:
 *                       type: string
 *                       example: "Amazing Tour"
 *       400:
 *         description: Bad Request - Missing required fields or invalid data
 *       403:
 *         description: Forbidden - You do not have permission to update a post
 *       404:
 *         description: Not Found - Post not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /admin/delete-post/{postId}:
 *   delete:
 *     summary: Delete an existing post
 *     tags:
 *       - Admin Panel
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: The ID of the post to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post deleted successfully"
 *       403:
 *         description: Forbidden - You do not have permission to delete a post
 *       404:
 *         description: Not Found - Post not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /admin/get-users:
 *   get:
 *     summary: Get All Users For Admin
 *     tags:
 *       - Admin Panel
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/delete-user/{userId}:
 *   delete:
 *     summary: Delete User
 *     tags:
 *       - Admin Panel
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the User to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       403:
 *         description: Forbidden - You do not have permission to delete a User
 *       404:
 *         description: Not Found - User not found
 *       500:
 *         description: Internal Server Error
 */
