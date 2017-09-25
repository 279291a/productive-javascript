/*eslint-disable*/
function Alert(parent, message, opts) {
  opts = extend({
    width: 320,
    heght: 240,
  });
}

function extend(target, source) {
  if (source) {
    for (const key in source) {
      const val = source[key];

      if (typeof val !== 'undefined') {
        target[key] = val;
      }
    }
  }
  return target;
}
