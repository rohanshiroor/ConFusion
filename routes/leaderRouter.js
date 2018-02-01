var express = require('express');
var Leaders = require('../models/leadership');
var Verify = require('./verify');
var bodyParser = require('body-parser');
var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
leaderRouter.route('/')
.get(function(req,res,next){
     Leaders.find({},function(err,leader){
         if (err) return next(err);
         res.json(leader);
     });  
})
.post(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req, res, next){
    Leaders.create(req.body,function(err,leader){
        if (err) return next(err);
        var id = leader._id;
        console.log("Leader information Created !");
        res.writeHead(200,{
            'Content-Type':'text/plain'
        });
        res.end("Added the leader information with id: "+id);
    });  
})

.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req, res, next){
       Leaders.remove({},function(err,resp){
           if (err) return next(err);
           res.json(resp);
       })
});
leaderRouter.route('/:leaderId')
.get(function(req,res,next){
      Leaders.findById(req.params.leaderId,function(err,leader){
          if (err) return next(err);
          res.json(leader);
      });
})

.put(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req, res, next){
       Leaders.findByIdAndUpdate(req.params.leaderId,{
           $set:req.body
       },{
           new:true
       },function(err,leader){
           if (err) return next(err);
           res.json(leader);
       })
})

.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req, res, next){
        Leaders.findByIdAndRemove(req.params.leaderId,function(err,resp){   
           if (err) return next(err);
           res.json(resp);
       });
});

module.exports = leaderRouter;