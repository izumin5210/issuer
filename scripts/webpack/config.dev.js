const webpack = require('webpack')
const merge = require('webpack-merge')

const base = require('./config.base')

const config = {
  devtool: 'inline-source-map',

  entry: {
    index: [
      'react-hot-loader/patch',
      './src/index.css',
      './src/index',
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.LoaderOptionsPlugin({ minimize: false, debug: true }),
  ],
}

module.exports = merge(base, config)
