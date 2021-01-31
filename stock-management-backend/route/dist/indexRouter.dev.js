"use strict";

var express = require('express'); // imported express 


var mongoose = require('mongoose'); // imported mongoose


var ITEMS = require('../model/item'); // model imported 


var bodyParser = require('body-parser'); // body parser 


var _require = require('express-validator'),
    body = _require.body,
    validationResult = _require.validationResult,
    query = _require.query,
    param = _require.param; // express-validator module for validations


var indexRouter = express.Router();
indexRouter.use(bodyParser.json()); // body parser for http body into json object

indexRouter.route('/') // 3. Users should be able to view all the items
.get(function (req, res, next) {
  ITEMS.find(req.query).then(function (items) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(items);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    res.statusCode = 400; // Bad Request

    res.setHeader('Content-Type', 'application/text');
    res.send('Coudn\'t find the item.');
  });
}, function (err) {
  return next(err);
}) // 1. Users should be able to add a new item
.post( // itemName's length should be in between 0 to 20 (It can't be empty)
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
}), body('dateAdded').custom(function (value) {
  var date = Date.parse(value);

  if (isNaN(date)) // given value string is not a proper date object
    {
      return Promise.reject('Given date string is not proper Date object!');
    } else {
    return Promise.resolve('Successfull');
  }
}).isString().withMessage('dateAdded should be in Date format for example: 2021-01-22T08:49:34.081Z').not().isEmpty().withMessage('dateAdded should not be empty'), body('manufacturingCompany').isString().withMessage('manufacturingCompany should be string').not().isEmpty().withMessage('manufacturingCompany should not be empty').trim().isLength({
  min: 1,
  max: 20
}).withMessage('manufacturingCompany\'s length should be in between 1 to 20'), body('currentStock').not().isEmpty().withMessage('currentStock should have some value').isNumeric({
  min: 0
}).withMessage('currentStock should be a number').custom(function (value) {
  // custom validation that value should not be negative
  if (value < 0) return Promise.reject('currentStock should not be negative');else return Promise.resolve('successfull');
}), function (req, res, next) {
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
}) // 2. Users should be able to edit an existing item
.put(body('_id').not().isEmpty().withMessage('_id field should not be empty').custom(function (value) {
  // checking weather given object id is valid ObjectId or not?
  if (!mongoose.isValidObjectId(value)) {
    return Promise.reject('_id should be a valid ObjectId');
  } else {
    return Promise.resolve('Successfull');
  }
}), function (req, res, next) {
  ITEMS.updateOne({
    "_id": req.body._id
  }, {
    "$set": req.query
  }).then(function (item) {
    res.statusCode = 200; // Successfull creation of item in db

    res.setHeader('Content-Type', 'application/text');
    res.send('Successfully updated!');
  })["catch"](function (err) {
    // EDIT Forget
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/text');
    res.send('Not able to fulfill request.');
  });
}, function (err) {
  return next(err);
}); // /withoutDate sub-route for the POST (creation of item in db) wihout date
// Sub part of 2. Users should be able to edit an existing item

indexRouter.route('/withoutDate').post( // itemName's length should be in between 0 to 20 (It can't be empty)
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
    } else {
      return Promise.resolve('Successfull'); // When it is successfull
    }
  });
}), body('manufacturingCompany').isString().withMessage('manufacturingCompany should be string').not().isEmpty().withMessage('manufacturingCompany should not be empty').trim().isLength({
  min: 1,
  max: 20
}).withMessage('manufacturingCompany\'s length should be in between 1 to 20'), body('currentStock').not().isEmpty().withMessage('currentStock should have some value').isNumeric({
  min: 0
}).withMessage('currentStock should be a number').custom(function (value) {
  // custom validation that value should not be negative
  if (value < 0) return Promise.reject('currentStock should not be negative');else return Promise.resolve('successfull');
}), function (req, res, next) {
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
      res.send('ERROR INVALID');
    });
  };

  createItemWithOutDateInItemsCollection(req);
}, function (err) {
  return console.log(err);
}); // 7. Users should be able to view all the details of any particular item.

indexRouter.route('/:id').get(param('id').custom(function (value) {
  // checking weather given object id is valid ObjectId or not?
  if (!mongoose.isValidObjectId(value)) {
    return Promise.reject('id should be a valid ObjectId');
  } else {
    return Promise.resolve('Successfull');
  }
}).custom(function (id) {
  return ITEMS.findOne({
    "_id": id
  }).then(function (item) {
    if (!item) {
      return Promise.reject('Id doesn\'t exit!'); // Reject the creation of item that exits in database
    } else {
      return Promise.resolve('Successfull');
    }
  });
}), function (req, res, next) {
  ITEMS.findOne({
    "_id": req.body._id
  }).then(function (item) {
    res.statusCode = 200; // success

    res.setHeader('Content-Type', 'application/json');
    res.json(item); // response
  })["catch"](function (err) {
    return next(err);
  });
}, function (err) {
  return next(err);
}) // 6. Users should be able to increment and decrement the stock of any particular item.
.put(param('id').not().isEmpty().withMessage('id parameter should not be empty').custom(function (value) {
  // checking weather given object id is valid ObjectId or not?
  if (!mongoose.isValidObjectId(value)) {
    return Promise.reject('_id should be a valid ObjectId');
  } else {
    return Promise.resolve('Successfull');
  }
}).custom(function (id) {
  return ITEMS.findOne({
    "_id": id
  }).then(function (item) {
    if (!item) {
      return Promise.reject('Id doesn\'t exit!'); // Reject the creation of item that exits in database
    } else {
      return Promise.resolve('Successfull');
    }
  });
}), param('itemName').custom(function (value) {
  if (value != null) {
    return ITEMS.findOne({
      "itemName": value
    }).then(function (item) {
      if (item) {
        return Promise.reject('Item Name already exits, choose other item name!'); // Reject the creation of item that exits in database
      } else {
        return Promise.resolve('Successfull');
      }
    })["catch"](function (err) {
      return Promise.reject('Bad Request!');
    });
  } else {
    return Promise.resolve('ItemName is not provided by use!');
  }
}), function (req, res, next) {
  ITEMS.updateOne({
    "_id": req.body._id
  }, {
    "$inc": {
      "currentStock": 1
    }
  }).then(function (item) {
    res.statusCode = 200; // success

    res.setHeader('Content-Type', 'application/text');
    res.send('currentStock has been updated'); // response
  })["catch"](function (err) {
    res.statusCode = 400; // Bad Request

    res.setHeader('Content-Type', 'appication/text');
    res.send('Bad request!');
  });
}, function (err) {
  return console.log(err);
}) // 4. User should be able to delete any particular item
["delete"](param('id').not().isEmpty().withMessage('_id field should not be empty').custom(function (value) {
  // checking weather given object id is valid ObjectId or not?
  if (!mongoose.isValidObjectId(value)) {
    return Promise.reject('_id should be a valid ObjectId');
  } else {
    return Promise.resolve('Successfull');
  }
}), function (req, res, next) {
  // path param & query param TODO
  deleteItemInItemsCollection = function deleteItemInItemsCollection(request) {
    return regeneratorRuntime.async(function deleteItemInItemsCollection$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(ITEMS.deleteOne({
              "_id": req.params.id
            }).then(function (item) {
              if (item == null) {
                next(err);
                return;
              }

              res.statusCode = 200; // Successfull

              res.setHeader('Content-Type', 'application/text');
              res.send('Successfully deleted');
            }, function (err) {
              return next(err);
            })["catch"](function (err) {
              res.statusCode = 400; // Bad Request

              res.setHeader('Content-Type', 'application/text');
              res.send('Id is not present in Collection');
            }));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  };

  var erros = validationResult(req); // all the errors in validations will be stored here

  if (!erros.isEmpty()) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/text');
    res.send('DELETE IS INVALID' + JSON.stringify(erros));
  } else {
    deleteItemInItemsCollection(req);
  }
}, function (err) {
  return console.log(err);
}); // 5. Users should be able to check the stock of any particular item.

indexRouter.route('/:id/currentStock').get(param('id').custom(function (value) {
  // checking weather given object id is valid ObjectId or not?
  if (!mongoose.isValidObjectId(value)) {
    return Promise.reject('id should be a valid ObjectId');
  } else {
    return Promise.resolve('Successfull');
  }
}).custom(function (id) {
  return ITEMS.findOne({
    "_id": id
  }).then(function (item) {
    if (!item) {
      return Promise.reject('Id doesn\'t exit!'); // Reject the creation of item that exits in database
    } else {
      return Promise.resolve('Successfull');
    }
  });
}), function (req, res, next) {
  ITEMS.findOne({
    "_id": req.body._id
  }).then(function (item) {
    res.statusCode = 200; // success

    res.setHeader('Content-Type', 'application/text');
    res.send(Number(item.currentStock)); // response
  })["catch"](function (err) {
    return next(err);
  });
}, function (err) {
  return next(err);
});
module.exports = indexRouter;