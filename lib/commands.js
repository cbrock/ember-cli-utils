'use strict';

var _child_process = require('child_process');

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function versionIsValid(version) {
  return new Promise(function (resolve, reject) {
    (0, _child_process.exec)('npm view ember-cli versions --json', function (error, stdout, stderr) {
      var re = /\d+.\d+.\d+([a-zA-Z0-9-.]*)/,
          // match version patterns like '0.0.1', '0.1.8', and '0.2.0-beta.1'
      versions = stdout.split(','),
          isValid,
          normalizedVersions;

      if (error) {
        reject(error);
      }

      normalizedVersions = versions.map(function (v) {
        return v.match(re)[0];
      });

      isValid = normalizedVersions.indexOf(version) > -1;

      if (!isValid) {
        reject('Oops - ember-cli@' + version + ' does not exist in the npm registry!');
      }

      resolve(isValid);
    });
  });
}

function listGlobalEmberCli() {
  return new Promise(function (resolve, reject) {
    (0, _child_process.exec)('ember --version', function (error, stdout, stderr) {
      if (error) {
        reject(error);
      }

      resolve(stdout);
    });
  });
}

function clearCache(name) {
  return new Promise(function (resolve, reject) {
    (0, _child_process.exec)(name + ' cache clean', function (error, stdout, stderr) {
      if (error) {
        reject(error);
      }

      resolve(stdout);
    });
  });
}

function uninstallGlobal() {
  return new Promise(function (resolve, reject) {
    (0, _child_process.exec)('npm uninstall -g ember-cli', function (error, stdout, stderr) {
      if (error) {
        reject(error);
      }

      resolve(stdout);
    });
  });
}

function installGlobal(version) {
  return new Promise(function (resolve, reject) {
    (0, _child_process.exec)('npm install -g ember-cli@' + version, function (error, stdout, stderr) {
      if (error) {
        reject(error);
      }

      resolve(stdout);
    });
  });
}

exports.updateGlobal = function (version) {
  (0, _co2.default)(regeneratorRuntime.mark(function _callee() {
    var output;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            _message2.default.notice('validating ember-cli version...');
            _context.next = 4;
            return versionIsValid(version);

          case 4:

            _message2.default.notice('cleaning npm cache...');
            _context.next = 7;
            return clearCache('npm');

          case 7:

            _message2.default.notice('cleaning Bower cache...');
            _context.next = 10;
            return clearCache('bower');

          case 10:

            _message2.default.notice('uninstalling global ember-cli module...');
            _context.next = 13;
            return uninstallGlobal();

          case 13:

            _message2.default.notice('installing global ember-cli module');
            _context.next = 16;
            return installGlobal(version);

          case 16:
            _context.next = 18;
            return listGlobalEmberCli();

          case 18:
            output = _context.sent;


            _message2.default.success('ember-cli updated globally! Running `ember --version` to verify...');

            console.log(output);
            _context.next = 26;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context['catch'](0);

            _message2.default.error(_context.t0);

          case 26:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 23]]);
  })).catch(function (reason) {
    _message2.default.error(reason);
  });
};