"use strict";

const controller = {};
const models = require("../database/models");

const sequelize = require("sequelize");
const Op = sequelize.Op;
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

controller.showHomepage = async (req, res) => {
  //
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

controller.showSearchpage = async (req, res) => {
  let ID = req.user.id;
  //console.log(ID);
  res.locals.currentID = ID;
  //take keyword
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
      [Op.and]: [{ id: { [Op.notIn]: followingIds } }, { id: { [Op.ne]: ID } }],
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
  //console.log(suggestAccounts);
  // console.log("res.locals:", res.locals);

  console.log(followingIds);
  res.render("search", { followingIds });
};
controller.showCreateThreadpage = async (req, res) => {
  res.render("createThread");
};
controller.showNotificationpage = async (req, res) => {
  res.render("notification");
};

controller.showProfilepage = async (req, res) => {
  //assume that current account username is
  //const ID = req.user?.id || req.session?.userId;
  //let ID= req.session.ID;
  //console.log("profile here");
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
  //console.log(userInfo);
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

  //console.log(blogs);

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
  //console.log(following);

  if (following.length === 0) {
    res.locals.followingList = [];
  } else {
    const followingIds = following.map((follow) => follow.followingId);

    const options = {
      attributes: ["id", "firstName", "lastName", "userName", "imagePath"],
      where: {
        [Op.and]: [{ id: { [Op.in]: followingIds } }, { id: { [Op.ne]: ID } }],
      },
      raw: true,
    };

    const followingList = await models.User.findAll(options);
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

  //console.log(followers);

  if (followers.length === 0) {
    res.locals.followerList = [];
  } else {
    const followerIds = followers.map((follow) => follow.followerId);

    const options1 = {
      attributes: ["id", "firstName", "lastName", "userName", "imagePath"],
      where: {
        [Op.and]: [{ id: { [Op.in]: followerIds } }, { id: { [Op.ne]: ID } }],
      },
      raw: true,
    };

    const followerList = await models.User.findAll(options1);

    //console.log(followerList);
    res.locals.followerList = followerList;
  }

  const followingIds = following.map((f) => f.followingId); //to array of IDs
  //console.log(followingIds)
  res.render("profile", { followingIds });
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

  const userInfo = {
    userName: req.user.userName,
    imagePath: req.user.imagePath || null,
  };

  console.log("In controller, req.body:", req.body); // Debugging

  let imagePath = null;

  const { bio, userName, firstName, lastName } = req.body;
  
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
    return res.render("editProfile", { done: true });
  } catch (error) {
    console.error("Database update failed:", error);
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


controller.showCreateThread = async(req, res) => {
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
controller.createComment= async (req,res)=>{
  let ID = req.user.id;
  res.locals.currentID = ID;

  const threadId=req.params.threadId;
  const { text } = req.body;
  const userName = req.params.userName;

  //console.log("In controller, req.body:", req.body, blogId); // Debugging
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

    res.redirect(`/${userName}/${threadId}`);
    return res.render("blogDetail", {
    //return res.render("error", {
      done: true,
      userInfo, 
      //message: "Thread created successfully"
    });
  } catch (err) {
    console.error("Database update failed:", err);
    return res.status(500).render("blogDetail", {
      done: false,
      error: "An unexpected error occurred. Please try again later.",
      userInfo, 
    });
  }
  
}

controller.likeThread = async (req, res) => {
  const { threadId } = req.query; 
  const { action } = req.body; 
  const currentID = req.user.id;
  console.log("like thread"+ action.toString());
  console.log(threadId);
  console.log(action.toString());
  try {
    if (action === "like") {
      await models.Like.create({ threadId, userId: currentID });
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

  // If the requested page is not static or dynamic
  if (!renderablePages.static.includes(requestedPage) && !renderablePages.dynamic.includes(requestedPage)) {
    const userInfo = await models.User.findOne({
      where: { userName: requestedPage },
      attributes: ["id", "firstName", "lastName", "bio", "userName", "imagePath"],
      raw: true,
    });

    if (userInfo) {
      res.locals.requestID = userInfo.id;

      if (blogId) {
        // Fetch specific blog details
        const blog = await models.Thread.findOne({
          attributes: [
            "id",
            "text",
            ["imagePath", "threadImage"],
            "userId",
            "createdAt",
            [
              sequelize.literal(`(SELECT COUNT(*) FROM "Likes" WHERE "Likes"."threadId" = "Thread"."id")`),
              "totalLikes",
            ],
            [
              sequelize.literal(`(SELECT COUNT(*) FROM "Likes" WHERE "Likes"."threadId" = "Thread"."id" AND "Likes"."userId" = ${currentID})`),
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

        res.locals.comments = (await models.Comment.findAll({
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
        })).map((comment) => ({
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
        // Fetch user profile and blogs
        res.locals.userInfo = userInfo;

        res.locals.blogs = (await models.Thread.findAll({
          attributes: [
            "id",
            "text",
            ["imagePath", "threadImage"],
            "userId",
            "createdAt",
            [
              sequelize.literal(`(SELECT COUNT(*) FROM "Likes" WHERE "Likes"."threadId" = "Thread"."id")`),
              "totalLikes",
            ],
            [
              sequelize.literal(`(SELECT COUNT(*) FROM "Likes" WHERE "Likes"."threadId" = "Thread"."id" AND "Likes"."userId" = ${currentID})`),
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
        })).map((blog) => ({
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

        const followingIds = (await models.Follow.findAll({
          attributes: ["followingId"],
          where: { followerId: currentID },
          raw: true,
        })).map((f) => f.followingId);

        res.locals.followingList = await models.User.findAll({
          attributes: ["id", "firstName", "lastName", "userName", "imagePath"],
          where: {
            id: { [Op.in]: followingIds, [Op.ne]: currentID },
          },
          raw: true,
        });

        const followerIds = (await models.Follow.findAll({
          attributes: ["followerId"],
          where: { followingId: currentID },
          raw: true,
        })).map((f) => f.followerId);

        res.locals.followerList = await models.User.findAll({
          attributes: ["id", "firstName", "lastName", "userName", "imagePath"],
          where: {
            id: { [Op.in]: followerIds, [Op.ne]: currentID },
          },
          raw: true,
        });

        res.render("profile", {
          followingIds, // Pass followingIds directly to the view
        });
        return;
      }
    } else {
      return res.status(404).send("User not found");
    }
  }
};


// const pages = ['changePassword','createThread','emailVerify','notification','profile','forgotPassword','signup','inputCode','successPage','blogDetail'];
// //home, search , notificaton, profile
// //if not in these page,
// if(pages.includes(req.params.page))
// return res.render(req.params.page);
// next();

module.exports = controller;
