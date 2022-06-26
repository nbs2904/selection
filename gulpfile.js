const gulp = require("gulp");
const run = require("gulp-run-command").default;
const ts = require("gulp-typescript");
const eslint = require("gulp-eslint");
const uglify = require("gulp-uglify");

gulp.task("lint", () => {
    return gulp.src([ "**/*.js", "**/*.ts", "!**/node_modules/**", "!**/p5/**" ])
        .pipe(eslint({ configFile: "./.eslintrc.json", fix: true }))
        .pipe(eslint.format())
        .pipe(gulp.dest(file => file.base))
        .pipe(eslint.failAfterError());
});

gulp.task("test", run("npm test", {
    env: { NODE_ENV: "prod" }
}));

gulp.task("compile", () => {
    let tsProject = ts.createProject("tsconfig.json");

    return gulp.src([ "**/*.ts", "!**/node_modules/**", "!**/__tests__/**" ])
        .pipe(tsProject())
        .pipe(gulp.dest("build"));
});

gulp.task("resolve-alias", run("npx tscpaths -p tsconfig.json -s . -o ./build"));

gulp.task("copy-config", () => {
    return gulp.src([ "index.html", "config*/env/.env", "config*/logs/log4js.js", "public*/**/*", "lib*/actions/names.json", "lib*/sensors/names.json", "lib*/levels/names.json" ])
        .pipe(gulp.dest("build"));
});

gulp.task("uglify", () => {
    return gulp.src([ "build/**/*.js" ])
        .pipe(uglify())
        .pipe(gulp.dest("build"));
});

gulp.task("start", run("npm run start", {
    env: { NODE_ENV: "prod" }
}));

gulp.task("build", gulp.series("compile", "resolve-alias", "copy-config", "uglify"));

gulp.task("default", gulp.series("lint", "test", "build", "start"));