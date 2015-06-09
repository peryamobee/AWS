/**
 * Created by pery on 02/06/2015.
 */
var http      = require('http'),
    path      =  require('path'),
    sass    = require('node-sass'), // We're adding the node-sass module
    sassMiddleware = require('node-sass-middleware'),
    bodyParser = require('body-parser'),
    express = require('express'),
    app = express()
    ;
//app.configure(function() {
    app.use(express.static(__dirname + '/')); // for parsing application/json
    app.use(sassMiddleware({
        root: __dirname,
        src: '/src',
        dest: '',
        sourceMap: __dirname + '/src/maps',
        debug: false,
        outputStyle: 'expanded',
        response: true
    }));
    app.use(express.static(__dirname + '/src/')); // for parsing application/json
    app.use(bodyParser.json()); // for parsing application/json
//});

// Routes
app.get('/*', function(req, res) {
    var resolvedPath = path.resolve(__dirname + '/src/index.html');
    console.log('send file:', resolvedPath );
    res.sendFile( resolvedPath  )
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('static file server up" listening at http://%s:%s', host, port);
    console.log('remmber to run data server from WebStorm');

});