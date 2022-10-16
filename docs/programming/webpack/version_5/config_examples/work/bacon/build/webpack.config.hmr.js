const webpack = require('webpack');
const merge = require( 'webpack-merge');

const CopyWebpackPlugin = require( 'copy-webpack-plugin');
const HtmlWebpackPlugin = require( 'html-webpack-plugin');

const baseConfig = require( './webpack.config.base');
const environment = require('./environment');

const config = merge(baseConfig, {
  mode: 'development',
  devtool: environment.env === 'development' ? (process.env.SOURCE_MAP === 'production' ? 'source-map' : 'eval') : false,

  entry: {
    app: [
      `webpack-hot-middleware/client?path=http://localhost:${environment.port}/__webpack_hmr`,
      './src/index.tsx'
    ],

    vendor: [
      '@brightsign/bs-link-resolver',
      '@brightsign/bs-content-manager',
      '@brightsign/bs-widgets',
      '@brightsign/bscore',
      '@brightsign/bacon-core',
      '@brightsign/bsdatamodel',
      '@brightsign/bsnconnector',
      '@brightsign/bs-publisher',
      '@brightsign/fsconnector',
      'dexie',
      'flexboxgrid',
      'lodash',
      'material-ui',
      'moment',
      'moment-range',
      'normalize.css',
      'prop-types',
      'react',
      'react-dnd',
      'react-dnd-html5-backend',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'redux-promise',
      'redux-thunk',
      'reselect',
      'tinycolor2',
      'xml2js',
      'workerpool'
    ]
  },

  optimization: {
    minimize: false,
    runtimeChunk: 'single',

    /*splitChunks:
      {
        names: ['app', 'vendor'],
        filename: '[name].js',
        minChunks: Infinity
      }*/
  },

  output: {
    path: environment.dist,
    filename: '[name].js',

    publicPath : `http://localhost:${environment.port}/`
  },

  module: {
    rules: [{
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      use: [{loader: 'url-loader', options: {limit: 10000, mimetype: 'application/font-woff'}}]
    },{
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      use: [{loader: 'url-loader', options: {limit: 10000, mimetype: 'application/font-woff'}}]
    },{
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: [{loader: 'url-loader', options: {limit: 10000, mimetype: 'application/octet-stream'}}]
    },{
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: [{loader: 'file-loader'}]
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    environment.platform === 'desktop'
      ?
      new CopyWebpackPlugin([{
        from: 'platform/desktop/index.html'
      }])
      : new HtmlWebpackPlugin({
        filename: './index.html',
        template: 'src/index.html',
        inject: true
      }),
  ]
});

module.exports = config;
