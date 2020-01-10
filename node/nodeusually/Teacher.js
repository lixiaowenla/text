var Person=require("./Person.js");
var until=require("util");
function Teacher(){
    Person.call(this);
    until.inherits(Teacher,Person);
    this.teach=function(){
        console.log("teaching");
    };
}
module.exports=Teacher;