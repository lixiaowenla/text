var db=require("./db.js");
var moment = require('moment');

exports.sel_all=function(callback){
	var sql="select * from t_blogs order by BLOG_ID asc limit 1";
	db.query(sql,[],callback);
}

exports.sel_by_name=function(uid,callback){
	//var sql="select * from t_blogs,t_users where t_blogs.WRITER=t_users.USER_ID and t_blogs.WRITER=?";
	
	var sql="select * from t_blogs,t_users,t_blog_catalogs where t_users.USER_ID=t_blogs.WRITER and t_blogs.CATALOG_ID=t_blog_catalogs.CATALOG_ID and t_blogs.WRITER=?";
	db.query(sql,[uid],callback);
}

exports.sel_cata_by_uid=function(uid,callback){
	var sql="select * from t_blog_catalogs where USER_ID=?";
	db.query(sql,[uid],callback);
}

exports.insert_blog=function(title,content,cataid,uid,callback){
	var ntime=moment().format("YYYY-MM-DD hh:mm:ss");
	var sql="insert into t_blogs(TITLE,CONTENT,WRITER,CATALOG_ID,ADD_TIME) values(?,?,?,?,?)";
	//console.log(sql);
	db.query(sql,[title,content,uid,cataid,ntime],callback);
}

exports.sel_blogs_by_bid=function(blogid,callback){
	var sql="select * from t_blogs where BLOG_ID=?";
	db.query(sql,[blogid],callback);
}

exports.update_blog=function(blogid,title,content,cataid,callback){
	var sql="update t_blogs set TITLE=?,CONTENT=?,CATALOG_ID=? where BLOG_ID=?";
	db.query(sql,[title,content,cataid,blogid],callback);
}

exports.delete_blog=function(bid,callback){
	var sql="delete from t_blogs where BLOG_ID=?";
	db.query(sql,[bid],callback);
}

exports.search_word=function(stitle,uid,callback){
	var sql="select * from t_blogs where TITLE like '%"+stitle+"%' and WRITER="+ uid;
	db.query(sql,[],callback);
}

exports.viewAllPost=function(bid,callback){
	var sql="select * from t_blogs where BLOG_ID=?";
	db.query(sql,[bid],callback);
}

exports.update_hits=function(bid,callback){
	var sql="update t_blogs set CLICK_RATE=CLICK_RATE+1 where BLOG_ID=?";
	db.query(sql,[bid],callback);
}

//处理分页
/*
exports.show_fenye=function(firstnum,limitnum,callback){
	console.log(firstnum);
	console.log(limitnum);
	var sql="select * from t_blogs limit "+firstnum+","+limitnum;
	db.query(sql,[],callback);
}*/