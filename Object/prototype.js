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

