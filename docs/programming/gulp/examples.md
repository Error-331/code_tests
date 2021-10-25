# Examples

Compile CoffeeScript and uglify JavaScript files:

```javascript

var gulp = require('gulp');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');

gulp.task('default', function () {
    return gulp.src('**/*.coffee', {cwd: 'src'})
        .pipe(coffee())
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

```

Remove files (clean up the directory):

```javascript

let gulp = require('gulp');
let clean = require('gulp-clean');

gulp.task('cleanTypes', function () {
    return gulp.src('./temp/decl/*',  {read: false})
        .pipe(clean({force: true}));
});

```


