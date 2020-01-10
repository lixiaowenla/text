var User_model=require("../models/user_model.js");
var md5=require("md5");

exports.a=function(req,res,next){
	var str="laoshan loves laoxie";
	//next(str);
	next();
}

exports.bb=function(req,res,next){
	res.send("hello world");
}

exports.checkname=function(req,res,next){
	var email=req.body.email;
	//console.log(email);
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

/*
地址:http://localhost:3000/checkname
作用:验证是否重名
方式:post
传参:{{'email':val}} //val是用户名input的值
返回值:
{
				'errmsg':'用户名重名',
				'errno':101,
			}
{
				'errmsg':'用户名不重名',
				'errno':1,
			}*/


exports.reg=function(req,res,next){
	//要将reg页面渲染出来 reg.html  reg.ejs Express框架 render()
	res.render("reg");

	/*  用原生的方式渲染
	var indexPath=__dirname+'/views/'+url.parse("reg,ejs").pathname;
	var indexData=fs.readFileSync(indexPath,"utf-8");
	res.writeHead(200,{"Content-type":"text/html"});
	res.end(indexData);*/

}

//TCP(传输层)4  HTTP(应用层)7

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
	/*
	var postChunk="";
	req.setEncoding("utf8");
	req.addListener("data",function(){

	});

	req.addListener("end",function(){

	})*/
}

exports.unlogin=function(req,res,next){
	req.session=null;
	res.redirect("/uindex");
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

/*

exports.upload=function(req,res,next){
	res.render("upload");
}

exports.do_upload=function(req,res,next){

}

exports.getid=function(req,res,next){
	var id=req.params.id;
	res.send(id);
}

exports.a=function(req,res,next){
	var ss="hello,end";
	next(ss);
}

exports.test=function(ss,req,res,next){
	res.send(ss);
}

exports.reg=function(req,res,next){
	res.render("reg");
}

exports.do_reg=function(req,res,next){
	//1、接收用户名和密码
	var name=req.body.email;
	var pass=req.body.pwd;
	var nickname=req.body.name;

	//console.log(name);
	//console.log(nickname);
	//2、控制器把用户名 密码传递给model处理
	User_model.insert_name_by_pass(name,pass,nickname,function(err,data){
		//console.log(data);
		if(data.affectedRows==1){
			res.redirect("/login");
		}else{
			res.json({
				'errmsg':'注册用户失败',
				'errno':1,
			})
		}
	});
}

exports.unlogin=function(req,res,next){
	req.session=null;
	res.render("index");
}

exports.login=function(req,res,next){
	//console.log(123);
	res.render("login");
}

exports.do_login=function(req,res,next){

	var name=req.body.email;
	var pass=req.body.pwd;

	User_model.sel_name_by_pass(name,pass,function(err,data){
		//console.log(data);
		if(data.length>0){
			//req.session=data;
			req.session.id=data[0].USER_ID;
			req.session.name=data[0].NAME;

			//console.log(req.session);
			
			res.render("index_logined",{
				'sess':req.session,
				'title':"laoshan",
			})
		}
	});

	
	//接收用户名和密码
	var name=req.body.username;
	var pass=req.body.pass;
	//console.log(name);
	//console.log(pass);
	User_model.select_all(function(err,data){
		//console.log(data);
		if(data.length>0){
			res.json({
				'errmsg':'查询成功',
				'errno':101,
				'data':data[0],
			});
		}else{
			res.json({
				'errmsg':'查询失败',
				'errno':1,
				'data':'',
			})
		}
	});
}*/

/*
exports.parse=function(req,res,next){
	var xx=req.query.yy;
	console.log(xx);
}

exports.check=function(req,res,next){
	var val=req.body.value;
	//console.log(val);
	if(val=="laoshan"){
		res.json({
			errmsg:"接收正常",
			errno:101,
		});
	}else{
		res.json({
			errmsg:"接收err",
			errno:1,
		})
	}
	
}*/


/*
exports.arrnum=function(req,res,next){

	var newarr=[{'id':1,'name':'laoshan','age':19},{'id':2,'name':'laoxie','age':25}];
	res.render('dns',{
		'errno':101,
		'arr':newarr,
	})
	
	res.json({
		'newarr':[{'id':1,'name':'laoshan'},{'id':2,'name':'laoxie'}],
		'errno':101,
	})
}*/