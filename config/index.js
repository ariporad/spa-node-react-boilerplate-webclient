/*eslint no-var:0, prefer-const:0*/
/**
 * Created by Ari on 7/30/15.
 */
var _ = require('underscore');
var path = require('path');

/**
 * The config that will eventually be exported.
 * @name config
 * @type {{}}
 */
var config = {};

/**
 * The this for all config files that will be loaded. Used for internal data,
 * not exported.
 *
 * @type {{_: (_|exports|module.exports), path: *, paths: (*|resolve|Function),
 *   env: (string|string|string), test: boolean, dev: boolean, prod: boolean,
 *   debug: boolean}}
 */
var context = {
  // This line looks really stupid, but it's actual code that does stuff.
  _: _,
  path: path,
  paths: path.resolve,
  env: process.env.NODE_ENV,
  test: process.env.NODE_ENV == 'test',
  dev: process.env.NODE_ENV == 'development',
  prod: false,
  debug: true,
};

if ((!context.test && !context.dev) || process.env.NODE_ENV == 'production') {
  context.prod = true;
  context.debug = false;
}

//config.env = context.env;
//config.debug = context.debug;

var configFiles = ['helpers',
                   'build',
                   'clean',
                   'test',
                   'scripts',
                   'style',
                   'browserify',
                  ];
for (var i = 0; i < configFiles.length; i++) {
  require('./' + configFiles[i]).call(context, config);
}

/**
 * @export {Object} config
 * @type {{}}
 */
module.exports = config;
