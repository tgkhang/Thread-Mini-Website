"use strict";

const controller = {};
const models = require("../database/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const DOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const window = new JSDOM("").window;
const purify = DOMPurify(window);

controller.showCreateThreadpage = async (req, res) => {
  res.render("createThread");
};

controller.showCreateThread = async (req, res) => {
  let ID = req.user.id;
  res.locals.currentID = ID;

  const userInfo = await models.User.findOne({
    attributes: ["id", "firstName", "lastName", "bio", "userName", "imagePath"],
    where: {
      id: ID,
    },
    raw: true,
  });
  res.locals.userInfo = userInfo;
  res.render("createThread");
};

controller.createThread = async (req, res) => {
  const ID = req.user.id;
  res.locals.currentID = ID;

  let { text } = req.body;
  console.log("Request Body here:", req.body);

  const userInfo = {
    userName: req.user.userName,
    imagePath: req.user.imagePath || null,
  };
  console.log("UserInfo:", userInfo);

  if (!text || text.trim() === "") {
    return res.status(400).render("createThread", {
      done: false,
      error: "Text cannot be empty",
      userInfo,
    });
  }
  //security check
  text = purify.sanitize(text.trim());
  if (text.length > 1000) {
    return res.status(400).render("createThread", {
      done: false,
      error: "Text exceeds the maximum allowed length.",
      userInfo,
    });
  }

  let imagePath = null;

  if (req.file) {
    const localImagePath = req.file.path;

    try {
      const result = await cloudinary.uploader.upload(localImagePath, {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      imagePath = result.secure_url;
      fs.unlinkSync(localImagePath);
    } catch (err) {
      console.error("Cloudinary upload failed:", err);

      if (fs.existsSync(localImagePath)) {
        fs.unlinkSync(localImagePath);
      }

      return res.status(500).render("createThread", {
        done: false,
        error: "Image upload failed. Please try again.",
        userInfo,
      });
    }
  }

  try {
    await models.Thread.create({
      userId: ID,
      text: text.trim(),
      imagePath,
    });

    return res.render("createThread", {
      done: true,
      userInfo,
    });
  } catch (err) {
    console.error("Database update failed:", err);

    return res.status(500).render("createThread", {
      done: false,
      error: "An unexpected error occurred. Please try again later.",
      userInfo,
    });
  }
};

controller.likeThread = async (req, res) => {
  const { threadId } = req.query;
  const { action } = req.body;
  const currentID = req.user.id;

  try {
    if (action === "like") {
      await models.Like.create({ threadId, userId: currentID });

      const thread = await models.Thread.findOne({
        attributes: ["userId"],
        where: { id: threadId },
      });

      if (thread && thread.userId !== currentID) {
        await models.Notification.create({
          text: `${req.user.userName} liked your thread`,
          sourceId: currentID,
          userId: thread.userId,
          type: "LIKE",
          isSeen: false,
        });
      }
    } else if (action === "unlike") {
      const existingLike = await models.Like.findOne({
        where: { threadId, userId: currentID },
      });
      if (existingLike) {
        await existingLike.destroy();
      }
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    const totalLikes = await models.Like.count({ where: { threadId } });

    res.json({ totalLikes });
  } catch (error) {
    console.error("Error handling like/unlike action:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = controller;
