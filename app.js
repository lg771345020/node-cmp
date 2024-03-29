var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('./common/logger');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config/config');

var routes = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));
app.locals._layoutFile = 'layout.html';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

//公共参数
app.use(function(req, res, next) {
    res.locals = { title: 'Express',
        user: { province: '湖北', name: 'admin', type: 1 },
        deviceProfile: {total: 30, on: 20, warn: 4, off:10},
        logo: '/public/img/logo.png'
    };
    next();
});
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

if(!module.parent) {
  app.listen(config.port, function () {
      logger.info('listening on ' + config.port);
  });
}
module.exports = app;
