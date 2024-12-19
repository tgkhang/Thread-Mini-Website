'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/indexController');
const authController = require('../controllers/authController');
const {upload} = require('../controllers/image');

//apply middleware 
router.use(authController.isLoggedIn);


router.get('/home', controller.showHomepage);
router.get('/search', controller.showSearchpage);

router.get('/profile',  controller.showProfilepage);


router.get('/editProfile', controller.showEditProfile);
router.get('/createThread', controller.showCreateThread);
router.post('/createThread', upload.single('image'),controller.createThread);

router.post('/comment/:userName/:threadId',controller.createComment);

router.post('/updateProfile', 
    //middleware. for checking  username
  upload.single('image'),
  controller.updateProfile
);


router.delete("/unfollow",controller.unfollowUser);
router.post('/follow',controller.followUser);

router.get('/:page/:thread?', controller.showPage);

router.get('/', (req, res) => {
    res.redirect('/home');
});
module.exports = router;
