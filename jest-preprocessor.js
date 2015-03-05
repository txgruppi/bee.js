var babel = require('babel-core');

module.exports = {
  /**
   * @param  {String} src
   * @param  {String} filename
   * @return {String}
   */
  process: function (src, filename) {
    return babel.transform(src, {
      filename: filename
    }).code;
  }
};
