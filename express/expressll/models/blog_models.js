var db=require("./db.js");//链接数据库

exports.sel_all=function(callback){
	var sql="select * from t_blogs order by BLOG_ID asc limit 1";
	db.query(sql,[],callback);
}

exports.sel_by_name=function(uid,callback){
    //var sql="select * from t_blog t_users where t_blogs.WEITER=t_users.USER_ID and t_blogs.WRITER=?"
    var sql="select * from t_blogs,t_users,t_blog_catalogs where t_users.USER_ID=t_blogs.WRITER and t_blogs.CATALOG_ID=t_blog_catalogs.CATALOG_ID and t_blogs.WRITER=?";
    db.query(sql,[uid],callback);
}