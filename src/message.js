/* eslint no-console: 0 */

import chalk from 'chalk';

module.exports = {

  success(msg) {
    console.log(chalk.green(msg));
  },

  notice(msg) {
    console.log(chalk.yellow(msg));
  },

  error(msg) {
    console.log(chalk.red(msg));
  },

};
