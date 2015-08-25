/*eslint no-var:0, prefer-const:0*/
/**
 * Created by Ari on 7/30/15.
 */


/**
 * Add browserify configuration and transforms to config
 * @param {Object} config, the existing configuration, which will be get added to.
 */
module.exports = function(config) {
  var browserify = config.browserify = {
    transform: [
      "babelify",
      ["extensify", { "extensions": ["jsx"] }],
      "dotenvify",
      "envify",
      "brfs"
    ],
  };

  if (this.dev) {
    var options = browserify.options = {
      basedir: this.paths(__dirname, '..', config.to.src(config.dir.scripts)[0]),
      debug: true,
    };
  }
};
