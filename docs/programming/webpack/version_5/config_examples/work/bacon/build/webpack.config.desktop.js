//static build webpack settings
const webpack = require('webpack');
const environment = require('./environment');
const eslintFormatter = require('eslint-formatter-pretty');

const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
  mode: environment.env,
  target: 'electron-main',
  devtool: environment.env === 'development' ? 'inline-source-map' : false,
  watch: environment.env === 'development',

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

  entry: './platform/desktop/main.ts',

  output: {
    libraryTarget: 'umd',
    filename: `[name].js`,
    path: environment.dist,
  },

  optimization: {
    minimize: environment.env === 'production',
    minimizer: [new TerserPlugin()],
  },

  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)?$/,
        use: [{loader: 'babel-loader'}],
        exclude: /node_modules(\/|\\).*/,
      },
    ]
  },

  plugins: [
    new webpack.DefinePlugin(environment.main.globals),
  ],
};

if (environment.env === 'development') {
  config.plugins.push(
    new ESLintPlugin({
      files: ['src/**/*.ts', 'src/**/*.tsx', 'platform/**/*.ts', 'platform/**/*.tsx'],
      exclude: 'node_modules',
      extensions: ['ts', 'tsx'],
      formatter: eslintFormatter
    }),
  );
}

module.exports = config;
