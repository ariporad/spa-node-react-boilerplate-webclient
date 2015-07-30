/*eslint no-var:0, prefer-const:0*/
/**
 * Created by Ari on 7/30/15.
 */

module.exports = function helpers(config){
  console.log(this);
  this.helper = config.helper = function makeHelper(helper) {
    return function helperWrapper(paths) {
      var Paths = [];
      var arg;
      var i;
      for (i = 0; i < arguments.length; i++) {
        arg = arguments[i];
        switch (typeof arg) {
          case typeof []:
            Paths = Paths.concat(arg);
            break;
          case typeof 'string':
            Paths.push(arg);
            break;
          default:
            break;
        }
      }

      return Paths.map(helper);
    };
  };

  this.negate = config.negate = this.helper(function mapNegate(p) {
    return '!' + p;
  });

  this.prefix = config.prefix = function prefixPath(path) {
    return this.helper(function mapPrefix(p) {
      return path + '/' + p
                          .replace(config.dir.build + '/', '')
                          .replace(config.dir.src + '/', '');
    });
  }.bind(this);

};
