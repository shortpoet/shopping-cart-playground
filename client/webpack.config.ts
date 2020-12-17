import chalk from "chalk";
import { inspect } from "util";
import { DefinePlugin } from "webpack";
const dotenv = require('dotenv');
const path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? false : 'source-map'; // inline-source-map
// const chalkLog = require(path.resolve(__dirname, 'src', 'utils', 'chalkLog.ts'));

console.log(chalk.green(`env: ${inspect(process.env.NODE_ENV)}`));
console.log(chalk.green(`port: ${inspect(process.env.PORT)}`));
module.exports = (env: any, options: any) => {
  const envFile = dotenv.config({
    path: `./env/${options.stage || 'development'}.env`
  }).parsed;

  return isProduction
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
      },
      output: {
        publicPath: '',
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash].js'
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
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
          '@constants': path.resolve(__dirname, 'src/common/constants'),
          '@interfaces': path.resolve(__dirname, 'src/common/interfaces')
        }
      },
      node: {
        __dirname: false,
        __filename: false,
      },
      plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
        new webpack.HotModuleReplacementPlugin(),
        new DefinePlugin({ 'process.env': JSON.stringify(envFile) })
      ],
      devServer: {
        contentBase: 'dist',
        historyApiFallback: true,
        port: process.env.PORT,
        hot: true,
        inline: true,
        open: true
      }
    }
};