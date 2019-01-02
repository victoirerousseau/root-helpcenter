/**
 * Compile the homepage with Handlebars
 */
var gulp = require('gulp');
var hbs = require('handlebars');
var gulpHandlebars = require('gulp-handlebars-html')(hbs);
var rename = require('gulp-rename');
var flatmap = require('gulp-flatmap');
var path = require('path');
var revReplace = require('gulp-rev-replace');

// This task builds the homepage
gulp.task('landings', ['clean-dist','less'], function() {
    // When all information about the popular articles are gathered,
    // we inject this data into the Handlebars template of the homepage.
    // Finally, the resulting HTML is saved into "dist".       
    return gulp.src('src/index.handlebars')
            .pipe(flatmap(function(stream, file){
                return gulp.src(file.path)
                        .pipe(gulpHandlebars({}, {
                            partialsDirectory: ['./src/partials']
                        }))
                        .pipe(rename(path.basename(file.path).replace(/\.handlebars$/, '.html')))
                        .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                        .pipe(gulp.dest('dist'));
                }));
});
