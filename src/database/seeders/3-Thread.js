'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const items = [{
      "text": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
      "imagePath": "http://dummyimage.com/161x100.png/ff4444/ffffff",
      "userId": 4
    }, {
      "text": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
      "imagePath": "http://dummyimage.com/223x100.png/cc0000/ffffff",
      "userId": 13
    }, {
      "text": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
      "imagePath": "http://dummyimage.com/237x100.png/5fa2dd/ffffff",
      "userId": 5
    }, {
      "text": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
      "imagePath": "http://dummyimage.com/126x100.png/dddddd/000000",
      "userId": 1
    }, {
      "text": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
      "imagePath": "http://dummyimage.com/103x100.png/cc0000/ffffff",
      "userId": 6
    }, {
      "text": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
      "imagePath": "http://dummyimage.com/169x100.png/cc0000/ffffff",
      "userId": 1
    }, {
      "text": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
      "imagePath": "http://dummyimage.com/195x100.png/5fa2dd/ffffff",
      "userId": 15
    }, {
      "text": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
      "imagePath": "http://dummyimage.com/175x100.png/cc0000/ffffff",
      "userId": 15
    }, {
      "text": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
      "imagePath": "http://dummyimage.com/132x100.png/5fa2dd/ffffff",
      "userId": 8
    }, {
      "text": "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
      "imagePath": "http://dummyimage.com/226x100.png/5fa2dd/ffffff",
      "userId": 2
    }, {
      "text": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
      "imagePath": "http://dummyimage.com/198x100.png/5fa2dd/ffffff",
      "userId": 11
    }, {
      "text": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
      "imagePath": "http://dummyimage.com/131x100.png/cc0000/ffffff",
      "userId": 17
    }, {
      "text": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
      "imagePath": "http://dummyimage.com/167x100.png/dddddd/000000",
      "userId": 15
    }, {
      "text": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
      "imagePath": "http://dummyimage.com/243x100.png/cc0000/ffffff",
      "userId": 15
    }, {
      "text": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
      "imagePath": "http://dummyimage.com/191x100.png/5fa2dd/ffffff",
      "userId": 11
    }, {
      "text": "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
      "imagePath": "http://dummyimage.com/240x100.png/5fa2dd/ffffff",
      "userId": 10
    }, {
      "text": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
      "imagePath": "http://dummyimage.com/167x100.png/dddddd/000000",
      "userId": 1
    }, {
      "text": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
      "imagePath": "http://dummyimage.com/171x100.png/cc0000/ffffff",
      "userId": 7
    }, {
      "text": "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
      "imagePath": "http://dummyimage.com/222x100.png/ff4444/ffffff",
      "userId": 1
    }, {
      "text": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
      "imagePath": "http://dummyimage.com/240x100.png/dddddd/000000",
      "userId": 2
    }];
    items.forEach(item => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    });
    await queryInterface.bulkInsert('Threads', items, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Threads', null, {});
  }
};
