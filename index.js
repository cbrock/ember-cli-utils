#!/usr/bin/env node

var program  = require('commander'),
    message  = require('./message'),
    async    = require('async'),
    commands = require('./commands');

program.version('0.0.0')
       .description('Utility to make updating ember-cli versions a little bit easier')
       .option('-g, --update-global <n>', 'Update ember-cli, globally, to the specified version.')
       .option('-p, --update-project <n>', 'Update an existing ember-cli project to the specified version of ember-cli')
       .parse(process.argv);

if(!program.updateGlobal && !program.updateProject) {
  message.error('Please provide an argument');
  return;
}

if (program.updateGlobal) {
  commands.updateGlobal(program.updateGlobal);
}
