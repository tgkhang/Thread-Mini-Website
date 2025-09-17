"use strict";
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

router.get("/home", controller.showHomepage);
router.get("/search", controller.showSearchpage);
router.get("/searchResult", controller.showSearchResult);
router.get("/profile", userController.showProfilepage);
router.post("/followUser", userController.toggleFollow);

router.get("/editProfile", userController.showEditProfile);
router.get("/createThread", threadController.showCreateThread);
router.post("/createThread", upload.single("image"), threadController.createThread); // noti??

router.post("/comment/:userName/:threadId", commentController.createComment);

router.post(
  "/updateProfile",
  //middleware. for checking  username
  upload.single("image"),
  userController.updateProfile
);

router.delete("/unfollow", userController.unfollowUser);
//router.post('/follow',controller.followUser);
router.get("/load-more", controller.loadMoreBlogs);

router.post("/likeThread", threadController.likeThread);
router.get("/notifications", notificationController.showNotifications);
router.post("/notifications", notificationController.seenhandle);
router.get("/:page/:thread?", controller.show);

router.get("/", (req, res) => {
  res.redirect("/home");
});
module.exports = router;
