/**
 * This file is to start the data analytic server
 *
 */

var express = require('express');
var path = require('path');

var overall = require('./app/routes/overall.server.routes.js');
var individual = require('./app/routes/individual.server.routes.js');

var app = express()

//Set the path that contains the views to ./app/views
app.set('views', path.join(__dirname,'app','views'));
app.use(express.static(path.join(__dirname, 'public')));

//Set the url-handling routers
app.use('/overall',overall);
app.use('/individual',individual);

app.listen(3000, function () {
	  console.log('Revision app listening on port 3000!')
	});

module.exports = app;
