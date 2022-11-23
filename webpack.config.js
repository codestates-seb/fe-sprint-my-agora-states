const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
  entry : './src/App.js',
  devtool : 'inline-source-map',
  devServer : {
    static: './docs',
  },
  optimization : {
    runtimeChunk : 'single'
  },
  output : {
    path : path.resolve(__dirname, 'docs'),
    filename : '[name].bundle.js',
    clean : true
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

module.exports = (env, arg) => {
  if (arg.mode === 'development') {
    config.devtool = 'source-map';  
  }

  if (arg.mode === 'production') {
  }

  return config;
}