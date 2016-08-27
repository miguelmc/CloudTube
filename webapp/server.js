process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express'),
    mongoose = require('./config/mongoose'),
    passport = require('./config/passport'),
    config = require('./config/config');

// var db = mongoose();
var db = mongoose;
var app = express();
var passport = passport();

app.listen(config.port);

module.exports = app;

console.log("Server running at http://localhost:8080/")
