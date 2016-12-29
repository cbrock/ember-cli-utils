import 'babel-polyfill'
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import nockExec from 'nock-exec';
import child_process from 'child_process';
import commands from '../lib/commands';

chai.use(chaiAsPromised);

const assert = chai.assert;

describe('Commands', () => {
  describe('Version validation', () => {
    const versions = ['0.0.5', '0.0.41', '0.1.15', '2.2.0-beta.6', '2.10.0-beta.2'];

    nockExec('npm view ember-cli versions --json').reply(0, JSON.stringify(versions));

    it('should resolve for valid version numbers', (done) => {
      assert.eventually.equal(commands.validateVersion('0.1.15'),
                              true,
                              'valid ember-cli version number').notify(done); 
    });

    it('should reject invalid version numbers', (done) => {
      assert.isRejected(commands.validateVersion('8.8'),
                        /Oops - ember-cli@8.8 does not exist in the npm registry!/,
                        'invalid ember-cli version number').notify(done); 
    });
  });

});
