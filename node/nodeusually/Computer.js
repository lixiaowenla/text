var Person=require("./Person.js");
var until=require("util");
function Computer(){
    Person.call(this);
    until.inherits(Computer,Person);
    this.teach=function(){
        console.log("coding");
    };
}
module.exports=Computer;