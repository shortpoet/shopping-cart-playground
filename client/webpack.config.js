const path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? false : 'source-map'; // inline-source-map
module.exports = [
  {
    // dev
    entry: {
      app: ['./src/app/App.tsx', 'webpack-hot-middleware/client'],
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
    ]
  }
];