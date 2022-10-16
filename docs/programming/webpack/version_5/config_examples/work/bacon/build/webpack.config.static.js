//static build webpack settings
const webpack = require('webpack');
const merge = require( 'webpack-merge');

const CopyWebpackPlugin = require( 'copy-webpack-plugin');
const HtmlWebpackPlugin = require( 'html-webpack-plugin');

const baseConfig = require( './webpack.config.base');
const environment = require('./environment');

module.exports = merge(baseConfig, {
  devtool: environment.env === 'development' ? (process.env.SOURCE_MAP === 'production' ? 'source-map' : 'eval') : false,
  watch: (environment.env === 'development'),

  entry: {
    app: [
      './src/index.tsx'
    ],

    vendor: [
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

  output: {
    filename: `[chunkhash].js`,
    path: environment.dist,
    publicPath: './'
  },

  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [{loader: 'url-loader', options: {limit: 100000, name: '[name].[ext]'}}]
      },
    ]
  },

  plugins: [
  /*  new webpack.optimize.CommonsChunkPlugin({
      names: ['app', 'vendor'],
      filename: '[name].js',
      minChunks: Infinity
    }),*/
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: 'src/index.html',
      inject: true
    }),
    new CopyWebpackPlugin([
      { from: 'src/static' }
    ]),
  ],
});
