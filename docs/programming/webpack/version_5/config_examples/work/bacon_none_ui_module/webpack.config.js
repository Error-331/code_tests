module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  devtool: process.env.SOURCE_MAPS === 'true' ? 'eval' : false,

  entry: './lib/main.ts',
  output: {
    path: __dirname + '/dist',
    filename: 'bspl.js',
    library: 'bs-playlist-dm',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  externals: {
    'lodash': 'commonjs lodash',
    'redux': 'commonjs redux',
    'redux-thunk': 'commonjs redux-thunk',
    '@brightsign/bscore': 'commonjs @brightsign/bscore'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      }
    ]
  }
};
