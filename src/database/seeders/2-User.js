'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const items = 
    [{
      "firstName": "Hendrick",
      "lastName": "Fayer",
      "userName": "hfayer0",
      "password": "dN5&Ez|%t(`!",
      "bio": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
      "email": "hfayer0@spotify.com",
      "imagePath": "http://dummyimage.com/161x100.png/cc0000/ffffff"
    }, {
      "firstName": "Brennen",
      "lastName": "Munt",
      "userName": "bmunt1",
      "password": "sY2<@jTV",
      "bio": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
      "email": "bmunt1@vistaprint.com",
      "imagePath": "http://dummyimage.com/107x100.png/cc0000/ffffff"
    }, {
      "firstName": "Darline",
      "lastName": "Proudlock",
      "userName": "dproudlock2",
      "password": "gC6$#`Py(\\Z7",
      "bio": "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
      "email": "dproudlock2@altervista.org",
      "imagePath": "http://dummyimage.com/196x100.png/dddddd/000000"
    }, {
      "firstName": "Glynn",
      "lastName": "Band",
      "userName": "gband3",
      "password": "kJ0~HipGKlL,C5xA",
      "bio": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
      "email": "gband3@answers.com",
      "imagePath": "http://dummyimage.com/225x100.png/dddddd/000000"
    }, {
      "firstName": "Doroteya",
      "lastName": "Iacobucci",
      "userName": "diacobucci4",
      "password": "vL8?Gn0'{b.%d#",
      "bio": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
      "email": "diacobucci4@mozilla.org",
      "imagePath": "http://dummyimage.com/219x100.png/dddddd/000000"
    }, {
      "firstName": "Ichabod",
      "lastName": "Crispin",
      "userName": "icrispin5",
      "password": "gO3+c|%o#e\\7",
      "bio": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
      "email": "icrispin5@wix.com",
      "imagePath": "http://dummyimage.com/241x100.png/cc0000/ffffff"
    }, {
      "firstName": "Gustavo",
      "lastName": "Cornelissen",
      "userName": "gcornelissen6",
      "password": "dA9,s=O2|l`cEK)*",
      "bio": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
      "email": "gcornelissen6@gravatar.com",
      "imagePath": "http://dummyimage.com/112x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Kristofer",
      "lastName": "Shiels",
      "userName": "kshiels7",
      "password": "wQ9|d5qIuT+Os\\",
      "bio": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
      "email": "kshiels7@w3.org",
      "imagePath": "http://dummyimage.com/165x100.png/dddddd/000000"
    }, {
      "firstName": "Morgen",
      "lastName": "Pullman",
      "userName": "mpullman8",
      "password": "kC7`9=j?q\\rOix3",
      "bio": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
      "email": "mpullman8@typepad.com",
      "imagePath": "http://dummyimage.com/220x100.png/ff4444/ffffff"
    }, {
      "firstName": "Constanta",
      "lastName": "Barme",
      "userName": "cbarme9",
      "password": "kF1\\K?D5sQ",
      "bio": "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
      "email": "cbarme9@imdb.com",
      "imagePath": "http://dummyimage.com/116x100.png/cc0000/ffffff"
    }, {
      "firstName": "Fielding",
      "lastName": "de Quincey",
      "userName": "fdequinceya",
      "password": "cZ4~+\\Ryc8d*qz4",
      "bio": "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
      "email": "fdequinceya@uiuc.edu",
      "imagePath": "http://dummyimage.com/174x100.png/cc0000/ffffff"
    }, {
      "firstName": "Hannis",
      "lastName": "Cayford",
      "userName": "hcayfordb",
      "password": "uS0*dH@7",
      "bio": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
      "email": "hcayfordb@canalblog.com",
      "imagePath": "http://dummyimage.com/198x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Salmon",
      "lastName": "Brecknall",
      "userName": "sbrecknallc",
      "password": "oT4{+x'TL)6q$1Q",
      "bio": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
      "email": "sbrecknallc@soundcloud.com",
      "imagePath": "http://dummyimage.com/151x100.png/dddddd/000000"
    }, {
      "firstName": "Rivkah",
      "lastName": "Ashford",
      "userName": "rashfordd",
      "password": "zU3_=2=9*URb>",
      "bio": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
      "email": "rashfordd@kickstarter.com",
      "imagePath": "http://dummyimage.com/220x100.png/dddddd/000000"
    }, {
      "firstName": "Auberta",
      "lastName": "Powter",
      "userName": "apowtere",
      "password": "zP0@.9Srho|aX",
      "bio": "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
      "email": "apowtere@edublogs.org",
      "imagePath": "http://dummyimage.com/185x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Lorelei",
      "lastName": "Bolesworth",
      "userName": "lbolesworthf",
      "password": "lT7`n/@=!N",
      "bio": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
      "email": "lbolesworthf@163.com",
      "imagePath": "http://dummyimage.com/202x100.png/ff4444/ffffff"
    }, {
      "firstName": "Lindi",
      "lastName": "Upjohn",
      "userName": "lupjohng",
      "password": "sN8~p)bfF1)",
      "bio": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
      "email": "lupjohng@google.es",
      "imagePath": "http://dummyimage.com/179x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Arney",
      "lastName": "McIlhatton",
      "userName": "amcilhattonh",
      "password": "yP0,MWwX",
      "bio": "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
      "email": "amcilhattonh@examiner.com",
      "imagePath": "http://dummyimage.com/212x100.png/dddddd/000000"
    }, {
      "firstName": "Roseanna",
      "lastName": "Benthall",
      "userName": "rbenthalli",
      "password": "oL3*8rF#QS",
      "bio": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
      "email": "rbenthalli@home.pl",
      "imagePath": "http://dummyimage.com/206x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Floria",
      "lastName": "Simko",
      "userName": "fsimkoj",
      "password": "wB6!A0B>$2G\\",
      "bio": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
      "email": "fsimkoj@wsj.com",
      "imagePath": "http://dummyimage.com/162x100.png/dddddd/000000"
    }, {
      "firstName": "Stacee",
      "lastName": "Chesters",
      "userName": "schestersk",
      "password": "lM6&KV=ZO38",
      "bio": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
      "email": "schestersk@nhs.uk",
      "imagePath": "http://dummyimage.com/159x100.png/cc0000/ffffff"
    }, {
      "firstName": "Bryce",
      "lastName": "Sterricks",
      "userName": "bsterricksl",
      "password": "qH7}&.X}\"T",
      "bio": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
      "email": "bsterricksl@tripod.com",
      "imagePath": "http://dummyimage.com/133x100.png/cc0000/ffffff"
    }, {
      "firstName": "Adler",
      "lastName": "Oller",
      "userName": "aollerm",
      "password": "sC1{Jo<kst'Pv",
      "bio": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
      "email": "aollerm@bigcartel.com",
      "imagePath": "http://dummyimage.com/246x100.png/ff4444/ffffff"
    }, {
      "firstName": "Sayre",
      "lastName": "Casemore",
      "userName": "scasemoren",
      "password": "yK7$eB%.3G",
      "bio": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
      "email": "scasemoren@google.ru",
      "imagePath": "http://dummyimage.com/229x100.png/cc0000/ffffff"
    }, {
      "firstName": "Vanny",
      "lastName": "Witcher",
      "userName": "vwitchero",
      "password": "bD4>21Aj0hy1>",
      "bio": "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
      "email": "vwitchero@privacy.gov.au",
      "imagePath": "http://dummyimage.com/105x100.png/dddddd/000000"
    }, {
      "firstName": "Jerrome",
      "lastName": "Bullerwell",
      "userName": "jbullerwellp",
      "password": "rL0|<,@TmOt\"U4",
      "bio": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
      "email": "jbullerwellp@bbc.co.uk",
      "imagePath": "http://dummyimage.com/156x100.png/cc0000/ffffff"
    }, {
      "firstName": "Cassandry",
      "lastName": "Sebyer",
      "userName": "csebyerq",
      "password": "nQ5\"HMVF,Rq",
      "bio": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
      "email": "csebyerq@netlog.com",
      "imagePath": "http://dummyimage.com/132x100.png/dddddd/000000"
    }, {
      "firstName": "Bunny",
      "lastName": "Smither",
      "userName": "bsmitherr",
      "password": "uU7@Rv5Khl",
      "bio": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
      "email": "bsmitherr@usnews.com",
      "imagePath": "http://dummyimage.com/109x100.png/ff4444/ffffff"
    }, {
      "firstName": "Arlin",
      "lastName": "Grise",
      "userName": "agrises",
      "password": "tF4{IRU>",
      "bio": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
      "email": "agrises@addtoany.com",
      "imagePath": "http://dummyimage.com/101x100.png/ff4444/ffffff"
    }, {
      "firstName": "Anselma",
      "lastName": "Lewton",
      "userName": "alewtont",
      "password": "pZ3(8pa*P!",
      "bio": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
      "email": "alewtont@fc2.com",
      "imagePath": "http://dummyimage.com/162x100.png/ff4444/ffffff"
    }, {
      "firstName": "Claresta",
      "lastName": "Whitnell",
      "userName": "cwhitnellu",
      "password": "jN4!`vP/k5",
      "bio": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
      "email": "cwhitnellu@paginegialle.it",
      "imagePath": "http://dummyimage.com/231x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Filberto",
      "lastName": "Sears",
      "userName": "fsearsv",
      "password": "yT1<P3)s\"",
      "bio": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
      "email": "fsearsv@simplemachines.org",
      "imagePath": "http://dummyimage.com/175x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Dorrie",
      "lastName": "O' Mulderrig",
      "userName": "domulderrigw",
      "password": "rZ2'aCtP5?)(H.Q(",
      "bio": "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
      "email": "domulderrigw@opensource.org",
      "imagePath": "http://dummyimage.com/100x100.png/ff4444/ffffff"
    }, {
      "firstName": "Ilaire",
      "lastName": "Enrique",
      "userName": "ienriquex",
      "password": "wL3'%YoIR}Y{+kL",
      "bio": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
      "email": "ienriquex@cnn.com",
      "imagePath": "http://dummyimage.com/202x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Noak",
      "lastName": "Kochlin",
      "userName": "nkochliny",
      "password": "nS7,5c.rtjWk!",
      "bio": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
      "email": "nkochliny@usa.gov",
      "imagePath": "http://dummyimage.com/125x100.png/dddddd/000000"
    }, {
      "firstName": "Amory",
      "lastName": "Nieass",
      "userName": "anieassz",
      "password": "oV7>kQ3R{BU'd",
      "bio": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
      "email": "anieassz@webmd.com",
      "imagePath": "http://dummyimage.com/110x100.png/ff4444/ffffff"
    }, {
      "firstName": "Carrie",
      "lastName": "Deans",
      "userName": "cdeans10",
      "password": "rH8#ua>G,t?Hkt=",
      "bio": "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
      "email": "cdeans10@parallels.com",
      "imagePath": "http://dummyimage.com/232x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Guthrey",
      "lastName": "Krystof",
      "userName": "gkrystof11",
      "password": "xM3|6i=j\"F",
      "bio": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
      "email": "gkrystof11@loc.gov",
      "imagePath": "http://dummyimage.com/213x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Lisette",
      "lastName": "Plewright",
      "userName": "lplewright12",
      "password": "sD2@)B_e\\t}Pp",
      "bio": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
      "email": "lplewright12@so-net.ne.jp",
      "imagePath": "http://dummyimage.com/203x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Maximo",
      "lastName": "Mizen",
      "userName": "mmizen13",
      "password": "vN2({i<`<`%jw",
      "bio": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
      "email": "mmizen13@vistaprint.com",
      "imagePath": "http://dummyimage.com/179x100.png/ff4444/ffffff"
    }, {
      "firstName": "Sib",
      "lastName": "Empleton",
      "userName": "sempleton14",
      "password": "mG7={gsVxu1gwV",
      "bio": "Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
      "email": "sempleton14@lycos.com",
      "imagePath": "http://dummyimage.com/149x100.png/dddddd/000000"
    }, {
      "firstName": "Othello",
      "lastName": "Neiland",
      "userName": "oneiland15",
      "password": "gB1*.T\"S",
      "bio": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
      "email": "oneiland15@google.ru",
      "imagePath": "http://dummyimage.com/152x100.png/ff4444/ffffff"
    }, {
      "firstName": "Carver",
      "lastName": "Filip",
      "userName": "cfilip16",
      "password": "xM0~V11vPav",
      "bio": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
      "email": "cfilip16@t.co",
      "imagePath": "http://dummyimage.com/196x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Arty",
      "lastName": "Gyer",
      "userName": "agyer17",
      "password": "gM4>1mvN0",
      "bio": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
      "email": "agyer17@epa.gov",
      "imagePath": "http://dummyimage.com/179x100.png/cc0000/ffffff"
    }, {
      "firstName": "Dina",
      "lastName": "Lie",
      "userName": "dlie18",
      "password": "wP2*SgQ\\",
      "bio": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
      "email": "dlie18@aol.com",
      "imagePath": "http://dummyimage.com/165x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Akim",
      "lastName": "Calcott",
      "userName": "acalcott19",
      "password": "iT5>Fbh\\f\\4sig",
      "bio": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
      "email": "acalcott19@dot.gov",
      "imagePath": "http://dummyimage.com/211x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Chilton",
      "lastName": "Winfred",
      "userName": "cwinfred1a",
      "password": "pH1\\r\\vu{wDsK}",
      "bio": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
      "email": "cwinfred1a@yolasite.com",
      "imagePath": "http://dummyimage.com/219x100.png/dddddd/000000"
    }, {
      "firstName": "Nathalia",
      "lastName": "Sunnex",
      "userName": "nsunnex1b",
      "password": "aA2\\dDu7R5W!",
      "bio": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
      "email": "nsunnex1b@usda.gov",
      "imagePath": "http://dummyimage.com/120x100.png/ff4444/ffffff"
    }, {
      "firstName": "Mikaela",
      "lastName": "Gilogly",
      "userName": "mgilogly1c",
      "password": "cA5@Ro~_m2huP.",
      "bio": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
      "email": "mgilogly1c@illinois.edu",
      "imagePath": "http://dummyimage.com/225x100.png/ff4444/ffffff"
    }, {
      "firstName": "Nydia",
      "lastName": "Ferbrache",
      "userName": "nferbrache1d",
      "password": "yH0_|>dW)0",
      "bio": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
      "email": "nferbrache1d@studiopress.com",
      "imagePath": "http://dummyimage.com/196x100.png/dddddd/000000"
    }, {
      "firstName": "Garrick",
      "lastName": "McLleese",
      "userName": "gmclleese1e",
      "password": "nF5.jrx_",
      "bio": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
      "email": "gmclleese1e@guardian.co.uk",
      "imagePath": "http://dummyimage.com/103x100.png/ff4444/ffffff"
    }, {
      "firstName": "Audry",
      "lastName": "Munehay",
      "userName": "amunehay1f",
      "password": "oF1=AP6}kZ=))eD",
      "bio": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
      "email": "amunehay1f@home.pl",
      "imagePath": "http://dummyimage.com/235x100.png/dddddd/000000"
    }, {
      "firstName": "Gisele",
      "lastName": "Olney",
      "userName": "golney1g",
      "password": "hM4#0%&0JKh?\"",
      "bio": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
      "email": "golney1g@amazonaws.com",
      "imagePath": "http://dummyimage.com/116x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Kaleb",
      "lastName": "Wickins",
      "userName": "kwickins1h",
      "password": "fC4}7&(OY",
      "bio": "Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
      "email": "kwickins1h@chron.com",
      "imagePath": "http://dummyimage.com/232x100.png/cc0000/ffffff"
    }, {
      "firstName": "Shandra",
      "lastName": "Pepin",
      "userName": "spepin1i",
      "password": "hH5>L&2pP?",
      "bio": "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
      "email": "spepin1i@patch.com",
      "imagePath": "http://dummyimage.com/193x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Janeva",
      "lastName": "Jefford",
      "userName": "jjefford1j",
      "password": "uT1?M,L(N",
      "bio": "Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
      "email": "jjefford1j@people.com.cn",
      "imagePath": "http://dummyimage.com/175x100.png/cc0000/ffffff"
    }, {
      "firstName": "Dorelia",
      "lastName": "Naisbet",
      "userName": "dnaisbet1k",
      "password": "lM7$ThqBU~`&*)",
      "bio": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      "email": "dnaisbet1k@usda.gov",
      "imagePath": "http://dummyimage.com/130x100.png/dddddd/000000"
    }, {
      "firstName": "Ortensia",
      "lastName": "Boyde",
      "userName": "oboyde1l",
      "password": "rC8*z=Oxx?",
      "bio": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
      "email": "oboyde1l@newyorker.com",
      "imagePath": "http://dummyimage.com/156x100.png/dddddd/000000"
    }, {
      "firstName": "Elton",
      "lastName": "Puckey",
      "userName": "epuckey1m",
      "password": "wJ6=}.N>rPqg",
      "bio": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
      "email": "epuckey1m@bloomberg.com",
      "imagePath": "http://dummyimage.com/218x100.png/ff4444/ffffff"
    }, {
      "firstName": "Roseann",
      "lastName": "Wickett",
      "userName": "rwickett1n",
      "password": "yF9'AxBshL(",
      "bio": "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
      "email": "rwickett1n@privacy.gov.au",
      "imagePath": "http://dummyimage.com/245x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Clementius",
      "lastName": "Birchner",
      "userName": "cbirchner1o",
      "password": "sH2*8.{Fa8",
      "bio": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
      "email": "cbirchner1o@nydailynews.com",
      "imagePath": "http://dummyimage.com/182x100.png/dddddd/000000"
    }, {
      "firstName": "Laird",
      "lastName": "Simone",
      "userName": "lsimone1p",
      "password": "dB4>\\=ziE#)RFTG",
      "bio": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
      "email": "lsimone1p@mapquest.com",
      "imagePath": "http://dummyimage.com/125x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Gilemette",
      "lastName": "Janssens",
      "userName": "gjanssens1q",
      "password": "yA9(Qi8Do<a",
      "bio": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
      "email": "gjanssens1q@desdev.cn",
      "imagePath": "http://dummyimage.com/207x100.png/cc0000/ffffff"
    }, {
      "firstName": "Channa",
      "lastName": "Hufton",
      "userName": "chufton1r",
      "password": "tK2_v|iSmXhp@#g",
      "bio": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
      "email": "chufton1r@adobe.com",
      "imagePath": "http://dummyimage.com/141x100.png/dddddd/000000"
    }, {
      "firstName": "Levey",
      "lastName": "Jessel",
      "userName": "ljessel1s",
      "password": "uA6,F'5|97KAZn.",
      "bio": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
      "email": "ljessel1s@wikipedia.org",
      "imagePath": "http://dummyimage.com/185x100.png/dddddd/000000"
    }, {
      "firstName": "Griswold",
      "lastName": "Drinkhall",
      "userName": "gdrinkhall1t",
      "password": "pF9.}|7y",
      "bio": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
      "email": "gdrinkhall1t@cbc.ca",
      "imagePath": "http://dummyimage.com/182x100.png/ff4444/ffffff"
    }, {
      "firstName": "Cathlene",
      "lastName": "Baroch",
      "userName": "cbaroch1u",
      "password": "hS0!=WRPng`rn",
      "bio": "Fusce consequat. Nulla nisl. Nunc nisl.",
      "email": "cbaroch1u@opera.com",
      "imagePath": "http://dummyimage.com/129x100.png/cc0000/ffffff"
    }, {
      "firstName": "Orlando",
      "lastName": "Stutter",
      "userName": "ostutter1v",
      "password": "fN0!/,swzC',zk&l",
      "bio": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
      "email": "ostutter1v@zdnet.com",
      "imagePath": "http://dummyimage.com/155x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Franklyn",
      "lastName": "Harmar",
      "userName": "fharmar1w",
      "password": "kW6!@3gAaWz",
      "bio": "Fusce consequat. Nulla nisl. Nunc nisl.",
      "email": "fharmar1w@sohu.com",
      "imagePath": "http://dummyimage.com/139x100.png/dddddd/000000"
    }, {
      "firstName": "Berri",
      "lastName": "Dawnay",
      "userName": "bdawnay1x",
      "password": "zK5.\\_<%XLsvgRsf",
      "bio": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
      "email": "bdawnay1x@thetimes.co.uk",
      "imagePath": "http://dummyimage.com/153x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Vale",
      "lastName": "Welbeck",
      "userName": "vwelbeck1y",
      "password": "nQ5$A6VGeqL!?",
      "bio": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
      "email": "vwelbeck1y@1und1.de",
      "imagePath": "http://dummyimage.com/101x100.png/cc0000/ffffff"
    }, {
      "firstName": "Lizzie",
      "lastName": "Grierson",
      "userName": "lgrierson1z",
      "password": "xT0#VNw}_|IN",
      "bio": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
      "email": "lgrierson1z@naver.com",
      "imagePath": "http://dummyimage.com/178x100.png/ff4444/ffffff"
    }, {
      "firstName": "Cindie",
      "lastName": "Pexton",
      "userName": "cpexton20",
      "password": "hK5\\a\\5lH\"?~IKp",
      "bio": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
      "email": "cpexton20@github.io",
      "imagePath": "http://dummyimage.com/169x100.png/cc0000/ffffff"
    }, {
      "firstName": "Anny",
      "lastName": "Stockbridge",
      "userName": "astockbridge21",
      "password": "fJ4)+sC6Dzrt,A",
      "bio": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
      "email": "astockbridge21@merriam-webster.com",
      "imagePath": "http://dummyimage.com/234x100.png/dddddd/000000"
    }, {
      "firstName": "Harvey",
      "lastName": "Buncom",
      "userName": "hbuncom22",
      "password": "fT5=S6F0W8|jq",
      "bio": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
      "email": "hbuncom22@meetup.com",
      "imagePath": "http://dummyimage.com/177x100.png/ff4444/ffffff"
    }, {
      "firstName": "Pat",
      "lastName": "Baggarley",
      "userName": "pbaggarley23",
      "password": "vO4@7\\9hqU.~tX",
      "bio": "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
      "email": "pbaggarley23@facebook.com",
      "imagePath": "http://dummyimage.com/132x100.png/dddddd/000000"
    }, {
      "firstName": "Raye",
      "lastName": "Marple",
      "userName": "rmarple24",
      "password": "iN3+2f3FwMff$q",
      "bio": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
      "email": "rmarple24@dmoz.org",
      "imagePath": "http://dummyimage.com/145x100.png/ff4444/ffffff"
    }, {
      "firstName": "Lutero",
      "lastName": "Hackinge",
      "userName": "lhackinge25",
      "password": "xI1|i,udPep",
      "bio": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
      "email": "lhackinge25@reddit.com",
      "imagePath": "http://dummyimage.com/237x100.png/ff4444/ffffff"
    }, {
      "firstName": "Rowena",
      "lastName": "Vinsen",
      "userName": "rvinsen26",
      "password": "gP6.X,gf",
      "bio": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
      "email": "rvinsen26@cisco.com",
      "imagePath": "http://dummyimage.com/117x100.png/ff4444/ffffff"
    }, {
      "firstName": "Etty",
      "lastName": "Cescot",
      "userName": "ecescot27",
      "password": "wG1+7|Y4FQX",
      "bio": "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
      "email": "ecescot27@netscape.com",
      "imagePath": "http://dummyimage.com/135x100.png/ff4444/ffffff"
    }, {
      "firstName": "Hilda",
      "lastName": "Denzey",
      "userName": "hdenzey28",
      "password": "wQ1+'k@OMS)e",
      "bio": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
      "email": "hdenzey28@odnoklassniki.ru",
      "imagePath": "http://dummyimage.com/193x100.png/dddddd/000000"
    }, {
      "firstName": "Michail",
      "lastName": "Favey",
      "userName": "mfavey29",
      "password": "wB9/iSYrQ,KRm38F",
      "bio": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
      "email": "mfavey29@epa.gov",
      "imagePath": "http://dummyimage.com/107x100.png/dddddd/000000"
    }, {
      "firstName": "Sharai",
      "lastName": "Wigley",
      "userName": "swigley2a",
      "password": "hV2=gfj4rzbyw",
      "bio": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
      "email": "swigley2a@wired.com",
      "imagePath": "http://dummyimage.com/222x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Raine",
      "lastName": "Cuss",
      "userName": "rcuss2b",
      "password": "bG0+%q~l~",
      "bio": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
      "email": "rcuss2b@fotki.com",
      "imagePath": "http://dummyimage.com/212x100.png/ff4444/ffffff"
    }, {
      "firstName": "Caye",
      "lastName": "Paddle",
      "userName": "cpaddle2c",
      "password": "xN4@rcPvgUJPMRD5",
      "bio": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
      "email": "cpaddle2c@freewebs.com",
      "imagePath": "http://dummyimage.com/165x100.png/dddddd/000000"
    }, {
      "firstName": "Bren",
      "lastName": "Dalman",
      "userName": "bdalman2d",
      "password": "oC2!lS33p\"Nv7",
      "bio": "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
      "email": "bdalman2d@pen.io",
      "imagePath": "http://dummyimage.com/136x100.png/dddddd/000000"
    }, {
      "firstName": "Domenic",
      "lastName": "Andersen",
      "userName": "dandersen2e",
      "password": "xM5$h4r\".{g&yJ",
      "bio": "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
      "email": "dandersen2e@ucoz.com",
      "imagePath": "http://dummyimage.com/172x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Laurene",
      "lastName": "Couldwell",
      "userName": "lcouldwell2f",
      "password": "hB0@b)S(",
      "bio": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
      "email": "lcouldwell2f@lulu.com",
      "imagePath": "http://dummyimage.com/125x100.png/ff4444/ffffff"
    }, {
      "firstName": "Carlie",
      "lastName": "Brislan",
      "userName": "cbrislan2g",
      "password": "lG7(+\">}79y(8OI",
      "bio": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
      "email": "cbrislan2g@feedburner.com",
      "imagePath": "http://dummyimage.com/120x100.png/ff4444/ffffff"
    }, {
      "firstName": "Rockey",
      "lastName": "Drake",
      "userName": "rdrake2h",
      "password": "kH5>9hz(ZO",
      "bio": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
      "email": "rdrake2h@shop-pro.jp",
      "imagePath": "http://dummyimage.com/160x100.png/dddddd/000000"
    }, {
      "firstName": "Marion",
      "lastName": "Stading",
      "userName": "mstading2i",
      "password": "vW8,}sB`y>qH\"J",
      "bio": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
      "email": "mstading2i@alibaba.com",
      "imagePath": "http://dummyimage.com/238x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Lizette",
      "lastName": "Denziloe",
      "userName": "ldenziloe2j",
      "password": "cE2)XkBK$>B3",
      "bio": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
      "email": "ldenziloe2j@washington.edu",
      "imagePath": "http://dummyimage.com/103x100.png/cc0000/ffffff"
    }, {
      "firstName": "Boniface",
      "lastName": "Coopman",
      "userName": "bcoopman2k",
      "password": "hI5>mGwSAr",
      "bio": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
      "email": "bcoopman2k@weather.com",
      "imagePath": "http://dummyimage.com/173x100.png/dddddd/000000"
    }, {
      "firstName": "Chase",
      "lastName": "Wicklen",
      "userName": "cwicklen2l",
      "password": "pH1?LN.\\|*U",
      "bio": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
      "email": "cwicklen2l@prlog.org",
      "imagePath": "http://dummyimage.com/146x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Ed",
      "lastName": "Overthrow",
      "userName": "eoverthrow2m",
      "password": "cR6><|E8h",
      "bio": "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
      "email": "eoverthrow2m@digg.com",
      "imagePath": "http://dummyimage.com/238x100.png/dddddd/000000"
    }, {
      "firstName": "Ranique",
      "lastName": "Saltmarshe",
      "userName": "rsaltmarshe2n",
      "password": "rE9*px)p",
      "bio": "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
      "email": "rsaltmarshe2n@simplemachines.org",
      "imagePath": "http://dummyimage.com/147x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Zak",
      "lastName": "Goody",
      "userName": "zgoody2o",
      "password": "cZ2=}b>`}ajl",
      "bio": "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
      "email": "zgoody2o@delicious.com",
      "imagePath": "http://dummyimage.com/180x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Dud",
      "lastName": "Hallibone",
      "userName": "dhallibone2p",
      "password": "wZ3{,~7@\\o+Ip>",
      "bio": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
      "email": "dhallibone2p@cbslocal.com",
      "imagePath": "http://dummyimage.com/207x100.png/ff4444/ffffff"
    }, {
      "firstName": "Gerty",
      "lastName": "Serginson",
      "userName": "gserginson2q",
      "password": "wO1>\\Ckz",
      "bio": "Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
      "email": "gserginson2q@networkadvertising.org",
      "imagePath": "http://dummyimage.com/142x100.png/5fa2dd/ffffff"
    }, {
      "firstName": "Myrwyn",
      "lastName": "Borrett",
      "userName": "mborrett2r",
      "password": "oX1'ac\"mfxDT@U8p",
      "bio": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      "email": "mborrett2r@technorati.com",
      "imagePath": "http://dummyimage.com/201x100.png/cc0000/ffffff"
    }]
    ;


    items.forEach(item => {
      item.password = bcrypt.hashSync(item.password, 10); // Hashing password
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    });
    await queryInterface.bulkInsert('Users', items, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
