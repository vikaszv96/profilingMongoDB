var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser =  require('body-parser');
var logger = require('morgan');
var expressHbs =  require('express-handlebars');

var config = require('./config');

var mongoose = require('mongoose');

mongoose.connect(config.dbConnstring, {   
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
 })
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log("error:",err);
});

global.City = require('./models/city');
global.State = require('./models/state');
global.User = require('./models/user');

var indexRouter = require('./routes/index');
var stateCityRouter = require('./routes/stateCities');
var userRouter = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//setting up the RegisterHelper
var hbsss = expressHbs.create({
  // Specify helpers which are only registered on this instance.
 // layoutsDir: path.join(__dirname, 'views/mainLayout'),
 // partialsDir: path.join(__dirname, 'views/pieces'),

  helpers: {
    sum: function (num) {
      return (num+90);
    }
    }

});
//
app.engine('handlebars', hbsss.engine);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.use('/', indexRouter);
app.use('/', stateCityRouter);
app.use('/', userRouter);

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
