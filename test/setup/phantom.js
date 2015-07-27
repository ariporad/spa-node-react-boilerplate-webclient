/**
 * Created by Ari on 7/27/15.
 */
// PhantomJS doesn't support bind yet
Function.prototype.bind = Function.prototype.bind || function(thisp) {
    var fn = this;
    return function() {
      return fn.apply(thisp, arguments);
    };
  };