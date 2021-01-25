"use strict";

var express = require('express'); // imported express 


var mongoose = require('mongoose'); // imported mongoose


var ITEMS = require('../model/item'); // model imported 


var bodyParser = require('body-parser'); // body parser 


var _require = require('express-validator'),
    body = _require.body,
    validationResult = _require.validationResult; // express-validator module for validations


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
}).post( // itemName's length should be in between 0 to 20 (It can't be empty)
body('itemName').isString().withMessage('itemName should be string') // condition of type
.not().isEmpty().withMessage('itemName should not be empty') // condition of empty
.trim() // will remove whitespace from both ends (start & end)
.isLength({
  min: 1,
  max: 20
}).withMessage('itemName\'s length should be in between 1 to 20') // condition of minimum and maximum characters for itemName
// custom validator for the thing that itemName should be unique
.custom(function (value) {
  return ITEMS.findOne({
    "itemName": value
  }).then(function (item) {
    if (item) {
      return Promise.reject('Item Name already exits!'); // Reject the creation of item that exits in database
    }
  });
}), body('dateAdded') //---------------------------------------------------------//
// issue with date format access
//---------------------------------------------------------//
.isString().withMessage('dateAdded should be in Date format for example: 2021-01-22T08:49:34.081Z').not().isEmpty().withMessage('dateAdded should not be empty'), body('manufacturingCompany').isString().withMessage('manufacturingCompany should be string').not().isEmpty().withMessage('manufacturingCompany should not be empty').trim().isLength({
  min: 1,
  max: 20
}).withMessage('manufacturingCompany\'s length should be in between 1 to 20'), body('currentStock').not().isEmpty().withMessage('currentStock should have some value').isNumeric({
  min: 0
}).withMessage('currentStock should be a number').custom(function (value) {
  // custom validation that value should not be negative
  if (value < 0) return Promise.reject('currentStock should not be negative');else return Promise.resolve('successfull');
}), function (req, res, next) {
  /* REQUEST STRUCTURE:
      {
          "itemName": "Tesla Cars Stock",
          "date": "2021-01-16T07:25:04.310Z"
          "currentStock": 1000,
          "manufacturingCompany": "Tesla"
      }
  */
  // Always prefer to write arrow functions instead to actual function
  createItemWithDateInItemsCollection = function createItemWithDateInItemsCollection(request) {
    return regeneratorRuntime.async(function createItemWithDateInItemsCollection$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ITEMS.create({
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
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  }; // var reqBodyLength = Object.keys(req.body).length;
  // Finds the validation errors in this request and wraps them in an object with handy functions


  var errors = validationResult(req);

  if (!errors.isEmpty()) // When we failed to fulfil the validations
    {
      res.status(400);
      res.setHeader('Content-Type', 'application/text');
      res.send('ERROR PLEASE CHECK #1FDEF' + JSON.stringify(errors.array()));
      return res;
    } else // everything is ok go ahead and create the document inside the db
    {
      createItemWithDateInItemsCollection(req);
    }
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
}); // /withoutDate sub-route for the POST (creation of item in db) wihout date

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