/**
 * Created by pery on 01/05/2015.
 */

// Module dependencies.
var http      = require('http');
var MongoClient = require('mongodb').MongoClient;



var Logs = null;
MongoClient.connect('mongodb://localhost:27017/test',function (err, db) {
    if(err){
        console.log(err);
    }
    console.log("we are connected");
    Logs = db.collection('logs',function (err, article) {
        if(err) throw err;
        console.log("logs collection arrive");
    });


});
//express config init
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/../public')); // for parsing application/json
app.use(bodyParser.json()); // for parsing application/json
// Routes
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/../public/index.html')
});

//rest
app.post('/log', function (req, res) {
    var  logData = req.body;
    logData.create = new Date();
    Logs.insert(logData);
    res.send('log inserted');
});

app.get('/log', function (req, res) {
    Logs.find({}).toArray(function (err, items) {
        res.send(items)
    })
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('mongoDB Native app listening at http://%s:%s', host, port);

});














