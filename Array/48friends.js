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

Member.prototype.inNetWork = (other) => {
  const vistited = {};
  const workset = {};

  workset[this.name] = this;

  for (const name in workset) {
    const member = workset[name];
    delete workset[name];
    if (name in vistited) {
      continue;
    }
    vistited[name] = member;
    if (member === other) {
      return true;
    }
  }
};

