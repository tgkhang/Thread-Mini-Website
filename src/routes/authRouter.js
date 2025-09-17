"use strict";

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and registration endpoints
 */

const express = require("express");
const router = express.Router();
const models = require("../database/models");
const controller = require("../controllers/authController");
const { body, getErrorMessage } = require("../controllers/validator");

/**
 * @swagger
 * /:
 *   get:
 *     summary: Root endpoint - redirects based on authentication status
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to start page or home page
 *         headers:
 *           Location:
 *             description: Redirect URL
 *             schema:
 *               type: string
 *               example: "/start"
 */
router.get("/", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/start");
  }

  res.redirect("/home");
});

/**
 * @swagger
 * /start:
 *   get:
 *     summary: Show start/welcome page
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Start page rendered successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get("/start", controller.start);

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Show login page
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Login page rendered successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get("/login", controller.show);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate user login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username or email
 *                 example: "testuser1"
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: "Password123"
 *     responses:
 *       302:
 *         description: Successful login, redirect to home
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *               example: "/home"
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: "connect.sid=s%3A..."
 *       200:
 *         description: Login failed, return to login page with error
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/login",
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    console.log(req.body);
    let message = getErrorMessage(req);
    console.log(message);
    if (message) {
      console.log(message);
      return res.render("login", { loginMessage: message });
    }
    next();
  },
  controller.login
);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout user and destroy session
 *     tags: [Authentication]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       302:
 *         description: Successful logout, redirect to start page
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *               example: "/start"
 */
router.post("/logout", controller.logout);

/**
 * @swagger
 * /registerEmail:
 *   get:
 *     summary: Show email registration page
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Email registration page rendered successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get("/registerEmail", controller.showRegisterEmail);

/**
 * @swagger
 * /registerEmail:
 *   post:
 *     summary: Register user email and send verification
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *                 description: Desired username
 *                 example: "newuser123"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email address
 *                 example: "user@example.com"
 *     responses:
 *       302:
 *         description: Email verification sent, redirect to confirmation page
 *       200:
 *         description: Registration failed, return to form with error
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       400:
 *         description: Validation error (username/email already exists)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/registerEmail",
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .custom(async (username) => {
      const user = await models.User.findOne({ where: { userName: username } });
      if (user) {
        throw new Error("Email already exists!");
      }
      return true;
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid Email address!")
    .custom(async (email) => {
      const user = await models.User.findOne({ where: { email } });
      if (user) {
        throw new Error("Email already exists!");
      }
      return true;
    }),
  (req, res, next) => {
    console.log(req.body);
    let message = getErrorMessage(req);
    if (message) {
      console.log(message);
      return res.render("signupEmail", { registerMessage: message });
    }
    next();
  },
  controller.registerEmail
);

/**
 * @swagger
 * /register:
 *   get:
 *     summary: Show registration form (with email verification token)
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         description: Email verification token
 *         example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Registration form rendered successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid or expired token
 */
router.get("/register", controller.tokenRegister);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Complete user registration
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - username
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User's first name
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *                 example: "Doe"
 *               username:
 *                 type: string
 *                 description: Unique username
 *                 example: "johndoe123"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Strong password (8+ chars, uppercase, lowercase, number)
 *                 example: "MyPassword123"
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 description: Password confirmation
 *                 example: "MyPassword123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       200:
 *         description: Registration failed, return to form with error
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/register",
  body("firstName").trim().notEmpty().withMessage("First name is required!"),
  body("lastName").trim().notEmpty().withMessage("Last name is required!"),
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid Email address!"),
  body("password").trim().notEmpty().withMessage("Password is required!"),
  body("password")
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
    .withMessage(
      "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
    ),
  body("confirmPassword").custom((confirmPassword, { req }) => {
    if (confirmPassword != req.body.password) {
      throw new Error("Passwords not match!");
    }
    return true;
  }),
  (req, res, next) => {
    console.log(req.body);
    let message = getErrorMessage(req);
    if (message) {
      console.log(message);
      return res.render("signup", {
        registerMessage: message,
        email: req.body.email || "",
        userName: req.body.username || "",
      });
    }
    next();
  },
  controller.register
);

/**
 * @swagger
 * /forgot:
 *   get:
 *     summary: Show forgot password page
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Forgot password page rendered successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get("/forgot", controller.showForgotPassword);

/**
 * @swagger
 * /forgot:
 *   post:
 *     summary: Send password reset email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Password reset email sent (or error message)
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid email format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/forgot",
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid Email address!"),
  (req, res, next) => {
    let message = getErrorMessage(req);
    if (message) {
      return res.render("forgotPassword", { message });
    }
    next();
  },
  controller.forgotPassword
);

/**
 * @swagger
 * /reset:
 *   get:
 *     summary: Show password reset page
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         description: Password reset token
 *         example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Password reset page rendered successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid or expired token
 */
router.get("/reset", controller.showResetPassword);

/**
 * @swagger
 * /reset:
 *   post:
 *     summary: Reset user password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: New password (8+ chars, uppercase, lowercase, number)
 *                 example: "NewPassword123"
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 description: Password confirmation
 *                 example: "NewPassword123"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       400:
 *         description: Validation error or passwords don't match
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/reset",
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid Email address!"),
  body("password").trim().notEmpty().withMessage("Password is required!"),
  body("password")
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
    .withMessage(
      "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
    ),
  body("confirmPassword").custom((confirmPassword, { req }) => {
    if (confirmPassword != req.body.password) {
      throw new Error("Passwords not match!");
    }
    return true;
  }),
  (req, res, next) => {
    //console.log(req.body);
    let message = getErrorMessage(req);
    if (message) {
      console.log(message);
      return res.render("changePassword", {
        message,
        email: req.body.email || "",
      });
    }
    next();
  }, //,(req,res)=>{console.log(req.body)}
  controller.resetPassword
);

module.exports = router;
