/**
 * Created by pery on 05/06/2015.
 */
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({});

gulp.task('production', function () {
    var series = require('stream-series');
    //var mainBowerFiles = require('main-bower-files')( bowerFilesConfig );
    var bowerMain = require('bower-main');
    var templateCache = require('gulp-angular-templatecache');


    var bwrSrcJs = gulp.src( bowerMain('js').normal);
    var jsSrc =  gulp.src(javascript)
            .pipe(plugins.angularFilesort())
            .pipe(plugins.ngAnnotate())
            .pipe(plugins.stripDebug())
        ;

    var htmlCache = gulp.src('src/**/*.html')
            .pipe(templateCache())
        ;

    var js = series(bwrSrcJs,jsSrc,htmlCache)
        .pipe(plugins.size({showFiles:true}))
        .pipe(plugins.concat('script.js'))
        //.pipe(plugins.uglify())
        .pipe(plugins.size({title:'javascript'}))
        .pipe(gulp.dest('build/'));

    var bwrSrcCss = gulp.src( bowerMain('css').normal);
    var cssSrc = gulp.src(stylesheet);

    var css = series(bwrSrcCss,cssSrc)
        .pipe(plugins.concat('styles.css'))
        .pipe(plugins.autoprefixer('last 2 versions'))
        .pipe(plugins.minifyCss())
        .pipe(plugins.size({title:'stylesheet'}))
        .pipe(gulp.dest('build/'));

    //var finalSrc = gulp.src(['./build/**/*.css','./build/**/*.js']);

    gulp.src('./src/index.html')
        .pipe(plugins.inject(series(js,css),{relative: false, ignorePath:'/build'}))
        .pipe(gulp.dest('./build'))
    ;

    gulp.src(['*.png','*.ico'],{cwd:'src/imagesbp/**/'})
        .pipe(gulp.dest('./build/images'));

    gulp.start('upload-to-s3');

});
