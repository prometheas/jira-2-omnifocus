const _ = require('lodash');
const expect = require('chai').expect;
const path = require('path');
const sinon = require('sinon');

const projectRoot = path.resolve(__dirname, '..', '..', '..', '..');

describe('events', () => {
  let runtime;

  before(() => {
    _.set(global, 'chrome.runtime', {
      onMessage: {
        addListener: sinon.spy(),
      },
    });

    runtime = global.chrome.runtime;
  });

  describe('initialization', () => {
    it('should bind to message events', () => {
      const initialCallCount = runtime.onMessage.addListener.callCount;

      // eslint-disable-next-line
      require(path.join(projectRoot, 'source', 'js', 'events'));

      expect(runtime.onMessage.addListener.callCount).to.be.greaterThan(initialCallCount);
    });
  });
});
