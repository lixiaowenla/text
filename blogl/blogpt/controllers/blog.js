//需要注意的是 session加密之后不能再js 使用
exports.index=function(req,res,next){
    //console.log(req.session)
    res.render('index_logined',{
        'sess':req.session,
        'title':'laoshan',//标志位
    })
}

//退出登录 进入未登录页面
 exports.uindex=function(req,res,next){
     console.log(123);
     res.render("index ");
 }

