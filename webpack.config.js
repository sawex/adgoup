const path = require('path');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './assets/js/main.js'),
  mode: 'production',
  output: {
    filename: 'main.min.js',
    path: path.resolve(__dirname, './assets/js/'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.js$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  devtool: 'source-map',
};
