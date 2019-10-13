const cakes = require('../controllers/cakes');
const ratings = require('../controllers/ratings');

module.exports = function(app){
    app.get('/cakes', cakes.all);
    app.get('/cakes/:id', cakes.show);
    app.post('/cakes', cakes.create);

    app.get('/ratings', ratings.all);
    app.post('/ratings', ratings.create);
}