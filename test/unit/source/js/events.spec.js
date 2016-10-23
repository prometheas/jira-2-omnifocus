'use strict';

var _ = require('lodash');
var expect = require('chai').expect;
var path = require('path');
var sinon = require('sinon');

var projectRoot = path.resolve(__dirname, '..', '..', '..', '..');

describe('events', function () {
  var runtime;

  before(function () {
    _.set(global, 'chrome.runtime', {
      onMessage: {
        addListener: sinon.spy()
      }
    });

    runtime = global.chrome.runtime;
  });

  describe('initialization', function () {
    it('should bind to message events', function () {
      var initialCallCount = runtime.onMessage.addListener.callCount;

      // eslint-disable-next-line
      require(path.join(projectRoot, 'source', 'js', 'events'));

      expect(runtime.onMessage.addListener.callCount).to.be.greaterThan(initialCallCount);
    });
  });
});
