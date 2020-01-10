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




// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'blog'//数据库名字
// });
 
// //插入
// exports.inser_name_by_pass=function(email,name,pwd,callback){
//       var sql="insert into t_users(ACCOUNT,PASSWORD,NAME) values(?,?,?)";
//       db.query(sql,[eamil,pass,name],callback);
// }

// exports.check_same_name=function(eamil,callback){
//   var sql="select * from t_users where ACCOUNT=?";
//   db.query(eamil,callback);
// }

// exports.get_name_by_pass(email,pass,function(err,data){
//   if(data.length>0){
//     console.log(data);
//   }
// })




/*
//为了让这个数据公布给外部，把他封装到一个函数里
exports.insert_data=function(callback){//为了将result传给user.js 我们采用回调调回调的方式
    connection.connect();//链接数据库

    connection.query('SELECT * from user', function (error, results, fields) {
    if (error) throw error;
    //console.log('The solution is: ', results[0].solution);
   // console.log(result);
   callback(error,results);
    connection.end();
    });

}
*/