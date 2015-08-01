/**
 * Created by Ari on 7/28/15.
 */

// Make ESLint treat this as ES5
/*eslint no-var:0, prefer-const:0*/

var config = require('./config');

module.exports = function(karma) {
  var conf = require('./karma.base.conf')(karma);
  conf.singleRun = true;
  karma.set(conf);
};
