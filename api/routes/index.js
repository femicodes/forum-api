const express = require('express');
const routes = express.Router();

const basicController = require('../controllers/basicController');

routes.get('/', basicController.home);

module.exports = routes;