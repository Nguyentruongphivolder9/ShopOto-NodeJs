// const gulp = require('gulp');
// const sass = require('gulp-sass')(require('sass'));
// const sourcemaps = require('gulp-sourcemaps');
// const concat = require('gulp-concat');
// const del = require('del');
// const cleanCSS = require('gulp-clean-css');
// const uglify = require('gulp-uglify');

// const PATH_CSS = 'src/public/css';
// const PATH_JS = 'src/public/js';

// gulp.task('styles', function() {
//     return gulp
//         .src('src/resources/scss/**/*.scss')
//         .pipe(sourcemaps.init())
//         .pipe(sass().on('error', sass.logError))
//         .pipe(concat('styles.css'))
//         .pipe(sourcemaps.write('./maps'))
//         .pipe(gulp.dest(PATH_CSS));
// });

// gulp.task('scripts', function() {
//     return gulp
//         .src('src/resources/js/**/*.js')
//         .pipe(concat('main.js'))
//         .pipe(gulp.dest(PATH_JS));
// });

// gulp.task('watch', function() {
//     gulp.watch('src/resources/scss/**/*.scss', gulp.series('styles'));
//     gulp.watch(['src/resources/js/**/*.js', gulp.series('scripts')]);
// });

// gulp.task('min_css', function() {
//     return gulp
//         .src(PATH_CSS+'/styles.css', {allowEmpty: true})
//         .pipe(cleanCSS())
//         .pipe(concat('styles.min.css'))
//         .pipe(gulp.dest(PATH_CSS));
// });

// gulp.task('min_js', function() {
//     return gulp
//         .src(PATH_JS+'/main.js', {allowEmpty: true})
//         .pipe(uglify())
//         .pipe(concat('scrips.min.css'))
//         .pipe(gulp.dest(PATH_JS));
// });