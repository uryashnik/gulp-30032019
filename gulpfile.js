const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();


function style () {
    return gulp.src('./src/scss/style.scss')
            .pipe(sass({
                    includePaths: require('node-normalize-scss').includePaths  
                }))
            .pipe(autoprefixer({
                browsers: ['last 3 versions'],
                cascade: false
            }))
            .pipe(gulp.dest('./build/css/'))
            .pipe(browserSync.stream());
};

function script () {
    return gulp.src('./src/js/*.js')
            .pipe(concat('script.js'))
            .pipe(gulp.dest('./build/js/'))
            .pipe(browserSync.stream());
};

function clean () {
   return del(['build/*']);
    
}

function watch () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/scss/**/*.scss', style);
    gulp.watch('./src/js/**/*.js', script);
    gulp.watch('./*.html', browserSync.reload)
};
// gulp.task('style', style);
// gulp.task('script', script);
// gulp.task('clean', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(style, script)));
gulp.task('dev', gulp.series('build', 'watch'))
