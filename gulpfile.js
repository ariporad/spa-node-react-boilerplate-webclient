/* (c) 2015 Ari Porad. ariporad.mit-license.org */
var gulp = require('gulp');
var gutil = require('gulp-util');
var plugins = require('load-deps')('gulp-*', {
  renameKey: function (name) {
    return name.replace(/^gulp-/, '');
  },
});
var del = require('del');

console.log(plugins);

var SRC = 'src';
var DEST = 'build';

var SRC_OTHER = [SRC + '/**', '!**/*.js?(x)'];
var SRC_JS = [SRC + '/**/*.js?(x)'];

var TESTS = [SRC + '/**/*.test.js?(x)'];
var MOCHA_OPTS = { require: [__dirname + '/test/setup/index.js'] };

function negate(paths) {
  return paths.map(function mapNegate(p) {
    return '!' + p;
  });
}

function toDest(paths) {
  return paths.map(function mapToDest(p) {
    return p.replace(SRC, DEST);
  });
}

function compile(src, dest, cb) {
  var stream = gulp.src(src)
    .pipe(plugins.changed(dest))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(dest));
  if (cb && typeof cb === 'function') stream.on('finish', cb);
  return stream;
}

gulp.task('default', ['build']);
gulp.task('build', ['build:js', 'copy:other']);
gulp.task('build:js', function buildJS() {
  return compile(SRC_JS.concat(negate(TESTS)), DEST);
});

gulp.task('copy:other', function copy() {
  return gulp.src(SRC_OTHER)
    .pipe(gulp.dest(DEST));
});

gulp.task('lint', function lint() {
  return gulp.src(SRC_JS)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
});

gulp.task('test', ['lint'], function test(done) {
  compile(SRC_JS, DEST, function runTests() {
      gulp.src(toDest(TESTS))
        .pipe(plugins.mocha(MOCHA_OPTS))
        .on('error', function handleError(err) {
                   gutil.log(err);
                   this.emit('end');
                  })
        .on('end', done);
  });
});

gulp.task('test-cov', ['lint', 'build'], function testCov(cb) {
  compile(SRC_JS, DEST, function runTests() {
    gulp.src(console.log(toDest(SRC_JS.concat(negate(TESTS)))))
      .pipe(plugins.istanbul()) // Covering files
      .pipe(plugins.istanbul.hookRequire()) // Force `require` to return covered files
      .on('finish', function runTests() {
            gulp.src(TESTS)
              .pipe(plugins.mocha(MOCHA_OPTS))
              .pipe(plugins.istanbul.writeReports()) // Creating the reports after tests ran
              .pipe(plugins.istanbul.enforceThresholds({ thresholds: { global: 90 } })) // Min CC
              .on('end', function uploadCoverage(err) {
                    if (err) return cb(err);
                    gulp.src('coverage/**/lcov.info')
                      .pipe(plugins.coveralls())
                      .on('error', function ignoreNoProjectFoundErrors(err) {
                            if (err.message.indexOf('find') > -1 &&
                                err.message.indexOf('repo') > -1) {
                              console.log(
                                'Hey, it looks like you haven\'t setup coveralls yet, or you\'re not ' +
                                'on Travis! No problem, but I\'m not going to upload code coverage.'
                              );
                              cb();
                            } else {
                              cb(err)
                            }
                          })
                      .on('end', cb);
                  });
          });
  })
});

gulp.task('watch', ['build', 'test'], function watch(done) {
  gulp.watch(SRC_JS, ['test']);
  gulp.watch(SRC_JS.concat(negate(TESTS)), ['build']);
});

gulp.task('clean', function clean(cb) {
  del([DEST], cb);
});