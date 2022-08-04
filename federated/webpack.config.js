/* eslint-disable @typescript-eslint/naming-convention */
/* eslint @typescript-eslint/no-var-requires: "off" */

const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

let config;
let distLocation = "dev-dist";

config = {
  entry: "./src/index",
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    watchFiles: path.join(__dirname, "src"),
    static: path.join(__dirname, distLocation),
    port: 3002,
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  plugins: [],
  output: {
    publicPath: "auto",
    filename: "main.js",
    chunkFilename: "asset-[id].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  stats: {
    errorDetails: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "Federated",
      filename: "remoteEntry.js",
      exposes: {
        "./FederatedClass": "./src/federated-class.js"
      },
      remotes: {},
      shared: {
        lit: {
          singleton: true,
          eager: true,
        },
      },
    }),
  ],
};

module.exports = config;
