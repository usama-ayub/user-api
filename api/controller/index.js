var express = require('express'),
    nodemailer = require('nodemailer'),
    crypto = require('crypto'),
    User = require('../models/user'),
    jwt = require("jsonwebtoken"),
    _ = require("lodash"),
    config = require('../config');

function isEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

exports.register = function (req, res, next) {
    if (!req.body.email || !req.body.password) return res.status(400).json({msg: "Email and Password can't be blank"});
    if (!isEmail(req.body.email)) return res.status(400).json({msg: 'Email is invalid'});
    if (req.body.password.length < 4) return res.status(400).json({msg: 'Password must be at least 4 characters long'});
    if (!req.body.name || !req.body.gender || !req.body.location) return res.status(400).json({msg: 'Name,Gender and location must be required'});
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        profile: {
            name: req.body.name,
            gender: req.body.gender,
            location: req.body.location
        }
    });
    User.findOne({email: req.body.email}, function (err, exist) {
        if (err) return next(err);
        if (exist) return res.status(400).json({msg: 'Email is already exist'});
        user.save(function (err) {
            if (err) return next(err);
            var token = createToken({id: user._id, email: user.email});
            res.json({
                msg: 'register successfully',
                user_id: user._id,
                token: token
            });

        });
    })
};

function createToken(obj) {
    return jwt.sign(obj, config.secret)
}

exports.login = function (req, res, next) {
    if (!req.body.email && !req.body.password && !req.body.password < 4) return res.status(400).json({msg: "Email and Password can't be blank"});
    if (!isEmail(req.body.email)) return res.status(400).json({msg: 'Email is invalid'});
    if (req.body.password.length < 4) return res.status(400).json({msg: 'Password must be at least 4 characters long'});
    User.findOne({email: req.body.email}, function (err, user) {
        if (err) return next(err);
        if (!user) return res.status(404).json({msg: 'Email or Password is invalid'});
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) return next(err);
            if (!isMatch) return res.status(404).json({msg: 'Email or Password is invalid'});
            var token = createToken({id: user._id, email: user.email});
            res.json({
                user: {
                    name: user.name,
                    gender: user.gender,
                    profile: user.profile,
                    location: user.location
                }, msg: 'login successfully', token: token
            });
        });
    })
};

function getUserFields(user){
    return _.assign({
        email: user.email
    }, user.profile);
}

exports.profile = function (req, res, next) {
    /*var token = request.body.token;
    if (token) {
        token.findOne({token:token})
    }*/
    jwt.verify(req.body.token, config.secret, function (err, decoded) {
        if(err) return res.status(401).json({msg: err.message});
        user.findById(decoded.id, function (err, user) {
            if(err) return res.status(404).json({msg: 'user not found'});
            res.json(user)
        })
     });
};

exports.tokenVerify = function (req, res, next) {

};

exports.authorize = function (req, res, next) {
    var token = req.query.token || req.body.token;
    console.log(req.query.token);
    jwt.verify(token, config.secret, function (err) {
        if (err) {
            res.status(401).json({meg: 'user unauthorized'})
        }
        else next()
    })
};
exports.getUsers = function (req, res, next) {
    User.find(function (err, users) {
        if (err) return next(err);
        res.status(200).json(users);
    })
};

exports.param = function (req, res, next, id) {
    User.findById(id, function (err, user) {
        if (err) return next(err);
        if (!user) return res.status(404).json({msg: "user not found"});
        req.user = user;
        return next();
    })
};

exports.getUsersbyID = function (req, res, next) {
    res.json(req.user)
};

exports.updateUser = function (req, res, next) {
    User.findByIdAndUpdate(req.params.userId, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        if (!user) return res.status(404).json({msg: "user not found"});
        res.status(200).json(user);
    })
};

exports.delUser = function (req, res, next) {
    User.findByIdAndRemove(req.params.userId, function (err, user) {
        if (err) return next(err);
        res.status(200).json({msg: 'user has deleted'});
    })
};
