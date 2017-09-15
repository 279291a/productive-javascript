const buffer = {
  entries: [],
  add(s) {
    this.entries.push(s);
  },
  concat() {
    return this.entries.join('');
  },
};

const source = ['867', '-', '5309'];
// source.forEach(buffer.add);
source.forEach(buffer.add, buffer);

// 或者
source.forEach(buffer.add.bind(buffer));
buffer.entries.join('');

function simpleUrl(protocol, domain, path) {
  return `${protocol}://${domain}/${path}`;
}

// const urls = paths.map(path => simpleUrl('http', siteDomain, path));
/**
 * 使用bind方法实现函数柯里化
 */
// const urls = paths.map(simpleUrl.bind(null, 'http', siteDomain));

// 使用字符串封装代码（不要这样做）
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    eval(action);
  }
}

function benchmark() {
  let start = [],
    end = [],
    timings = [];
  repeat(1000,
    'start.push(Date.now());f();end.push(Date.now())');
  for (let i = 0, n = start.length; i < n; i++) {
    timings[i] = end[i] - start[i];
  }
  return timings;
}

// benchmark();

// 使用闭包封装代码
function repeat2(n, action) {
  for (let i = 0; i < n; i++) {
    action();
  }
}

function benchmark2() {
  let start = [],
    end = [],
    timings = [];
  repeat2(1000, () => {
    start.push(Date.now());
    // f();
    end.push(Date.now());
  });
  for (let i = 0, n = start.length; i < n; i++) {
    timings[i] = end[i] - start[i];
  }
  return timings;
}

benchmark2();
