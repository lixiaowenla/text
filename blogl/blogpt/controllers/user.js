
var User_model=require("../models/user_model.js") 
var md5=require("md5");

//reg页面渲染 登录页面
exports.reg=function(req,res,next){
    res.render("reg");//render框架自动自动找到views文件夹
}

//向数据库里插入数据
exports.do_reg=function(req,res,next){
    //express 第三方包bodyparser进行get post提交
    var email=req.body.email;
    var name=req.body.name;
    var pwd=req.body.pwd;
    //var mpwd=md5(pwd);
	//console.log(email);
    User_model.insert_name_by_pass(email,name,pwd,function(err,data){
       // console.log(data);
       //affectedRows 插入成功的标志
       if(data.affectedRows==1){
           res.redirect("/login");
       }else{
           res.redirect("/reg");
       }
    })
}




//避免重名  这个数据拿不到 不知道为什么
exports.checkname=function(req,res,next){
    var email=req.body.email;
	//console.log("email");
    User_model.check_same_name(email,function(err,data){
        //console.log(email);
        if(data.length>0){
            res.json({
                "errmsg":'用户名重名',
                "errno":101
            })
        }else{
            res.json({
                "errmsg":'用户名不重名',
                "errno":1
            })
        }
    })
}

//登录成功之后跳转登录页面
exports.login=function(req,res,next){
    res.render("login");
}

//验证登录
exports.do_login=function(req,res,next){
    var email=req.body.email;
    var pass=req.body.pwd;
    //var mpass=md5(pass);
    User_model.get_name_by_pass(email,pass,function(err,data){
        if(data.length>0){
          // console.log(data); 
          //设置cookie session 安装第三方包  cookie-session express-session 解决跨域问题
          req.session.id=data[0].USER_ID;
          req.session.name=data[0].NAME;
          res.redirect("/index");//跳转到主页
        }
    })
}

//退出登录 删除session 
exports.unlogin=function(req,res,next){
        req.session={};//session是对象，则赋予空值，让他清空
        res.render("/uindex");
}
