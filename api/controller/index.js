var express = require('express'),
    nodemailer = require('nodemailer'),
crypto = require('crypto'),
    User = require('../models/user'),
    config = require('../config/index');

function isEmail(email){
    var re=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

exports.register=function(req,res,next){
    if(!req.body.email || !req.body.password) return  res.status(400).json({msg:"Email and Password can't be blank"});
    if(!isEmail(req.body.email)) return res.status(400).json({msg:'Email is invalid'});
    if(req.body.password.length<4) return  res.status(400).json({msg:'Password must be at least 4 characters long'});
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        verify:{}
    });
    User.findOne({email:req.body.email}, function(err,exist){
        if(err) return next(err);
        if(exist) return res.status(400).json({msg:'Email is already exist'});
        user.save(function(err){
            if(err) return next(err);
            res.status(200).json({msg:'register successfully'})
        });
    })
};


exports.login=function(req,res,next){
    if(!req.body.email && !req.body.password && !req.body.password<4) return  res.status(400).json({msg:"Email and Password can't be blank"});
    if(!isEmail(req.body.email)) return res.status(400).json({msg:'Email is invalid'});
    if(req.body.password.length<4) return  res.status(400).json({msg:'Password must be at least 4 characters long'});
    User.findOne({email:req.body.email}, function(err,user){
        if(err) return next(err);
        if(!user) return res.status(404).json({msg: 'Email or Password is invalid'});
        user.comparePassword(req.body.password, function (err, isMatch) {
            if(err) return next(err);
            if(!isMatch) return res.status(404).json({msg: 'Email or Password is invalid'});
            res.status(200).json({userId:user._id, msg:'login successfully'});
        });

    })
};

exports.getUsers=function(req, res, next){
    User.find(function(err, users){
        if(err) return next(err);
        res.status(200).json(users);
    })
};

exports.param=function(req, res, next, id){
    User.findById(id, function(err,user){
        if(err) return next(err);
        if (!user) return res.status(404).json({msg:"user not found"});
        req.user = user;
        return next();
    })
};

exports.getUsersbyID=function(req,res,next){
        res.json(req.user)
};

exports.updateUser=function(req,res,next){
    User.findByIdAndUpdate({_id: req.user._id}, function(err, user){
        if(err) return next(err);
        if (!user) return res.status(404).json({msg:"user not found"});
        res.status(200).json(user);
    })
};

exports.delUser=function(req,res,next){
    User.findByIdAndRemove({_id: req.user._id}, function(err, user){
        if(err) return next(err);
        res.status(200).json({msg:'user has deleted'});
    })
};
