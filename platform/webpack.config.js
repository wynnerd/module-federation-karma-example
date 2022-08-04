/* eslint-disable @typescript-eslint/naming-convention */
/* eslint @typescript-eslint/no-var-requires: "off" */

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const { merge } = require('webpack-merge');
const moduleFederationConfig = require('./federation.config.json');

const commonConfig = {
  output: {
    publicPath: 'auto',
    filename: 'main.js',
    chunkFilename: 'asset-[id].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
      {
        test: /.(scss|css)$/,
        use: [{ loader: 'lit-css-loader' }, { loader: 'sass-loader' }],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
    plugins: [new TsconfigPathsPlugin()],
  },
  stats: {
    errorDetails: true,
  },
  plugins: [new NodePolyfillPlugin()],
};

const distLocation = 'dev-dist';

const config = merge(commonConfig, {
  entry: './src/index',
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    watchFiles: path.join(__dirname, 'src'),
    static: path.join(__dirname, distLocation),
    port: 3001,
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  plugins: [
    new ModuleFederationPlugin(moduleFederationConfig),
  ],
});

module.exports = config;
