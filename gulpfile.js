/**
 * Created by pery on 09/05/2015.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
var series = require('stream-series');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var size = require('gulp-size');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var plumber = require('gulp-plumber');
var angularFilesort = require('gulp-angular-filesort');
var shell = require('gulp-shell');

var javascript = ['./client/src/**/*.js','./client/index.js'];
var stylesheet = ['client/build/*.css'];

gulp.task('sass', function () {
    gulp.src('./client/style/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError ))
        .pipe(sourcemaps.write('./maps'))
        .pipe(size())
        .pipe(plumber.stop())
        .pipe(gulp.dest('client/build/'))
});

gulp.task('index', function () {
    var bowerFiles = mainBowerFiles({
            paths: {
                bowerDirectory: 'client/bower_components',
                bowerrc: 'client/.bowerrc',
                bowerJson: 'client/bower.json'
            }
    });
    var paths = [].concat(bowerFiles,javascript,stylesheet);
    var sources = gulp.src(paths, {read: true},{cwd:'client'})
          .pipe(angularFilesort())
          .pipe(size({showFiles:true}));

    gulp.src('./client/index.html')
        .pipe(inject(sources,{relative: true}))
        .pipe(gulp.dest('client/'));
});

/**
 * develop WATCH
 * */
gulp.task('watch', function () {
    gulp.watch(['client/bower.json'],{debounceDelay:300}, function (event) {
        notify(event);
        if(event.type == 'changed'){
            gulp.start('index');
        }

    });
    gulp.watch(['client/src/**/*.js'],{debounceDelay:300}, function (event) {
        notify(event);
        if({added:1,deleted:1}[event.type] ){
            gulp.start('index');
        }
    });

    gulp.watch(['client/style/**/*'],{debounceDelay:100 },['sass'], function (event) {
        notify(event);
    });

    function notify(event){
        console.log('File ' + event.path + ' was ' + event.type );
    }

});

gulp.task('run',shell.task([
    //'mongod  --dbpath /data/db --logpath log/mongodb.log',
    'node server/server.js'
]));

gulp.task('production', function () {

    gulp.src(javascript)
        .pipe(concat('script.js'))
        .pipe(ngAnnotate())
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(size({title:'javascript'}))
        .pipe(gulp.dest('client/build/'));

    gulp.src(stylesheet)
        .pipe(concat('styles.css'))
        .pipe(autoprefix('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(size({title:'stylesheet'}))
        .pipe(gulp.dest('client/build/'));
});

gulp.task('default',['sass','index','watch']);