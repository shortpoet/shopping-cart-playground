const path = require('path'),
  express = require('express'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  webpackConfig = require('../webpack.config.ts'),
  app = express(),
  port = process.env.PORT || 8888,
  compiler = webpack(webpackConfig),
  webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true
    }
  }),
  webPackHotMiddleware = require('webpack-hot-middleware')(compiler),
  staticAssets = express.static(path.resolve(__dirname, 'dist'));
import chalk from 'chalk';
import { Request, Response } from 'express';

app.use(() => new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }));
app.use(webpackDevMiddleware);
app.use(webPackHotMiddleware);
app.use(staticAssets);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => console.log(chalk.green(`App is listening on port ${port}`)));
// app.listen(port, () => { chalkLog(chalk.green, `App is listening on port ${port}`) });
