module.exports = function(content) {
    this.cacheable && this.cacheable();
    this.value = content;
    const json = JSON.stringify(content)
      .replace(/\u2028/g, '\\u2028') // 行分隔符, 会被浏览器理解为换行，而在Javascript的字符串表达式中是不允许换行的，从而导致错误。
      .replace(/\u2029/g, '\\u2029'); // 段落分隔符
    return 'module.exports = ' + json;
  };