var Revision = require("../models/revision.js");

module.exports.showHomepage = function(req,res){
	res.render("overall.ejs");
  console.log("Show the homepage");
}

module.exports.showResult = function(req,res){
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

// module.exports.showResult = function(req,res){
// 	console.log("we are in show result");
// 	result = Revision.findMostNumOfRev();
// 	console.log("we have the result");
// 	console.log(result);
// 	res.json(result);
// }