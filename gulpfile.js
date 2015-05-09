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


var javascript = ['./client/src/**/*.js','./client/index.js'];
var stylesheet = ['client/build/*.css'];


gulp.task('default',['sass','index'], function() {
    // place code for your default task here
});

gulp.task('sass', function () {
    gulp.src('./client/style/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError ))
        .pipe(sourcemaps.write('./maps'))
        .pipe(size())
        .pipe(gulp.dest('client/build/1'))
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
    var sources = gulp.src(paths, {read: false},{cwd:'client'});

    return  gulp.src('./client/index.html')
            //.pipe(watch(['client/bower.json', 'client/src/**/*.js']))
            .pipe(inject(sources,{relative: true}))
            .pipe(size())
            .pipe(gulp.dest('client/'))
});
/**
 * develop WATCH
 * */
gulp.task('watch', function () {
    gulp.watch(['client/bower.json', 'client/src/**/*.js'],{},['index'])
        .on('change', notify);
    gulp.watch(['client/style/**/*'],{},['sass'])
        .on('change', notify);

    function notify(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running task "index"');
    }

});


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