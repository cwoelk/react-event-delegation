const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.js');
const compiler = webpack(config);
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.disable('x-powered-by');
app.disable('etag');

app.use(express.static(path.join(__dirname, 'public')));

app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));
app.use(hotMiddleware(compiler));

app.get('/*', (req, res) => res.render(
  'index',
  { title: 'Experiment with React\'s event delegation' }
));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;
