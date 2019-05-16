const express = require('express');
const routes = express.Router();
const multer = require('multer');

const basicController = require('../controllers/basicController');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + "pic")
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// home route
routes.get('/', basicController.home);

// create an account and login
routes.post('/signup', userController.signup);
routes.post('/login', userController.login);

//create and get all posts respectively
routes.post('/post', upload.single('postImage'), postController.createPost);
routes.get('/allPosts', postController.getAllPosts);

//create a comment
routes.post('/postComment', commentController.postComment);

module.exports = routes;