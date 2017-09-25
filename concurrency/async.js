function countdown(n) {
  if (n === 0) {
    return 'done';
  }
  return countdown(n - 1);
}

countdown(10000); // 参数为100000时，RangeError 


function abs(x) {
  return Math.abs(x);
}

function negative(x) {
  return abs(x) * -1;
}

console.log(negative(42));
