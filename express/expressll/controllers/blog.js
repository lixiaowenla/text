var Blog_model=require("../models/blog_models.js")


exports.index=function(req,res,next){
    //console.log(req.session);
    var uid=req.session.id;
    Blog_model.sel_by_name(uid,function(err,data){
        //console.log(data);
        if(data.length>0){
            res.render("index",{
                'blogs':data,
            })
        }
    })
    res.render('index_logined',{//index_logined.ejs
        'sess':req.session,
        'title':'laoshan',
    })
}
exports.uindex=function(req,res,next){

    //查文章所有文章
    Blog_model.sel_all(function(err,data){
        if(data.length>0){
            res.render('index',{
                "blogs":data,
            })
        }
    });
    res.render("index");
}