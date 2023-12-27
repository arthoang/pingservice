var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var DBG = require('debug');
var rfs = require('rotating-file-stream');

var indexRouter = require('./routes/index');
var serviceRouter = require('./routes/service');


var app = express();

app.use(logger(process.env.REQUEST_LOG_FORMAT || 'dev', {
    stream: process.env.REQUEST_LOG_FILE ? 
      rfs.createStream(process.env.REQUEST_LOG_FILE, {
        size: '10M',
        interval: '1d',
        compress: 'gzip'
      })
      : process.stdout
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/ping/', serviceRouter);


module.exports = app;
