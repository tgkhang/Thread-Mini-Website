'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const items = [{
      "followerId": 1,
      "followingId": 2
    }, {
      "followerId": 2,
      "followingId": 5
    }, {
      "followerId": 1,
      "followingId": 4
    }, {
      "followerId": 3,
      "followingId": 8
    }, {
      "followerId": 4,
      "followingId": 11
    }, {
      "followerId": 11,
      "followingId": 13
    }, {
      "followerId": 10,
      "followingId": 1
    }, {
      "followerId": 3,
      "followingId": 10
    }, {
      "followerId": 14,
      "followingId": 1
    }, {
      "followerId": 9,
      "followingId": 10
    }, {
      "followerId": 4,
      "followingId": 3
    }, {
      "followerId": 13,
      "followingId": 18
    }, {
      "followerId": 3,
      "followingId": 12
    }, {
      "followerId": 11,
      "followingId": 10
    }, {
      "followerId": 9,
      "followingId": 6
    }, {
      "followerId": 1,
      "followingId": 7
    }, {
      "followerId": 11,
      "followingId": 13
    }, {
      "followerId": 8,
      "followingId": 19
    }, {
      "followerId": 17,
      "followingId": 2
    }, {
      "followerId": 6,
      "followingId": 11
    }];
    items.forEach(item => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    });
    await queryInterface.bulkInsert('Follows', items, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Follows', null, {});
  }
};
