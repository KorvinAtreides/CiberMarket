const path = require(`path`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const CopyPlugin = require(`copy-webpack-plugin`);
const webpack = require("webpack");

module.exports = {
  entry: "./src/main.js",
  module: {
    rules: [
      { test: /\.svg$/, use: "svg-inline-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(js)$/, use: "babel-loader" },
    ],
  },
  output: {
    path: path.resolve(__dirname, "bundle"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    publicPath: `http://localhost:8080/`,
    hot: true,
    compress: true,
  },
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({
      template: `./public/html/index.html`,
      filename: "./index.html",
    }),
    new HtmlWebpackPlugin({
      template: `./public/html/company.html`,
      filename: "./company.html",
    }),
    new HtmlWebpackPlugin({
      template: `./public/html/branch.html`,
      filename: "./branch.html",
    }),
    new HtmlWebpackPlugin({
      template: `./public/html/login.html`,
      filename: "./login.html",
    }),
    new HtmlWebpackPlugin({
      template: `./public/html/pageProduct.html`,
      filename: "./pageProduct.html",
    }),
    new HtmlWebpackPlugin({
      template: `./public/html/personalCabinet.html`,
      filename: "./personalCabinet.html",
    }),
    new HtmlWebpackPlugin({
      template: `./public/html/productCatalog.html`,
      filename: "./productCatalog.html",
    }),
    new HtmlWebpackPlugin({
      template: `./public/html/register.html`,
      filename: "./register.html",
    }),
  ],
};
