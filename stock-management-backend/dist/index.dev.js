"use strict";

var express = require('express');

var path = require('path');

var cors = require('cors');

var app = express();
var port = process.env.PORT || 3001;

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
app.use(cors());
app.use(express["static"](path.join(__dirname, 'build')));
app.use('/itemRouter', indexRouter);
app.listen(port, function () {
  console.log("Server is running at http://localhost:".concat(port));
});