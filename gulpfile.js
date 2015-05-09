/**
 * Created by pery on 09/05/2015.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var angularInjector = require('gulp-angular-injector');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
var series = require('stream-series');

gulp.task('default',['sass','js','index'], function() {
    // place code for your default task here
});

gulp.task('sass', function () {
    gulp.src('./client/style/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError ))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('client/build//'))
});



gulp.task('js', function () {
    gulp.src(['./client/src/*.js','./client/index.js'])
        .pipe(ngAnnotate())
        .pipe(gulp.dest('client/build/'));
});

gulp.task('index', function () {
    var bowerFiles = mainBowerFiles({
        paths: {
            bowerDirectory: 'client/bower_components',
            bowerrc: 'client/.bowerrc',
            bowerJson: 'client/bower.json'
        }
    });
    var sources = gulp.src(['client/build/*.js' , 'client/build/*.css'], {read: false});
    var bowerSources = gulp.src(bowerFiles,{read:false});

    return  gulp.src('./client/index.html')
            .pipe(inject(series(bowerSources,sources)))
            .pipe(gulp.dest('client/build/'))
});