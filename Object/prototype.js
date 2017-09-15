/* eslint-disable */
// proototype、__proto__和getprototypeOf 的不同
function User(name, passwordHash) {
  this.name = name;
  this.passwordHash = passwordHash;
}

User.prototype.toString = function () {
  return `[User+${this.name}]`;
};

User.prototype.checkPassword = function (password) {
  return hash(password) === this.passwordHash;
};

const u = new User('who', 'care');
// 不要修改__proto__
Object.getPrototypeOf(u) === User.prototype;
u.__proto__ === User.prototype;

const empty = Object.create(null);
'__proto__' in empty; // false

//使用构造函数与new 操作符无关

//①
function User1(name, passwordHash) {
  if(!(this instanceof User1)){
    return new User1(name,passwordHash);
  }

  this.name = name;
  this.passwordHash = passwordHash;
}

const x = User1('w','xl');
const y = new User1('w','xl');

console.log(x instanceof User1);
console.log(y instanceof User1);

//②
function User2(name,passwordHash){
  var self = this instanceof User2
    ? this
    : Object.create(User2.prototype);
  self.name = name;
  self.passwordHash = passwordHash;

  return self;
}

const a = User2('w','xl');
const b = new User2('w','xl');

console.log(a instanceof User2);
console.log(b instanceof User2);

function UserAnother(name,passwordHash){
  this.toString = function(){
    return `[name${name}]`;
  }
  this.checkPassword = function(password){
    return hash(password) === passwordHash
  }
}