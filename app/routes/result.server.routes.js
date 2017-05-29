var express = require('express');
var controller = require('../controllers/result.server.controller.js');

var router = express.Router();

router.get('/', controller.showHomepage);
// Overall task 1: The article with the most number of revisions
router.get('/showMostNumOfRev', controller.showMostNumOfRev);
router.get('/overall', controller.showOverall);
router.get('/individual', controller.showIndividual);
// Overall task 2: The article with the least number of revisions
router.get('/showLeastNumOfRev', controller.showLeastNumOfRev);
// Overall task 3: The article edited by largest group of registered users
router.get('/showArticleLargestRegUser', controller.showArticleLargestRegUser);
// Overall task 4: The article edited by smallest group of registered users
router.get('/showArticleSmallestRegUser', controller.showArticleSmallestRegUser);
// Overall task 5: The article with the longest history
router.get('/showArticleLongestHistory', controller.showArticleLongestHistory);
// Overall task 6: The article with the shortest history
router.get('/showArticleShortestHistory', controller.showArticleShortestHistory);
// Individual task 1: Title
// router.get('/showIndivTitle', controller.showIndivTitle);
// Individual task 2: The total number of revisions for selected article
router.get('/showNumOfRevForSpecificTitle', controller.showNumOfRevForSpecificTitle);
// Individual task 3: Top 5 regular users ranked by total revision numbers
router.get('/showIndivTopFive', controller.showIndivTopFive);
// Overall chart 1 (bar chart) Registered User
router.get('/showDataForOverallBarChartRegUser', controller.showDataForOverallBarChartRegUser);
// Overall chart 1 (bar chart) Anonymous
router.get('/showDataForOverallBarChartAnonUser', controller.showDataForOverallBarChartAnonUser);
// Overall chart 1 (bar chart) Administrator
router.get('/showDataForOverallBarChartAdminUser', controller.showDataForOverallBarChartAdminUser);
// Overall chart 1 (bar chart) Bot
router.get('/showDataForOverallBarChartBotUser', controller.showDataForOverallBarChartBotUser);
// Overall chart 2 (pie chart) Registered User
router.get('/showDataForOverallPieChartRegUser', controller.showDataForOverallPieChartRegUser);
// Overall chart 2 (pie chart) Anonymous
router.get('/showDataForOverallPieChartAnonUser', controller.showDataForOverallPieChartAnonUser);
// Overall chart 2 (pie chart) Administrator
router.get('/showDataForOverallPieChartAdminUser', controller.showDataForOverallPieChartAdminUser);
// Overall chart 2 (pie chart) Bot
router.get('/showDataForOverallPieChartBotUser', controller.showDataForOverallPieChartBotUser);
// Individual chart 1 (bar chart) Registered User
router.get('/showDataForIndivBarChartRegUser', controller.showDataForIndivBarChartRegUser);
// Individual chart 1 (bar chart) Admin User
router.get('/showDataForIndivBarChartAdminUser', controller.showDataForIndivBarChartAdminUser);
// Individual chart 1 (bar chart) Anonymous User
router.get('/showDataForIndivBarChartAnonUser', controller.showDataForIndivBarChartAnonUser);
// Individual chart 1 (bar chart) Bot User
router.get('/showDataForIndivBarChartBotUser', controller.showDataForIndivBarChartBotUser);

router.post('/showUpdateResultPage', controller.showUpdateResultPage);
router.get('/showUpdateResult', controller.showUpdateResult);
router.post("/showIndividualResult", controller.showIndividualResult);

router.get('/showOverallBarChartPage', controller.showOverallBarChartPage);
router.get('/showOverallPieChartPage', controller.showOverallPieChartPage);

router.post("/showIndiTablePage", controller.showIndiTablePage);

// Show individual bar chart page
router.post("/showIndividualBarChartPage", controller.showIndividualBarChartPage);

// Show the drop down list page
router.get('/showDropDownListPage', controller.showDropDownListPage);


module.exports = router;
