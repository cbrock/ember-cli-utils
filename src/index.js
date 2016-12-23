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

if(!program.updateGlobal && !program.updateProject) {
  message.error('Please provide an argument');
}

if (program.updateGlobal) {
  commands.updateGlobal(program.updateGlobal);
}
