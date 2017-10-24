const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './client/app.jsx',
  output: {
    path: resolve(__dirname, 'client/dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'React': 'react'
    })
  ]
}
