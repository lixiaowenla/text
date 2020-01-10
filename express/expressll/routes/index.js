var express = require('express');
var router = express.Router();
var User=require('../controllers/user.js');
var Blog=require('../controllers/blog.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'laoshan' });//res.render渲染模板页面index.ejs  title变量 
});
/*
// 属于业务逻辑，应该写在controller里面
router.get('/www',function(req,res,next){
  res.render("reg.ejs");
});
*/
 //注册功能
 router.get("/reg",User.reg);//当改变路由时就跳转到新页面
router.post("/reg",User.do_reg);//点击触发跳转
 router.post("/checkname",User.checkname);

//登录功能
 router.get("/login",User.login);
 router.post("/login",User.do_login);
 router.get("/unlogin",User.unlogin);


 //主页功能
 router.get("/index",Blog.index);
 router.get("/uindex",Blog.uindex);


var express = require('express');
var router = express.Router();
var User=require("../controllers/user.js");
var Blog=require("../controllers/blog.js");

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,'name':'laoshan'});
});



//注册功能
router.get("/reg",User.reg);
router.post("/reg",User.do_reg);
router.post("/checkname",User.checkname);

//登录功能
router.get("/login",User.login);
router.post("/login",User.do_login);


//主页功能
router.get("/index",Blog.index);
router.get("/uindex",Blog.uindex);

module.exports = router;