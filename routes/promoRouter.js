var express = require('express');
var Promos = require('../models/promotions');
var Verify = require('./verify');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var promoRouter = express.Router();
promoRouter.use(bodyParser.json());
promoRouter.route('/')

.get(function(req,res,next){
        Promos.find({},function(err,promo){
         if (err) return next(err);
         res.json(promo);
     });  
})
.post(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
     Promos.create(req.body,function(err,promo){
        if (err) return next(err);
        var id = promo._id;
        console.log("Promotion Created !");
        res.writeHead(200,{
            'Content-Type':'text/plain'
        });
        res.end("Added the promotion with id: "+id);
    });  
})
.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req, res, next){
        Promos.remove({},function(err,resp){
           if (err) return next(err);
           res.json(resp);
       })
});
promoRouter.route('/:promoId')

.get(function(req,res,next){
        Promos.findById(req.params.promoId,function(err,promo){
          if (err) return next(err);
          res.json(promo);
      });
})
.put(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
    Promos.findByIdAndUpdate(req.params.promoId,{
           $set:req.body
       },{
           new:true
       },function(err,promo){
           if (err) return next(err);
           res.json(promo);
       })
})
.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req, res, next){
           Promos.findByIdAndRemove(req.params.promoId,function(err,resp){   
           if (err) return next(err);
           res.json(resp);
       });
});
module.exports = promoRouter;