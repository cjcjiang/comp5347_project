/**
 *
 */
var mongoose = require('./database.js');

var RevisionSchema = new mongoose.Schema(
		{title: String,
		 timestamp:String,
		 user:String,
		 anon:String});

// RevisionSchema.statics.findTitleLatestRev = function(title, callback){
//
// 	return this.find({'title':title})
// 	.sort({'timestamp':-1})
// 	.limit(1)
// 	.exec(callback)
// }

RevisionSchema.statics.findMostNumOfRev = function(callback){
	return this.aggregate(
    [
        {$group:{_id:"$title", numOfRev: {$sum:1}}},
        {$sort:{numOfRev:-1}},
        {$limit:1}
    ])
		.exec(callback);
};

// RevisionSchema.statics.findMostNumOfRev = function(){
// 	this.aggregate(
//     [
//         {$group:{_id:"$title", numOfRev: {$sum:1}}},
//         {$sort:{numOfRev:-1}},
//         {$limit:1}
//     ],
//     function(err,results) {
//         if (err) throw err;
//         return results;
//     }
// )};

var Revision = mongoose.model('Revision', RevisionSchema, 'revisions');

module.exports = Revision