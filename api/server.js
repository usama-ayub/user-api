var express = require('express'),
    errorHandler = require('errorhandler'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    http  = require('http'),
    methodOverride = require('method-override'),
    mongoose= require('mongoose');

//Db Connection
mongoose.connect('mongodb://localhost:27017/user-login-register-');
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ');
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error:' + err);
});

//Models
var user = require('./models/user');

//config
var config = require('./config');

//App
var app = express();                 // define our app using express
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname,'..','client')));
app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser());
/*app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(cookieParser());*/



var api = require('./router/index');
app.use('/api', api);
//app.listen(config.port, function () {
//    console.log('Magic happens on port ' + this.address.port);
var http = http.createServer(app);
http.listen(config.port, function () {
    console.log('Magic happens on port ' + config.port);
});
