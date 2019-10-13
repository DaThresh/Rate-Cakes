const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('../config/mongoose');

var CakeSchema = Schema({
    baker: {
        type: String,
        required: true,
        minlength: 2,
    },
    url: {
        type: String,
        required: true
    },
    ratings: [{
        type: Schema.Types.ObjectId,
        ref: 'Rating'
    }]
},{timestamps: true});

var Cake = mongoose.model('Cake', CakeSchema);
module.exports = Cake;