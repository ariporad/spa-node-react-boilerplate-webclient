/*eslint no-var:0, prefer-const:0*/
/**
 * Created by Ari on 7/30/15.
 */

/**
 * Adds some helpers to config
 * @param {Object} config
 */
module.exports = function helpers(config){
  /**
   * Accepts a helper function, and returns a function which will combine any
   * number of strings and map them with helper.
   *
   * @name makeHelper
   * @type {Function}
   * @param {Function} helper A function which is passed to map with the argunents of the returned functions.
   * @returns {Function} Pass in any number of Arrays or Strings, and they will be mapped with helper.
   */
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

  /**
   * Combines paths, then prepends each item with '!' (negate it for globbing).
   *
   * @name negate
   * @type {Function}
   * @param {...(Array|String)} paths Any number of Strings of Arrays
   */
  this.negate = config.negate = this.helper(function mapNegate(p) {
    return '!' + p;
  });

  /**
   * Accepts a string (path), returns a helper which prefixes any arguments with the path.
   *
   * Will remove config.dir.build or config.dir.src from any arguments to helper
   *
   * @name prefixPath
   * @see {@link makeHelper}
   * @type {Function}
   * @param {String} A path to prepend to the arguments to the returned helper.
   * @returns {Function} A helper, which prepends path to all arguments
   */
  this.prefix = config.prefix = function prefixPath(path) {
    return this.helper(function mapPrefix(p) {
      return path + '/' + p
                          .replace(config.dir.build + '/', '')
                          .replace(config.dir.src + '/', '');
    });
  }.bind(this);

};
