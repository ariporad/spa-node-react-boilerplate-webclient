/**
 * Created by Ari on 7/19/15.
 */

import _ from 'underscore';

// We have to do this because brfs doesn't work with babel, and we need it to
// inline things.
const fs = require('fs');
const path = require('path');


const common = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'env/common.json'), 'utf8'));
let config = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'env', (process.env.NODE_ENV || 'development') + '.json'), 'utf8')) || {};

// Since require only requires something once, then references it, we don't
// want to mess it up.
config = _.extend(_.clone(common), config);

export { config as default, config };
