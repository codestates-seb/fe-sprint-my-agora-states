// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/script.js",
  output: {
    path: path.resolve(__dirname, "docs"), // './dist'의 절대 경로를 리턴합니다.
    filename: "app.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.png$/,
        use: [{ loader: "file-loader", options: { name: "[name].[ext]" } }],
      },
      {
        test: /\.svg$/,
        use: [{ loader: "file-loader", options: { name: "[name].[ext]" } }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
  ],
};
