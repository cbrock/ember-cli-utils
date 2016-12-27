#!/usr/bin/env node
'use strict';

require('babel-polyfill');

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

var _commands = require('./commands');

var _commands2 = _interopRequireDefault(_commands);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version('0.0.0').description('Utility to make updating ember-cli versions a little bit easier').option('-g, --update-global <n>', 'Update ember-cli, globally, to the specified version.').option('-p, --update-project <n>', 'Update an existing ember-cli project to the specified version of ember-cli').parse(process.argv);

if (!process.argv.slice(2).length) {
  _commander2.default.outputHelp();
}

if (_commander2.default.updateGlobal) {
  _commands2.default.updateGlobal(_commander2.default.updateGlobal);
}