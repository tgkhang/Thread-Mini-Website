"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [
      {
        userId: 1,
        threadId: 11,
      },
      {
        userId: 2,
        threadId: 7,
      },
      {
        userId: 6,
        threadId: 3,
      },
      {
        userId: 19,
        threadId: 5,
      },
      {
        userId: 6,
        threadId: 7,
      },
      {
        userId: 9,
        threadId: 1,
      },
      {
        userId: 6,
        threadId: 11,
      },
      {
        userId: 8,
        threadId: 6,
      },
      {
        userId: 17,
        threadId: 3,
      },
      {
        userId: 12,
        threadId: 9,
      },
      {
        userId: 9,
        threadId: 2,
      },
      {
        userId: 7,
        threadId: 4,
      },
      {
        userId: 5,
        threadId: 15,
      },
      {
        userId: 9,
        threadId: 1,
      },
      {
        userId: 6,
        threadId: 6,
      },
      {
        userId: 1,
        threadId: 15,
      },
    ];
    items.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });
    await queryInterface.bulkInsert("Likes", items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Likes", null, {});
  },
};
