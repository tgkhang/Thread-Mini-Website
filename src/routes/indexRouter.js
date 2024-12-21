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
router.get('/searchResult', controller.showSearchResult);
router.get('/profile',  controller.showProfilepage);
router.post('/followUser',controller.toggleFollow);

router.get('/editProfile', controller.showEditProfile);
router.get('/createThread', controller.showCreateThread);
router.post('/createThread', upload.single('image'),controller.createThread);// noti??

router.post('/comment/:userName/:threadId',controller.createComment);

router.post('/updateProfile', 
    //middleware. for checking  username
  upload.single('image'),
  controller.updateProfile
);


router.delete("/unfollow",controller.unfollowUser);
//router.post('/follow',controller.followUser);

router.post('/likeThread',controller.likeThread);
router.get('/notifications',controller.showNotifications);
router.post('/notifications',controller.seenhandle);
router.get('/:page/:thread?', controller.show);

router.get('/', (req, res) => {
    res.redirect('/home');
});
module.exports = router;
