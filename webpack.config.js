const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './public/app.jsx',
  output: {
    path: resolve(__dirname, 'public/dist'),
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
