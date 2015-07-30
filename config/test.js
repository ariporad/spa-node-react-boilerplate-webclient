/*eslint no-var:0, prefer-const:0*/
/**
 * Created by Ari on 7/30/15.
 */
module.exports = function(config){
  var patterns = ['**/*.test.js', '**/*.test.jsx'];
  var setupDir = 'test/setup';
  config.test = {
    patterns: patterns,
    ignorePatterns: this.negate(patterns),
    setup: {
      dir: setupDir,
      script: this.paths(setupDir, 'index.js'),
    },
    coverage: {
      dir: 'coverage',
    },
  };
};