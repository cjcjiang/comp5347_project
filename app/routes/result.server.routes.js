var express = require('express');
var controller = require('../controllers/result.server.controller.js');

var router = express.Router();

router.get('/', controller.showHomepage);
router.get('/result', controller.showMostNumOfRev);
router.get('/overall', controller.showOverall);
router.get('/individual', controller.showIndividual);
router.get('/showMjNumOfRevResult', controller.showMjNumOfRevResult);

module.exports = router;
