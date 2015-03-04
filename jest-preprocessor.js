var to5 = require('6to5-core');

module.exports = {
  /**
   * @param  {String} src
   * @param  {String} filename
   * @return {String}
   */
  process: function (src, filename) {
    return to5.transform(src, {
      filename: filename
    }).code;
  }
};
