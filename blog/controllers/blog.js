var Blog_model=require("../models/blog_model.js");

/*
exports.fenye=function(req,res,next){
	var firstnum=req.query.firstnum;
	//console.log(firstnum);
	var limitnum=2;
	//返回总条数，总页数，根据单页偏移首索引和单页限制显示数返回显示数组
	Blog_model.show_fenye(firstnum,limitnum,function(err,data){
		console.log(data);
	});
}*/

exports.addBlog=function(req,res,next){
	//console.log(req.session);
	//res.render("")
	var uid=req.session.id;
	Blog_model.sel_cata_by_uid(uid,function(err,data){
		//console.log(data);
		if(data.length>0){
			res.render("newBlog",{
				"sess":req.session,
				"catas":data,
			});
		}
	});
}

exports.do_addBlog=function(req,res,next){
	var title=req.body.title;
	var content=req.body.content;
	var cataid=req.body.catalog;
	var uid=req.session.id;

	Blog_model.insert_blog(title,content,cataid,uid,function(err,data){
		//console.log(data);
		if(data.affectedRows==1){
			res.redirect("/index");
		}
	});
	//console.log(title+"||"+content+"||"+cataid);

}

//展示需要更新的页面及数据
exports.updateblog=function(req,res,next){
	//先要拿到bid
	var bid=req.params.bid;
	//console.log(bid);
	Blog_model.sel_blogs_by_bid(bid,function(err,data){
		if(data.length>0){
			//console.log(data);
			var con=data[0];
			var uid=req.session.id;
			Blog_model.sel_cata_by_uid(uid,function(err,data){
				res.render("updateBlog",{
					"sess":req.session,
					"catas":data,
					"con":con,
				})
			})
		}
	});
}

exports.do_updateblog=function(req,res,next){
	var title=req.body.title;
	var content=req.body.content;
	var cataid=req.body.catalog;
	var blogid=req.body.hid;

	Blog_model.update_blog(blogid,title,content,cataid,function(err,data){
		if(data.affectedRows==1){
			res.redirect("/index");
		}
	});
}

exports.deleteblog=function(req,res,next){
	var bid=req.params.bid;
	Blog_model.delete_blog(bid,function(err,data){
		if(data.affectedRows==1){
			res.redirect("/index");
		}
	})
}

exports.searchblog=function(req,res,next){
	var stitle=req.body.q;
	var uid=req.session.id;
	//console.log(stitle);
	Blog_model.search_word(stitle,uid,function(err,data){
		if(data.length>0){
			res.render("index_logined",{
				"sess":req.session,
				"blogs":data,
			})
		}
	})
}

//展示博客添加分类
exports.blogCatalog=function(req,res,next){
	//查找出当前登录者的所有分类数据
	var uid=req.session.id;
	Blog_model.sel_cata_by_uid(uid,function(err,data){
		if(data.length>0){
			res.render("blogCatalogs",{
				"sess":req.session,
				"catas":data,
			});
		}
	})
	
}

exports.index=function(req,res,next){
	//console.log(req.session);
	
	if(req.session.id){
		var uid=req.session.id;
		Blog_model.sel_by_name(uid,function(err,data){
			//console.log(data);;
			//console.log(data[0]);
			if(data.length>0){
				res.render("index_logined",{
					'sess':req.session,
					'blogs':data,
				})
			}
		})
	}else{
		res.redirect('uindex');
	}

	/*
	res.render('index_logined',{
		'sess':req.session,
		'title':'laoshan',
	})*/
}

exports.uindex=function(req,res,next){
	//查出所有的文章 Blog_model
	Blog_model.sel_all(function(err,data){
		//console.log(data);
		if(data.length>0){
			res.render("index",{
				"blogs":data,
			})
		}
	});


	//res.render("index");
}



exports.viewAllPost=function(req,res,next){
	var blogid=req.params.bid;
	//先给CLICK_RATE+1 
	Blog_model.update_hits(blogid,function(err,data){
		if(data.affectedRows==1){
			Blog_model.viewAllPost(blogid,function(err,data){
				if(data.length>0){
					res.render("viewPost_logined",{
						"sess":req.session,
						"sdata":data[0],
					})
				}
			});
		}
	})

	
}