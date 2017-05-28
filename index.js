/**
 * This file is to start the data analytic server
 *
 */

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var result = require('./app/routes/result.server.routes.js');
var fs = require('fs');
var app = express();

fs.readFile("bot.txt", function(error, data){
    if(error){
        console.log("Read bot.txt error")
    }
    else {
        app.locals.bot = data.toString().split("\n");
        console.log("Read bot.txt success");
    }
});

fs.readFile("admin.txt", function(error, data){
    if(error){
        console.log("Read bot.txt error")
    }
    else {
        app.locals.admin = data.toString().split("\n");
        console.log("Read admin.txt success");
    }
});

// Set the path that contains the views to ./app/views
app.set('views', path.join(__dirname,'app','views'));
app.use(express.static(path.join(__dirname, 'public')));

// Handle the data in the post request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Set the url-handling routers
app.use('/',result);

app.listen(3000, function () {
	  console.log('Revision app listening on port 3000!')
	});

module.exports = app;

