/* eslint-disable */
function Dir(path, entries) {
  this.path = path;
  for (let i = 0, n = entries.length; i < n; i++) {
    this[i] = entries[i];
  }
}

Dir.prototype = Object.create(Array.prototype);

const dir = new Dir('./', ['index.html', 'script.js', 'index.css']);
console.log(dir.length);

const dir2 = new Dir('/', []);
Object.prototype.toString.call(dir2);
Object.prototype.toString.call([]);

function Dir2(path, entries) {
  this.path = path;
  this.entries = entries;
}

Dir2.prototype.forEach = (f, thisArg) => {
  if (typeof thisArg === 'undefined') {
    thisArg = this;
  }
  this.entries.forEach(f, thisArg);
};

Dir2.prototype.forEach = (f, thisArg) => {
  if (typeof thisArg === 'underfined') {
    thisArg = this;
  }
  this.entries.forEach(f, thisArg);
};

Array.prototype.split = i => [this.slice(0, 1), this.slice(i)];
Array.prototype.split = () => {
  const i = Math.floor(this.length / 2);
  return [this.slice(0, i), this.slice(i)];
};

function addArrayMethods() {
  Array.prototype.split = () => [this.slice(0, i), this.slice(i)];
}
