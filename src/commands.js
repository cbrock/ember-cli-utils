import { exec } from 'child_process';
import co from 'co';
import message from './message';

function versionIsValid(version) {
  return new Promise((resolve, reject) => {
    exec('npm view ember-cli versions --json', (error, stdout) => {
      const re = /\d+.\d+.\d+([a-zA-Z0-9-.]*)/; // match version patterns like '0.0.1', '0.1.8', and '0.2.0-beta.1'
      const versions = stdout.split(',');

      if (error) {
        reject(error);
      }

      const normalizedVersions = versions.map(v => v.match(re)[0]);

      const isValid = normalizedVersions.indexOf(version) > -1;

      if (!isValid) {
        reject(`Oops - ember-cli@${version} does not exist in the npm registry!`);
      }

      resolve(isValid);
    });
  });
}

function listGlobalEmberCli() {
  return new Promise((resolve, reject) => {
    exec('ember --version', (error, stdout) => {
      if (error) {
        reject(error);
      }

      resolve(stdout);
    });
  });
}

function clearCache(name) {
  return new Promise((resolve, reject) => {
    exec(`${name} cache clean`, (error, stdout) => {
      if (error) {
        reject(error);
      }

      resolve(stdout);
    });
  });
}

function uninstallGlobal() {
  return new Promise((resolve, reject) => {
    exec('npm uninstall -g ember-cli', (error, stdout) => {
      if (error) {
        reject(error);
      }

      resolve(stdout);
    });
  });
}

function installGlobal(version) {
  return new Promise((resolve, reject) => {
    exec(`npm install -g ember-cli@${version}`, (error, stdout) => {
      if (error) {
        reject(error);
      }

      resolve(stdout);
    });
  });
}

module.exports = {
// exports.updateGlobal = (version) => {
  updateGlobal(version) {
    co(function* updateGlobal() {
      try {
        message.notice('validating ember-cli version...');
        yield versionIsValid(version);

        message.notice('cleaning npm cache...');
        yield clearCache('npm');

        message.notice('cleaning Bower cache...');
        yield clearCache('bower');

        message.notice('uninstalling global ember-cli module...');
        yield uninstallGlobal();

        message.notice('installing global ember-cli module');
        yield installGlobal(version);

        message.success('ember-cli updated globally! Running `ember --version` to verify...');

        const output = yield listGlobalEmberCli();
        message.success(output);
      } catch (reason) {
        message.error(reason);
      }
    }).catch((reason) => {
      message.error(reason);
    });
  },
};
