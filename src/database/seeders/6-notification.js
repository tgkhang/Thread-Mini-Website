'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const items=[{
    "text": "leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac",
    "userId": 20,
    "isSeen": false
  }, {
    "text": "in felis donec semper sapien a libero",
    "userId": 5,
    "isSeen": true
  }, {
    "text": "risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl",
    "userId": 17,
    "isSeen": false
  }, {
    "text": "nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin",
    "userId": 6,
    "isSeen": false
  }, {
    "text": "suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae",
    "userId": 17,
    "isSeen": false
  }, {
    "text": "dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem",
    "userId": 17,
    "isSeen": false
  }, {
    "text": "lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat",
    "userId": 15,
    "isSeen": true
  }, {
    "text": "nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis",
    "userId": 18,
    "isSeen": false
  }, {
    "text": "ut nulla sed accumsan felis ut at dolor quis odio",
    "userId": 14,
    "isSeen": false
  }, {
    "text": "dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio",
    "userId": 11,
    "isSeen": false
  }, {
    "text": "pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue",
    "userId": 20,
    "isSeen": true
  }, {
    "text": "consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat",
    "userId": 17,
    "isSeen": true
  }, {
    "text": "non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu",
    "userId": 17,
    "isSeen": false
  }, {
    "text": "et ultrices posuere cubilia curae duis faucibus accumsan odio",
    "userId": 18,
    "isSeen": true
  }, {
    "text": "ut at dolor quis odio consequat",
    "userId": 13,
    "isSeen": false
  }, {
    "text": "id nisl venenatis lacinia aenean sit amet justo morbi ut odio",
    "userId": 5,
    "isSeen": false
  }, {
    "text": "diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum",
    "userId": 18,
    "isSeen": false
  }, {
    "text": "vulputate nonummy maecenas tincidunt lacus at velit vivamus",
    "userId": 5,
    "isSeen": false
  }, {
    "text": "lacus at turpis donec posuere metus vitae ipsum aliquam non mauris",
    "userId": 7,
    "isSeen": false
  }, {
    "text": "accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis",
    "userId": 10,
    "isSeen": true
  }, {
    "text": "aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero",
    "userId": 2,
    "isSeen": false
  }, {
    "text": "consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum",
    "userId": 11,
    "isSeen": true
  }, {
    "text": "felis donec semper sapien a",
    "userId": 10,
    "isSeen": true
  }, {
    "text": "venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at",
    "userId": 20,
    "isSeen": true
  }, {
    "text": "nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae",
    "userId": 15,
    "isSeen": false
  }, {
    "text": "est lacinia nisi venenatis tristique fusce congue diam id",
    "userId": 2,
    "isSeen": true
  }, {
    "text": "risus auctor sed tristique in tempus",
    "userId": 12,
    "isSeen": false
  }, {
    "text": "at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer",
    "userId": 15,
    "isSeen": false
  }, {
    "text": "morbi ut odio cras mi pede malesuada in imperdiet et commodo",
    "userId": 5,
    "isSeen": true
  }, {
    "text": "ipsum primis in faucibus orci luctus et ultrices posuere cubilia",
    "userId": 5,
    "isSeen": false
  }, {
    "text": "sollicitudin vitae consectetuer eget rutrum at lorem integer",
    "userId": 3,
    "isSeen": false
  }, {
    "text": "sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit",
    "userId": 10,
    "isSeen": true
  }, {
    "text": "odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices",
    "userId": 6,
    "isSeen": true
  }, {
    "text": "habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id",
    "userId": 14,
    "isSeen": true
  }, {
    "text": "eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare",
    "userId": 6,
    "isSeen": true
  }, {
    "text": "eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget",
    "userId": 18,
    "isSeen": false
  }, {
    "text": "ligula vehicula consequat morbi a ipsum",
    "userId": 13,
    "isSeen": false
  }, {
    "text": "in blandit ultrices enim lorem ipsum dolor sit",
    "userId": 12,
    "isSeen": false
  }, {
    "text": "auctor gravida sem praesent id",
    "userId": 14,
    "isSeen": true
  }, {
    "text": "morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis",
    "userId": 12,
    "isSeen": false
  }, {
    "text": "neque vestibulum eget vulputate ut ultrices vel augue vestibulum",
    "userId": 3,
    "isSeen": false
  }, {
    "text": "ipsum integer a nibh in quis justo maecenas rhoncus",
    "userId": 17,
    "isSeen": true
  }, {
    "text": "odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras",
    "userId": 2,
    "isSeen": true
  }, {
    "text": "ipsum primis in faucibus orci luctus et",
    "userId": 15,
    "isSeen": false
  }, {
    "text": "risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in",
    "userId": 15,
    "isSeen": false
  }, {
    "text": "cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus",
    "userId": 5,
    "isSeen": false
  }, {
    "text": "amet nulla quisque arcu libero",
    "userId": 9,
    "isSeen": false
  }, {
    "text": "orci mauris lacinia sapien quis libero nullam sit amet",
    "userId": 5,
    "isSeen": false
  }, {
    "text": "in hac habitasse platea dictumst maecenas ut massa quis",
    "userId": 7,
    "isSeen": true
  }, {
    "text": "at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus",
    "userId": 16,
    "isSeen": false
  }]
  ;

    items.forEach(item => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    });
    await queryInterface.bulkInsert('Notifications', items, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Notifications', null, {});
  }
};
