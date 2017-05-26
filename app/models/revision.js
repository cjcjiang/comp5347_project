/**
 *
 */
var mongoose = require('./database.js');

var RevisionSchema = new mongoose.Schema(
		{title: String,
		 timestamp:String,
		 user:String,
		 anon:String});

RevisionSchema.statics.findMostNumOfRev = function(callback){
	return this.aggregate(
    [
        {$group:{_id:"$title", numOfRev: {$sum:1}}},
        {$sort:{numOfRev:-1}},
        {$limit:1}
    ])
		.exec(callback);
};

RevisionSchema.statics.findNumOfRev = function(title, callback){
    return this.aggregate(
        [
            {$match:{title:title}},
            {$group:{_id:"$title", numOfRev: {$sum:1}}}

        ])
        .exec(callback);
};

RevisionSchema.statics.findLatestRevTimestamp = function(title, callback){
    return this.aggregate(
        [
            {$match:{title:title}},
            {$group:{_id:"$title", timestamp: {$max:"$timestamp"}}}
        ])
        .exec(callback);
};

// Yu update
RevisionSchema.statics.dataForOverallBarChartRegUser = function(title, callback){
    return this.aggregate([
        {$match: {$and:[{"anon":{"$exists":false}}, {"user":{"$nin":["5 albert square"]}}, {"user":{"$nin":["User"]}}]}},
        {$group:{_id:{year:{ $substr: ["$timestamp", 0, 4] }}, numOfRev: {$sum:1}}},
        {$sort:{"_id.year":1}}
    ])
        .exec(callback);
};

RevisionSchema.statics.dataForOverallBarChartAnonUser = function(title, callback){
    return this.aggregate([
        {$match: {"anon":{"$exists":true}}},
        {$group:{_id:{year:{ $substr: ["$timestamp", 0, 4] }}, numOfRev: {$sum:1}}},
        {$sort:{"_id.year":1}}
    ])
        .exec(callback);
};

RevisionSchema.statics.dataForOverallBarChartAdminUser = function(title, callback){
    return this.aggregate([
        {$match: {"user":{"$in":["5 albert square"]}}},
        {$group:{_id:{year:{ $substr: ["$timestamp", 0, 4] }}, numOfRev: {$sum:1}}},
        {$sort:{"_id.year":1}}
    ])
        .exec(callback);
};

RevisionSchema.statics.dataForOverallBarChartBotUser = function(title, callback){
    return this.aggregate([
        {$match: {"user":{"$in":["User"]}}},
        {$group:{_id:{year:{ $substr: ["$timestamp", 0, 4] }}, numOfRev: {$sum:1}}},
        {$sort:{"_id.year":1}}
    ])
        .exec(callback);
};

// Yu end

var Revision = mongoose.model('Revision', RevisionSchema, 'revisions');

module.exports = Revision;
