var express = require('express'); // imported express 
const mongoose = require('mongoose'); // imported mongoose
const ITEMS = require('../model/item'); // model imported 
const bodyParser = require('body-parser'); // body parser 
const { body, validationResult } = require('express-validator'); // express-validator module for validations

const indexRouter = express.Router();

indexRouter.use(bodyParser.json()); // body parser for http body into json object

indexRouter.route('/')
.get((req, res, next) => {
    console.log(req.query); // query printing
    ITEMS.find(req.query)
    .then((items) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(items);
        //console.log(JSON.stringify(items, null, 2)); // printing the items 
    },(err) => next(err)
    .catch((err) => next(err)));
})
.post(body('itemName').isLength({min: 2}),(req,res,next) => {
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
     createItemWithDateInItemsCollection = (request) => {
        ITEMS.create({
            itemName: request.body.itemName,
            dateAdded: request.body.dateAdded,
            currentStock: request.body.currentStock,
            manufacturingCompany: request.body.manufacturingCompany
        })
        .then((items) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/text');
            res.send("Item has been created!");    
        }, (err) => next(err))
        .catch((err) => {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/text');
            console.log(err);
            res.send('ERROR INVALID');
        });
    }
    //var reqBodyLength = Object.keys(req.body).length;
    const errors = validationResult(req); // all the erros will be stored here
    if(!errors.isEmpty()) // When we failed to fulfil the validations
    {
        res.status(400);
        res.setHeader('Content-Type', 'application/text');
        res.send('ERROR PLEASE CHECK #1FDEF');
        return res;
    }
    else // everything is ok go ahead and create the document inside the db
    {
        createItemWithDateInItemsCollection(req);        
    }
}, (err) => next(err))
.put((req, res, next) => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/text');
    res.send('PUT IS INVALID');
}, (err) => next(err))
.delete((req, res, next) => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/text');
    res.send('DELETE IS INVALID');
}, (err) => console.log(err));

indexRouter.route('/withoutDate')
.post((req,res,next) => {
    createItemWithOutDateInItemsCollection = (request) => {
        ITEMS.create({
            itemName: request.body.itemName,
            dateAdded: new Date(),
            currentStock: request.body.currentStock,
            manufacturingCompany: request.body.manufacturingCompany
        })
        .then((items) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/text');
            res.send("Item has been created!");    
        }, (err) => next(err))
        .catch((err) => {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/text');
            console.log(err);
            res.send('ERROR INVALID');
        });
    }
    createItemWithOutDateInItemsCollection(req); 
}, (err) => console.log(err));


module.exports = indexRouter;