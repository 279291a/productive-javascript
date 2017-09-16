/* eslint-disable */
const dict = { alice: 34, bob: '24', chris: 62 };
const people = [];

for (const name in dict) {
  people.push(`${name}: ${dict[name]}`);
}

console.log(people);

function NaiveDict(){}

NaiveDict.prototype.count = () => {
  let i = 0;
  for(var name in this){
    i++;
  }
  return i;
}

NaiveDict.prototype.toString = () => {
  return '[object NaiveDict]'
}

const dict2 = new NaiveDict();

dict2.alice = 34;
dict2.bob = 24;
dict2.chris = 62;
console.log(dict2)
console.log(dict2.count()); //287。。。。。。

// var dict3= new Array();
var dict3= {};

dict3.alice = 34;
dict3.bob = 24;
dict3.chris = 62;

Array.prototype.first = function(){
  return this[0];
}

Array.prototype.last = function(){
  return this[this.length -1];
}

// var names = [];
var names = [];
for(var name in dict3){
  names.push(name);
}

console.log(names)

