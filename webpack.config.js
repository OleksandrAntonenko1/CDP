const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    page: './frontend/js/page.js',
    page2: './frontend/js/page2.js',
    notification: './frontend/header/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'js')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

