'use strict';

//  Load plugins
var gulp             = require('gulp'),
    plumber          = require('gulp-plumber'),
    sass             = require('gulp-sass'),                        // 
    sourcemaps       = require('gulp-sourcemaps'),
    autoprefixer     = require('gulp-autoprefixer'),
    minifycss        = require('gulp-minify-css'),
    rename           = require('gulp-rename'),                      // 修改文件名
    notify           = require('gulp-notify'),
    concat           = require('gulp-concat'),                      // 合并文件
    stripCssComments = require('gulp-strip-css-comments'),          // 删除注释
    runSequence      = require('run-sequence');                     // gulp build

// 路径
var
    /* 开发环境 */
    app         = '../workspace/fooding-platformV2/fooding-front/source/business/style/mail/',
    app_sass    = app + 'sass/',
/*    app         = '../workspace/fooding-platformV2/fooding-front/source/common/style/app/',
    app_sass    = app + 'sass/',*/

    /* 生产环境 */
    dist        = '../workspace/fooding-platformV2/fooding-front/source/business/style/',
    dist_css    = dist + 'mail/';
/*    dist        = '../workspace/fooding-platformV2/fooding-front/source/common/',
    dist_css    = dist + 'style/';*/

// sass
gulp.task('sass', function() {
  return gulp.src(app_sass + '**/*.scss')
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    // 编译 sass
    .pipe(sass().on('error', sass.logError))
    // 添加前缀
    .pipe(autoprefixer('last 1 version'))
    // 输出未压缩文件
    .pipe(gulp.dest(dist_css))
    // 给文件添加 .min 后缀
    .pipe(rename({ suffix: '.min' }))
    // 压缩
    //.pipe(minifycss())
    // .pipe(sourcemaps.write())
    // 输出已压缩文件
    .pipe(gulp.dest(dist_css))
    // 注入浏览器实时更新
    // .pipe(reload({ stream: true }))
    // 通知
    .pipe(notify({ message: 'Sass task complete!' }));
});

// 压缩css
gulp.task('concat', function() {
    return gulp.src('src/css1/*.css')                  // 文件路径

        .pipe(concat('all'))                          // 合并文件
        .pipe(rename({suffix: '.min.css'}))           // rename压缩后的文件名  
        
        //.pipe(stripCssComments({preserve:false}))     // 删除注释 'false' => 删除所有形式的注释          
        //.pipe(minifycss())                          // 压缩成一行(不能有'//')

        .pipe(gulp.dest('dist/css'));                 // 输出文件夹
        
});

// watch
gulp.task('watch', ['sass'], function() {           // gulp  监听的方法  ['sass',...]
  gulp.watch(app_sass + '**/*.scss', ['sass']);     // 监听的文件
});

// 部署
gulp.task('build', function() {                     // gulp build时，运行的方法            
    runSequence(
      'sass',
      'concat'
    );
});

// 测试
gulp.task('default', ['watch']);

//gulp
//gulp build
