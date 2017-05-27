var Revision = require("../models/revision.js");
var request = require('request');

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

module.exports.showNumOfRevResult = function(req,res){
    title = req.query.title;
    console.log("we are in showNumOfRevResult");
    Revision.findNumOfRev(title, function(err,result){
        if (err){
            console.log("findNumOfRev wrong");
        }else{
            console.log(result);
            console.log("we have the result of findNumOfRev");
            res.json(result);
        }
    });
};

module.exports.showUpdateResultPage = function(req,res){
    console.log("we are in showUpdateResult");
    title = req.body.title;
    console.log("title in showNumOfRevResult is: " + title);
    res.render("UpdateResult.ejs", {
        user_query_title: title
    });
};

module.exports.showDataForOverallBarChartRegUser = function(req,res){
    console.log("we are in showDataForOverallBarChartRegUser");
    Revision.dataForOverallBarChartRegUser(title, function(err,result){
        if (err){
            console.log("dataForOverallBarChartRegUser wrong");
        }else{
            console.log(result);
            console.log("we have the result of dataForOverallBarChartRegUser");
            res.json(result);
        }
    });
};

module.exports.showDataForOverallBarChartAnonUser = function(req,res){
    console.log("we are in showDataForOverallBarChartAnonUser");
    Revision.dataForOverallBarChartAnonUser(title, function(err,result){
        if (err){
            console.log("dataForOverallBarChartAnonUser wrong");
        }else{
            console.log(result);
            console.log("we have the result of DataForOverallBarChartAnonUser");
            res.json(result);
        }
    });
};

module.exports.showDataForOverallBarChartAdminUser = function(req,res){
    console.log("we are in showDataForOverallBarChartAdminUser");
    Revision.dataForOverallBarChartAnonUser(title, function(err,result){
        if (err){
            console.log("dataForOverallBarChartAdminUser wrong");
        }else{
            console.log(result);
            console.log("we have the result of DataForOverallBarChartAdminUser");
            res.json(result);
        }
    });
};

module.exports.showDataForOverallBarChartBotUser = function(req,res){
    console.log("we are in showDataForOverallBarChartBotUser");
    Revision.dataForOverallBarChartBotUser(title, function(err,result){
        if (err){
            console.log("dataForOverallBarChartBotUser wrong");
        }else {
            console.log(result);
            console.log("we have the result of DataForOverallBarChartBotUser");
            res.json(result);}});}

module.exports.showUpdateResult = function(req,res){
    title = req.query.title;
    Revision.findLatestRevTimestamp(title, function(err,result_array){
        if (err){
            console.log("findLatestRevTimestamp wrong");
        }else{
            console.log(result_array);
            console.log("we have the result of findLatestRevTimestamp");

            //var latestTimestamp = result_array[0].timestamp;
            //console.log(latestTimestamp);
            // TODO: Make the timestamp in the query can be changed

            // Have the request to MediaWikiApi
            var wikiEndpoint = "https://en.wikipedia.org/w/api.php";
            parameters = [
                "action=query",
                "format=json",
                "prop=revisions",
                "titles=australia",
                "rvstart=2016-11-01T11:56:22Z",
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

                    // TODO: Update the database

                    back_client_message = "<p>This is the back client message: There are " + revisions.length + " revisions.</p>";
                    res.send(back_client_message);
                }
            });
        }
    });
};

module.exports.showIndividualResult = function(req,res) {
    res.render("IndividualResult.ejs");
    console.log("Show the IndividualResult page");
};
