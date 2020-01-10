var express = require('express');
var router = express.Router();
var User=require("../controllers/user.js");//找到user.js文件 USer表示控制器
var Blog=require("../controllers/blog.js");

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'express'});
// });

//注册页面
router.get("/reg",User.reg);
router.post("/reg",User.do_reg);
router.post("/checkname",User.checkname);

//登录功能
router.get("/login",User.login);
router.post("/login",User.do_login);
router.get("/unlogin",User.unlogin);

//主页功能
router.get("/index",Blog.index);
router.get("/uindex",Blog.uindex);


module.exports = router;
