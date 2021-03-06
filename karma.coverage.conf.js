/**
 * Created by Ari on 7/28/15.
 */

// Make ESLint treat this as ES5
/*eslint no-var:0, prefer-const:0*/

var config = require('./config');
var istanbul = require('browserify-istanbul');
var path = require('path');

module.exports = function(karma) {
  var conf = require('./karma.base.conf')(karma);
  conf.reporters.push('coverage');
  conf.browserify.transform.push(istanbul({
    ignore: ['**/node_modules/**'].concat(config.test.patterns),
  }));

  conf.coverageReporter = {
    type: 'html',
    dir: path.resolve(__dirname, config.test.coverage.dir),
  };
  conf.singleRun = true;

  karma.set(conf);
};
