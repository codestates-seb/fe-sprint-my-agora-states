const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { fileURLToPath } = require('url');

module.exports = {
  entry: './src/script.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'app.bundle.js',
    publicPath: '.',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
  ],
};
