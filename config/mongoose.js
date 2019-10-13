const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cakes', {useNewUrlParser: true});

require('../models/cake');
require('../models/rating');