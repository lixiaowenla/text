var Person=require("./Person.js");
var until=require("util");
function Student(){
    Person.call(this);//父类全部拷贝给子类
    until.inherits(Student,Person);//子类的构造函数访问父类
    this.study=function(){
        console.log('i am study');
    };
}
module.exports=Student;//公布给外部