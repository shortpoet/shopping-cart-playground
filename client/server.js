const path = require('path'),
  express = require('express'),
  webpack = require('webpack'),
  webpackConfig = require('./webpack.config.js'),
  app = express(),
  port = process.env.PORT || 8888,
  chalkLog = require('./src/utils/chalkLog'),
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

app.use(webpackDevMiddleware);
app.use(webPackHotMiddleware);
app.use(staticAssets);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => { chalkLog('green', `App is listening on port ${port}`) });
