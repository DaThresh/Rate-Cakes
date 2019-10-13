const Rating = require('../models/rating');
const Cake = require('../models/cake');

module.exports = {
    all: function(req, res){
        Rating.find({})
            .populate('cake')
            .then(function(data){
                res.json({
                    message: 'success',
                    ratings: data
                })
            })
            .catch(function(err){
                res.json({
                    message: 'error',
                    error: err
                })
            });
    },
    create: function(req, res){
        Cake.findOne({_id: req.body._id})
            .then(function(cake){
                var newRating = new Rating();
                newRating.stars = req.body.stars;
                newRating.comment = req.body.comment;
                newRating.save()
                    .then(function(data){
                        cake.ratings.push(newRating);
                        cake.save()
                            .then(function(data2){
                                res.json({
                                    message: 'success',
                                    rating: newRating
                                });
                            })
                            .catch(function(err){
                                res.json({
                                    message: 'error',
                                    error: err
                                });
                            })
                    })
                    .catch(function(err){
                        res.json({
                            message: 'error',
                            error: err
                        });
                    });
            })
            .catch(function(err){
                res.json({
                    message: 'error',
                    error: err
                })
            });
    }
}