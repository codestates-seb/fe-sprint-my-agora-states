const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry : './src/App.js',
  output : {
    path : path.resolve(__dirname, 'docs'),
    filename : 'appbundle.js'
  },
  module : {
    rules : [
      {
      test : /\.css$/,
      use : ['style-loader', 'css-loader'],
      exclude : /node_modules/
    }, 
    {
      test : /\.png$/,
      use : {
        loader : 'file-loader',
        options : {
          name : '[name].[ext]'
        }
      }
    }]
  },
  plugins : [new HtmlWebpackPlugin({
    template : path.resolve(__dirname, 'src', 'index.html')
  })]
}