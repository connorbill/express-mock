var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = express.Router();
const mysql = require('mysql');

const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
var {indexRouter} = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');

var app = express();
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});

const {getHomePage} = require('./routes/index');
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');


const db = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'socka'
});
// connect to database
db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});
global.db = db;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.set('view engine', 'ejs'); // configure template engine
// app.use(bodyParser.json()); // parse form data client
// app.use(fileUpload()); // configure fileupload

app.use('/', indexRouter);
app.use('/users', usersRouter);

// app.get('/', getHomePage);
// app.get('/add', addPlayerPage);
// app.get('/edit/:id', editPlayerPage);
// app.get('/delete/:id', deletePlayer);
// app.post('/add', addPlayer);
// app.post('/edit/:id', editPlayer);

// 接口部分
app.use("/api", homeRouter)







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
