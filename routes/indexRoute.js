const express = require('express');
const indexRoute = express.Router();
const indexController = require('../controllers/indexController');

indexRoute.get('/', indexController.getIndex);
indexRoute.get('/log-out', indexController.getLogOut);
indexRoute.post('/log-in', indexController.postLogIn);
indexRoute.get('/create-new-message', indexController.getCreateNewMessage);
indexRoute.post('/create-new-message', indexController.postCreateNewMessage);

module.exports = indexRoute;