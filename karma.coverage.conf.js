/**
 * Created by Ari on 7/28/15.
 */

// Make ESLint treat this as ES5
/*eslint no-var:0, prefer-const:0*/

var config = require('./Gruntconfig');
var istanbul = require('browserify-istanbul');

module.exports = function(karma) {
  var conf = require('./karma.base.conf')(karma);
  conf.reporters.push('coverage');
  conf.browserify.transform.push(istanbul({
    ignore: ['**/node_modules/**', '**/*.test.js'],
  }));

  conf.coverageReporter = {
    type: 'html',
    dir: __dirname + '/coverage/'
  };
  console.log(conf);
  karma.set(conf);
};
