/* eslint-disable */
// 不要信赖函数对象的toString方法
(function (x) {
  return x + 1;
}).toString(); // 返回函数源代码

/** eslint disable */
(function (x) {
  return x + 1;
}).bind(16).toString(); // 返回function () { [native code] }

//由toString()方法生成的源代码并不展示闭包中保存的与内部变量引用相关的值
(function (x){
  return function(y){
    return x+y;
  }
})(42).toString(); //返回function (y){ \n return x+y; \n}"

//避免使用非标准的栈检查属性

//arguments.callee() 除了允许匿名函数递归地引用其自身之外，就没有更多用途了
var factorial = (function(n){
  return (n<=1)? 1:(n*arguments.callee(n-1));
});

function getCallStack(){
  var stack = [];
  for(var f = getCallStack.caller;f;f = f.caller) {
    stack.push(f);
  }
  return stack;
}

function f1(){
  return getCallStack();
}

function f2(){
  return f1();
}

//简单调用栈
// var trace = f2();
// trace;

//如果某个函数在调用栈中出现不止一次，那么栈检查逻辑将会陷入循环
function f(n){
  return n === 0 ? getCallStack() : f(n-1);
}

var trace = f(1);