var User_model=require("../models/user_model.js");
var md5=require("md5");
//此页面写方法
//注册 将注册方法公布给外部


exports.checkname=function(req,res,next){
    var email=req.body.email;
    User_model.check_same_name(email,function(err,data){
        if(data.length>0){
            res.json({
                'errmsg':'用户名重名',
                'errno':101,
            })
        }else{
            res.json({
                'errmsg':'用户名不重名',
                'errno':1,
            })
        }
    })
}
exports.login=function(req,res,next){
	res.render("login");
}

exports.do_login=function(req,res,next){
	var email=req.body.email;
	var pass=req.body.pwd;
	//var mpass=md5(pass);

	User_model.get_name_by_pass(email,pass,function(err,data){
		if(data.length>0){
			//console.log(data);
			//设置cookie session ---第三方包 cookie-session
			//npm install cookie-session --save 
			//npm install express-session --save
			req.session.id=data[0].USER_ID;
			req.session.name=data[0].NAME;
			res.redirect("/index");
		}
	})
}

exports.reg=function(req,res,next){
    res.render("reg.ejs");//reg.ejs表示一个页面  这个页面在views文件下
}
exports.do_reg=function(req,res,next){

	//Express框架第三包处理post提交
	var email=req.body.email;
	var name=req.body.name;
	var pwd=req.body.pwd;
	//var mpwd=md5(pwd);
	//console.log(email);把email name pwd存储到数据库
	//MVC  Model(数据库代码) 控制器要调用model类
	User_model.insert_name_by_pass(email,name,pwd,function(err,data){
		//console.log(data);
		if(data.affectedRows==1){
			res.redirect("/login");
		}else{
			res.redirect("/reg");
		}
	})
	
}


exports.unlogin=function(req,res,next){
    req.session={};
    res.redirct("/index");
}

