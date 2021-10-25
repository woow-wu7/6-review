//  loader就是一个函数，参数是源码字符串

module.exports = function (source, map, meta) {
  console.log(`map`, map);
  console.log(`meta`, meta);
  return source.replace("hello", "hi!");
};
