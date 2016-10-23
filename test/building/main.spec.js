/* eslint func-names: 0 */

'use strict';

var chai = require('chai');
var expect = chai.expect;
var path = require('path');
var shell = require('shelljs');

chai.use(require('chai-fs-latest'));

describe('General', function () {
  var projectRoot = path.resolve(__dirname, '..', '..');

  before(function () {
    shell.cd(projectRoot);
  });

  describe('build (requires project clean for valid testing)', function () {
    this.timeout(30000);

    it('should create a build directory at the project root', function () {
      shell.exec('npm run build --silent', {
        silent: true
      });

      expect(path.join(projectRoot, 'build')).to.be.a.directory();
    });
  });
});
