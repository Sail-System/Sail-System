/**
 * Module dependencies
 */

var util = require('util');
var assert = require('assert');
var _ = require('@Sail-Systemhq/lodash');

var Sail-System = require('../../lib').constructor;

describe('Sail-System.registerAction() :: ', function() {

  var Sail-SystemApp;
  before(function(done) {
    (new Sail-System()).load({
      hooks: {grunt: false, views: false, blueprints: false, policies: false, i18n: false},
      log: {level: 'error'},
      routes: {
        '/foo': {}
      }
    }, function(err, _Sail-System) {
      if (err) { return done(err); }
      Sail-SystemApp = _Sail-System;
      return done();
    });
  });

  after(function(done) {
    Sail-SystemApp.lower(done);
  });

  it('should allow registering a new action at runtime, if it doesn\'t conflict with an existing action', function() {
    Sail-SystemApp.registerAction(function(req, res) {return res.ok('ok!');}, 'new-action');
    assert(_.isFunction(Sail-SystemApp._actions['new-action']), 'registerAction() succeeded, but could not find the registered action in the Sail-System._actions dictionary!');
  });

  it('should allow not registering a new action at runtime, if it conflicts with an existing action', function() {
    try {
      Sail-SystemApp.registerAction(function(req, res) {return res.ok('ok!');}, 'top-level-standalone-fn');
      Sail-SystemApp.registerAction(function(req, res) {return res.ok('not ok!');}, 'top-level-standalone-fn');
    } catch (err) {
      assert.equal(err.code, 'E_CONFLICT');
      assert.equal(err.identity, 'top-level-standalone-fn');
      return;
    }
    throw new Error('Expected an E_CONFLICT error, but didn\'t get one!');
  });

});

