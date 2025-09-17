"use strict";

const controller = {};
const models = require("../database/models");

const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const purify = DOMPurify(window);

controller.createComment = async (req, res) => {
  let ID = req.user.id;
  res.locals.currentID = ID;

  const threadId = req.params.threadId;
  let { text } = req.body;
  const userName = req.params.userName;

  const userInfo = {
    userName: req.user.userName,
    imagePath: req.user.imagePath || null,
  };

  if (!text || text.trim() === "") {
    return res.status(400).render("blogDetail", {
      done: false,
      error: "Text cannot be empty",
      userInfo,
    });
  }

  text = purify.sanitize(text.trim());

  if (text.length > 1000) {
    return res.status(400).render("blogDetail", {
      done: false,
      error: "Text exceeds maximum allowed length",
      userInfo,
    });
  }

  try {
    await models.Comment.create({
      threadId: threadId,
      userId: ID,
      text: text.trim(),
    });

    const thread = await models.Thread.findOne({
      attributes: ["userId"],
      where: { id: threadId },
    });

    if (thread && thread.userId !== ID) {
      await models.Notification.create({
        text: `${req.user.userName} commented on your thread`,
        sourceId: ID,
        userId: thread.userId,
        type: "COMMENT",
        isSeen: false,
      });
    }

    res.redirect(`/${userName}/${threadId}`);

  } catch (err) {
    console.error("Database update failed:", err);
    return res.status(500).render("blogDetail", {
      done: false,
      error: "An unexpected error occurred. Please try again later.",
      userInfo,
    });
  }
};

module.exports = controller;