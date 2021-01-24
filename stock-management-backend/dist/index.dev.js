"use strict";

var express = require('express');

var app = express();
var port = 3000;

var indexRouter = require('./route/indexRouter');

var mongoose = require('mongoose'); // mongoose imported


var config = require('./config'); // configurations are imported for mongodb atlas url


var mongoDBAtlasURL = config.mongoUrl; // url imported

var connect = mongoose.connect(mongoDBAtlasURL); // mongoose connected with mongodb atlas

connect.then(function (db) {
  console.log("Connected correctly to server");
}, function (err) {
  console.log(err);
});
app.use('/itemRouter', indexRouter);
app.listen(port, function () {
  console.log("Server is running at http://localhost:".concat(port));
});