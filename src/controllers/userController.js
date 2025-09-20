"use strict";

const controller = {};
const models = require("../database/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

controller.showProfilepage = async (req, res) => {
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

  const blogs = await models.Thread.findAll({
    attributes: [
      "id",
      "text",
      ["imagePath", "threadImage"],
      "userId",
      "createdAt",
      [
        sequelize.literal(
          `(SELECT COUNT(*) FROM "Likes" WHERE "Likes"."threadId" = "Thread"."id")`
        ),
        "totalLikes",
      ],
      [
        sequelize.literal(
          `(SELECT COUNT(*) FROM "Likes" WHERE "Likes"."threadId" = "Thread"."id" AND "Likes"."userId" = ${ID})`
        ),
        "status",
      ],
    ],
    where: {
      userId: ID,
    },
    include: [
      {
        model: models.User,
        as: "user",
        attributes: ["userName", "imagePath"],
      },
    ],
    order: [["createdAt", "DESC"]],
    limit: 10,
    raw: true,
  });

  const processedBlogs = blogs.map((blog) => ({
    id: blog.id,
    text: blog.text,
    threadImage: blog.threadImage,
    userId: blog.userId,
    createdAt: blog.createdAt,
    userName: blog["user.userName"],
    userImage: blog["user.imagePath"],
    totalLikes: blog.totalLikes,
    liked: blog.status > 0,
  }));
  res.locals.blogs = processedBlogs;

  const following = await models.Follow.findAll({
    attributes: ["followingId"],
    where: {
      followerId: ID,
    },
    raw: true,
  });

  if (following.length === 0) {
    res.locals.followingList = [];
  } else {
    const followingIds = following.map((follow) => follow.followingId);
    console.log("follwingid:" + followingIds);
    const options = {
      attributes: [
        "id",
        "firstName",
        "lastName",
        "userName",
        "imagePath",
        [
          sequelize.literal(
            `(SELECT COUNT(*) FROM "Follows" WHERE "Follows"."followerId" = ${ID} AND "Follows"."followingId" = "User"."id")`
          ),
          "isFollowed",
        ],
      ],
      where: {
        [Op.and]: [{ id: { [Op.in]: followingIds } }, { id: { [Op.ne]: ID } }],
      },
      raw: true,
    };

    let followingList = await models.User.findAll(options);
    followingList = followingList.map((account) => ({
      ...account,
      isFollowed: account.isFollowed == true,
    }));
    console.log(followingList);
    res.locals.followingList = followingList;
  }

  const followers = await models.Follow.findAll({
    attributes: ["followerId"],
    where: {
      followingId: ID,
    },
    raw: true,
  });

  if (followers.length === 0) {
    res.locals.followerList = [];
  } else {
    const followerIds = followers.map((follow) => follow.followerId);

    const options1 = {
      attributes: [
        "id",
        "firstName",
        "lastName",
        "userName",
        "imagePath",
        [
          sequelize.literal(
            `(SELECT COUNT(*) FROM "Follows" WHERE "Follows"."followerId" = ${ID} AND "Follows"."followingId" = "User"."id")`
          ),
          "isFollowed",
        ],
      ],
      where: {
        [Op.and]: [{ id: { [Op.in]: followerIds } }, { id: { [Op.ne]: ID } }],
      },
      raw: true,
    };

    let followerList = await models.User.findAll(options1);
    followerList = followerList.map((account) => ({
      ...account,
      isFollowed: account.isFollowed == true,
    }));
    res.locals.followerList = followerList;
  }
  res.render("profile");
};

controller.showEditProfile = async (req, res) => {
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
  res.render("editProfile");
};

controller.updateProfile = async (req, res) => {
  let ID = req.user.id;
  res.locals.currentID = ID;

  const { bio, userName, firstName, lastName } = req.body;
  let imagePath = null;

  if (userName && userName !== req.user.userName) {
    try {
      const existingUser = await models.User.findOne({
        where: { userName: userName, id: { [models.Sequelize.Op.ne]: ID } },
      });

      if (existingUser) {
        const userInfo = await models.User.findOne({
          attributes: [
            "id",
            "firstName",
            "lastName",
            "bio",
            "userName",
            "imagePath",
          ],
          where: { id: ID },
          raw: true,
        });

        return res.status(400).render("editProfile", {
          done: false,
          error:
            "The username is already taken. Please choose a different one.",
          userInfo,
        });
      }
    } catch (error) {
      console.error("Error checking unique username:", error);

      const userInfo = await models.User.findOne({
        attributes: [
          "id",
          "firstName",
          "lastName",
          "bio",
          "userName",
          "imagePath",
        ],
        where: { id: ID },
        raw: true,
      });

      return res.status(500).render("editProfile", {
        done: false,
        error:
          "An error occurred while validating your username. Please try again.",
        userInfo,
      });
    }
  }

  if (req.file) {
    try {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });
      imagePath = uploadResult.secure_url;
      fs.unlinkSync(req.file.path);
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      const userInfo = await models.User.findOne({
        attributes: [
          "id",
          "firstName",
          "lastName",
          "bio",
          "userName",
          "imagePath",
        ],
        where: { id: ID },
        raw: true,
      });

      return res.status(500).render("editProfile", {
        done: false,
        error: "Image upload failed. Please try again.",
        userInfo,
      });
    }
  }

  const updatedFields = { bio, userName, firstName, lastName };
  if (imagePath) {
    updatedFields.imagePath = imagePath;
  }

  try {
    await models.User.update(updatedFields, { where: { id: ID } });

    const updatedUserInfo = await models.User.findOne({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "bio",
        "userName",
        "imagePath",
      ],
      where: { id: ID },
      raw: true,
    });

    return res.render("editProfile", {
      done: true,
      userInfo: updatedUserInfo,
    });
  } catch (error) {
    console.error("Database update failed:", error);

    const userInfo = await models.User.findOne({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "bio",
        "userName",
        "imagePath",
      ],
      where: { id: ID },
      raw: true,
    });

    return res.status(500).render("editProfile", {
      done: false,
      error: "An error occurred while updating your profile.",
      userInfo,
    });
  }
};

controller.toggleFollow = async (req, res) => {
  let ID = req.user.id;
  res.locals.currentID = ID;

  const { userName } = req.query;
  const { action } = req.body;
  console.log(ID);
  console.log(userName);
  console.log(action);

  if (!userName || !ID || !["follow", "unfollow"].includes(action)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const user = await models.User.findOne({
      attributes: ["id"],
      where: { userName },
      raw: true,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const followingId = user.id;

    if (action === "follow") {
      await models.Follow.create({ followerId: ID, followingId });

      await models.Notification.create({
        text: `${req.user.userName} started following you`,
        sourceId: ID,
        userId: followingId,
        type: "FOLLOW",
        isSeen: false,
      });
    } else if (action === "unfollow") {
      const existingFollow = await models.Follow.findOne({
        where: { followerId: ID, followingId },
      });
      if (existingFollow) {
        await existingFollow.destroy();
      }
    }

    const isFollowed =
      (await models.Follow.findOne({
        where: { followerId: ID, followingId },
      })) !== null;

    res.json({ isFollowed });
  } catch (error) {
    console.error("Error handling follow action:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = controller;
