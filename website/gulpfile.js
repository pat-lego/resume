var gulp = require('gulp');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var del = require('del');

/**
 * Variables used as global vars across the application
 */
const dist = 'dist';

// Clean previous build
function clean() {
    return del(["./".concat(dist).concat("/")],
        { force: true });
}

//Build the CSS
function css() {
    return gulp
        .src('./src/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./'.concat(dist)))
        .pipe(connect.reload());
}

//Build the JS
function js() {
    return gulp
        .src('./src/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./'.concat(dist)))
        .pipe(connect.reload());
}

//Build the HTML
function html() {
    return gulp
        .src('./src/**/*.html')
        .pipe(gulp.dest('./'.concat(dist)))
        .pipe(connect.reload());
}

function fonts() {
    return gulp
        .src('./src/fonts/*')
        .pipe(gulp.dest('./'
                        .concat(dist)
                        .concat('/fonts')))
        .pipe(connect.reload());
}

function images() {
    return gulp
        .src('./src/images/**/*')
        .pipe(gulp.dest('./'
                        .concat(dist)
                        .concat('/images')))
        .pipe(connect.reload());
}

// Watch the HTML code changes
function watchHtml() {
    return new Promise((resolve, reject) => {
        gulp
            .watch('./src/**/*.html',
                gulp.series(html));
        resolve();
    });
}

// Watch the CSS code changes
function watchCss() {
    return new Promise((resolve, reject) => {
        gulp
            .watch('./src/**/*.css',
                gulp.series(css));
        resolve();
    });
}

// Watch the CSS code changes
function watchJs() {
    return new Promise((resolve, reject) => {
        gulp
            .watch('./src/**/*.js',
                gulp.series(js));
        resolve();
    });
}

//Run the server
async function webserver() {
    await connect.server({
        name: 'Resume',
        root: './'.concat(dist),
        port: 3001,
        livereload: true
    });
}

const build = gulp.series(clean,
    gulp.parallel(css, html, js, fonts, images),
    gulp.series(webserver),
    gulp.parallel(watchHtml, watchCss, watchJs));

exports.default = build;
exports.deploy = gulp.series(clean,
    gulp.parallel(css, html, js, fonts, images));