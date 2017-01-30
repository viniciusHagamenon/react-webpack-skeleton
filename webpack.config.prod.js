const { resolve } = require('path')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    './index.jsx',
    // the entry point of our app
  ],
  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(__dirname, 'dist'),

    publicPath: '/',
    // necessary for HMR to know where to load the hot update chunks
  },

  context: resolve(__dirname, 'src'),

  devServer: {},

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader', 'postcss-loader'],
        }),
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compressor: {
        warnings: false,
      },
    }),

    new ExtractTextPlugin('bundle.css'),

    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),

    new HtmlWebpackPlugin({
      template: '../index.html',
      chunksSortMode: 'dependency',
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
