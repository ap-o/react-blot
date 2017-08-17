const webpack = require('webpack');
const Merge = require('webpack-merge');

const BaseConfig = require('./webpack.config.js');

module.exports = Merge(BaseConfig, {

  // dev tool
  devtool: 'source-map',

  plugins: [

    // loader options
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    // uglify
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })

  ]

});
