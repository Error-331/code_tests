const path = require('path');
const webpack = require('webpack');
const eslintFormatter = require('eslint-formatter-pretty');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const environment = require('./environment');

const config = {
  mode: environment.env,
  target: (environment.platform === 'browser') ? 'web' : 'electron-renderer',
  cache: {
    type: 'memory'
  },

  node: {
    __dirname: false
  },

  resolve: {
    extensions: ['.js', '.jsx','.ts', '.tsx', '.json'],

    importsFields: environment.platform === 'desktop' ? ['main'] : ['browser', 'main'],
    mainFields: environment.platform === 'desktop' ? ['main'] : ['browser', 'main'],

    byDependency: {
      esm: {
        mainFields: environment.platform === 'desktop' ? ['main'] : ['browser', 'main'],
        aliasFields: environment.platform === 'desktop' ? ['main'] : ['browser', 'main'],
      },

      commonjs: {
        mainFields: environment.platform === 'desktop' ? ['main'] : ['browser', 'main'],
        aliasFields: environment.platform === 'desktop' ? ['main'] : ['browser', 'main'],
      },

      url: {
        preferRelative: true,
      },
    }
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js'
  },

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              autoprefixer: {
                add: true,
                remove: true,
                browsers: ['last 2 versions'],
              },

              discardComments: { removeAll: true },

              discardUnused: false,
              mergeIdents: false,
              reduceIdents: false,
            },
          ],
        },
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)?$/,
        use: [{loader: 'babel-loader', options: {compact: false}}],
        exclude: /node_modules(?!((\/|\\)@brightsign(\/|\\)bsn-ui)(\/|\\)).*/,
        resolve: {
          mainFields: environment.platform === 'desktop' ? ['main'] : ['browser', 'module', 'main']
        }
      },

      {
        test: /\.global\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
        ]
      },

      {
        test: /^((?!\.global).)*\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {

              sourceMap: true,
              importLoaders: 1,

              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              }
            }
          },
        ]
      },

      {
        test: /\.(sass|scss)$/,
        use: [
          environment.env === 'development' ? { loader: 'style-loader' } :

          {
            loader: MiniCssExtractPlugin.loader,
          },

          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
          'sass-loader',
        ],
      },

      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{loader: 'url-loader', options: {limit: 10000, mimetype: 'image/svg+xml'}}]
      },

      {
        test: /^((?!\.global).)*\.(png|jpg|jpeg|gif)$/,
        use: [{loader: 'url-loader', options: {limit: 8192}}]
      },
    ],
  },

  plugins: [
    //new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin(environment.render.globals),
    new CopyWebpackPlugin([
      {
        context: 'node_modules/@brightsign/bs-device-artifacts/static',
        from: '**/*',
        to: './static'
      },
      {
        context: 'node_modules/@brightsign/bs-configurator/dist',
        from: 'bsConfigurator.manifest.json',
        to: './config'
      },
      {
        context: 'node_modules/@brightsign/fsmetadata/dist',
        from: '**/*',
        to: './'
      },
      {
        context: 'node_modules/zip.js/WebContent/',
        from: 'deflate.js',
        to: './'
      },
      {
        context: 'node_modules/zip.js/WebContent/',
        from: 'inflate.js',
        to: './'
      },
      {
        context: 'node_modules/zip.js/WebContent/',
        from: 'z-worker.js',
        to: './'
      }
    ]),
  ],
};

if (environment.env === 'development'){
  config.module.rules.unshift(
    {
      test: /\.js$/,
      enforce: 'pre',
      loader: 'source-map-loader',
    },
  );

  config.plugins.unshift(
      new ESLintPlugin({
        files: ['src/**/*.ts', 'src/**/*.tsx', 'platform/**/*.ts', 'platform/**/*.tsx'],
        exclude: 'node_modules',
        extensions: ['ts', 'tsx'],
        formatter: eslintFormatter
      }),
  );
} else {
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  );
}

module.exports = config;
