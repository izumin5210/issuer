const webpack = require('webpack')
const merge = require('webpack-merge')

const base = require('./config.base')

const config = {
  devtool: 'cheap-module-source-map',

  entry: {
    index: [
      './src/index.css',
      './src/index',
    ],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),

    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings:  false,
      },
    }),
  ],
}

module.exports = merge(base, config)
