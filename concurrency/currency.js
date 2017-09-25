/**
 * 下述函数错误：优于文件并行下载，事件可以以任意的顺序发生
 */

function downloadAllAsync(urls, onsuccess, onerror) {
  let result = [];
  const length = urls.length;

  if (length === 0) {
    setTimeout(onsuccess.bind(null, result), 0);
    return;
  }

  urls.forEach((url) => {
    downloadAllAsync(url, (text) => {
      if (result) {
        result.push(text);
        if (result.length === url.length) {
          onsuccess(result);
        }
      }
    }, (error) => {
      if (result) {
        result = null;
        onerror(error);
      }
    });
  });
}

// 这种方法依然不可取，因为在给数组更新时，设置一个索引属性，总是确保数组的length 属性值大于索引
function downloadAllAsync2(urls, onsuccess, onerror) {
  let result = [];
  const length = urls.length;

  if (length === 0) {
    setTimeout(onsuccess.bind(null, result), 0);
    return;
  }

  urls.forEach((url, i) => {
    downloadAllAsync(url, (text) => {
      if (result) {
        result[i] = text; // 存储固定位置
        if (result.length === url.length) {
          onsuccess(result);
        }
      }
    }, (error) => {
      if (result) {
        result = null;
        onerror(error);
      }
    });
  });
}

// 正确的实现:不论事件以什么样的顺序发生,pending 计数器都能准确地指出何时所有的事件会被完成，并以适当的顺序返回完整的结果
function downloadAllAsync3(urls, onsuccess, onerror) {
  let result = [];
  const pending = urls.length;

  if (pending === 0) {
    setTimeout(onsuccess.bind(null, result), 0);
    return;
  }

  urls.forEach((url, i) => {
    downloadAllAsync(url, (text) => {
      if (result) {
        result[i] = text; // 存储固定位置
        pending--;
        if (pending === 0) {
          onsuccess(result);
        }
      }
    }, (error) => {
      if (result) {
        result = null;
        onerror(error);
      }
    });
  });
}
