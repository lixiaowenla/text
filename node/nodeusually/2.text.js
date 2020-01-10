function Person(){
    this.say=function(){
        console.log("saying");
    };
}
module.exports=Person; 
//预编译 require不是预编译
//function var 预编译
//exprots  module.exports 的区别 非常重要 解决了面向对象一个问题：封装  private public protect



//下面讲述继承
//:: 静态方法调用 
//静态方法和动态方法的区别
//return 是函数 ,return返回的是地址+1
//栈 堆（方法） 代码段 静态区
//fution 执行完之后就销毁，下一次从头再来  弱类型可以用闭包 强类型语言用static
//操作系统 文件分为 可执行文件 和不可执行文件  可执行文件有个头 Windows叫pe Linux叫ELF
//es5 没有不能继承 只能用propotype


//node 怎样解决继承？
//首先得明白继承得解决2个事
//1.父类的public变量和方法可以被子类访问  //原生js怎样解决这些方法    原生js含有：call() apply() bind()
//2.子类构造方法可以访问父类的构造方法  call()配合inherits()
// 文档util.inherits  在子类的propotype加上父类的propotype 通过setprotetype方法实现
//node特性 :异步触发 单线程 消息循环（事件队列event）   

//继承实例??????????????????????????? inherit的继承及原理
//call()  

//annimal
function Annimal(){
    this.say=function(){
        console.log("saying");
    };
}
module.exports=Annimal; 
//duck 是静态
var Annimal=require("./anm.js");
var until=require("util");
function Duck(){
    Annimal.call(this);
    until.inherits(Duck,Annimal);//Duck访问构造函数 this访问类
    this.say=function(){
        console.log("saying");
    };
}
var duck=new Duck();
module.exports=Duck;


//具体实现
var Annimal=require("./anm.js");
var Duck=require("./anm.js");
var annimal=new Annimal;
var bird=new Bird;

Annimal.say();
Duck.say();

//bird 动态访问
var Annimal=require("./anm.js");
var until=require("util");
function Bird(){
    Annimal.call(this);
    until.inherits(Bird,Annimal);
    this.say=function(){
        console.log("jiji");
    };
}
module.exports=Bird;