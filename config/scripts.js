/*eslint no-var:0, prefer-const:0*/
/**
 * Created by Ari on 7/30/15.
 */
module.exports = function(config){
  var scripts = config.scripts = {
    mainFile: config.dir.scripts + '/index.jsx',
    files: this.prefix(config.dir.scripts)('**/*.js', '**/*.jsx'),
    tests: config.test.patterns,
  };

  scripts.noTests = config.scripts.files.concat(config.test.ignorePatterns);
};