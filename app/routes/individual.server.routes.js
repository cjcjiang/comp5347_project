var express = require('express');
var controller = require('../controllers/individual.server.controller.js');

var router = express.Router();

router.get('/', controller.showResult);

module.exports = router;
