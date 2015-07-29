// Karma configuration
// Generated on Mon Jul 27 2015 14:18:36 GMT-0700 (PDT)

// Make ESLint treat this as ES5
/*eslint no-var:0, prefer-const:0*/

var config = require('./Gruntconfig');
var pkg = require('./package.json');

module.exports = function(karma) {
  var transforms = pkg.browserify.transform;
  var envifyIndex = transforms.indexOf('envify');

  if (envifyIndex !== -1) {
    transforms[envifyIndex] = ['envify', { NODE_ENV: 'test' }];
  }

  return {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: config.dir.src,


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'browserify', 'source-map-support'],


    // list of files / patterns to load in the browser
    files: [
      '../test/setup/index.js',
      '**/*.test.js',
      '**/*.test.jsx',
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors:
    // https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '../test/**/*.js': ['browserify'],
      '**/*.js': ['browserify'],
      '**/*.test.js': ['browserify'],
      '**/*.jsx': ['browserify'],
      '**/*.test.jsx': ['browserify'],
    },

    browserify: {
      debug: true,
      transform: transforms,
      // Odds are we don't need the .test.js(x)'s, but I added them anyway.
      extensions: ['.js', '.jsx', '.test.js', '.test.jsx'],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: karma.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file
    // changes
    autoWatch: false,


    // start these browsers
    // available browser launchers:
    // https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'PhantomJS', 'Safari'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  };
};
