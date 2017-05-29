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
    var admin = req.app.locals.admin;
    var bot = req.app.locals.bot;
    Revision.findArticleLargestRegUser(admin, bot, function(err,result){
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
    var admin = req.app.locals.admin;
    var bot = req.app.locals.bot;
    Revision.findArticleSmallestRegUser(admin, bot, function(err,result){
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

// Individual task 1: title
module.exports.showIndivTitle = function(req,res){
    var title = req.query.title;
    console.log("we are in showIndivTitle");
    Revision.findIndivTitle(title, function(err,result){
        if (err){
            console.log("findIndivTitle wrong");
        }else{
            console.log(result);
            console.log("we have the result of findIndivTitle");
            var data = result[0];
            res.json(data);
        }
    });
};

// Individual task 2: The total number of revisions for selected article
module.exports.showNumOfRevForSpecificTitle = function(req,res){
    var title = req.query.title;
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

// Individual task 3: Top 5 regular users ranked by total revision numbers
module.exports.showIndivTopFive = function(req,res){
    var title = req.query.title;
    console.log("we are in showIndivTopFive");
    Revision.findIndivTopFive(title, function(err,result){
        if (err){
            console.log("findIndivTopFive wrong");
        }else{
            console.log(result);
            console.log("we have the result of findIndivTopFive");
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
    var admin = req.app.locals.admin;
    var bot = req.app.locals.bot;
    Revision.dataForOverallBarChartRegUser(admin, bot, function(err,result){
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
    var admin = req.app.locals.admin;
    console.log("the eleventh admin is: " + admin[10]);
    Revision.dataForOverallBarChartAdminUser(admin, function(err,result){
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
    var bot = req.app.locals.bot;
    Revision.dataForOverallBarChartBotUser(bot, function(err,result){
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
    var admin = req.app.locals.admin;
    var bot = req.app.locals.bot;
    Revision.dataForOverallPieChartRegUser(admin, bot, function(err,result){
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
    admin = req.app.locals.admin;
    Revision.dataForOverallPieChartAdminUser(admin, function(err,result){
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
    var bot  = req.app.locals.bot;
    Revision.dataForOverallPieChartBotUser(bot, function(err,result){
        if (err){
            console.log("dataForOverallPieChartBotUser wrong");
        }else {
            console.log(result);
            console.log("we have the result of DataForOverallPieChartBotUser");
            res.json(result);
        }
    });
};

// Individual chart 1 (bar chart) Registered User
module.exports.showDataForIndivBarChartRegUser = function(req,res){
    console.log("we are in showDataForIndivBarChartRegUser");
    var bot  = req.app.locals.bot;
    var admin  = req.app.locals.admin;
    var title = req.query.title;
    Revision.dataForIndivBarChartRegUser(title, bot, admin, function(err,result){
        if (err){
            console.log("DataForIndivBarChartRegUser wrong");
        }else {
            console.log(result);
            console.log("we have the result of DataForIndivBarChartRegUser");
            res.json(result);
        }
    });
};

// Individual chart 1 (bar chart) Admin User
module.exports.showDataForIndivBarChartAdminUser = function(req,res){
    console.log("we are in showDataForIndivBarChartAdminUser");
    var admin  = req.app.locals.admin;
    var title = req.query.title;
    Revision.dataForIndivBarChartAdminUser(title, admin, function(err,result){
        if (err){
            console.log("DataForIndivBarChartAdminUser wrong");
        }else {
            console.log(result);
            console.log("we have the result of DataForIndivBarChartAdminUser");
            res.json(result);
        }
    });
};

// Individual chart 1 (bar chart) Anonymous User
module.exports.showDataForIndivBarChartAnonUser = function(req,res){
    console.log("we are in showDataForIndivBarChartAnonUser");
    var title = req.query.title;
    Revision.dataForIndivBarChartAnonUser(title, function(err,result){
        if (err){
            console.log("DataForIndivBarChartAnonUser wrong");
        }else {
            console.log(result);
            console.log("we have the result of DataForIndivBarChartAnonUser");
            res.json(result);
        }
    });
};

// Individual chart 1 (bar chart) Bot User
module.exports.showDataForIndivBarChartBotUser = function(req,res){
    console.log("we are in showDataForIndivBarChartBotUser");
    var bot  = req.app.locals.bot;
    var title = req.query.title;
    Revision.dataForIndivBarChartBotUser(title, bot, function(err,result){
        if (err){
            console.log("DataForIndivBarChartBotUser wrong");
        }else {
            console.log(result);
            console.log("we have the result of DataForIndivBarChartBotUser");
            res.json(result);
        }
    });
};

// Individual chart 2 (Pie chart) Registered User
// RegUser
module.exports.showDataForIndivPieChartRegUser = function(req,res){
    console.log("we are in showDataForIndivPieChartRegUser");
    var bot  = req.app.locals.bot;
    var admin  = req.app.locals.admin;
    var title = req.query.title;
    Revision.dataForIndivPieChartRegUser(title, bot, admin, function(err,result){
        if (err){
            console.log("DataForIndivPieChartRegUser wrong");
        }else {
            console.log(result);
            console.log("we have the result of DataForIndivPieChartRegUser");
            var data = result[0];
            res.json(data);
        }
    });
};

// Individual chart 2 (Pie chart) Admin User
// AdminUser
module.exports.showDataForIndivPieChartAdminUser = function(req,res){
    console.log("we are in showDataForIndivPieChartAdminUser");
    var admin  = req.app.locals.admin;
    var title = req.query.title;
    Revision.dataForIndivPieChartAdminUser(title, admin, function(err,result){
        if (err){
            console.log("DataForIndivPieChartAdminUser wrong");
        }else {
            console.log(result);
            console.log("we have the result of DataForIndivPieChartAdminUser");
            var data = result[0];
            res.json(data);
        }
    });
};

// Individual chart 2 (Pie chart) Anonymous User
// AnonUser
module.exports.showDataForIndivPieChartAnonUser = function(req,res){
    console.log("we are in showDataForIndivPieChartAnonUser");
    var title = req.query.title;
    Revision.dataForIndivPieChartAnonUser(title, function(err,result){
        if (err){
            console.log("DataForIndivPieChartAnonUser wrong");
        }else {
            console.log(result);
            console.log("we have the result of DataForIndivPieChartAnonUser");
            var data = result[0];
            res.json(data);
        }
    });
};

// Individual chart 2 (Pie chart) Bot User
// BotUser
module.exports.showDataForIndivPieChartBotUser = function(req,res){
    console.log("we are in showDataForIndivPieChartBotUser");
    var bot  = req.app.locals.bot;
    var title = req.query.title;
    Revision.dataForIndivPieChartBotUser(title, bot, function(err,result){
        if (err){
            console.log("DataForIndivPieChartBotUser wrong");
        }else {
            console.log(result);
            console.log("we have the result of DataForIndivPieChartBotUser");
            var data = result[0];
            res.json(data);
        }
    });
};

// Individual chart 3 (Bar chart) Selected User
// _id, numOfRev
module.exports.showDataForIndivChartSelectedUser = function(req,res){
    console.log("we are in showDataForIndivPieChartSelectedUser");
    var users  = req.app.locals.users;
    var title = req.query.title;
    Revision.dataForIndivChartSelectedUser(title, users, function(err,result){
        if (err){
            console.log("DataForIndivChartSelectedUser wrong");
        }else {
            console.log(result);
            console.log("we have the result of DataForIndivChartSelectedUser");
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
            // user_query_date = Date.parse("2015-11-01T11:56:22Z");

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

                        // Check if the timestamp of the latest revision is bigger than the last one in db
                        var revisions_len = revisions.length;
                        var revision_last = revisions[revisions_len-1];
                        var revision_last_timestamp = revision_last.timestamp;
                        console.log("The last got revision's timestamp is: " + revision_last_timestamp);
                        // var latest_revision_date = Date.parse(latestRevisionTimestamp);
                        var revision_last_timestamp_date = Date.parse(revision_last_timestamp);
                        if((revision_last_timestamp_date-latest_revision_date)>0){
                            // Prepare the data that need to be transmitted to mongoose
                            console.log(title);
                            var db_update_data = [];
                            for(var i=0; i<revisions.length; i++){
                                var revisions_with_title = revisions[i];
                                revisions_with_title["title"] = title;
                                db_update_data.push(revisions_with_title);
                            }
                            console.log("db_update_data's title is: " + db_update_data[0].title);

                            Revision.collection.insert(db_update_data, function(err,docs){
                                if(err){
                                    console.log("insert error");
                                }else{
                                    back_client_message = "<p>This is the back client message: There are " + revisions.length + " revisions added into the database.</p>";
                                    res.send(back_client_message);
                                }
                            });
                        }else{
                            // If the revision_last_timestamp_date and latest_revision_date is the same
                            back_client_message = "<p>This is the back client message: revision_last_timestamp_date and latest_revision_date is the same, the database will not be updated</p>";
                            res.send(back_client_message);
                        }
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
