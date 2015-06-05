/**
 * Created by pery on 09/05/2015.
 */
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({});

require('./gulp/production.gulp.js');

var javascript = ['./src/**/*.js','./index.js'];
var stylesheet = ['./build/**/*.css'];
var sassFiles = ['./src/**/*.scss'];
var bowerFilesConfig = {
    paths: {
        bowerDirectory: 'bower_components',
        bowerrc: '.bowerrc',
        bowerJson: 'bower.json'
    }
};
//gulp.task('sass', function () {
//
//    gulp.src(sassFiles)
//        .pipe(plugins.plumber())
//        .pipe(plugins.sourcemaps.init())
//        .pipe(plugins.sass().on('error', plugins.sass.logError ))
//        .pipe(plugins.sourcemaps.write('./maps'))
//        .pipe(plugins.size({showFiles:true}))
//        .pipe(plugins.concat('style.css'))
//        .pipe(plugins.plumber.stop())
//        .pipe(gulp.dest('build/'))
//});

gulp.task('index', function () {
    var  bowerFiles = require('main-bower-files')( bowerFilesConfig );
    var series = require('stream-series');
    var bwrSrc = gulp.src( bowerFiles,{read:false});
    var jsSrc =  gulp.src(javascript,{read:true})
                .pipe(plugins.angularFilesort());

    var cssSrc = gulp.src(sassFiles, {read: true},{cwd:''})
            .pipe(plugins.rename({extname: ".css" }))
        ;

    var sources = series(bwrSrc,jsSrc,cssSrc)
          .pipe(plugins.size({showFiles:true}))
          .pipe(plugins.preprocess({context: { NODE_ENV: 'development', DEBUG: true}}))
    ;

    gulp.src('./src/index.html')
        .pipe(plugins.plumber())
        .pipe(plugins.inject(sources,{relative: true}))
        .pipe(plugins.plumber.stop())
        .pipe(gulp.dest('./src'));
});

/**
 * develop WATCH
 * */
gulp.task('watch', function () {
    gulp.watch(['bower.json'],{debounceDelay:300}, function (event) {
        notify(event);
        if(event.type == 'changed'){
            gulp.start('index');
        }

    });
    gulp.watch(['src/**/*.js'],{debounceDelay:300}, function (event) {
        notify(event);
        if({added:1,deleted:1}[event.type] ){
            gulp.start('index');
        }
    });

    //gulp.watch(sassFiles,{debounceDelay:100 },['sass'], function (event) {
    //    notify(event);
    //});

    function notify(event){
        console.log('File ' + event.path + ' was ' + event.type );
    }

});

gulp.task('run',plugins.shell.task([
    //'mongod  --dbpath /data/db --logpath log/mongodb.log',
    'node ./staticServer.js'
]));

gulp.task('mongod',plugins.shell.task([
    //'mongod  --dbpath /data/db --logpath log/mongodb.log',
    'md data\\db\\test data\\log',
    'mongod  --dbpath data\\db --logpath data\\log\\mongodb.log'
],{cwd:'..',ignoreErrors:true}));

gulp.task('dataServer',['mongod'],plugins.shell.task([
    //'mongod  --dbpath /data/db --logpath log/mongodb.log',
    'node ./server'
],{cwd:'../sever'}));

gulp.task('url',['run'], function(){
    var options = {
        url: 'http://localhost:8080'
        ,app: 'chrome'
    };
    gulp.src('./src/index.html')
        .pipe(plugins.open('', options));
});

gulp.task('upload-to-s3',plugins.shell.task([
    'aws s3 cp build s3://log-life-mongo-js --recursive'
]));


gulp.task('default',['dataServer','index','watch','url']);

gulp.task('dev',['mongod','index','watch','url']);