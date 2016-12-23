'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  success: function success(msg) {
    console.log(_chalk2.default.green(msg));
  },
  notice: function notice(msg) {
    console.log(_chalk2.default.yellow(msg));
  },
  error: function error(msg) {
    console.log(_chalk2.default.red(msg));
  }
};