import gulp from 'gulp';
import connect from 'gulp-connect';
import uglify from 'gulp-uglify';

import cleanCSS from 'gulp-clean-css';

import del from 'del';

/**
 * Variables used as global vars across the application
 */
const dist = 'dist';

// Clean assets
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

//Build the CSS
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
                    gulp.parallel(css, html, js), 
                    gulp.series(webserver),
                    gulp.parallel(watchHtml, watchCss, watchJs));

exports.default = build;
exports.webserver = webserver;