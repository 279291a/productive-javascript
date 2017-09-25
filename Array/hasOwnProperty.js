/* eslint-disable*/

const empty = Object.create(null);
'__proto__' in empty; // false  in chrome and firefox

const hasown = {}.hasOwnProperty;
hasown.call(empty, '__proto__'); // false  in chrome and firefox

function Dict(elements) {
  this.elements = elements || {};
  this.hasSpecialProto = false;
  this.specialProto = undefined;
}

Dict.prototype.has = function (key) {
  if (key === '__proto__') {
    return this.hasSpecialProto;
  }

  return {}.hasOwnProperty.call(this.elements, key);
};

Dict.prototype.get = function (key) {
  if (key === '__proto__') {
    return this.specialProto;
  }
};

Dict.prototype.set = function (key, val) {
  if (key === '__proto__') {
    this.hasSpecialProto = true;
    this.specialProto = val;
  } else {
    this.elements[key] = val;
  }
};

Dict.prototype.remove = function (key) {
  if (key === '__proto__') {
    this.hasSpecialProto = false;
    this.specialProto = undefined;
  } else {
    delete this.elements[key];
  }
};

const ary = [
  {
    name: 'Hank',
    points: 1110100,
  },
  {
    name: 'Steve',
    points: 1064500,
  },
  {
    name: 'Billy',
    points: 1050200,
  },
];

// 要求按顺序，不要使用for..in
function report(highScores) {
  let result = '';
  let i = 1;
  for (const name in highScores) {
    result += `${i}.${highScores[name].name}:${highScores[name].points}\n`;
    i++;
  }
  return result;
}

report(ary);

function report2(highScores) {
  let result = '';
  for (let i = 0; i < highScores.length; i++) {
    const score = highScores[i];
    result += `${i + 1}.${score.name}:${score.points}\n`;
  }
  return result;
}

report2(ary);

const ratings = {
  'Good will Hunting': 0.8,
  'Mystic River': 0.7,
  21: 0.6,
  Doubt: 0.9,
};

let total = '',
  count = 0;

for (const key in ratings) {
  total += ratings[key];
  count++;
}

// total /= count;
total;

// es5中提供更友好的机制用于在Object.prototype  中增加属性，设置其可枚举属性为false，使其在for..in循环中不可见

Object.defineProperty(Object.prototype, 'allKeys', {
  value() {
    const result = [];
    for (const key in this) {
      result.push(key);
    }
    return result;
  },
  writable: true,
  enumerable: false,
  configurable: false,
});

function WorkSet() {
  this.entries = new Dict();
  this.count = 0;
}

WorkSet.prototype.isEmpty = () => this.count === 0;

WorkSet.prototype.add = (key, val) => {
  if (this.entries.has(key)) {
    return;
  }
  this.entries.set(key, val);
  this.count++;
};

WorkSet.prototype.get = key => this.entries.get(key);

WorkSet.prototype.remove = (key) => {
  if (!this.entries.has(key)) {
    return;
  }
  this.entries.remove(key);
  this.count--;
};

Dict.prototype.pick = () => {
  for (const key in this.elements) {
    if (this.has(key)) {
      return key;
    }
  }
  throw new Error('empty dictionary');
};

WorkSet.prototype.pick = () => this.entries.pick();

function Member(name) {
  this.name = name;
  this.friends = [];
}

const a = new Member('alice');
const b = new Member('Bob');
const c = new Member('carol');
const d = new Member('dieter');
const e = new Member('eli');
const f = new Member('fatima');

a.friends.push(b);
b.friends.push(c);
c.friends.push(e);
d.friends.push(b);
e.friends.push(d, f);

// Member.prototype.inNetwork = (other) => {
//   const visited = {};
//   const worklist = [this];

//   while (worklist.length > 0) {
//     const member = worklist.pop();
//     if (member.name in visited) {
//       continue;
//     }
//     visited[member.name] = member;
//     if (member === other) {
//       return true;
//     }
//     member.friends.foreach((friend) => {
//       worklist.push(friend);
//     });

//     return false;
//   }
//   // workset.add(this.name , this);
//   // while(!workset.isEmpty()){
//   //   const name = workset.pick();
//   //   const member = workset.get(name);
//   //   workset.remove(name);

//   //   if(name in visited){
//   //     continue;
//   //   }
//   // }
// };

// console.log(a.inNetwork(f));

const cache = new Dict();

function downloadCachingAsync(url, onsuccess, onerror) {
  if (cache.has(url)) {
    onsuccess(cache.get(url));
    return;
  }
  return downloadCachingAsync(url, (file) => {
    cache.set(url, file);
    onsuccess(file);
  }, onerror);
}

downloadCachingAsync('file.txt', (file) => { // rangeError
  console.log('finished');
});

console.log('starting');   

function downloadCachingAsync2(url, onsuccess, onerror) {
  if (cache.has(url)) {
    const cached = cache.get(url);
    setTimeout(onsuccess.bind(null,cached), 0);
    return;
  }
  return downloadCachingAsync(url, (file) => {
    cache.set(url, file);
    onsuccess(file);
  }, onerror);
}