const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('../config/mongoose');

var RatingSchema = Schema({
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    cake: {
        type: Schema.Types.ObjectId,
        ref: 'Cake'
    }
});

var Rating = mongoose.model('Rating', RatingSchema);
module.exports = Rating;