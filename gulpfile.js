'use strict';
const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

gulp.task('client', () => {
    gulp.src('client/js/app.jsx')
    .pipe(browserify({
        debug: true,
        transform: [ babelify ],
        extensions: [ '.js', '.jsx', '.json' ]
    }))
    .on('error', (err) => { console.error(err.stack); })
    .pipe(rename('mirror.js'))
    .pipe(gulp.dest('static/build/js'));
});

gulp.task('styles', () => {
    return gulp.src('client/sass/**/*.scss')
    .pipe(sass())
    .on('error', (err) => { console.error(err.stack); })
    .pipe(rename('mirror.css'))
    .pipe(gulp.dest('static/build/css'));
});

gulp.task('watch', () => {
    gulp.watch('client/js/**', [ 'client' ]);
    gulp.watch('client/sass/**', [ 'styles' ]);
});

gulp.task('build', [ 'client', 'styles' ]);
gulp.task('dev', [ 'build', 'watch' ]);

gulp.task('default', [ 'dev' ]);