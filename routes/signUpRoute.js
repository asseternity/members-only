const express = require('express');
const signUpRoute = express.Router();
const signUpController = require('../controllers/signUpController');

signUpRoute.get('/', signUpController.getIndex);
signUpRoute.post('/', signUpController.postIndex);

module.exports = signUpRoute;