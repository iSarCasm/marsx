'use strict';

var gulp 				 = require('gulp'),
    postcss 		 = require('gulp-postcss'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    sass 				 = require('gulp-sass'),
    uglifycss 	 = require('gulp-uglifycss'),
    rename 			 = require("gulp-rename"),
    livereload 	 = require('gulp-livereload'),
    wiredep      = require('wiredep').stream,
    useref       = require('gulp-useref'),
    gulpif       = require('gulp-if'),
    uglify       = require('gulp-uglify'),
    minifyCss    = require('gulp-minify-css'),
    gulpCopy     = require('gulp-file-copy');

var source      = 'app/';
var destination = 'dev/';
var production  = 'production/';

var Settings = {
  source: source,
  destination: destination,
  production: production,

  COPY: [
    destination + 'img/**/*',
    destination + 'fonts/**/*'
  ],

  RELOAD: [
    destination + '*.html'
  ],

  HTML: {
    entry:       destination + '*.html',
    destination: destination
  },

  SCSS: {
    entry:        source + 'scss/**/*.scss',
    destination:  destination + 'css/'
  },

  COFFEE: {
    entry:        source + 'coffee/*.coffee',
    destination:  destination + 'js/'
  },

  BOWER: source + 'bower_components/'
};


gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(Settings.SCSS.entry, ['scss']);
  gulp.watch(Settings.HTML.entry, ['reload']);
})

gulp.task('scss', function() {
	gulp.src(Settings.SCSS.entry)
    .pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.init())
		.pipe(postcss([ autoprefixer(
                {
                    browsers: [
                        '> 1%',
                        'last 2 versions',
                        'firefox >= 4',
                        'safari 7',
                        'safari 8',
                        'IE 9',
                        'IE 10',
                        'IE 11'
                    ],
                    cascade: false
                }
            )]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(Settings.SCSS.destination))
		.pipe(livereload());
	livereload.reload(Settings.RELOAD);
});

gulp.task('scss-vendor', function() {
	gulp.src('app/bower_components/foundation-sites/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.init())
		.pipe(postcss([ autoprefixer(
                {
                    browsers: [
                        '> 1%',
                        'last 2 versions',
                        'firefox >= 4',
                        'safari 7',
                        'safari 8',
                        'IE 9',
                        'IE 10',
                        'IE 11'
                    ],
                    cascade: false
                }
            )]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(Settings.SCSS.destination))
		.pipe(livereload());
	livereload.reload(Settings.RELOAD);
});


gulp.task('bower', function () {
  gulp.src(Settings.RELOAD)
    .pipe(wiredep({
      directory: Settings.BOWER
    }))
    .pipe(gulp.dest(Settings.HTML.destination));
});

gulp.task('copy', function() {
  return gulp.src(Settings.COPY, { base: Settings.destination })
    .pipe(gulp.dest(Settings.production))
});

gulp.task('build', ['copy'], function () {
    return gulp.src(Settings.HTML.entry)
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest(Settings.production));
});

gulp.task('reload', function () {
  gulp.src(Settings.RELOAD)
		.pipe(livereload());
});
