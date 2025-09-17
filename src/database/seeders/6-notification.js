'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [
      {
        text: "leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac",
        userId: 1,
        isSeen: false,
        type: "FOLLOW",
      },
      {
        text: "in felis donec semper sapien a libero",
        userId: 1,
        isSeen: true,
        type: "COMMENT",
      },
      {
        text: "risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl",
        userId: 1,
        isSeen: false,
        type: "LIKE",
      },
      {
        text: "nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin",
        userId: 1,
        isSeen: false,
        type: "COMMENT",
      },
      {
        text: "suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae",
        userId: 17,
        isSeen: false,
        type: "FOLLOW",
      },
      {
        text: "dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem",
        userId: 17,
        isSeen: false,
        type: "LIKE",
      },
      {
        text: "lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat",
        userId: 15,
        isSeen: true,
        type: "COMMENT",
      },
      {
        text: "nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis",
        userId: 18,
        isSeen: false,
        type: "FOLLOW",
      },
      {
        text: "ut nulla sed accumsan felis ut at dolor quis odio",
        userId: 14,
        isSeen: false,
        type: "LIKE",
      },
      {
        text: "dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio",
        userId: 11,
        isSeen: false,
        type: "LIKE",
      },
    ];

    
    items.forEach((item) => {
      item.sourceId = Math.floor(Math.random() * 20) + 1; 
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    });

    await queryInterface.bulkInsert('Notifications', items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notifications', null, {});
  },
};
