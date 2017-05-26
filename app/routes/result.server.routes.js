var express = require('express');
var controller = require('../controllers/result.server.controller.js');

var router = express.Router();

router.get('/', controller.showHomepage);
router.get('/result', controller.showMostNumOfRev);
router.get('/overall', controller.showOverall);
router.get('/individual', controller.showIndividual);
router.get('/showMjNumOfRevResult', controller.showNumOfRevResult);
router.post('/showUpdateResultPage', controller.showUpdateResultPage);
router.post("/showIndividualResult", controller.showIndividualResult);
router.get('/showUpdateResult', controller.showUpdateResult);

module.exports = router;
