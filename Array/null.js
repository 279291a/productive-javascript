/*eslint-disable */
function C() {}
C.prototype = null;

const o = new C();
Object.getPrototypeOf(o) === null;
Object.getPrototypeOf(o) === Object.prototype;
