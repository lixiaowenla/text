var db=require("./db.js");

exports.insert_name_by_pass=function(email,name,pass,callback){
	var sql="insert into t_users(ACCOUNT,PASSWORD,NAME) values(?,?,?)";
	db.query(sql,[email,pass,name],callback);
}

exports.check_same_name=function(email,callback){
	var sql="select * from t_users where ACCOUNT=?";
	db.query(sql,[email],callback);
}

exports.get_name_by_pass=function(email,pass,callback){
	var sql="select * from t_users where ACCOUNT=? and PASSWORD=?";
	db.query(sql,[email,pass],callback);
}

/*
exports.select_all=function(callback){
	var sql='select * from t_users where ACCOUNT=?';
	db.query(sql,['aa'],callback);
}

exports.insert_name_by_pass=function(name,pass,nickname,callback){
	var sql="insert into t_users(ACCOUNT,PASSWORD,NAME) values(?,?,?)";
	db.query(sql,[name,pass,nickname],callback);
}

exports.sel_name_by_pass=function(name,pass,callback){
	var sql="select * from t_users where ACCOUNT=? and PASSWORD=?";
	db.query(sql,[name,pass],callback);
}*/

/*
增
insert into 表名(列名,列名,....) values(值,值,.....)

删
delete from 表名 where id=1

改
update 表名 set 列名=值,列名=值 where id=2

查

select * from 表名
select * from  表名 where condition*/