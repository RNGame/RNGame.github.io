const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const ROOT = path.resolve(__dirname, "src");
const DESTINATION = path.resolve(__dirname, "dist");

module.exports = (env, argv) => {
  const isDev = argv.mode !== "production";
  
  const config = {
    context: ROOT,

    entry: {
      main: "./main.ts",
    },

    output: {
      filename: "[name].bundle.js",
      path: DESTINATION,
    },

    resolve: {
      extensions: [".ts", ".js", ".scss"],
      modules: [ROOT, "node_modules"],
    },
    optimization: {
      concatenateModules: false,
      providedExports: false,
      usedExports: false,
    },

    module: {
      rules: [
        /****************
         * PRE-LOADERS
         *****************/
        {
          enforce: "pre",
          test: /\.js$/,
          use: "source-map-loader",
        },
        {
          enforce: "pre",
          test: /\.ts$/,
          exclude: /node_modules/,
          use: "tslint-loader",
        },

        /****************
         * LOADERS
         *****************/
        {
          test: /\.ts$/,
          exclude: [/node_modules/],
          use: "awesome-typescript-loader",
        },
        {
          test: /\.(s?)css$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
            "sass-loader",
          ],
        },
      ],
    },

    devtool: "cheap-module-source-map",
    devServer: {},
    plugins: [
      new HtmlWebpackPlugin({
        template: "index.html",
      }),
      new HtmlWebpackPlugin({
        filename: 'rngeddon.html',
        template: 'rngeddon.html',
        chunks: ['main']
      }),
      new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css'
      }),
      new CopyPlugin({
        patterns: [{ from: "res", to: "res" }],
      }),
    ],
  };
  return config;
};
