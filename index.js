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

var admin_raw_data = fs.readFileSync("admin.txt");
var admin_data = admin_raw_data.toString().split(/[\n\r]/);
app.locals.admin = admin_data;

var bot_raw_data = fs.readFileSync("bot.txt");
var bot_data = bot_raw_data.toString().split(/[\n\r]/);
app.locals.bot = bot_data;

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

