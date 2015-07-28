/**
 * Created by Ari on 7/28/15.
 */

// Make ESLint treat this as ES5
/*eslint no-var:0, prefer-const:0*/

var config = require('./Gruntconfig');

module.exports = function(karmaConf) {
  var conf = require('./karma.base.conf')(karmaConf);
  karmaConf.set(conf);
};
