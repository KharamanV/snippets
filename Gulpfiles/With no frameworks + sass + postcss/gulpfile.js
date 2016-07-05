/* 
* Path to folder which contains all Less files.
* Path related to gulpfile.js location
*/
var sass_src = 'www/scss/';

/* 
* Name of the main Less file inside Less source folder
*/
var sass_main_filename = 'main';
// var less_main_filename = 'landing';

/*
* Path to folder which will contain all result CSS files
*/
var css_dest = 'www/css/';

/* 
* Name of the main Less file inside Less source folder
*/
var css_result_filename = 'style';
// var css_result_filename = 'landing';

/*
* List of JS files which should be concatenated.
*/
var js_concat_files = ['www/js/app.js'];

/* 
* Concatenated JS file.
*/
var js_concat_res_path = 'www/js/';
var js_concat_res_file = 'script.js';


/*
* List of required pugins
*/
var gulp = require('gulp');
var path = require('path');
var sass  = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var jade = require('gulp-jade');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano')
var uglify = require('gulp-uglify');




var indexFile = 'www/index.html';
var sassFiles = sass_src + '**/*.scss';
var sassMain = sass_src + '' + sass_main_filename + '.scss';

gulp.task('sass', function() {	
	return gulp.src(sassMain)
	.pipe(sass())
	.on('error', swallowError)
	.pipe(rename({
		basename: css_result_filename
	}))
	.pipe(gulp.dest(css_dest));
});

// Jade
gulp.task('jade', function(){
  gulp.src('./www/jade/*.jade')
    .pipe(jade({"pretty": true}))
  	.on('error', swallowError)
    .pipe(gulp.dest('./www/'))
});

var localhost = '192.168.1.56';
// var localhost  = '192.168.1.18';
gulp.task('browser-sync', function() {
	browserSync({
        		server: {
			baseDir: './www'
		}
    });
});

gulp.task('browser-reload', ['postcss'], function() {
	browserSync.reload();
});

gulp.task('browser-reload-htmlonly', ['sass'], function() {
    browserSync.reload();
});

gulp.task('postcss', ['sass'], function() {
    var processors = [
        autoprefixer(),
        cssnano(),
    ];
    return gulp.src('./www/css/style.css')
        .pipe(postcss(processors))
        .pipe(rename(css_result_filename + '.css'))
        .pipe(gulp.dest('./www/css/'));
});

gulp.task('js-concat', function() {
    gulp.src(js_concat_files)
        .pipe(concat(js_concat_res_file))
        .pipe(gulp.dest(js_concat_res_path))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(js_concat_res_path))
});


gulp.task('watch',function () { 
	gulp.start(['browser-sync']);
	gulp.watch(indexFile, ['browser-reload-htmlonly']);
	gulp.watch(sassFiles, ['browser-reload']);
	gulp.watch('./www/jade/*.jade', ['jade']);
    gulp.watch('./www/js/app.js', ['js-concat', 'browser-reload-htmlonly']);
});

gulp.task('default', ['postcss', 'jade', 'js-concat'], function() {
    gulp.start(['watch']);
});

function swallowError (error) {
	console.log(error.toString());
	this.emit('end');
}

