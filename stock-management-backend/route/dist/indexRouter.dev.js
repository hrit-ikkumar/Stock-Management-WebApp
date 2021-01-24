"use strict";

var express = require('express'); // imported express 


var mongoose = require('mongoose'); // imported mongoose


var ITEMS = require('../model/item'); // model imported 


var bodyParser = require('body-parser'); // body parser 


var expressValidators = require('express-validator'); // express validator module


var indexRouter = express.Router();
indexRouter.use(bodyParser.json()); // body parser for http body into json object

indexRouter.route('/').get(function (req, res, next) {
  console.log(req.query); // query printing

  ITEMS.find(req.query).then(function (items) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(items); //console.log(JSON.stringify(items, null, 2)); // printing the items 
  }, function (err) {
    return next(err)["catch"](function (err) {
      return next(err);
    });
  });
}).post(function (req, res, next) {
  /*
  REQUEST STRUCTURE:
      {
          "itemName": "Tesla Cars Stock",
          "date": "2021-01-16T07:25:04.310Z" // default it will take current date
          "currentStock": 1000,
          "manufacturingCompany": "Tesla"
      }
   */
  // Always prefer to write arrow functions instead to actual function
  createItemWithDateInItemsCollection = function createItemWithDateInItemsCollection(request) {
    ITEMS.create({
      itemName: request.body.itemName,
      dateAdded: request.body.dateAdded,
      currentStock: request.body.currentStock,
      manufacturingCompany: request.body.manufacturingCompany
    }).then(function (items) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/text');
      res.send("Item has been created!");
    }, function (err) {
      return next(err);
    })["catch"](function (err) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/text');
      console.log(err);
      res.send('ERROR INVALID');
    });
  }; //var reqBodyLength = Object.keys(req.body).length;


  createItemWithDateInItemsCollection(req);
}, function (err) {
  return next(err);
}).put(function (req, res, next) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/text');
  res.send('PUT IS INVALID');
}, function (err) {
  return next(err);
})["delete"](function (req, res, next) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/text');
  res.send('DELETE IS INVALID');
}, function (err) {
  return console.log(err);
});
indexRouter.route('/withoutDate').post(function (req, res, next) {
  createItemWithOutDateInItemsCollection = function createItemWithOutDateInItemsCollection(request) {
    ITEMS.create({
      itemName: request.body.itemName,
      dateAdded: new Date(),
      currentStock: request.body.currentStock,
      manufacturingCompany: request.body.manufacturingCompany
    }).then(function (items) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/text');
      res.send("Item has been created!");
    }, function (err) {
      return next(err);
    })["catch"](function (err) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/text');
      console.log(err);
      res.send('ERROR INVALID');
    });
  };

  createItemWithOutDateInItemsCollection(req);
}, function (err) {
  return console.log(err);
});
module.exports = indexRouter;