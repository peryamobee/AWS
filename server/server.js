/**
 * Created by pery on 01/05/2015.
 */

// Module dependencies.
var http      = require('http');
var MongoClient = require('mongodb').MongoClient;

var sass    = require('node-sass'), // We're adding the node-sass module
    path    = require('path'),      // Also loading the path module
    sassMiddleware = require('node-sass-middleware')
;

var Logs = null;
//express config init
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/../client/')); // for parsing application/json
app.use(sassMiddleware({
    root:__dirname,
    src: '/../client/src',
    dest:'',
    sourceMap:__dirname + '/../client/src/maps',
    debug: true,
    outputStyle: 'expanded',
    response:true
}));
app.use(express.static(__dirname + '/../client/src/')); // for parsing application/json
app.use(bodyParser.json()); // for parsing application/json

// Routes
app.get('/', function(req, res) {
    res.sendFile( __dirname + '/../client/src/index.html')
});

MongoClient.connect('mongodb://localhost:27017/test',function (err, db) {
    if(err){
        console.log(err);
        return;
    }
    var logCollectionService = new (require('./src/Logs.Node.Module.js'))(db ,app);
    /*route*/
    app.get('/log/:id', logCollectionService.getLogs);
    app.post('/log', logCollectionService.saveLog);


    var server = app.listen(8080, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('"mongoDB Native app" listening at http://%s:%s', host, port);

    });

    console.log("we are connected");

});
















