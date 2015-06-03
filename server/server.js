/**
 * Created by pery on 01/05/2015.
 */

// Module dependencies.
var http      = require('http'),
    path      =  require('path'),
    MongoClient = require('mongodb').MongoClient;


var Logs = null;
//express config init
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // * => allow all origins
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Accept'); // add remove headers according to your needs
    next()
})

MongoClient.connect('mongodb://localhost:27017/test',function (err, db) {
    if(err){
        console.log(err);
        return;
    }
    var logService = new (require('./src/Logs.Node.Module'))(db ,app);
    /*route*/
    app.get('/log/:id', logService.getLogs);
    app.post('/log', logService.saveLog);

    //var userService = new (require('./src/User.Node.Module'))(db);
    //app.get('/hash',userService.getHashTag);
    //app.post('/hash',userService.addHashTag);
    //app.get('user',userService.user);

    console.log("we are connected to db");


});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('"mongoDB Native app" listening at http://%s:%s', host, port);

});














