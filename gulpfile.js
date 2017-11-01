// Gulp.js configuration
var
  // modules
    gulp = require('gulp'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    htmlclean = require('gulp-htmlclean'),
    uglify = require('gulp-uglify'),
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
    
    return page.pipe(gulp.dest(out))
        .pipe(browserSync.reload({stream:true}));
//        .pipe(browserSync.stream());
});

// JS processing

gulp.task('js', function(){
    var out = folder.dist + 'scripts/';
    return gulp.src(folder.src + 'scripts/**/*')
        .pipe(newer(out))
        .pipe(uglify())
        .pipe(gulp.dest(out))
//        .pipe(browserSync.reload({stream:true}));
//        .pipe(browserSync.stream());
    
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
        .pipe(gulp.dest(folder.dist + 'styles/'))
        .pipe(browserSync.reload({stream:true}));
//        .pipe(browserSync.stream());
        
});

gulp.task('run', ['html', 'css', 'js']);

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

gulp.task('default', ['browserSync','run', 'watch'])


gulp.task('browserSync', function(){
    browserSync.init({
        server:{
            baseDir:'dist',
            directory: true
        }
    })
});