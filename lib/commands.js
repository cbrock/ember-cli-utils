'use strict';

var exec = require('child_process').exec,
    co = require('co'),
    message = require('./message');

function versionIsValid(version) {
  return new Promise(function (resolve, reject) {
    exec('npm view ember-cli versions --json', function (error, stdout, stderr) {
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
    exec('ember --version', function (error, stdout, stderr) {
      if (error) {
        reject(error);
      }

      resolve(stdout);
    });
  });
}

function clearCache(name) {
  return new Promise(function (resolve, reject) {
    exec(name + ' cache clean', function (error, stdout, stderr) {
      if (error) {
        reject(error);
      }

      resolve(stdout);
    });
  });
}

function uninstallGlobal() {
  return new Promise(function (resolve, reject) {
    exec('npm uninstall -g ember-cli', function (error, stdout, stderr) {
      if (error) {
        reject(error);
      }

      resolve(stdout);
    });
  });
}

function installGlobal(version) {
  return new Promise(function (resolve, reject) {
    exec('npm install -g ember-cli@' + version, function (error, stdout, stderr) {
      if (error) {
        reject(error);
      }

      resolve(stdout);
    });
  });
}

exports.updateGlobal = function (version) {
  co(regeneratorRuntime.mark(function _callee() {
    var output;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return versionIsValid(version);

          case 3:
            _context.next = 5;
            return clearCache('npm');

          case 5:
            _context.next = 7;
            return clearCache('bower');

          case 7:
            _context.next = 9;
            return uninstallGlobal();

          case 9:
            _context.next = 11;
            return installGlobal(version);

          case 11:
            _context.next = 13;
            return listGlobalEmberCli();

          case 13:
            output = _context.sent;


            message.success('ember-cli updated globally! Running `ember --version` to verify...');

            console.log(output);
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context['catch'](0);

            message.error(_context.t0);

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 18]]);
  })).catch(function (reason) {
    message.error(reason);
  });
};