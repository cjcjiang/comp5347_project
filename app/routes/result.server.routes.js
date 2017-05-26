var express = require('express');
var controller = require('../controllers/result.server.controller.js');

var router = express.Router();

router.get('/', controller.showHomepage);
router.get('/result', controller.showMostNumOfRev);
router.get('/overall', controller.showOverall);
router.get('/individual', controller.showIndividual);
router.get('/showMjNumOfRevResult', controller.showNumOfRevResult);
router.post('/showUpdateResult', controller.showUpdateResult);
router.post("/showIndividualResult", controller.showIndividualResult);

module.exports = router;
