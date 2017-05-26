var Revision = require("../models/revision.js");

module.exports.showHomepage = function(req,res){
	res.render("homepage.ejs");
  console.log("Show the homepage");
}

module.exports.showOverall = function(req,res){
    res.render("overall.ejs");
    console.log("Show the overall page");
}

module.exports.showIndividual = function(req,res){
    res.render("individual.ejs");
    console.log("Show the individual page");
}

module.exports.showYu = function(req,res){
	console.log("we are in show result");
	Revision.findMostNumOfRev(function(err,result){
			if (err){
				console.log("findMostNumOfRev wrong");
			}else{
				console.log(result);
				console.log("we have the result");
				data = result[0];
				res.json(data);
			}
		});
}

module.exports.showMjNumOfRevResult = function(req,res){
    console.log("we are in show result");
    Revision.mjNumOfRev(function(err,result){
        if (err){
            console.log("mjNumOfRev wrong");
        }else{
            console.log(result);
            console.log("we have the result");
            for(i=0;i<result.length;i++) {
                res.json(result[i]);
            }
        }
    });
}
