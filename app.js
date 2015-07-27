/*global  __dirname */

/** @namespace process.env.COOKIE_SECRET */
/** @namespace process.env.MONGODB_URL */
var config = {
  mongodbUrl: process.env.MONGODB_URL || 'mongodb://localhost/',
  cookieSecret: process.env.COOKIE_SECRET || 'EASTSOFT'
};

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var app = express();

app.io = require('socket.io')();


var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',
  express.static(path.join(__dirname, 'bower_components'), { maxAge: 30 * 24 * 60 * 60 * 1000, etag: false }));


app.use('/', require('./router/index'));

app.io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('scroll', function (msg) {
    console.log(msg);
    socket.broadcast.emit('receive', msg);
    //io.emit('receive', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {

  res.status(404);
  // respond with html page
  if (req.accepts('html')) {
    res.render('404', {
      url: req.url
    });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
    logger.error(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log('___________500___________');
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
