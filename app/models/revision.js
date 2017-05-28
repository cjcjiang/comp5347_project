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

// Overall task 2: The article with the least number of revisions
RevisionSchema.statics.findLeastNumOfRev = function(callback){
    return this.aggregate(
        [
            {$group:{_id:"$title", numOfRev: {$sum:1}}},
            {$sort:{numOfRev:1}},
            {$limit:1}
        ])
        .exec(callback);
};

// Overall task 3: The article edited by largest group of registered users
RevisionSchema.statics.findArticleLargestRegUser = function(admin, bot, callback){
    return this.aggregate([
        {"$match": { "$and":[{"anon":{"$exists":false}}, {"user":{"$nin":admin}}, {"user":{"$nin":bot}}]}},
        {"$group": {"_id": {"title": "$title", "user": "$user"}}},
        {"$group": {"_id": "$_id.title", "numOfUser": {$sum: 1}}},
        {"$sort": {"numOfUser": -1}},
        {"$limit":1}
    ])
        .exec(callback);
};

// Overall task 4: The article edited by smallest group of registered users
RevisionSchema.statics.findArticleSmallestRegUser = function(admin, bot, callback){
    return this.aggregate([
        {"$match": { "$and":[{"anon":{"$exists":false}}, {"user":{"$nin":admin}}, {"user":{"$nin":bot}}]}},
        {"$group": {"_id": {"title": "$title", "user": "$user"}}},
        {"$group": {"_id": "$_id.title", "numOfUser": {$sum: 1}}},
        {"$sort": {"numOfUser": 1}},
        {"$limit":1}
    ])
        .exec(callback);
};

// Overall task 5: The article with the longest history
RevisionSchema.statics.findArticleLongestHistory = function(callback){
    return this.aggregate([
        {$group:{_id:"$title", time:{$max:"$timestamp"}}},
        {$sort:{time:-1}},
        {$limit:1}
    ])
        .exec(callback);
};

// Overall task 6: The article with the shortest history
RevisionSchema.statics.findArticleShortestHistory = function(callback){
    return this.aggregate([
        {$group:{_id:"$title", time:{$max:"$timestamp"}}},
        {$sort:{time:1}},
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
RevisionSchema.statics.dataForOverallBarChartRegUser = function(bot, admin, callback){
    return this.aggregate([
        {$match: {$and:[{"anon":{"$exists":false}}, {"user":{"$nin":bot}}, {"user":{"$nin":admin}}]}},
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
RevisionSchema.statics.dataForOverallBarChartAdminUser = function(admin, callback){
    return this.aggregate([
        {$match: {"user":{"$in":admin}}},
        {$group:{_id:{year:{ $substr: ["$timestamp", 0, 4] }}, numOfRev: {$sum:1}}},
        {$sort:{"_id.year":1}}
    ])
        .exec(callback);
};

// Overall chart 1 (bar chart) Bot
RevisionSchema.statics.dataForOverallBarChartBotUser = function(bot, callback){
    return this.aggregate([
        {$match: {"user":{"$in":bot}}},
        {$group:{_id:{year:{ $substr: ["$timestamp", 0, 4] }}, numOfRev: {$sum:1}}},
        {$sort:{"_id.year":1}}
    ])
        .exec(callback);
};

// Overall chart 2 (pie chart) Registered User
RevisionSchema.statics.dataForOverallPieChartRegUser = function(bot, admin, callback){
    return this.aggregate([
        {$match: {$and:[{"anon":{"$exists":false}}, {"user":{"$nin":admin}}, {"user":{"$nin":bot}}]}},
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
RevisionSchema.statics.dataForOverallPieChartAdminUser = function(admin, callback){
    return this.aggregate([
        {$match: {"user":{"$in":admin}}},
        {$count: "AdminUsers"}
    ])
        .exec(callback);
};

// Overall chart 2 (pie chart) Bot
RevisionSchema.statics.dataForOverallPieChartBotUser = function(bot, callback){
    return this.aggregate([
        {$match: {"user":{"$in":bot}}},
        {$count: "AnonUsers"}
    ])
        .exec(callback);
};

var Revision = mongoose.model('Revision', RevisionSchema, 'revisions');

module.exports = Revision;
