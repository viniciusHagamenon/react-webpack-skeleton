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
    filename: 'js/bundle.[hash:8].js',
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
        test: /\.(jpe?g|png|gif|svg)/,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: '/images/[name].[hash:8].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              optimizationLevel: 3,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|sass|scss)$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader', 'postcss-loader', 'sass-loader'],
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

    new ExtractTextPlugin('css/bundle.[hash:8].css'),

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
