"use strict";

var express = require('express'); // imported express 


var mongoose = require('mongoose'); // imported mongoose


var ITEMS = require('../model/item'); // model imported 


var bodyParser = require('body-parser'); // body parser 


var expressValidators = require('express-validator'); // express validator module


var indexRouter = express.Router();
/*
    indexRouter requests 
        1. GET : Fetches all the items (stocks) from the database
        2. POST : Creating an item in database
        3. PUT : Updating an item in database
        4. DELETE : Deleting an item in database
*/

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
  };
  /*
      REQUEST STRUCTURE:
          {
              "itemName": "Tesla Cars Stock",
              "date": "2021-01-16T07:25:04.310Z" // default it will take current date
              "currentStock": 1000,
              "manufacturingCompany": "Tesla"
          }
           items => name = milk, price *=2
          db.items.updateMany({"name":"milk"}, {"price":{"$inc":2}})
  */
  // console.log(req.body);
  //var reqBodyLength = Object.keys(req.body).length;

  /*console.log(reqBodyLength);
  console.log(typeof(req.body.currentStock),
  typeof(req.body.itemName),
  typeof(req.body.manufacturingCompany) );*/
  // express-validators should be used.

  /* if(reqBodyLength < 3)
  {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/text');
      res.send('ERROR Parameter Length is less than 3');
  }
  else if(reqBodyLength == 3)
  {
      if( typeof(req.body.currentStock) !== 'number' ||
          typeof(req.body.itemName) !== 'string' ||
          typeof(req.body.manufacturingCompany) !== 'string')
      {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/text');
          res.send('ERROR Type of parameters are not right. Please check again');
      }
      else
      {
          createItemInItemsCollection(req.body);
      }
  }
  else if(reqBodyLength == 4)
  {
      if( typeof(req.body.currentStock) !== 'number' ||
          typeof(req.body.itemName) !== 'string' ||
          typeof(req.body.manufacturingCompany) !== 'string' ||
          typeof(req.body.dateAdded) !== 'string')
      {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/text');
          res.send('ERROR Type of parameters are not right. Please check again');
      }
      else
      {
          createItemInItemsCollection(req.body);
      }
  }
  else 
  {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/text');
      res.send('ERROR LENGTH IS MORE THAN 4')
  }*/


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