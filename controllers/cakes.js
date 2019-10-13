const Cake = require('../models/cake');
const Rating = require('../models/rating');

module.exports = {
    all: function(req, res){
        Cake.find({})
            .populate('ratings')
            .then(function(data){
                res.json({
                    message: 'success',
                    cakes: data
                });
            })
            .catch(function(err){
                res.json({
                    message: 'error',
                    error: err
                });
            });
    },
    show: function(req, res){
        Cake.findOne({_id: req.params.id})
            .populate('ratings')
            .then(function(data){
                res.json({
                    message: 'success',
                    cake: data
                })
                .catch(function(err){
                    res.json({
                        message: 'error',
                        error: err
                    })
                });
            })
    },
    create: function(req, res){
        let newCake = new Cake();
        newCake.baker = req.body.baker;
        newCake.url = req.body.url;
        newCake.save()
            .then(function(data){
                res.json({
                    message: 'success',
                    cake: newCake
                });
            })
            .catch(function(err){
                res.json({
                    message: 'error',
                    error: err
                })
            })
    }
}