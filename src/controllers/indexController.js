"use strict";

const controller = {};
const models = require("../database/models");

const sequelize = require("sequelize");
const Op = sequelize.Op;
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

controller.showHomepage = async (req, res) => {
  //let ID= req.session.ID;
  let ID = req.user.id;
  res.locals.currentID = ID;

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
      userId: {
        [Op.ne]: ID,
      },
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
    liked: blog.status > 0, // Convert to boolean: true if liked, false otherwise
  }));
  res.locals.blogs = processedBlogs;

  // console.log(processedBlogs);

  //following tab
  const followedUsers = await models.Follow.findAll({
    attributes: ["followingId"],
    where: {
      followerId: ID,
    },
    raw: true,
  });

  //console.log(followedUsers);

  const followingIds = followedUsers.map((follow) => follow.followingId);

  const followingBlogs = await models.Thread.findAll({
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
      userId: {
        [Op.in]: followingIds,
      },
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

  const followTabBlogs = followingBlogs.map((blog) => ({
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
  res.locals.followingBlogs = followTabBlogs;
  //console.log(followingBlogs);
  res.render("home");
};
controller.loadMoreBlogs = async (req, res) => {
  const { tab, offset } = req.query;
  const ID = req.user.id;
  const limit = 10;

  try {
    let blogs;

    if (tab === "for-you") {
      blogs = await models.Thread.findAll({
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
          userId: {
            [Op.ne]: ID,
          },
        },
        include: [
          {
            model: models.User,
            as: "user",
            attributes: ["userName", "imagePath"],
          },
        ],
        order: [["createdAt", "DESC"]],
        offset: parseInt(offset),
        limit,
        raw: true,
      });
    } else if (tab === "following") {
      const followedUsers = await models.Follow.findAll({
        attributes: ["followingId"],
        where: { followerId: ID },
        raw: true,
      });

      const followingIds = followedUsers.map((follow) => follow.followingId);

      blogs = await models.Thread.findAll({
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
          userId: {
            [Op.in]: followingIds,
          },
        },
        include: [
          {
            model: models.User,
            as: "user",
            attributes: ["userName", "imagePath"],
          },
        ],
        order: [["createdAt", "DESC"]],
        offset: parseInt(offset),
        limit,
        raw: true,
      });
    } else {
      return res.status(400).send("Invalid tab");
    }

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

    res.render("partials/blogs", { blogs: processedBlogs });
  } catch (error) {
    console.error("Error loading more blogs:", error);
    res.status(500).send("Internal server error");
  }
};

controller.showSearchResult = async (req, res) => {
  let ID = req.user.id;
  //console.log(ID);
  res.locals.currentID = ID;
  let keyword = req.query.keyword || "";

  //find all user follow by current user
  const followedUsers = await models.Follow.findAll({
    attributes: ["followingId"],
    where: {
      followerId: ID,
    },
    raw: true,
  });

  //console.log(followedUsers)
  const followingIds = followedUsers.map((follow) => follow.followingId);
  console.log(followingIds);

  const options = {
    attributes: ["id", "firstName", "lastName", "userName", "imagePath"],
    where: {
      [Op.and]: [{ id: { [Op.ne]: ID } }],
    },
    limit: 5,
    raw: true,
  };

  if (keyword.trim() != "") {
    options.where.userName = {
      [Op.iLike]: `%${keyword}%`,
    };
  }

  let suggestAccounts = await models.User.findAll(options);
  res.locals.suggestAccounts = suggestAccounts;

  console.log(followingIds);
  res.render("search", { followingIds });
};

controller.showSearchpage = async (req, res) => {
  let ID = req.user.id;
  //console.log(ID);
  res.locals.currentID = ID;
  //find all user follow by current user
  const followedUsers = await models.Follow.findAll({
    attributes: ["followingId"],
    where: {
      followerId: ID,
    },
    raw: true,
  });

  //console.log(followedUsers)
  const followingIds = followedUsers.map((follow) => follow.followingId);
  console.log(followingIds);

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
      [Op.and]: [{ id: { [Op.notIn]: followingIds } }, { id: { [Op.ne]: ID } }],
    },
    limit: 5,
    raw: true,
  };

  let suggestAccounts = await models.User.findAll(options);

  suggestAccounts = suggestAccounts.map((account) => ({
    ...account,
    isFollowed: account.isFollowed == true,
  }));
  res.locals.suggestAccounts = suggestAccounts;

  //console.log(suggestAccounts);
  // console.log("res.locals:", res.locals);
  console.log(followingIds);
  res.render(
    "search"
    //  { followingIds }
  );
};
controller.showCreateThreadpage = async (req, res) => {
  res.render("createThread");
};
controller.showNotifications = async (req, res) => {
  try {
    const ID = req.user.id; 
    res.locals.currentID = ID;

    const allNotifications = await models.Notification.findAll({
      attributes: ["id", "userId", "text", "isSeen", "type", "createdAt",
        [
          sequelize.literal(`(SELECT "userName" FROM "Users" WHERE "Users"."id" = "Notification"."sourceId")`),
          "sourceUserName", 
        ],
      ],
      where: { userId: ID },
      order: [["createdAt", "DESC"]],
      raw: true,
      limit:20,
    });

    res.locals.allNotifications = allNotifications;
    
    const seenNotifications = await models.Notification.findAll({
      attributes: ["id", "userId", "text", "isSeen", "type", "createdAt",
        [
          sequelize.literal(`(SELECT "userName" FROM "Users" WHERE "Users"."id" = "Notification"."sourceId")`),
          "sourceUserName", // Fetch source user's userName directly
        ],
      ],
      where: { userId: ID ,isSeen:true},
      order: [["createdAt", "DESC"]],
      raw: true,
      limit:20,
    });

    res.locals.seenNotifications  = seenNotifications ;

    const unseenNotifications = await models.Notification.findAll({
      attributes: ["id", "userId", "text", "isSeen", "type", "createdAt",
        [
          sequelize.literal(`(SELECT "userName" FROM "Users" WHERE "Users"."id" = "Notification"."sourceId")`),
          "sourceUserName", // Fetch source user's userName directly
        ],
      ],
      where: { userId: ID ,isSeen:false},
      order: [["createdAt", "DESC"]],
      raw: true,
      limit:20,
    });

    res.locals.unseenNotifications  = unseenNotifications ;


    res.render("notifications");
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).send("An error occurred while fetching notifications.");
  }
};

controller.showProfilepage = async (req, res) => {
  let ID = req.user.id;
  res.locals.currentID = ID;

  //profile info
  const userInfo = await models.User.findOne({
    attributes: ["id", "firstName", "lastName", "bio", "userName", "imagePath"],
    where: {
      id: ID,
    },
    raw: true,
  });
  res.locals.userInfo = userInfo;

  //own thread
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

  //Following by current user
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

  //user follow current user
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
  //assume that current account username is
  //const ID = req.user?.id || req.session?.userId;
  //let ID= req.session.ID;
  let ID = req.user.id;
  res.locals.currentID = ID;
  //console.log("hrerere"+ID);

  //profile info
  const userInfo = await models.User.findOne({
    attributes: ["id", "firstName", "lastName", "bio", "userName", "imagePath"],
    where: {
      id: ID,
    },
    raw: true,
  });
  //console.log(userInfo);
  res.locals.userInfo = userInfo;
  res.render("editProfile");
};

controller.updateProfile = async (req, res) => {
  let ID = req.user.id;
  res.locals.currentID = ID;

  const { bio, userName, firstName, lastName } = req.body;
  let imagePath = null;

  // Check if username is unique
  if (userName && userName !== req.user.userName) {
    try {
      const existingUser = await models.User.findOne({
        where: { userName: userName, id: { [models.Sequelize.Op.ne]: ID } }, 
      });

      if (existingUser) {
        const userInfo = await models.User.findOne({
          attributes: ["id", "firstName", "lastName", "bio", "userName", "imagePath"],
          where: { id: ID },
          raw: true,
        });

        return res.status(400).render("editProfile", {
          done: false,
          error: "The username is already taken. Please choose a different one.",
          userInfo,
        });
      }
    } catch (error) {
      console.error("Error checking unique username:", error);

      const userInfo = await models.User.findOne({
        attributes: ["id", "firstName", "lastName", "bio", "userName", "imagePath"],
        where: { id: ID },
        raw: true,
      });

      return res.status(500).render("editProfile", {
        done: false,
        error: "An error occurred while validating your username. Please try again.",
        userInfo,
      });
    }
  }

  // image upload
  if (req.file) {
    try {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });
      imagePath = uploadResult.secure_url;
      fs.unlinkSync(req.file.path); // Remove temporary file
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      const userInfo = await models.User.findOne({
        attributes: ["id", "firstName", "lastName", "bio", "userName", "imagePath"],
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

    // Fetch the updated user information
    const updatedUserInfo = await models.User.findOne({
      attributes: ["id", "firstName", "lastName", "bio", "userName", "imagePath"],
      where: { id: ID },
      raw: true,
    });

    return res.render("editProfile", {
      done: true,
      userInfo: updatedUserInfo, // Pass the latest user info to the view
    });
  } catch (error) {
    console.error("Database update failed:", error);

    const userInfo = await models.User.findOne({
      attributes: ["id", "firstName", "lastName", "bio", "userName", "imagePath"],
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

controller.createThread = async (req, res) => {
  const ID = req.user.id;
  res.locals.currentID = ID;

  const { text } = req.body; // Get text from the form
  console.log("Request Body here:", req.body); // Debugging

  const userInfo = {
    userName: req.user.userName,
    imagePath: req.user.imagePath || null,
  };
  console.log("UserInfo:", userInfo);

  // Check if text is empty or missing
  if (!text || text.trim() === "") {
    return res.status(400).render("createThread", {
      done: false,
      error: "Text cannot be empty",
      userInfo,
    });
  }

  let imagePath = null;

  // Handle image upload
  if (req.file) {
    const localImagePath = req.file.path;

    try {
      const result = await cloudinary.uploader.upload(localImagePath, {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      imagePath = result.secure_url;
      fs.unlinkSync(localImagePath); // Clean up local file
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
    // Save the thread in the database
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
  //console.log(userInfo);
  res.locals.userInfo = userInfo;
  res.render("createThread");
};

controller.seenhandle= async (req, res) => {
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
}
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

      //create a notification
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

controller.unfollowUser = async (req, res) => {
  //link / unfollow?id=id
  let ID1 = req.user.id;
  let ID2 = isNaN(req.query.id) ? 0 : parseInt(req.query.id);

  //console.log(ID1,ID2);
  if (ID1 != ID2) {
    try {
      await models.Follow.destroy({
        where: {
          followerId: ID1,
          followingId: ID2,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Can not unfollow!");
    }
  }
};
controller.followUser = async (req, res) => {
  //link / unfollow?id=id
  let ID1 = req.user.id;
  let ID2 = isNaN(req.query.id) ? 0 : parseInt(req.query.id);

  //console.log(ID1,ID2);
  if (ID1 != ID2) {
    try {
      await models.Follow.create({
        followerId: ID1,
        followingId: ID2,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Can not follow!");
    }
  }
};
controller.createComment = async (req, res) => {
  let ID = req.user.id;
  res.locals.currentID = ID;

  const threadId = req.params.threadId;
  const { text } = req.body;
  const userName = req.params.userName;

  const userInfo = {
    userName: req.user.userName,
    imagePath: req.user.imagePath || null,
  };
  //console.log("UserInfo:", userInfo);

  if (!text || text.trim() === "") {
    return res.status(400).render("blogDetail", {
      done: false,
      error: "Text cannot be empty",
      userInfo, // Pass user info to the view
    });
  }

  try {
    await models.Comment.create({
      threadId: threadId,
      userId: ID,
      text: text.trim(),
    });
    const thread = await models.Thread.findOne({
      attributes: ["userId"], // Get the thread owner's userId
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

controller.likeThread = async (req, res) => {
  const { threadId } = req.query;
  const { action } = req.body;
  const currentID = req.user.id;
  //console.log("like thread"+ action.toString());
  //console.log(threadId);
  //console.log(action.toString());
  try {
    if (action === "like") {
      await models.Like.create({ threadId, userId: currentID });

      const thread = await models.Thread.findOne({
        attributes: ["userId"], 
        where: { id: threadId },
      });

      if (thread && thread.userId !== currentID) {
        //cerate a notification 
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

//another page
controller.showPage = async (req, res) => {
  let currentID = req.user.id;
  res.locals.currentID = currentID;

  res.locals.mainUserInfo = await models.User.findOne({
    attributes: ["id", "firstName", "lastName", "bio", "userName", "imagePath"],
    where: { id: currentID },
    raw: true,
  });

  const renderablePages = {
    static: ["home", "search", "createThread"],
    dynamic: ["emailVerify", "notification", "successPage"],
  };

  const requestedPage = req.params.page;
  const blogId = req.params.thread || null;
  res.locals.requestedPage = requestedPage;

  if (
    !renderablePages.static.includes(requestedPage) &&
    !renderablePages.dynamic.includes(requestedPage)
  ) {
    const userInfo = await models.User.findOne({
      where: { userName: requestedPage },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "bio",
        "userName",
        "imagePath",
        [
          sequelize.literal(
            `(SELECT COUNT(*) FROM "Follows" WHERE "Follows"."followerId" = ${currentID} AND "Follows"."followingId" = "User"."id")`
          ),
          "isFollowed",
        ],
      ],
      raw: true,
    });

    if (userInfo) {
      res.locals.requestID = userInfo.id;

      if (blogId) {
        const blog = await models.Thread.findOne({
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
                `(SELECT COUNT(*) FROM "Likes" WHERE "Likes"."threadId" = "Thread"."id" AND "Likes"."userId" = ${currentID})`
              ),
              "status",
            ],
          ],
          where: { id: blogId },
          include: [
            {
              model: models.User,
              as: "user",
              attributes: ["userName", "imagePath"],
            },
          ],
          raw: true,
        });

        if (!blog) return res.status(404).send("Blog not found");

        res.locals.blog = {
          id: blog.id,
          text: blog.text,
          threadImage: blog.threadImage,
          userId: blog.userId,
          createdAt: blog.createdAt,
          userName: blog["user.userName"],
          userImage: blog["user.imagePath"],
          totalLikes: blog.totalLikes,
          liked: blog.status > 0,
        };

        res.locals.comments = (
          await models.Comment.findAll({
            attributes: ["id", "text", "userId", "threadId", "createdAt"],
            where: { threadId: blogId },
            include: [
              {
                model: models.User,
                as: "user",
                attributes: ["userName", "imagePath"],
              },
            ],
            order: [["createdAt", "DESC"]],
            raw: true,
          })
        ).map((comment) => ({
          id: comment.id,
          text: comment.text,
          userId: comment.userId,
          createdAt: comment.createdAt,
          userName: comment["user.userName"],
          userImage: comment["user.imagePath"],
        }));

        res.render("blogDetail");
        return;
      } else {
        res.locals.userInfo = userInfo;

        res.locals.blogs = (
          await models.Thread.findAll({
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
                  `(SELECT COUNT(*) FROM "Likes" WHERE "Likes"."threadId" = "Thread"."id" AND "Likes"."userId" = ${currentID})`
                ),
                "status",
              ],
            ],
            where: { userId: userInfo.id },
            include: [
              {
                model: models.User,
                as: "user",
                attributes: ["userName", "imagePath"],
              },
            ],
            order: [["createdAt", "DESC"]],
            raw: true,
          })
        ).map((blog) => ({
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

        const followingIds = (
          await models.Follow.findAll({
            attributes: ["followingId"],
            where: { followerId: currentID },
            raw: true,
          })
        ).map((f) => f.followingId);

        res.locals.followingList = await models.User.findAll({
          attributes: [
            "id",
            "firstName",
            "lastName",
            "userName",
            "imagePath",
            [
              sequelize.literal(
                `(SELECT COUNT(*) FROM "Follows" WHERE "Follows"."followerId" = ${currentID} AND "Follows"."followingId" = "User"."id")`
              ),
              "isFollowed",
            ],
          ],
          where: {
            id: { [Op.in]: followingIds, [Op.ne]: currentID },
          },
          raw: true,
        });

        const followerIds = (
          await models.Follow.findAll({
            attributes: ["followerId"],
            where: { followingId: currentID },
            raw: true,
          })
        ).map((f) => f.followerId);

        res.locals.followerList = await models.User.findAll({
          attributes: [
            "id",
            "firstName",
            "lastName",
            "userName",
            "imagePath",
            [
              sequelize.literal(
                `(SELECT COUNT(*) FROM "Follows" WHERE "Follows"."followerId" = ${currentID} AND "Follows"."followingId" = "User"."id")`
              ),
              "isFollowed",
            ],
          ],
          where: {
            id: { [Op.in]: followerIds, [Op.ne]: currentID },
          },
          raw: true,
        });

        res.render("profile");
        return;
      }
    } else {
      return res.status(404).send("User not found");
    }
  }
};

controller.show = async (req, res) => {
  let ID = req.user.id;
  res.locals.currentID = ID;
  const requestedPage = req.params.page;
  const blogId = req.params.thread || null;
  res.locals.requestedPage = requestedPage;

  if (requestedPage) {
    if (blogId) {
      const blog = await models.Thread.findOne({
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
        where: { id: blogId },
        include: [
          {
            model: models.User,
            as: "user",
            attributes: ["userName", "imagePath"],
          },
        ],
        raw: true,
      });

      if (!blog) return res.status(404).send("Blog not found");

      res.locals.blog = {
        id: blog.id,
        text: blog.text,
        threadImage: blog.threadImage,
        userId: blog.userId,
        createdAt: blog.createdAt,
        userName: blog["user.userName"],
        userImage: blog["user.imagePath"],
        totalLikes: blog.totalLikes,
        liked: blog.status > 0,
      };

      res.locals.comments = (
        await models.Comment.findAll({
          attributes: ["id", "text", "userId", "threadId", "createdAt"],
          where: { threadId: blogId },
          include: [
            {
              model: models.User,
              as: "user",
              attributes: ["userName", "imagePath"],
            },
          ],
          order: [["createdAt", "DESC"]],
          raw: true,
        })
      ).map((comment) => ({
        id: comment.id,
        text: comment.text,
        userId: comment.userId,
        createdAt: comment.createdAt,
        userName: comment["user.userName"],
        userImage: comment["user.imagePath"],
      }));

      res.render("blogDetail");
      return;
    }
    const requestedUser = await models.User.findOne({
      where: { userName: requestedPage },
      attributes: ["id"],
      raw: true,
    });
    const requestedId = requestedUser ? requestedUser.id : null;
    
    //guest view profile
    const userInfo = await models.User.findOne({
      where: { userName: requestedPage },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "bio",
        "userName",
        "imagePath",
        [
          sequelize.literal(
            `(SELECT COUNT(*) FROM "Follows" WHERE "Follows"."followerId" = ${ID} AND "Follows"."followingId" = "User"."id")`
          ),
          "isFollowed",//follow by main user or not
        ],
      ],
      raw: true,
    });
    if (userInfo) {
      userInfo.isFollowed = userInfo.isFollowed > 0;
    }

    res.locals.userInfo = userInfo;
    //blog
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
        userId: requestedId,
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

    //Following by current user
    const following = await models.Follow.findAll({
      attributes: ["followingId"],
      where: {
        followerId: requestedId,
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
          [Op.and]: [
            { id: { [Op.in]: followingIds } },
            { id: { [Op.ne]: requestedId } },
          ],
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

    //user follow current user
    const followers = await models.Follow.findAll({
      attributes: ["followerId"],
      where: {
        followingId: requestedId,
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
          [Op.and]: [{ id: { [Op.in]: followerIds } }, { id: { [Op.ne]: requestedId } }],
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
    res.render("guestProfile");
  }

  const userInfo = await models.User.findOne({
    attributes: ["id", "firstName", "lastName", "bio", "userName", "imagePath"],
    where: {
      id: ID,
    },
    raw: true,
  });

  if (!userInfo) return res.status(404).send("User not found");
};

// const pages = ['changePassword','createThread','emailVerify','notification','profile','forgotPassword','signup','inputCode','successPage','blogDetail'];
// //home, search , notificaton, profile
// //if not in these page,
// if(pages.includes(req.params.page))
// return res.render(req.params.page);
// next();

module.exports = controller;
