/**
 * Created by Ari on 7/19/15.
 */
const config =
  require('./env/' + (process.env.NODE_ENV || 'development') + '.json') || {};

export default config;
export { config };
