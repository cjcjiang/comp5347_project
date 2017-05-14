var Revision = require("../models/revision.js");

module.exports.showResult=function(req,res){
	res.render("overall.ejs");
  console.log("Show overall result");
}
