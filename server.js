var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

// set up a static file server that points to the 'client' directory;
// we will put all angular files inside of client;
app.use(express.static(path.join(__dirname, './client/static')));
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
// require and runs the code from our routes.js
// pass it app so we can attach our routing rules to our express application;
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(8000, function(){});
