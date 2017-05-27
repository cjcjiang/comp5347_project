var express = require('express');
var controller = require('../controllers/result.server.controller.js');

var router = express.Router();

router.get('/', controller.showHomepage);
// Overall task 1: The article with the most number of revisions
router.get('/result', controller.showMostNumOfRev);
router.get('/overall', controller.showOverall);
router.get('/individual', controller.showIndividual);
// Individual task 2
router.get('/showMjNumOfRevResult', controller.showNumOfRevResult);
// Overall chart 1 (bar chart) Registered User
router.get('/showDataForOverallBarChartRegUser', controller.showDataForOverallBarChartRegUser);
// Overall chart 1 (bar chart) Anonymous
router.get('/showDataForOverallBarChartAnonUser', controller.showDataForOverallBarChartAnonUser);
// Overall chart 1 (bar chart) Administrator
router.get('/showDataForOverallBarChartAdminUser', controller.showDataForOverallBarChartAdminUser);
// Overall chart 1 (bar chart) Bot
router.get('/showDataForOverallBarChartBotUser', controller.showDataForOverallBarChartBotUser);
// Overall chart 2 (pie chart) Registered User
router.get('/showDataForOverallPieChartRegUser', controller.showDataForOverallPieChartRegUser());
// Overall chart 2 (pie chart) Anonymous
router.get('/showDataForOverallPieChartAnonUser', controller.showDataForOverallPieChartAnonUser);
// Overall chart 2 (pie chart) Administrator
router.get('/showDataForOverallPieChartAdminUser', controller.showDataForOverallPieChartAdminUser);
// Overall chart 2 (pie chart) Bot
router.get('/showDataForOverallPieChartBotUser', controller.showDataForOverallPieChartBotUser);

router.post('/showUpdateResultPage', controller.showUpdateResultPage);
router.get('/showUpdateResult', controller.showUpdateResult);
router.post("/showIndividualResult", controller.showIndividualResult);


module.exports = router;
