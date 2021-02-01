var mongoose = require('mongoose'); // package import
var Schema = mongoose.Schema; // Schema class

var item = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: new Date()
    },
    currentStock:{
        type: Number,
        default: 0
    },
    manufacturingCompany: {
        type: String,
        required: true
    }
});

var ITEMS = mongoose.model('item', item); // exported model as Item & db will create collection as items

module.exports = ITEMS;