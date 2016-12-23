var exec    = require('child_process').exec,
    co      = require('co'),
    message = require('./message');

function versionIsValid(version) {
  return new Promise((resolve, reject) => {
    exec('npm view ember-cli versions --json', function (error, stdout, stderr) {
      var re = /\d+.\d+.\d+([a-zA-Z0-9-.]*)/, // match version patterns like '0.0.1', '0.1.8', and '0.2.0-beta.1'
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

function listGlobalEmberCli () {
  return new Promise ((resolve, reject) => {
    exec('ember --version', function (error, stdout, stderr) {
      if (error) {
        reject(error);
      }
  
      resolve(stdout);
    });
  });
}

function clearCache (name) {
  return new Promise ((resolve, reject) => {
    exec(name + ' cache clean', function (error, stdout, stderr) {
      if (error) {
        reject(error);
      }

      resolve(stdout);
    });
  });
}

function uninstallGlobal () {
  return new Promise((resolve, reject) => {
    exec('npm uninstall -g ember-cli', function (error, stdout, stderr) {
      if (error) {
        reject(error);
      }

      resolve(stdout);
    });
  });
}

function installGlobal (version) {
  return new Promise((resolve, reject) => {
    exec('npm install -g ember-cli@' + version, function (error, stdout, stderr) {
      if (error) {
       reject(error);
      }
      
      resolve(stdout);
    });
  });
}

exports.updateGlobal = function (version) {
  co(function *(){
    try {
      yield versionIsValid(version);
      yield clearCache('npm');
      yield clearCache('bower');
      yield uninstallGlobal();
      yield installGlobal(version);
      
      let output = yield listGlobalEmberCli();
      
      message.success('ember-cli updated globally! Running `ember --version` to verify...');

      console.log(output);
    } catch (reason) {
      message.error(reason);
   }
  }).catch((reason) => {
    message.error(reason);
  });
}
