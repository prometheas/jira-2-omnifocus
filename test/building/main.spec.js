/* eslint func-names: 0 */

const chai = require('chai');

const expect = chai.expect;
const path = require('path');
const shell = require('shelljs');

chai.use(require('chai-fs-latest'));

describe('General', () => {
  const projectRoot = path.resolve(__dirname, '..', '..');

  before(() => {
    shell.cd(projectRoot);
  });

  describe('build (requires project clean for valid testing)', function () {
    this.timeout(30000);

    it('should create a build directory at the project root', () => {
      shell.exec('npm run build --silent', {
        silent: true,
      });

      expect(path.join(projectRoot, 'build')).to.be.a.directory();
    });
  });
});
