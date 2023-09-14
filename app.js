var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactsRouter = require('./routes/contacts')
var ventesRouter = require('./routes/ventes');
var postersRouter = require('./routes/posters');
var caisseRouter = require('./routes/caisse');
var racletteRouter = require('./routes/raclette');
var videoprojecteurRouter = require('./routes/videoprojecteur');
var associationRouter = require('./routes/association');





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts', contactsRouter);
app.use('/ventes', ventesRouter);
app.use('/posters', postersRouter);
app.use('/caisse', caisseRouter);
app.use('/raclette', racletteRouter);
app.use('/videoprojecteur', videoprojecteurRouter);
app.use('/association', associationRouter);






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
