const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/script.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        // 파일명이 .css로 끝나는 모든 파일에 적용
        test: /\.css$/,
        // 배열 마지막 요소부터 오른쪽에서 왼쪽 순으로 적용
				// 먼저 css-loader가 적용되고, styled-loader가 적용되어야 함!
        use: ["style-loader", "css-loader"],
				// loader가 node_modules 안의 있는 내용도 처리하기 때문에 node_modules는 제외
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "src", "index.html")
  })]
};