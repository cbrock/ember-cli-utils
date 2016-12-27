#!/usr/bin/env node

import 'babel-polyfill';
import program from 'commander';
import message from './message';
import commands from './commands';

program.version('0.0.0')
       .description('Utility to make updating ember-cli versions a little bit easier')
       .option('-g, --update-global <n>', 'Update ember-cli, globally, to the specified version.')
       .option('-p, --update-project <n>', 'Update an existing ember-cli project to the specified version of ember-cli')
       .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

if (program.updateGlobal) {
  commands.updateGlobal(program.updateGlobal);
}
