/* eslint-disable*/

var empty = Object.create(null);
'__proto__' in empty;  // false  in chrome and firefox

var hasown = {}.hasOwnProperty;
hasown.call(empty,'__proto__'); // false  in chrome and firefox

function Dict(elements){
  this.elements = elements || {};
  this.hasSpecialProto = false;
  this.specialProto = undefined;
}

Dict.prototype.has = function(key) {
  if(key === '__proto__'){
    return this.hasSpecialProto;
  }

  return {}.hasOwnProperty.call(this.elements, key);
};

Dict.prototype.get = function(key){
  if(key === '__proto__'){
    return this.specialProto;
  }
}

Dict.prototype.set = function(key, val){
  if(key === '__proto__'){
    this.hasSpecialProto = true;
    this.specialProto = val;
  }else{
    this.elements[key] = val;
  }
}

Dict.prototype.remove = function(key){
  if(key === '__proto__'){
    this.hasSpecialProto = false;
    this.specialProto = undefined;
  }else{
    delete this.elements[key];
  }
}

const ary =[
  {
    name:'Hank',
    points:1110100
  },
  {
    name:'Steve',
    points:1064500
  },
  {
    name:'Billy',
    points:1050200
  },
];

//要求按顺序，不要使用for..in
function report(highScores){
  var result = '';
  var i = 1;
  for(var name in highScores){
    result += i+ '.'+highScores[name].name + ':'+ highScores[name].points + '\n';
    i++;
  }
  return result;
}

report(ary);

function report2(highScores){
  var result = '';
  for(var i = 0;i<highScores.length;i++){
    var score = highScores[i];
    result += (i+1) + '.' + score.name + ':' +score.points+ '\n';
  }
  return result;
}

report2(ary);

var ratings = {
  'Good will Hunting': 0.8,
  'Mystic River':0.7,
  "21":0.6,
  "Doubt":0.9
};

var total = '' ,count = 0;

for(var key in ratings){
  total += ratings[key];
  count++;
}

// total /= count;
total;

//es5中提供更友好的机制用于在Object.prototype  中增加属性，设置其可枚举属性为false，使其在for..in循环中不可见

Object.defineProperty(Object.prototype,'allKeys',{
  value:function(){
    var result = [];
    for(var key in this){
      result.push(key)
    }
    return result;
  },
  writable:true,
  enumerable:false,
  configurable:false
})