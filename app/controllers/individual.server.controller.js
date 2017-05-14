var Revision = require("../models/revision.js");

module.exports.showResult=function(req,res){
	res.render("individual.ejs");
  console.log("Show individual result");
}
