var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require("passport");
const passportJWT = require("./Config/passportJWTStrategy");
const session = require("express-session");

var config = require('./Config/config');
const db = require('./Config/dbconnection');

var indexRouter = require('./routes/index');
var dishRouter = require('./routes/dishes');
var leaderRouter = require('./routes/leaders');
var promotionRouter = require("./routes/promotion");
var usersRouter = require('./routes/users');
const uploadRouter = require("./routes/uploadRouter");

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/leaders',leaderRouter);
app.use('/dishes',dishRouter);
app.use('/promotion',promotionRouter);
app.use('/imageUpload',uploadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;

// "C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe" --dbpath="c:\data\db"
