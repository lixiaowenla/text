var createError = require('http-errors');
var express = require('express');
var path = require('path');//path为原生模块 加载path模块 
var cookieParser = require('cookie-parser');//解析cookie 
var logger = require('morgan');//记录服务器日志
var bodyParser=require('body-parser');
var cookieSession=require('cookie-session');
var session=require('express-session');
var indexRouter = require('./routes/index');//自定义模块 加载路由文件
var usersRouter = require('./routes/users');

var app = express();//app即为express

// view engine setup
app.set('views', path.join(__dirname, 'views'));//set是设置全局变量  告诉电脑 ejs文件位置 views 下面的views 5让人
app.set('view engine', 'ejs');//配置ejs引擎  用ejs引擎解析ejs文件 

app.use(cookieSession({
  name:"session",
  keys:["0123456789"],
  maxAge:2*24*60*60*1000
}))
app.use(logger('dev'));//use是将函数方法变为全局
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//path处理路径  path.join拼接路径 静态资源管理器 得传静态资源进来才能使用 
//public 表示静态资源管理器 不能修改 
app.use('/', indexRouter);//通过指定路径跳转
app.use('/users', usersRouter);

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

module.exports = app;//把app公布给外部
