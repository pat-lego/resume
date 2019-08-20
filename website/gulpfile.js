var gulp = require('gulp');
var webserver = require('gulp-webserver');

const del = require('del');

// Clean assets
function clean() {
    return del(["../dist/"], { force: true });
}

//Build the CSS
function css() {
    return gulp.src('./src/**/*.css')
        .pipe(gulp.dest('../dist'));
}

//Build the HTML
function html() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('../dist'));
}

//Run the server
function webserver() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            host: 'localhost',
            port: 3000,
            directoryListing: true,
            open: true
        }));
}

const build = gulp.series(clean, gulp.parallel(css, html, webserver));

exports.default = build;