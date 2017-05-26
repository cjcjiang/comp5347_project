var express = require('express');
var controller = require('../controllers/result.server.controller.js');

var router = express.Router();

router.get('/', controller.showHomepage);
router.get('/result', controller.showMostNumOfRev);
router.get('/overall', controller.showOverall);
router.get('/individual', controller.showIndividual);
// Individual task 2
router.get('/showMjNumOfRevResult', controller.showNumOfRevResult);

router.get('/showDataForOverallBarChartRegUser', controller.showDataForOverallBarChartRegUser);
router.get('/showDataForOverallBarChartAnonUser', controller.showDataForOverallBarChartAnonUser);
router.get('/showDataForOverallBarChartAdminUser', controller.showDataForOverallBarChartAdminUser);
router.get('/showDataForOverallBarChartBotUser', controller.showDataForOverallBarChartBotUser);
router.post('/showUpdateResultPage', controller.showUpdateResultPage);
router.get('/showUpdateResult', controller.showUpdateResult);
router.post("/showIndividualResult", controller.showIndividualResult);


module.exports = router;
