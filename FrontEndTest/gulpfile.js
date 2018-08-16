var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    sassLint = require('gulp-sass-lint'),
    cleanCSS = require('gulp-clean-css');

gulp.task('sass', function () {
    return gulp.src('./css/*.scss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./css/')
});

gulp.task('js:watch', function () {
    gulp.watch('./js/*.js')
});

gulp.task('compress', function (cb) {
    pump([
        gulp.src('./js/**/*.js'),
        //uglify(),
        gulp.dest('./dist/js')
    ],
        cb
    );
});

gulp.task('cleancss', function () {
    return gulp.src('./dist/css/*.css')
        .pipe(cleanCSS());
});

gulp.task('default', gulp.series('sass', 'cleancss', 'compress'));