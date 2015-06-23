var gulp = require('gulp');
var bower = require('main-bower-files');
var sass = require('gulp-ruby-sass');
var pleeease = require('gulp-pleeease');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var imagemin = require('gulp-imagemin');
var php = require('gulp-connect-php');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

// ソースコードの Directory を指定(最後に / 必要)
var input = 'src/';

// build
gulp.task('build',['ext','sass','js','img']);

// ext
gulp.task('ext', function () {
	gulp.src(input + 'ext/**/*.*')
		.pipe(gulp.dest('build'))
		.pipe(reload({stream:true}));
});

// Sass

var sassoptions = {
	style: 'expanded'
	, sourcemap: true
};

gulp.task('sass', function () {
	sass(input + 'sass/',{
		style: 'expanded'
		, sourcemap: true
	})
	.pipe(pleeease({
		autoprefixer: {"browsers": ["last 4 versions", "Android 2.3"]}
		, minifier: false
	}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('build/css'))
	.pipe(reload({stream:true}));
});

// Js-concat-uglify

gulp.task('js', function() {
	gulp.src([input + 'js/*.js'])
	.pipe(concat('scripts.js'))
	.pipe(uglify({preserveComments: 'some'})) // Keep some comments
	.pipe(gulp.dest('build/js'))
	.pipe(reload({stream:true}));
});

gulp.task('bower', function() {
	var jsFilter = filter([input + '**/*.js']);
		gulp.src(bower())
		.pipe(jsFilter)
		.pipe(concat('scripts.js'))
		.pipe(uglify({presserveComents: 'some'}))
		.pipe(gulp.dest('build/js'))
		.pipe(reload({stream:true}));
});


// Imagemin

gulp.task('img', function() {
    gulp.src([input + 'img/**/*.{png,jpg,gif,svg}'])
        .pipe(imagemin({optimizationLevel: 7}))
        .pipe(gulp.dest('build/img'));
});

// Static server

gulp.task('php', function() {
	php.server({ base: './build/', port: 9998, keepalive: true});
});

// for PHP

gulp.task('browser-sync',['php'], function() {
    browserSync({
        //server: {
            baseDir: "./build/",
	proxy: "127.0.0.1:9998",
	port: 9999,
	open: true,
	notify: false,
        //}
    });
});

// Reload all browsers

gulp.task('bs-reload', function () {
browserSync.reload();
});

// Task for `gulp` command

gulp.task('default',['browser-sync'], function() {
	gulp.watch(input + 'sass/**/*.scss',['sass']);
	gulp.watch(input + 'ext/**/*.*',['ext']);
	gulp.watch(input + 'js/**/*.js',['js']);
	gulp.watch(input + 'img/**/*.{png,jpg,gif,svg}',['imagemin']);
	gulp.watch(input + "*.html", ['bs-reload']);
	gulp.watch(input + "*.php", ['bs-reload']);
});
