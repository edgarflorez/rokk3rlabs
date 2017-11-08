var gulp        = require("gulp"),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    sourcemaps  = require('gulp-sourcemaps'),
    livereload  = require('gulp-livereload'),
    beep        = require('beepbeep'),
    minifycss   = require('gulp-minify-css'),
    rename      = require('gulp-rename')
    ;

//Source and distribution folder
var source      = 'src/';
var dest        = 'public/';

// css source file: .scss files
var css = {
  in:     source + 'sass/main.scss',
  out:    dest + 'styles/',
  watch:  source + 'sass/**/*',
  sassOpts: {
      outputStyle: 'compressed',
      precision: 3,
      errLogToConsole: false
  }
};

// js source file: .js files
var js = {
  in: source + 'js/',
  out: dest + 'js/',
  watch: source + 'js/**/*'
};

// compile scss
gulp.task('sass', function() {
  return gulp.src(css.in)
    .pipe(sourcemaps.init())
    .pipe(sass(css.sassOpts))
    .on('error', swallowError)
    .pipe(minifycss({ keepSpecialComments: 0 }))
    .pipe(rename('style.css')) 
    .pipe(gulp.dest(css.out))
    .pipe(sourcemaps.write('../maps'))
    .pipe(livereload());
});

// listen for HTML changes
gulp.task('html', function() {
  return gulp.src('public/*.html')
    .pipe(livereload());
});



gulp.task('compress', function() {
  return gulp.src([
      js.in + 'script.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(js.out))
    .pipe(uglify())
    .on('error', swallowError)
    .pipe(gulp.dest(js.out))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(js.out))
    .pipe(livereload());
});

//default task
gulp.task('default', ['sass','compress'], function() {
    livereload.listen();
    gulp.watch(css.watch, ['sass']);
    gulp.watch('public/*.html', ['html']);
    gulp.watch(js.watch, ['compress']);
});

//functions
function swallowError(error) {
    beep(2, 1000);
    console.log('----------------- START ERROR -----------------');
    console.log(error);
    this.emit('end');
    console.log('----------------- END ERROR -----------------');
}
