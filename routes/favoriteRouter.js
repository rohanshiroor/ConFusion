var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');

var Verify = require('./verify');

var favoritesRouter = express.Router();
favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
.all(Verify.verifyOrdinaryUser)
.get(function (req, res, next) {
    Favorites.find({'postedBy': req.decoded._doc._id})
        .populate('postedBy')
        .populate('dishes')
        .exec(function (err, fav) {
        if (err) throw err;
        res.json(fav);
    });
})

.post(function(req, res, next) {
	Favorites.findOne({ postedBy : req.decoded._doc._id }, function(err, fav){
		if (err) throw err;
        if (fav == null) {
        Favorites.create({"postedBy":req.decoded._doc._id}, function(err, fav){
			if (err) throw err;
            fav.dishes.push(req.body._id);
            fav.save(function(err,fav){
                if (err) throw err;
            var id = fav._id;
            res.json(fav)
            });
        });
		} else {
			fav.dishes.push(req.body._id);
			fav.save(function(err, fav){
				if(err) throw err;
                var id = fav._id;  
                res.json(fav)
            });
		}
	});
})

.delete(function(req, res, next){
    Favorites.remove(
        {postedBy: req.decoded._doc._id},
        function(err, resp){
            if (err) next(err);
            res.json(resp);
        }
    );
});


favoritesRouter.route('/:dishId')

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findOne({postedBy:req.decoded._doc._id}, function (err, favorite) {
        if(err) throw err;
        for(var i = 0; i < favorite.dishes.length; i++) {
            if(favorite.dishes[i] == req.params.dishId) {
                favorite.dishes.splice(i,1);
                break;
            }
        }
        favorite.save(function (err, favorite) {
            if(err) throw err;
            res.json(favorite);
        })
    })
});

module.exports = favoritesRouter;