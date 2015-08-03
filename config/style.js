/*eslint no-var:0, prefer-const:0*/
/**
 * Created by Ari on 7/30/15.
 */

/**
 * Adds a script property to config with various configuration pertaining to
 * building the stylesheets.
 *
 * @param {Object} config the config object to add stylesheets config onto.
 */
module.exports = function(config){
  config.style = {
    stylus: ['**/*.styl'],
    css: ['**/*.css']
  };
  config.style.all = config.style.stylus.concat(config.style.css);
};