/**
 *
 */
var mongoose = require('./database.js');

var RevisionSchema = new mongoose.Schema(
		{title: String,
		 timestamp:String,
		 user:String,
		 anon:String});

// Overall task 1: The article with the most number of revisions
RevisionSchema.statics.findMostNumOfRev = function(callback){
	return this.aggregate(
    [
        {$group:{_id:"$title", numOfRev: {$sum:1}}},
        {$sort:{numOfRev:-1}},
        {$limit:1}
    ])
		.exec(callback);
};

// Individual task 2: The total number of revisions for selected article
RevisionSchema.statics.findNumOfRev = function(title, callback){
    return this.aggregate(
        [
            {$match:{title:title}},
            {$group:{_id:"$title", numOfRev: {$sum:1}}}

        ])
        .exec(callback);
};

//  for Jiang's request: find latest revision timestamp for selected article
RevisionSchema.statics.findLatestRevTimestamp = function(title, callback){
    return this.aggregate(
        [
            {$match:{title:title}},
            {$group:{_id:"$title", timestamp: {$max:"$timestamp"}}}
        ])
        .exec(callback);
};

// Overall chart 1 (bar chart) Registered User
RevisionSchema.statics.dataForOverallBarChartRegUser = function(callback){
    return this.aggregate([
        {$match: {$and:[{"anon":{"$exists":false}}, {"user":{"$nin":["5 albert square"]}}, {"user":{"$nin":["User"]}}]}},
        {$group:{_id:{year:{ $substr: ["$timestamp", 0, 4] }}, numOfRev: {$sum:1}}},
        {$sort:{"_id.year":1}}
    ])
        .exec(callback);
};

// Overall chart 1 (bar chart) Anonymous
RevisionSchema.statics.dataForOverallBarChartAnonUser = function(callback){
    return this.aggregate([
        {$match: {"anon":{"$exists":true}}},
        {$group:{_id:{year:{ $substr: ["$timestamp", 0, 4] }}, numOfRev: {$sum:1}}},
        {$sort:{"_id.year":1}}
    ])
        .exec(callback);
};

// Overall chart 1 (bar chart) Administrator
RevisionSchema.statics.dataForOverallBarChartAdminUser = function(callback){
    return this.aggregate([
        {$match: {"user":{"$in":["5 albert square"]}}},
        {$group:{_id:{year:{ $substr: ["$timestamp", 0, 4] }}, numOfRev: {$sum:1}}},
        {$sort:{"_id.year":1}}
    ])
        .exec(callback);
};

// Overall chart 1 (bar chart) Bot
RevisionSchema.statics.dataForOverallBarChartBotUser = function(callback){
    return this.aggregate([
        {$match: {"user":{"$in":["User"]}}},
        {$group:{_id:{year:{ $substr: ["$timestamp", 0, 4] }}, numOfRev: {$sum:1}}},
        {$sort:{"_id.year":1}}
    ])
        .exec(callback);
};

// Overall chart 2 (pie chart) Registered User
RevisionSchema.statics.dataForOverallPieChartRegUser = function(callback){
    return this.aggregate([
        {$match: {$and:[{"anon":{"$exists":false}}, {"user":{"$nin":["5 albert square"]}}, {"user":{"$nin":["User"]}}]}},
        {$count: "RegUsers"}
    ])
        .exec(callback);
};

// Overall chart 2 (pie chart) Anonymous
RevisionSchema.statics.dataForOverallPieChartAnonUser = function(callback){
    return this.aggregate([
        {$match: {"anon":{"$exists":true}}},
        {$count: "AnonUsers"}
    ])
        .exec(callback);
};

// Overall chart 2 (pie chart) Administrator
RevisionSchema.statics.dataForOverallPieChartAdminUser = function(callback){
    return this.aggregate([
        {$match: {"user":{"$in":["5 albert square"]}}},
        {$count: "AdminUsers"}
    ])
        .exec(callback);
};

// Overall chart 2 (pie chart) Bot
RevisionSchema.statics.dataForOverallPieChartBotUser = function(callback){
    return this.aggregate([
        {$match: {"user":{"$in":["User"]}}},
        {$count: "AnonUsers"}
    ])
        .exec(callback);
};


var Revision = mongoose.model('Revision', RevisionSchema, 'revisions');

module.exports = Revision;
