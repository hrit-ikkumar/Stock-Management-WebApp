var express = require('express'); // imported express 
const mongoose = require('mongoose'); // imported mongoose
const ITEMS = require('../model/item'); // model imported 
const bodyParser = require('body-parser'); // body parser 

const indexRouter = express.Router();

/*indexRouter requests 
    1. GET : Fetches all the items (stocks) from the database
    2. POST : Creating an item in database
    3. PUT : Updating an item in database
    4. DELETE : Deleting an item in database
*/

indexRouter.use(bodyParser.json());

indexRouter.route('/')
.get((req, res, next) => {
    console.log(req.query); // query printing
    ITEMS.find(req.query)
    .then((items) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(items);
        console.log(JSON.stringify(items, null, 2)); // printing the items 
    },(err) => next(err)
    .catch((err) => next(err)));
})
.post((req,res,next) => {

    /*
    REQUEST STRUCTURE:
    {
        "itemName": "Tesla Cars Stock",
        "date": "2021-01-16T07:25:04.310Z" // default it will take current date
        "currentStock": 1000,
        "manufacturingCompany": "Tesla"
    }
    */

    console.log(req.body)
    ITEMS.create(req.body)
    .then((items) => {
        console.log(JSON.stringify(items, null, 2));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(items);    
    }, (err) => next(err))
    .catch((err) => next(err));
}, (err) => console.log(err));

module.exports = indexRouter;