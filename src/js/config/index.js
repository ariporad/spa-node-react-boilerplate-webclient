/**
 * Created by Ari on 7/19/15.
 */

import _ from 'underscore';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const env = process.env.NODE_ENV || 'development';
const common = JSON.parse(readFileSync(resolve(__dirname, '/env/common.json')));
let config = JSON.parse(readFileSync(resolve(__dirname, 'env', env + '.json'))) || {};

// Since require only requires something once, then references it, we don't
// want to mess it up.
config = _.extend(_.clone(common), config);

export { config as default, config };
