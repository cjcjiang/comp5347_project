/**
 * This file is to start the data analytic server
 *
 */

var express = require('express');
var path = require('path');

var result = require('./app/routes/result.server.routes.js');

var app = express();

// Set the path that contains the views to ./app/views
app.set('views', path.join(__dirname,'app','views'));
app.use(express.static(path.join(__dirname, 'public')));

// Set the url-handling routers
app.use('/',result);

app.listen(3000, function () {
	  console.log('Revision app listening on port 3000!')
	});

module.exports = app;

// test rebase
