// Make ESLint treat this as ES5
/*eslint no-var:0, prefer-const:0, vars-on-top:0, no-unused-vars:0*/
/**
 * Created by Ari on 7/8/15.
 */

//
// Transformations
//
var config = module.exports = {};
var keys = ['dir',
            'clean',
            'scripts',
            'style',
            'test',
            'nodeInspector'];

keys.forEach(function createConfigProp(key) {
  config[key] = {};
});

//
// Helpers
//

var makeHelper = config.makeHelper = function makeHelper(helper) {
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

//
// Build Config
//
config.dir.build = 'build';
config.dir.src = 'src';

// Only bundle the scripts
config.bundle = config.dir.build + '/bundle.';

//
// Helpers
//
var negate = config.negate = makeHelper(function mapNegate(p) {
  return '!' + p;
});

var prefixPath = config.prefixPath = function prefixPath(path) {
  return makeHelper(function mapPrefix(p) {
    return path
             .replace(config.dir.build, '')
             .replace(config.dir.src,  '')
             .replace(config.dir.dist, '') + '/' + p;
  });
};

var toBuild = config.toBuild = prefixPath(config.dir.build);
var toSrc = config.toSrc = prefixPath(config.dir.src);

//
// Cleaning
//
config.clean.ignore = negate(
  config.bundle + '*',
  config.bundle.replace(config.dir.build + '/', '') + '*',
  'node_modules/**/*.*',
  config.dir.src + '/**/*'
);


//
// Scripts
//
config.test.patterns = ['**/*.test.js', '**/*.test.es', '**/*.test.es6'];
config.test.ignorePatterns = negate(config.test.patterns);

config.scripts.mainFile = config.dir.build + '/js/index.es6';
config.scripts.files =
  prefixPath(config.dir.build + '/js')(['**/*.js', '**/*.es', '**/*.es6']);
config.scripts.tests = prefixPath(config.build.dir)(config.test.patterns);
config.scripts.noTests = config.scripts.files.concat(config.test.ignorePatterns);

//
// Stylesheets
//
config.style.stylus = ['**/*.styl'];
config.style.css = ['**/*.css'];
config.style.all = config.style.stylus.concat(config.style.css);
