/**
 * Created by pery on 09/05/2015.
 */
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
    rename: {
    }
});

var javascript = ['./src/**/*.js','./index.js'];
var stylesheet = ['./build/*.css'];
var sassFiles = ['./style/*.scss','src/page/**/*.scss'];
gulp.task('sass', function () {
    gulp.src(sassFiles)
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass().on('error', plugins.sass.logError ))
        .pipe(plugins.sourcemaps.write('./maps'))
        .pipe(plugins.size({showFiles:true}))
        .pipe(plugins.plumber.stop())
        .pipe(gulp.dest('build/'))
});

gulp.task('index', function () {
    var mainBowerFiles = require('main-bower-files');
    var series = require('stream-series');
    var bowerFiles = mainBowerFiles({
            paths: {
                bowerDirectory: 'bower_components',
                bowerrc: '.bowerrc',
                bowerJson: 'bower.json'
            }
    });
    var bwrSrc = gulp.src(bowerFiles,{read:false});

    var jsSrc =  gulp.src(javascript,{read:true})
                .pipe(plugins.angularFilesort());

    var cssSrc = gulp.src(stylesheet, {read: false},{cwd:''});

    var sources = series(bwrSrc,jsSrc,cssSrc)
          .pipe(plugins.size({showFiles:true}));

    gulp.src('./index.html')
        .pipe(plugins.plumber())
        .pipe(plugins.inject(sources,{relative: true}))
        .pipe(plugins.plumber.stop())
        .pipe(gulp.dest('.'));
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

    gulp.watch(sassFiles,{debounceDelay:100 },['sass'], function (event) {
        notify(event);
    });

    function notify(event){
        console.log('File ' + event.path + ' was ' + event.type );
    }

});

gulp.task('run',plugins.shell.task([
    //'mongod  --dbpath /data/db --logpath log/mongodb.log',
    'node server/server.js'
]));

gulp.task('production', function () {
    gulp.src(javascript)
        .pipe(plugins.concat('script.js'))
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.stripDebug())
        .pipe(plugins.uglify())
        .pipe(plugins.size({title:'javascript'}))
        .pipe(gulp.dest('build/'));

    gulp.src(stylesheet)
        .pipe(plugins.concat('styles.css'))
        .pipe(plugins.autoprefixer('last 2 versions'))
        .pipe(plugins.minifyCss())
        .pipe(plugins.size({title:'stylesheet'}))
        .pipe(gulp.dest('build/'));
});

gulp.task('default',['sass','index','watch']);