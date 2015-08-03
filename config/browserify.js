/*eslint no-var:0, prefer-const:0*/
/**
 * Created by Ari on 7/30/15.
 */

module.exports = function(config) {
  var browserify = config.browserify = {
    transform: [
      "babelify",
      ["extensify", { "extensions": ["jsx"] }],
      "envify",
      "brfs"
    ],
  };

  if (this.dev) {
    var options = browserify.options = {
      basedir: this.paths(__dirname, '..', config.to.build(config.dir.scripts)[0]),
      debug: true,
    };
  }
};
