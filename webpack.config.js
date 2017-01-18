"use strict";
var webpack = require('webpack');
var path = require('path');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

module.exports = {
  entry: [
    './src/index.js' // your app's entry point
  ],
    resolve: {
    extensions: ['', '.js']
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: "babel-loader",
    }],
  },
};
