/*eslint no-var:0, prefer-const:0*/
/**
 * Created by Ari on 7/30/15.
 */

module.exports = function build(config) {
  var dir = config.dir = {
    build: 'build',
    src: 'src',
    test: {
      setup: 'test/setup',
    },
    scripts: 'js',
    style: 'styl',
  };

  config.bundle = config.dir.build + '/bundle.';

  this.to = config.to = {
    build: this.prefix(dir.build),
    src: this.prefix(dir.src),
    base: this.prefix(''),
  };

  config.toBuild = config.to.build;
  config.toSrc = config.to.src;
};
