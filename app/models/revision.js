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
        {$sort:{timestamp:1}},
        {$limit:1},
        {$project:{title:1}}
    ])
        .exec(callback);
};

// Overall task 6: The article with the shortest history
RevisionSchema.statics.findArticleShortestHistory = function(callback){
    return this.aggregate([
        {$sort:{timestamp:-1}},
        {$limit:1},
        {$project:{title:1}}
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
        {$count: "BotUsers"}
    ])
        .exec(callback);
};

// Individual task 1: Title
// RevisionSchema.statics.findIndivTitle = function(title, callback){
//     return this.aggregate([
//         {$match:{title:title}}
//     ])
//         .exec(callback);
// };

// Individual task 2: The total number of revisions for selected article
RevisionSchema.statics.findNumOfRev = function(title, callback){
    return this.aggregate(
        [
            {$match:{title:title}},
            {$group:{_id:"$title", numOfRev: {$sum:1}}}

        ])
        .exec(callback);
};

// Individual task 3: Top 5 regular users ranked by total revision numbers
RevisionSchema.statics.findIndivTopFive = function(title, callback){
    return this.aggregate([
        {$match: {$and:[{"anon":{"$exists":false}}, {"user":{"$nin":["5 albert square"]}}, {"user":{"$nin":["User"]}}]}},
        {$match: {title:title}},
        {$group: {_id: "$user", NumOfRev: {$sum:5}}},
        {$sort: {NumOfRev: -1}},
        {$limit:5}
    ])
        .exec(callback);
};

// Individual chart 1 (bar chart) RegUser
RevisionSchema.statics.dataForIndivBarChartRegUser = function(title, admin, bot, callback){
    return this.aggregate([
        {$match: {$and:[{"anon":{"$exists":false}}, {"user":{"$nin":admin}}, {"user":{"$nin":bot}}]}},
        {$match: {title:title}},
        {$group:{_id:{$substr: ["$timestamp", 0, 4]}, numOfRev: {$sum:1}}},
        {$sort:{"_id":1}}
    ])
        .exec(callback);
};

// Individual chart 1 (bar chart) Admin
RevisionSchema.statics.dataForIndivBarChartAdminUser = function(title, admin, callback){
    return this.aggregate([
        {$match: {"user":{"$in":admin}}},
        {$match: {title:title}},
        {$group:{_id:{$substr: ["$timestamp", 0, 4]}, numOfRev: {$sum:1}}},
        {$sort:{"_id":1}}
    ])
        .exec(callback);
};

// Individual chart 1 (bar chart) Anonymous User
RevisionSchema.statics.dataForIndivBarChartAnonUser = function(title, callback){
    return this.aggregate([
        {$match: {"anon":{"$exists":true}}},
        {$match: {title:title}},
        {$group:{_id:{$substr: ["$timestamp", 0, 4]}, numOfRev: {$sum:1}}},
        {$sort:{"_id":1}}
    ])
        .exec(callback);
};

// Individual chart 1 (bar chart) Bot User
RevisionSchema.statics.dataForIndivBarChartBotUser = function(title, bot, callback){
    return this.aggregate([
        {$match: {"user":{"$in":bot}}},
        {$match: {title:title}},
        {$group:{_id:{$substr: ["$timestamp", 0, 4]}, numOfRev: {$sum:1}}},
        {$sort:{"_id":1}}
    ])
        .exec(callback);
};

// Individual chart 1 (pie chart) RegUser
// RegUsers
RevisionSchema.statics.dataForIndivPieChartRegUser = function(title, admin, bot, callback){
    return this.aggregate([
        {$match: {$and:[{"anon":{"$exists":false}}, {"user":{"$nin":admin}}, {"user":{"$nin":bot}}]}},
        {$match: {title:title}},
        {$count: "RegUsers"}
    ])
        .exec(callback);
};

// Individual chart 1 (pie chart) Admin
// AdminUsers
RevisionSchema.statics.dataForIndivPieChartAdminUser = function(title, admin, callback){
    return this.aggregate([
        {$match: {"user":{"$in":admin}}},
        {$match: {title:title}},
        {$count: "AdminUsers"}
    ])
        .exec(callback);
};

// Individual chart 1 (pie chart) Anonymous User
// AnonUsers
RevisionSchema.statics.dataForIndivPieChartAnonUser = function(title, callback){
    return this.aggregate([
        {$match: {"anon":{"$exists":true}}},
        {$match: {title:title}},
        {$count: "AnonUsers"}
    ])
        .exec(callback);
};

// Individual chart 1 (Pie chart) Bot User
// BotUsers
RevisionSchema.statics.dataForIndivPieChartBotUser = function(title, bot, callback){
    return this.aggregate([
        {$match: {"user":{"$in":bot}}},
        {$match: {title:title}},
        {$count: "BotUsers"}
    ])
        .exec(callback);
};

// Individual chart 1 (Bar chart) Selected User
// _id, numOfRev
RevisionSchema.statics.dataForIndivChartSelectedUser = function(title, users, callback){
    return this.aggregate([
        {$match: {"user":{"$in":users}}},
        {$match: {title:title}},
        {$group:{_id:{$substr: ["$timestamp", 0, 4]}, numOfRev: {$sum:1}}},
        {$sort:{"_id":1}}
    ])
        .exec(callback);
};




var Revision = mongoose.model('Revision', RevisionSchema, 'revisions');

module.exports = Revision;
