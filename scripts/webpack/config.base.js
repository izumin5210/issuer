const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const root = path.resolve(__dirname, '..', '..')

const styleExtractor = new ExtractTextPlugin({
  filename:  '[name]-[hash].css',
  allChunks: true,
  disable:   false,
})

const env = process.env.NODE_ENV || 'development'

module.exports = {
  resolve: {
    modules: [
      path.join(root, 'src'),
      'node_modules',
    ],
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test:    /\.js?$/,
        use:     [
          { loader: 'eslint-loader' },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.js?$/,
        use:  [
          { loader: 'babel-loader' },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use:  styleExtractor.extract({
          fallback: 'style-loader',
          use:            [
            {
              loader:  'css-loader',
              options: {
                modules:        true,
                sourceMap:      true,
                localIdentName: '[name]-[local]-[hash:base64:5]',
              },
            },
            { loader: 'postcss-loader' },
          ],
        }),
      },
      {
        test: /\.(?:jpe?g|png|svg)$/,
        use:  [
          {
            loader:  'file-loader',
            options: {
              name: '[name]-[hash].[ext]',
            },
          },
        ],
      },
    ],
  },

  output: {
    filename:   '[name]-[hash].js',
    path:       path.join(root, 'dist'),
    publicPath: `${process.env.CDN_HOST || ''}/`,
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      test:    /\.css$/,
      options: {
        postcss: bundle => [
          require('postcss-smart-import')({
            addDependencyTo: bundle,
            plugins:         [
              require('stylelint'),
            ],
          }),
          require('postcss-custom-properties'),
          require('postcss-apply'),
          require('postcss-nesting'),
          require('autoprefixer'),
          require('postcss-csso'),
          require('postcss-reporter'),
        ],
        context: __dirname,
      },
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${env}"`,
    }),

    styleExtractor,

    new HtmlWebpackPlugin({
      title:    'issuer',
      filename: 'index.html',
      template: 'src/index.html',
      inject:   true,
    }),
  ],

  externals: [
  ],

  target: 'web',
}
