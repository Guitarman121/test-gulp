var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var less = require('gulp-less');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();

gulp.task('copy', function() {
    // 将你的默认的任务代码放在这
    gulp.src("./src/index.html")
        .pipe(gulp.dest("./dist/"));
});


gulp.task('concat-uglify', function () {
    console.log("做了");
    gulp.src("./src/js/*.js")
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js/"))
        .pipe(browserSync.reload({
            stream:true
        }))
})

gulp.task("default", function () {
    console.log("hello gulp");
})

// 注册css压缩任务
gulp.task("cssnano", function () {
    gulp.src("./src/styles/*.css")
        .pipe(cssnano())
        .pipe(gulp.dest("./dist/styles"))
});

gulp.task("less-nano", function () {
    gulp.src("./src/styles/*.less")
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest("./dist/styles"))
});

gulp.task("sass", function () {
    gulp.src("./src/styles/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./dist/styles"))
        .pipe(browserSync.reload({
            stream:true
        }))
})

gulp.task("htmlmin", function () {
    gulp.src("./src/index.html")
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            removeScriptTypeAttributes: true,
            removeAttributeQuotes: true
        }))
        .pipe(gulp.dest("./dist/"))
        .pipe(browserSync.reload({
            stream:true
        }))
})

// 自动调用gulp任务
gulp.task("autogulp", function () {
    gulp.watch('./src/index.html', ['htmlmin']);
    gulp.watch('./src/styles/*.scss', ['sass']);
    gulp.watch('./src/js/*.js', ['concat-uglify']);
})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch('./src/index.html', ['htmlmin']);
    gulp.watch('./src/styles/*.scss', ['sass']);
    gulp.watch('./src/js/*.js', ['concat-uglify']);
});