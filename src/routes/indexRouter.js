"use strict";

/**
 * @swagger
 * tags:
 *   - name: Threads
 *     description: Thread management endpoints
 *   - name: Users
 *     description: User profile and social features
 *   - name: Comments
 *     description: Comment management
 *   - name: Notifications
 *     description: User notifications
 *   - name: Social
 *     description: Social interactions (likes, follows)
 */

const express = require("express");
const router = express.Router();
const controller = require("../controllers/indexController");
const threadController = require("../controllers/threadController");
const userController = require("../controllers/userController");
const commentController = require("../controllers/commentController");
const notificationController = require("../controllers/notificationController");
const authController = require("../controllers/authController");
const { upload } = require("../controllers/image");

//apply middleware
router.use(authController.isLoggedIn);

/**
 * @swagger
 * /home:
 *   get:
 *     summary: Show homepage with thread feed
 *     tags: [Threads]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Homepage rendered with thread feed
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       302:
 *         description: Redirect to login if not authenticated
 */
router.get("/home", controller.showHomepage);

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Show search page
 *     tags: [Users]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Search page rendered successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get("/search", controller.showSearchpage);

/**
 * @swagger
 * /searchResult:
 *   get:
 *     summary: Show search results
 *     tags: [Users]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *         example: "john"
 *     responses:
 *       200:
 *         description: Search results rendered successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get("/searchResult", controller.showSearchResult);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Show user profile page
 *     tags: [Users]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: query
 *         name: userName
 *         schema:
 *           type: string
 *         description: Username to view profile (defaults to current user)
 *         example: "testuser1"
 *     responses:
 *       200:
 *         description: Profile page rendered successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get("/profile", userController.showProfilepage);

/**
 * @swagger
 * /followUser:
 *   post:
 *     summary: Toggle follow/unfollow user
 *     tags: [Social]
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *             properties:
 *               userName:
 *                 type: string
 *                 description: Username to follow/unfollow
 *                 example: "testuser2"
 *     responses:
 *       200:
 *         description: Follow status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 following:
 *                   type: boolean
 */
router.post("/followUser", userController.toggleFollow);

/**
 * @swagger
 * /editProfile:
 *   get:
 *     summary: Show edit profile page
 *     tags: [Users]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Edit profile page rendered successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get("/editProfile", userController.showEditProfile);

/**
 * @swagger
 * /createThread:
 *   get:
 *     summary: Show create thread page
 *     tags: [Threads]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Create thread page rendered successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get("/createThread", threadController.showCreateThread);

/**
 * @swagger
 * /createThread:
 *   post:
 *     summary: Create a new thread
 *     tags: [Threads]
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Thread content
 *                 example: "This is my new thread!"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional image attachment
 *     responses:
 *       201:
 *         description: Thread created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Thread'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/createThread",
  upload.single("image"),
  threadController.createThread
);

/**
 * @swagger
 * /comment/{userName}/{threadId}:
 *   post:
 *     summary: Create a comment on a thread
 *     tags: [Comments]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: userName
 *         required: true
 *         schema:
 *           type: string
 *         description: Thread author's username
 *         example: "testuser1"
 *       - in: path
 *         name: threadId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Thread ID
 *         example: 123
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Comment content
 *                 example: "Great thread!"
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/comment/:userName/:threadId", commentController.createComment);

/**
 * @swagger
 * /updateProfile:
 *   post:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User's first name
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *                 example: "Doe"
 *               userName:
 *                 type: string
 *                 description: Username
 *                 example: "johndoe123"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address
 *                 example: "john.doe@example.com"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Profile image
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/updateProfile",
  //middleware. for checking  username
  upload.single("image"),
  userController.updateProfile
);

/**
 * @swagger
 * /load-more:
 *   get:
 *     summary: Load more threads (pagination)
 *     tags: [Threads]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *         example: 2
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of threads per page
 *         example: 10
 *     responses:
 *       200:
 *         description: More threads loaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 threads:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Thread'
 *                 hasMore:
 *                   type: boolean
 */
router.get("/load-more", controller.loadMoreBlogs);

/**
 * @swagger
 * /likeThread:
 *   post:
 *     summary: Like or unlike a thread
 *     tags: [Social]
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - threadId
 *             properties:
 *               threadId:
 *                 type: integer
 *                 description: Thread ID to like/unlike
 *                 example: 123
 *     responses:
 *       200:
 *         description: Like status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 liked:
 *                   type: boolean
 *                 likesCount:
 *                   type: integer
 */
router.post("/likeThread", threadController.likeThread);

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Show user notifications page
 *     tags: [Notifications]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Notifications page rendered successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get("/notifications", notificationController.showNotifications);

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Mark notifications as seen
 *     tags: [Notifications]
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               notificationIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of notification IDs to mark as seen
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Notifications marked as seen successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 */
router.post("/notifications", notificationController.seenhandle);

/**
 * @swagger
 * /{page}/{thread}:
 *   get:
 *     summary: Show specific page or thread
 *     tags: [Threads]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: page
 *         required: true
 *         schema:
 *           type: string
 *         description: Page identifier (username or page name)
 *         example: "testuser1"
 *       - in: path
 *         name: thread
 *         required: false
 *         schema:
 *           type: string
 *         description: Thread identifier
 *         example: "123"
 *     responses:
 *       200:
 *         description: Page or thread rendered successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       404:
 *         description: Page or thread not found
 */
router.get("/:page/:thread?", controller.showUserProfileOrThreadDetail);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Root redirect to home
 *     tags: [Threads]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       302:
 *         description: Redirect to home page
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *               example: "/home"
 */
router.get("/", (req, res) => {
  res.redirect("/home");
});
module.exports = router;
