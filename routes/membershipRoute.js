const express = require('express');
const membershipRoute = express.Router();
const membershipController = require('../controllers/membershipController');

membershipRoute.get('/', membershipController.getIndex);
membershipRoute.post('/', membershipController.postIndex);

module.exports = membershipRoute;