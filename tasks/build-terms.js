/**
 * Transform Markdown terms into an HTML page
 */
const gulp = require('gulp');
const tap    = require('gulp-tap');
const gulpMarkdownIt = require('gulp-markdown-it-adapter');
const hbs = require('handlebars');
const gulpHandlebars = require('gulp-handlebars-html')(hbs);
const insert = require('gulp-insert');
const rename = require('gulp-rename');
const revReplace = require('gulp-rev-replace');
const HelpcenterMarkdownIt = require('./common/markdown-it.js');

gulp.task('build-terms', ['clean-dist', 'less'], function () {
    var md = new HelpcenterMarkdownIt();

    return gulp.src('content/terms.md')
            .pipe(insert.wrap("::::: mainContent\n", "\n:::::"))
            .pipe(insert.prepend(getTocMarkdown() + "\n"))
            .pipe(gulpMarkdownIt(md))
            .pipe(tap((file) => {
                return gulp.src('src/terms.handlebars')
                    .pipe(gulpHandlebars({
                        mainContent: file.contents
                    }, {
                        partialsDirectory: ['./src/partials']
                    }))
                    .pipe(rename('terms.html'))
                    .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                    .pipe(gulp.dest('./dist'))
            }));
});

function getTocMarkdown() {
    return "\n\n:::: toc\n@[toc]\n\n::::\n\n";
}

