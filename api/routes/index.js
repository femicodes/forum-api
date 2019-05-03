const express = require('express');
const routes = express.Router();

const basicController = require('../controllers/basicController');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

// home route
routes.get('/', basicController.home);

// create an account
routes.post('/signup', userController.signup);

//create and get all posts respectively
routes.post('/post', postController.createPost);
routes.get('/allPosts', postController.getAllPosts);

//create a comment
routes.post('/postComment', commentController.postComment);

module.exports = routes;