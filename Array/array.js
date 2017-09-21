/*eslint-disable*/
const dict = { alice: 34, bob: '24', chris: 62 };
const people = [];

for (const name in dict) {
  people.push(`${name}: ${dict[name]}`);
}

console.log(people);

function NaiveDict() {}

NaiveDict.prototype.count = () => {
  let i = 0;
  for (const name in this) {
    i++;
  }
  return i;
};

NaiveDict.prototype.toString = () => '[object NaiveDict]';

const dict2 = new NaiveDict();

dict2.alice = 34;
dict2.bob = 24;
dict2.chris = 62;
console.log(dict2);
console.log(dict2.count()); // 287。。。。。。

// var dict3= new Array();
const dict3 = {};

dict3.alice = 34;
dict3.bob = 24;
dict3.chris = 62;

Array.prototype.first = function () {
  return this[0];
};

Array.prototype.last = function () {
  return this[this.length - 1];
};

// var names = [];
const names = [];
for (const name in dict3) {
  names.push(name);
}

console.log(names);

// 自定义自己的迭代抽象

function takeWhile(a, pred) {
  const result = [];
  const n = a.length;
  for (let i = 0; i < n; i++) {
    if (!pred(a[i], i)) {
      break;
    }
    result[i] = a[i];
  }
  return result;
}
var prefix = takeWhile([1,2,4,9,44,21,2,6],function(n){
  return n<10;
});

console.log(prefix);

//使用forEach 来实现takeWhile函数将会是一个尴尬的尝试
function takeWhile2(a, pred) {
  const result = [];
  a.forEach(function(x,i){
    if(!pred(x)){
      break;
    }
    result[i] = x;
  })
  return result;
}

//使用内部一场来提前终止该循环，但是这既尴尬又效率低下

function takeWhile3(a,pred){
  var result = [];
  var earlyExit = {};
  try{
    a.forEach(function(x,i){
      if(!pred(x)){
        throw earlyExit;
      }
      result[i]= x;
    });
  } catch(e){
    if( e!== earlyExit){
      throw e;
    }
  }
  return result;
}