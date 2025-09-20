"use strict";

const controller = {};
const models = require("../database/models");
const sequelize = require("sequelize");

controller.showNotifications = async (req, res) => {
  try {
    const ID = req.user.id;
    res.locals.currentID = ID;

    const allNotifications = await models.Notification.findAll({
      attributes: [
        "id",
        "userId",
        "text",
        "isSeen",
        "type",
        "createdAt",
        [
          sequelize.literal(
            `(SELECT "userName" FROM "Users" WHERE "Users"."id" = "Notification"."sourceId")`
          ),
          "sourceUserName",
        ],
      ],
      where: { userId: ID },
      order: [["createdAt", "DESC"]],
      raw: true,
      limit: 20,
    });

    res.locals.allNotifications = allNotifications;

    const seenNotifications = await models.Notification.findAll({
      attributes: [
        "id",
        "userId",
        "text",
        "isSeen",
        "type",
        "createdAt",
        [
          sequelize.literal(
            `(SELECT "userName" FROM "Users" WHERE "Users"."id" = "Notification"."sourceId")`
          ),
          "sourceUserName",
        ],
      ],
      where: { userId: ID, isSeen: true },
      order: [["createdAt", "DESC"]],
      raw: true,
      limit: 20,
    });

    res.locals.seenNotifications = seenNotifications;

    const unseenNotifications = await models.Notification.findAll({
      attributes: [
        "id",
        "userId",
        "text",
        "isSeen",
        "type",
        "createdAt",
        [
          sequelize.literal(
            `(SELECT "userName" FROM "Users" WHERE "Users"."id" = "Notification"."sourceId")`
          ),
          "sourceUserName",
        ],
      ],
      where: { userId: ID, isSeen: false },
      order: [["createdAt", "DESC"]],
      raw: true,
      limit: 20,
    });

    res.locals.unseenNotifications = unseenNotifications;

    res.render("notifications");
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).send("An error occurred while fetching notifications.");
  }
};

controller.seenhandle = async (req, res) => {
  const ID = req.user.id;
  const { notiId } = req.query;
  const { action } = req.body;

  if (!notiId || !ID || !["seen", "unseen"].includes(action)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const notification = await models.Notification.findOne({
      where: { id: notiId, userId: ID },
    });

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    const newIsSeen = action === "seen";
    notification.isSeen = newIsSeen;
    await notification.save();

    res.json({ isSeen: newIsSeen });
  } catch (error) {
    console.error("Error handling notification action:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = controller;
