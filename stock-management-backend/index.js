var express = require('express');
var path = require('path');

const cors = require('cors');
var app = express();
var port = process.env.PORT || 3001;
var indexRouter  = require('./route/indexRouter');

var mongoose = require('mongoose'); // mongoose imported
var config = require('./config'); // configurations are imported for mongodb atlas url
const mongoDBAtlasURL = config.mongoUrl; // url imported
const connect = mongoose.connect(mongoDBAtlasURL); // mongoose connected with mongodb atlas

connect.then((db) => {
    console.log("Connected correctly to server");
},(err) => {console.log(err)});

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use('/itemRouter', indexRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});