var Revision = require("../models/revision.js");

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

module.exports.showUpdateResult = function(req,res){
    console.log("we are in showUpdateResult");
    title = req.body.title;
    console.log("title in showNumOfRevResult is: " + title);
    res.render("UpdateResult.ejs", {
        user_query_title: title
    });
};

// Yu update
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
        }else{
            console.log(result);
            console.log("we have the result of DataForOverallBarChartBotUser");
            res.json(result);
        }
    });
};

// Yu end

module.exports.showIndividualResult = function(req,res){
    res.render("IndividualResult.ejs");
    console.log("Show the IndividualResult page");
};
