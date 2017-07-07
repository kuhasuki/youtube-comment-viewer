const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: ["./web/static/css/app.css", "./web/static/js/app.js"],
  output: {
    path: path.resolve(__dirname, "priv/static/js"),
    filename: "app.js"
  },
  resolve: {
    modules: [ "node_modules", __dirname + "/web/static/js" ]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
        presets: ["es2015"]
      }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
    }]
  },
  plugins: [
    new ExtractTextPlugin("css/app.css")
  ]
};