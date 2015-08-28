/*eslint no-var:0, prefer-const:0*/
require('dotenv/config');
var config = require('./config');
var webpack = require('webpack');

var dev = process.env.NODE_ENV === 'development';
var prod = process.env.NODE_ENV === 'production';
var test = process.env.NODE_ENV === 'test';

var jsLoaders = ['babel'];

if (dev) jsLoaders.unshift('react-hot');

var webpackConfig = module.exports = {
  entry: [
    "./src/index.jsx"
  ],
  output: {
    // Remove the filename from the path
    path: __dirname +
          '/' +
          config.bundle.split('/').slice(0, -1).join('/') +
          '/',
    publicPath: "/",
    // Extract filename
    filename: config.bundle.split('/').slice(-1)[0] + 'js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: jsLoaders,
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  devtool: "source-map",
};

if (prod) {
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({}));
} else if (dev) {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );

  config.entry.unshift(
    'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server'
  );
}