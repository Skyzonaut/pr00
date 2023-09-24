var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactsRouter = require('./routes/contacts');
var ventesRouter = require('./routes/ventes');
var postersRouter = require('./routes/posters');
var caisseRouter = require('./routes/caisse');
var racletteRouter = require('./routes/raclette');
var videoprojecteurRouter = require('./routes/videoprojecteur');
var associationRouter = require('./routes/association');
var wikiRouter = require('./routes/wiki');
var loginRouter = require('./routes/login')
var manuelsRouter = require('./routes/manuels');
var mentionsRouter = require('./routes/mentions');
var profilRouter = require('./routes/profil');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const sessionDureeMax = 1000 * 60 * 60 * 2;

app.use(sessions({
  secret: "votre_secret",
  saveUninitialized: false,
  cookie: { maxAge: sessionDureeMax },
  resave: false
}));
//cookie parser middleware
app.use(cookieParser())
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts', contactsRouter);
app.use('/ventes', ventesRouter);
app.use('/posters', postersRouter);
app.use('/caisse', caisseRouter);
app.use('/raclette', racletteRouter);
app.use('/videoprojecteur', videoprojecteurRouter);
app.use('/association', associationRouter);
app.use('/wiki', wikiRouter);
app.use('/login', loginRouter)
app.use('/mentions', mentionsRouter);
app.use('/profil', profilRouter)
app.use('/manuels', manuelsRouter)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //define base userType
  res.locals.userType = "user";

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
