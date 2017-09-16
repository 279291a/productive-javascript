/*eslint-disable */
function C() {}
C.prototype = null;

const o = new C();
Object.getPrototypeOf(o) === null;  //false
Object.getPrototypeOf(o) === Object.prototype;   //true

var x = Object.create(null);
Object.getPrototypeOf(x) === null;  //true

var y = {__proto__:null};
y instanceof Object;  //false