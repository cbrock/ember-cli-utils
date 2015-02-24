var exec    = require('child_process').exec,
    async   = require('async'),
    message = require('./message')

function versionIsValid(version, callback) {
   exec('npm view ember-cli versions', function (error, stdout, stderr) {
    var re = /\d+.\d+.\d+([a-zA-Z0-9-.]*)/, // match version patterns like '0.0.1', '0.1.8', and '0.2.0-beta.1'
        versions = stdout.split(','),
        isValid,
        normalizedVersions;

    normalizedVersions = versions.map(function (v) {
      return v.match(re)[0];
    });

    isValid = normalizedVersions.indexOf(version) > -1;

    if (isValid) {
      callback(null, version);
    } else {
      message.error('Oops - ember-cli@' + version + ' does not exist in the npm registry!');
      callback(new Error('Invalid ember-cli version'), version);
    }
  });
}

function listGlobalEmberCli (callback) {
  exec('ember --version', function (error, stdout, stderr) {
    var version;

    if (error) {
      console.error(error);
    } else {
      version = stdout.split('\n')[0].split('version: ')[1];
      message.success('Results of `ember --version`:');
      message.success(stdout);
    }

    callback(null, version);
  });
}

function clearCache (name, callback) {
  message.notice('Attempting ' + name + ' cache clean...');

  exec(name + ' cache clean', function (error, stdout, stderr) {
    if (error) {
      console.error(error);
    } else {
      message.success(name + ' cache clean successful');
    }

    callback();
  });
}

function uninstallGlobal (callback) {
  message.notice('Attempting ember-cli global uninstall...');

  exec('npm uninstall -g ember-cli', function (error, stdout, stderr) {
    if (error) {
      console.error(error);
    } else {
      message.success('ember-cli successfully uninstalled globally');
    }

    callback();
  });
}

function installGlobal (version, callback) {
  message.notice('Attempting ember-cli@' + version + ' global install...');

  exec('npm install -g ember-cli@' + version, function (error, stdout, stderr) {
    if (error) {
      console.error(error);
    } else {
      message.success('ember-cli@' + version + ' successfully installed globally');
    }

    callback();
  });
}

exports.updateGlobal = function (version) {
    async.series([
      function (callback) {
        versionIsValid(version, callback);
      },

      function (callback) {
        clearCache('npm', callback);
      },

      function (callback) {
        clearCache('bower', callback);
      },

      uninstallGlobal,

      function (callback) {
        installGlobal(version, callback);
      },

      function (callback) {
        listGlobalEmberCli(callback);
      }
    ], function(error, results){
        if (error) {
          message.error(error);
        }
    });
}
