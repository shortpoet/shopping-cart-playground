import chalk from "chalk";
import { inspect } from "util";
require('dotenv').config()
const path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? false : 'source-map'; // inline-source-map
// const chalkLog = require(path.resolve(__dirname, 'src', 'utils', 'chalkLog.ts'));

console.log(chalk.green(`env: ${inspect(process.env.NODE_ENV)}`));
console.log(chalk.green(`port: ${inspect(process.env.PORT)}`));
module.exports = isProduction
  ? {
    entry: './src/server.ts',
    target: 'node',
    mode,
    devtool,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist')
    },
    node: {
      __dirname: false,
      __filename: false,
    }
  }
  : {
    // dev
    entry: {
      app: ['./src/index.tsx'],
      vendor: ['react', 'react-dom']
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].bundle.js'
    },
    target: 'web',
    mode,
    devtool,
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: process.env.PORT
    }
  }
;