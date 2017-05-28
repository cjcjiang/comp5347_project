var Revision = require("../models/revision.js");
var request = require('request');
var express = require('express');

module.exports.showHomepage = function(req,res){
	res.render("homepage.ejs");
  console.log("Show the homepage");
};

module.exports.showOverall = function(req,res){
    res.render("overall.ejs");
    console.log("Show the overall page");
};

module.exports.showIndividual = function(req,res){
    res.render("individual.ejs");
    console.log("Show the individual page");
};

// Overall task 1: The article with the most number of revisions
module.exports.showMostNumOfRev = function(req,res){
	console.log("we are in showMostNumOfRev");
	Revision.findMostNumOfRev(function(err,result){
			if (err){
				console.log("findMostNumOfRev wrong");
			}else{
				console.log(result);
				console.log("we have the result of findMostNumOfRev");
				data = result[0];
				res.json(data);
			}
		});
};

// Overall task 2: The article with the least number of revisions
module.exports.showLeastNumOfRev = function(req,res){
    console.log("we are in showLeastNumOfRev");
    Revision.findLeastNumOfRev(function(err,result){
        if (err){
            console.log("findLeastNumOfRev wrong");
        }else{
            console.log(result);
            console.log("we have the result of findLeastNumOfRev");
            data = result[0];
            res.json(data);
        }
    });
};

// Overall task 3: The article edited by largest group of registered users
module.exports.showArticleLargestRegUser = function(req,res){
    console.log("we are in showArticleLargestRegUser");
    Revision.findArticleLargestRegUser(function(err,result){
        if (err){
            console.log("findArticleLargestRegUser wrong");
        }else{
            console.log(result);
            console.log("we have the result of findArticleLargestRegUser");
            data = result[0];
            res.json(data);
        }
    });
};

// Overall task 4: The article edited by smallest group of registered users
module.exports.showArticleSmallestRegUser = function(req,res){
    console.log("we are in showArticleLargestRegUser");
    Revision.findArticleSmallestRegUser(function(err,result){
        if (err){
            console.log("findArticleSmallestRegUser wrong");
        }else{
            console.log(result);
            console.log("we have the result of findArticleSmallestRegUser");
            data = result[0];
            res.json(data);
        }
    });
};

// Overall task 5: The article with the longest history
module.exports.showArticleLongestHistory = function(req,res){
    console.log("we are in showArticleLongestHistory");
    Revision.findArticleLongestHistory(function(err,result){
        if (err){
            console.log("findArticleLongestHistory wrong");
        }else{
            console.log(result);
            console.log("we have the result of findArticleLongestHistory");
            data = result[0];
            res.json(data);
        }
    });
};

// Overall task 6: The article with the shortest history
module.exports.showArticleShortestHistory = function(req,res){
    console.log("we are in showArticleShortestHistory");
    Revision.findArticleShortestHistory(function(err,result){
        if (err){
            console.log("findArticleShortestHistory wrong");
        }else{
            console.log(result);
            console.log("we have the result of findArticleShortestHistory");
            data = result[0];
            res.json(data);
        }
    });
};

// Individual task 2: The total number of revisions for selected article
module.exports.showNumOfRevForSpecificTitle = function(req,res){
    title = req.query.title;
    console.log("we are in showNumOfRevForSpecificTitle");
    Revision.findNumOfRev(title, function(err,result){
        if (err){
            console.log("findNumOfRev wrong");
        }else{
            console.log(result);
            console.log("we have the result of findNumOfRev");
            var data = result[0];
            res.json(data);
        }
    });
};

module.exports.showUpdateResultPage = function(req,res){
    console.log("we are in showUpdateResultPage");
    var title = req.body.title;
    var timestamp = req.body.timestamp;
    console.log("title in showUpdateResultPage is: " + title);
    console.log("timestamp in showUpdateResultPage is: " + timestamp);
    res.render("UpdateResult.ejs", {
        user_query_title: title,
        user_query_timestamp: timestamp
    });
};

// Overall chart 1 (bar chart) Registered User
module.exports.showDataForOverallBarChartRegUser = function(req,res){
    console.log("we are in showDataForOverallBarChartRegUser");
    Revision.dataForOverallBarChartRegUser(function(err,result){
        if (err){
            console.log("dataForOverallBarChartRegUser wrong");
        }else{
            console.log(result);
            console.log("we have the result of dataForOverallBarChartRegUser");
            res.json(result);
        }
    });
};

// Overall chart 1 (bar chart) Anonymous
module.exports.showDataForOverallBarChartAnonUser = function(req,res){
    console.log("we are in showDataForOverallBarChartAnonUser");
    Revision.dataForOverallBarChartAnonUser(function(err,result){
        if (err){
            console.log("dataForOverallBarChartAnonUser wrong");
        }else{
            console.log(result);
            console.log("we have the result of DataForOverallBarChartAnonUser");
            res.json(result);
        }
    });
};

// Overall chart 1 (bar chart) Administrator
module.exports.showDataForOverallBarChartAdminUser = function(req,res){
    console.log("we are in showDataForOverallBarChartAdminUser");
    Revision.dataForOverallBarChartAnonUser(function(err,result){
        if (err){
            console.log("dataForOverallBarChartAdminUser wrong");
        }else{
            console.log(result);
            console.log("we have the result of DataForOverallBarChartAdminUser");
            res.json(result);
        }
    });
};

// Overall chart 1 (bar chart) Bot
module.exports.showDataForOverallBarChartBotUser = function(req,res){
    console.log("we are in showDataForOverallBarChartBotUser");
    Revision.dataForOverallBarChartBotUser(function(err,result){
        if (err){
            console.log("dataForOverallBarChartBotUser wrong");
        }else {
            console.log(result);
            console.log("we have the result of DataForOverallBarChartBotUser");
            res.json(result);
        }
    });
};

// Overall chart 2 (pie chart) Registered User
module.exports.showDataForOverallPieChartRegUser = function(req,res){
    console.log("we are in showDataForOverallPieChartRegUser");
    Revision.dataForOverallPieChartRegUser(function(err,result){
        if (err){
            console.log("dataForOverallPieChartRegUser wrong");
        }else {
            console.log(result);
            console.log("we have the result of DataForOverallPieChartRegUser");
            res.json(result);
        }
    });
};

// Overall chart 2 (pie chart) Anonymous
module.exports.showDataForOverallPieChartAnonUser = function(req,res){
    console.log("we are in showDataForOverallPieChartAnonUser");
    Revision.dataForOverallPieChartAnonUser(function(err,result){
        if (err){
            console.log("dataForOverallPieChartAnonUser wrong");
        }else {
            console.log(result);
            console.log("we have the result of DataForOverallPieChartAnonUser");
            res.json(result);
        }
    });
};

// Overall chart 2 (pie chart) Administrator
module.exports.showDataForOverallPieChartAdminUser = function(req,res){
    console.log("we are in showDataForOverallPieChartAdminUser");
    Revision.dataForOverallPieChartAdminUser(function(err,result){
        if (err){
            console.log("dataForOverallPieChartAdminUser wrong");
        }else {
            console.log(result);
            console.log("we have the result of DataForOverallPieChartAdminUser");
            res.json(result);
        }
    });
};

// Overall chart 2 (pie chart) Bot
module.exports.showDataForOverallPieChartBotUser = function(req,res){
    console.log("we are in showDataForOverallPieChartBotUser");
    Revision.dataForOverallPieChartBotUser(function(err,result){
        if (err){
            console.log("dataForOverallPieChartBotUser wrong");
        }else {
            console.log(result);
            console.log("we have the result of DataForOverallPieChartBotUser");
            res.json(result);
        }
    });
};

//  for Jiang's request: find latest revision timestamp for selected article
module.exports.showUpdateResult = function(req,res){
    var title = req.query.user_query_title;
    var user_query_timestamp = req.query.user_query_timestamp;
    console.log("in showUpdateResult: " + title);
    Revision.findLatestRevTimestamp(title, function(err,result_array){
        if (err){
            console.log("findLatestRevTimestamp wrong");
        }else{
            console.log(result_array);
            console.log("we have the result of findLatestRevTimestamp");

            var latestRevisionTimestamp = result_array[0].timestamp;
            console.log("in findLatestRevTimestamp the latestRevisionTimestamp is: " + latestRevisionTimestamp);
            var latest_revision_date = Date.parse(latestRevisionTimestamp);
            var user_query_date = Date.parse(user_query_timestamp);
            // 2015-11-01T11:56:22Z, this line is only for bug test
            user_query_date = Date.parse("2015-11-01T11:56:22Z");

            // When the difference is one day, the difference number should be more than 86400000
            if((user_query_date-latest_revision_date)>86400000){
                console.log("In showUpdateResult, user_query_date is bigger than latest_revision_date for one day, the database should be updated");
                // Have the request to MediaWikiApi
                var wikiEndpoint = "https://en.wikipedia.org/w/api.php";
                // "rvstart=2016-11-01T11:56:22Z",
                parameters = [
                    "action=query",
                    "format=json",
                    "prop=revisions",
                    "titles=australia",
                    "rvstart=" + latestRevisionTimestamp,
                    "rvdir=newer",
                    "rvlimit=max",
                    "rvprop=timestamp|userid|user|ids"];
                var url = wikiEndpoint + "?" + parameters.join("&");
                console.log("url: " + url);
                var options = {
                    url: url,
                    Accept: 'application/json',
                    'Accept-Charset': 'utf-8'
                };

                var back_client_message = "no mes because of callback";

                request(options, function (err, resRE, data){
                    if (err) {
                        console.log('Error:', err);
                    } else if (resRE.statusCode !== 200) {
                        console.log('Status:', resRE.statusCode);
                    } else {
                        json = JSON.parse(data);
                        pages = json.query.pages;
                        revisions = pages[Object.keys(pages)[0]].revisions;
                        console.log("There are " + revisions.length + " revisions.");
                        console.log("The first one got is:  " + revisions[0]);

                        // TODO: Update the database

                        back_client_message = "<p>This is the back client message: There are " + revisions.length + " revisions.</p>";
                        res.send(back_client_message);
                    }
                });
            }else{
                console.log("In showUpdateResult, user_query_date is smaller than latest_revision_date for one day, the database do not need to be updated");
                back_client_message = "<p>This is the back client message: There is no need to update the database.</p>";
                res.send(back_client_message);
            }


        }
    });
};

// Show IndividualResult.ejs
module.exports.showIndividualResult = function(req,res) {
    var title = req.body.user_query_title;
    res.render("IndividualResult.ejs", {user_query_title: title});
    console.log("The title for the IndividualResult page: " + title);
    console.log("Show the IndividualResult page");
};
