// Gulp.js configuration
var
  // modules
    gulp = require('gulp'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    htmlclean = require('gulp-htmlclean'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    assets = require('postcss-assets'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    cssnano = require('cssnano'),
    browserSync = require('browser-sync').create(),


  // development mode?
  devBuild = (process.env.NODE_ENV !== 'production'),

  // folders
  folder = {
    src: 'src/',
    dist: 'dist/'
  };

//image processing
gulp.task('images', function(){
    var out = folder.dist + 'images/';
    return gulp.src(folder.src + 'images/**/*')
        .pipe(newer(out))
        .pipe(imagemin({ optimizationLevel: 5}))
        .pipe(gulp.dest(out));
});

//HTML processing
gulp.task('html', ['images'], function(){
    var
        out = folder.dist + 'html/',
        page = gulp.src(folder.src + 'html/**/*')
            .pipe(newer(out));

    //minify production code
    if(!devBuild){
        page = page.pipe(htmlclean());
    }

    return page.pipe(gulp.dest(out));
});

// JS processing

gulp.task('js', function (cb) {
  pump([
        gulp.src('src/scripts/*.js'),
        uglify(),
        gulp.dest('dist/scripts')
    ],
    cb
  );
});

//CSS processing
gulp.task('css', ['images'], function(){
    var postCssOpts = [
        assets({ loadPaths: ['images/'] }),
        autoprefixer({ browsers: ['last 2 versions', '>2%'] }),
        mqpacker
        ];

    if(!devBuild) {
        postCssOpts.push(cssnano);
    }

    return gulp.src(folder.src + 'styles/scss/main.scss')
        .pipe(sass({
          outputStyle: 'nested',
          imagePath: 'images/',
          precision: 3,
          errLogToConsole: true
        }))
        .pipe(postcss(postCssOpts))
        .pipe(gulp.dest(folder.dist + 'styles/'));

});

// watch for changes
gulp.task('watch', function() {

  // image changes
  gulp.watch(folder.src + 'images/**/*', ['images']);

  // html changes
  gulp.watch(folder.src + 'html/**/*', ['html']);

  // javascript changes
  gulp.watch(folder.src + 'js/**/*', ['js']);

  // css changes
  gulp.watch(folder.src + 'css/scss/**/*', ['css']);

});

gulp.task('run', ['html', 'css','js']);

gulp.task('watch', function(){
  gulp.watch(folder.src + 'images/**/*', ['images']);
  gulp.watch(folder.src + 'html**/*', ['html']);
  gulp.watch(folder.src+ 'js/**/*', ['js']);
  gulp.watch(folder.src + 'styles/scss/**/*', ['css']);
});

gulp.task('default', ['run', 'watch']);
