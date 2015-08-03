/**
 * Created by Ari on 7/27/15.
 */

// PhantomJS doesn't support bind yet, so polyfill it.
Function.prototype.bind = Function.prototype.bind || function(thisp) {
    var fn = this;
    return function() {
      return fn.apply(this, arguments);
    };
  };