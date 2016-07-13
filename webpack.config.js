const path = require('path');
const webpack = require('webpack');

module.exports = {
  //devtool: 'inline-source-map',
  entry: './app/main.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  watch: true,
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
};
