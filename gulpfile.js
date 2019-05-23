var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    typescript = require('gulp-typescript'),
    browserify = require('gulp-browserify'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
   return gulp.src('app/sass/**/*.sass')
       .pipe(sass())
       .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
       .pipe(gulp.dest('app/css'))
       .pipe(browserSync.reload({stream: true}));
});

gulp.task('cssnano', function () {
   return gulp.src('app/css/main.css')
       .pipe(cssnano())
       .pipe(rename({suffix: '.min'}))
       .pipe(gulp.dest('app/css'))
});

gulp.task('libs', function () {
   return gulp.src([
       'app/libs/jquery/dist/jquery.min.js',
        'app/libs/lodash/dist/lodash.min.js'])
       .pipe(concat('libs.min.js'))
       .pipe(uglify())
       .pipe(gulp.dest('app/js'))
});

gulp.task('scripts', function(){
    return gulp.src(['app/scripts/**/*.ts'])
        .pipe(typescript())
        .pipe(gulp.dest('app/js'))
});

gulp.task('babel', function () {
    return gulp.src('app/js/app.js')
        .pipe(babel())
        .pipe(rename({suffix: ".es5"}))
        .pipe(gulp.dest('app/js'))
});

gulp.task('browserify', function () {
   return gulp.src('app/js/app.js')
       .pipe(browserify())
       .pipe(rename('result.js'))
       .pipe(gulp.dest('app/js'))
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
           baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('clean', async function() {
    return del.sync('dist');
});

gulp.task('prebuild', async function() {

    var buildCss = gulp.src('app/css/main.min.css')
        .pipe(gulp.dest('dist/css'));

    var buildJs = gulp.src('app/js/**/*')
.pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
    var buildJSON = gulp.src('app/json/*.json')
        .pipe(gulp.dest('dist/json'))
});

gulp.task('watch', function () {
    gulp.watch('app/sass/**/*.sass', gulp.series('sass'));
    gulp.watch('app/*.html', gulp.series(browserSync.reload));
    gulp.watch('app/scripts/**/*.ts',gulp.series('scripts'));
    gulp.watch('app/scripts/**/*.ts', gulp.series(browserSync.reload));
});
gulp.task('default', gulp.parallel('watch', 'sass', 'libs', 'scripts', 'babel','browserify', 'cssnano','browser-sync'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'sass', 'scripts'));