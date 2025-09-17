"use strict";

const controller = {};
const models = require("../database/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

controller.showHomepage = async (req, res) => {
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
    liked: blog.status > 0,
  }));
  res.locals.blogs = processedBlogs;

  const followedUsers = await models.Follow.findAll({
    attributes: ["followingId"],
    where: {
      followerId: ID,
    },
    raw: true,
  });

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
  res.locals.currentID = ID;
  let keyword = req.query.keyword || "";

  const followedUsers = await models.Follow.findAll({
    attributes: ["followingId"],
    where: {
      followerId: ID,
    },
    raw: true,
  });

  const followingIds = followedUsers.map((follow) => follow.followingId);

  const options = {
    attributes: ["id", "firstName", "lastName", "userName", "imagePath",
      [
        sequelize.literal(
          `CASE WHEN EXISTS (
            SELECT 1 FROM "Follows"
            WHERE "Follows"."followerId" = ${ID} AND "Follows"."followingId" = "User"."id"
          ) THEN true ELSE false END`
        ),
        "isFollowed",
      ],
    ],
    where: {
      [Op.and]: [{ id: { [Op.ne]: ID } }],
    },
    limit: 10,
    raw: true,
  };

  if (keyword.trim() !== "") {
    options.where[Op.or] = [
      { userName: { [Op.iLike]: `%${keyword}%` } },
      { firstName: { [Op.iLike]: `%${keyword}%` } },
      { lastName: { [Op.iLike]: `%${keyword}%` } },
      {
        [Op.and]: [
          { firstName: { [Op.iLike]: `%${keyword.split(" ")[0]}%` } },
          { lastName: { [Op.iLike]: `%${keyword.split(" ")[1] || ""}%` } },
        ],
      },
    ];
  }

  try {
    const suggestAccounts = await models.User.findAll(options);
    res.locals.suggestAccounts = suggestAccounts;

    res.render("search", { followingIds });
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).send("Internal server error");
  }
};

controller.showSearchpage = async (req, res) => {
  let ID = req.user.id;
  res.locals.currentID = ID;

  const followedUsers = await models.Follow.findAll({
    attributes: ["followingId"],
    where: {
      followerId: ID,
    },
    raw: true,
  });

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

  console.log(followingIds);
  res.render("search");
};

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
          "isFollowed",
        ],
      ],
      raw: true,
    });
    if (userInfo) {
      userInfo.isFollowed = userInfo.isFollowed > 0;
    }

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

module.exports = controller;