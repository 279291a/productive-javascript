// 区分数组和类数组对象

const x = [];

console.log(x instanceof Array);
console.log(Array.isArray(x));
const toString = Object.prototype.toString;

function isArray(arg) {
  return toString.call(arg) === '[object Array]';
}

console.log(isArray(x));
