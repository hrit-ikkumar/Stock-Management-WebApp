var express = require('express'); // imported express 
const mongoose = require('mongoose'); // imported mongoose
const ITEMS = require('../model/item'); // model imported 
const bodyParser = require('body-parser'); // body parser 
const { body, validationResult } = require('express-validator'); // express-validator module for validations

const indexRouter = express.Router();

indexRouter.use(bodyParser.json()); // body parser for http body into json object

indexRouter.route('/')
.get((req, res, next) => {
    ITEMS.find(req.query)
    .then((items) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(items);
        //console.log(JSON.stringify(items, null, 2)); // printing the items 
    },(err) => next(err)
    .catch((err) => next(err)));
})
.post(
    // itemName's length should be in between 0 to 20 (It can't be empty)
    body('itemName')
        .isString().withMessage('itemName should be string') // condition of type
        .not().isEmpty().withMessage('itemName should not be empty') // condition of empty
        .trim() // will remove whitespace from both ends (start & end)
        .isLength({min: 1, max: 20}).withMessage('itemName\'s length should be in between 1 to 20') // condition of minimum and maximum characters for itemName
        // custom validator for the thing that itemName should be unique
        .custom(value => {
            return ITEMS.findOne({"itemName": value}).then(item => {
                if(item){
                    return Promise.reject('Item Name already exits!'); // Reject the creation of item that exits in database
                }
            });
        }),
    body('dateAdded')
        //---------------------------------------------------------//
        // issue with date format access /\/ RESOLVED/FIXED /\/
        //---------------------------------------------------------//
        .custom(value => {
            var date = Date.parse(value);
            if(isNaN(date)) // given value string is not a proper date object
            {
                return Promise.reject('Given date string is not proper Date object!')
            }
            else
            {
                return Promise.resolve('Successfull');
            }
        })
        .isString().withMessage('dateAdded should be in Date format for example: 2021-01-22T08:49:34.081Z')
        .not().isEmpty().withMessage('dateAdded should not be empty'),
    body('manufacturingCompany')
        .isString().withMessage('manufacturingCompany should be string')
        .not().isEmpty().withMessage('manufacturingCompany should not be empty')
        .trim()
        .isLength({min: 1, max: 20}).withMessage('manufacturingCompany\'s length should be in between 1 to 20'),
    body('currentStock')
        .not().isEmpty().withMessage('currentStock should have some value')
        .isNumeric({min: 0}).withMessage('currentStock should be a number')
        .custom(value => { // custom validation that value should not be negative
            if(value < 0)
                return Promise.reject('currentStock should not be negative');
            else
                return Promise.resolve('successfull');
        }),
    (req,res,next) => {
    /* REQUEST STRUCTURE:
        {
            "itemName": "Tesla Cars Stock",
            "date": "2021-01-16T07:25:04.310Z"
            "currentStock": 1000,
            "manufacturingCompany": "Tesla"
        }
    */

    // Always prefer to write arrow functions instead to actual function
     createItemWithDateInItemsCollection = async (request) => {
        await ITEMS.create({
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
            res.send('ERROR INVALID');
        });
    }
    // var reqBodyLength = Object.keys(req.body).length;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req); 

    if(!errors.isEmpty()) // When we failed to fulfil the validations
    {
        res.status(400);
        res.setHeader('Content-Type', 'application/text');
        res.send('ERROR PLEASE CHECK #1FDEF' + JSON.stringify(errors.array()));
        return res;
    }
    else // everything is ok go ahead and create the document inside the db
    {
        createItemWithDateInItemsCollection(req);        
    }
}, (err) => next(err))
.put((req, res, next) => {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/text');
    res.send('PUT IS INVALID');
}, (err) => next(err))
.delete(
    body('_id')
        .not().isEmpty().withMessage('_id field should not be empty')
        .custom( value => {
            // checking weather given object id is valid ObjectId or not?
            if(! mongoose.isValidObjectId(value))
            {
                return Promise.reject('_id should be a valid ObjectId');
            }
            else
            {
                return Promise.resolve('Successfull'); 
            }
        }),
    (req, res, next) => {
    

    deleteItemInItemsCollection = async (request) => {
        await ITEMS.deleteOne({"_id": request._id})
            .then((item) => {
                res.statusCode = 200; // Successfull
                res.setHeader('Content-Type', 'application/text');
                res.send('Successfully deleted'); 
            }, (err) => next(err))
            .catch((err) => {
                res.statusCode = 400; // Bad Request
                res.setHeader('Content-Type', 'application/text');
                res.send('Id is not present in Collection');
            })
    }
    const erros = validationResult(req); // all the errors in validations will be stored here
    if(!erros.isEmpty())
    {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/text');
        res.send('DELETE IS INVALID' + JSON.stringify(erros));
    }
    else
    {
        deleteItemInItemsCollection(req);
    }
}, (err) => console.log(err));

// /withoutDate sub-route for the POST (creation of item in db) wihout date
indexRouter.route('/withoutDate')
.post(
        // itemName's length should be in between 0 to 20 (It can't be empty)
        body('itemName')
        .isString().withMessage('itemName should be string') // condition of type
        .not().isEmpty().withMessage('itemName should not be empty') // condition of empty
        .trim() // will remove whitespace from both ends (start & end)
        .isLength({min: 1, max: 20}).withMessage('itemName\'s length should be in between 1 to 20') // condition of minimum and maximum characters for itemName
        // custom validator for the thing that itemName should be unique
        .custom(value => {
            return ITEMS.findOne({"itemName": value}).then(item => {
                if(item){
                    return Promise.reject('Item Name already exits!'); // Reject the creation of item that exits in database
                }
                else
                {
                    return Promise.resolve('Successfull'); // When it is successfull
                }
            });
        }),
    body('manufacturingCompany')
        .isString().withMessage('manufacturingCompany should be string')
        .not().isEmpty().withMessage('manufacturingCompany should not be empty')
        .trim()
        .isLength({min: 1, max: 20}).withMessage('manufacturingCompany\'s length should be in between 1 to 20'),
    body('currentStock')
        .not().isEmpty().withMessage('currentStock should have some value')
        .isNumeric({min: 0}).withMessage('currentStock should be a number')
        .custom(value => { // custom validation that value should not be negative
            if(value < 0)
                return Promise.reject('currentStock should not be negative');
            else
                return Promise.resolve('successfull');
        }),
    (req,res,next) => {
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
            res.send('ERROR INVALID');
        });
    }
    createItemWithOutDateInItemsCollection(req); 
}, (err) => console.log(err));


module.exports = indexRouter;