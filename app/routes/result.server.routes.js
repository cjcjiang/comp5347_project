var express = require('express');
var controller = require('../controllers/result.server.controller.js');

var router = express.Router();

router.get('/', controller.showHomepage);
router.get('/result', controller.showResult);

module.exports = router;
