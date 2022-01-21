const gulp = require("gulp");
const run = require("gulp-run-command").default;
const ts = require("gulp-typescript");
const eslint = require("gulp-eslint");

gulp.task("lint", () => {
    return gulp.src(["**/*.js", "**/*.ts", "!**/node_modules/**", "!**/p5/**"])
        .pipe(eslint({ configFile: "./.eslintrc.json", fix: true }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task("build", () => {
    return gulp.src(["**/*.ts", "!**/node_modules/**"])
        .pipe(ts({
            noImplicitAny: true
        }))
        .pipe(gulp.dest("build"));
});

gulp.task("copy-config", () => {
    return gulp.src([ "index.html", ".env", "nodemon.json", "./config*/**/*", "./public*/**/*" ])
        .pipe(gulp.dest("build"));
});

gulp.task("start", run("npm run prod", {
    env: { NODE_ENV: "production" }
}));

gulp.task("default", gulp.series("lint", "build", "copy-config", "start"));