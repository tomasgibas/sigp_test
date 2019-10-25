/* eslint-disable */
const gulp = require('gulp');
const sort = require('gulp-sort');
const scanner = require('i18next-scanner');
const config = require('./i18next-scanner.config');
const watch = require('gulp-watch');
const exec = require('child_process').exec;

gulp.task('watch-translate', () => {
	gulp.watch('src/**/*.{js,ts,tsx,jsx}', () => {
		return gulp.src(['src/**/*.{js,ts,tsx,jsx}'])
			.pipe(sort())
			.pipe(scanner(config.options))
			.pipe(gulp.dest('./'))
	})
})

gulp.task('watch-apidoc', function () {
	return watch('src/**/*.apidoc', function () {
		exec('npm run apidoc-scan', function (err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
		})
	})
})
