var mongoose = require('mongoose'); // package import
var Schema = mongoose.Schema; // Schema class

/*
Given properties of model:
    1. itemName : String
    2. dateAdded : Date
    3. currentStock : Number
    4. manufacturingCompany : String
*/

var item = new Schema({
    itemName: {
        type: String,
        default: 'Test Item Name'
    },
    dateAdded: {
        type: Date,
        default: new Date()
    },
    currentStock:{
        type: Number
    },
    manufacturingCompany: {
        type: String
    }
});

var ITEMS = mongoose.model('item', item); // exported model as Item

module.exports = ITEMS;