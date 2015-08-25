/**
 * Created by Ari on 7/19/15.
 */

import _ from 'underscore';

// We have to do this because brfs doesn't work with babel, and we need it to
// inline things.
const fs = require('fs');
const path = require('path');


const commonString = fs.readFileSync(path.resolve(__dirname, 'env/common.json'),
                                     'utf8');
const common = JSON.parse(commonString);

const configString = fs.readFileSync(
  path.resolve(__dirname, 'env',
               (process.env.NODE_ENV || 'development') + '.json'),
  'utf8');
let config = JSON.parse(configString) || {};

// Since require only requires something once, then references it, we don't
// want to mess it up.
config = _.extend(_.clone(common), config);

/**
 * @exports {Object} ./env/common & ./env/{NODE_ENV} merged.
 */
export { config as default, config };
