const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

module.exports = {
  entry: ['react-hot-loader/patch',
  "./web/static/css/app.css", "./web/static/js/frontend/index.jsx"],
  output: {
    path: path.resolve(__dirname, "priv/static/js"),
    filename: "app.js"
  },
  resolve: {
    modules: [ "node_modules", __dirname + "/web/static/js" ],
    extensions: ['.js', '.jsx', '.css', '.scss']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
    }]
  },
  plugins: [
    new ExtractTextPlugin("css/app.css"),
    new webpack.HotModuleReplacementPlugin()
  ]
};