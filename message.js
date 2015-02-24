var chalk = require('chalk');

exports.success = function (msg) {
  console.log(chalk.green(msg));
};

exports.notice = function (msg) {
  console.log(chalk.yellow(msg));
},

exports.error = function (msg) {
  console.log(chalk.red(msg));
}
