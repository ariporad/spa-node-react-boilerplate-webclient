/*eslint no-var:0, prefer-const:0*/
/**
 * Created by Ari on 7/30/15.
 */

/**
 * Adds config.clean.ignore with a list of files to never clean
 * @param {Object} config
 */
module.exports = function clean(config) {
  var ignore = this.negate(
    config.bundle + '*',
    config.bundle.replace(config.dir.build + '/', '') + '*',
    'node_modules/**',
    config.dir.src + '/**'
  );

  config.clean = { ignore: ignore };
};
