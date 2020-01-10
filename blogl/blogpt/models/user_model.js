var db=require("./db.js");

//models写方法 把email pass name 写如数据库 控制器调用model类
exports.insert_name_by_pass=function(email,name,pass,callback){
    var sql ="insert into t_users(ACCOUNT,PASSWORD,NAME) values(?,?,?) ";
    db.query(sql,[email,pass,name],callback);
}

//避免重名
exports.check_same_name=function(email,callback){
    var sql="select * from t_users where ACCOUNT=?";
    db.query(sql,[email],callback);
}

//验证登录
// exports.get_name_by_pass=function(email,pass,callback){
//     var sql="select * from t_users where ACCOUNT=? and  PASSWORD=?";
//     db.query(sql,[email,pass],callback);
// }

exports.get_name_by_pass=function(email,pass,callback){
	var sql="select * from t_users where ACCOUNT=? and PASSWORD=?";
	db.query(sql,[email,pass],callback);
}