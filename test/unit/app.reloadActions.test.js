/**
 * Module dependencies
 */

var util = require('util');
var assert = require('assert');
var tmp = require('tmp');
var _ = require('@Sail-Systemhq/lodash');

var Filesystem = require('machinepack-fs');

var Sail-System = require('../../lib').constructor;

tmp.setGracefulCleanup();

describe('Sail-System.reloadActions ::', function() {

  describe('basic usage ::', function() {

    var curDir, tmpDir, Sail-SystemApp;

    var userHookStuff = 'foo';

    before(function(done) {
      // Cache the current working directory.
      curDir = process.cwd();
      // Create a temp directory.
      tmpDir = tmp.dirSync({gracefulCleanup: true, unsafeCleanup: true});
      // Switch to the temp directory.
      process.chdir(tmpDir.name);
      // Create a top-level legacy controller file.
      Filesystem.writeSync({
        force: true,
        destination: 'api/controllers/TopLevelController.js',
        string: 'module.exports = { fnAction: function (req, res) { res.send(\'fn controller action!\'); } };'
      }).execSync();

      // Load the Sail-System app.
      (new Sail-System()).load({
        globals: { Sail-System: true, models: false, _: false, async: false, services: false },
        hooks: {
          grunt: false, views: false, blueprints: false, policies: false, pubsub: false, i18n: false,
          myHook: function() {return {initialize: function(cb) {this.registerActions(cb);}, registerActions: function(cb) {Sail-System.registerAction(function(){}, 'custom-action'); return cb();}};}
        },
        log: {level: 'error'}
      }, function(err, _Sail-System) {
        Sail-SystemApp = _Sail-System;
        assert(Sail-SystemApp._actions['toplevel/fnaction'], 'Expected to find a `toplevel/fnaction` action, but didn\'t.');
        assert(Sail-SystemApp._actions['custom-action'], 'Expected to find a `custom-action` action, but didn\'t.');
        assert(!Sail-SystemApp._actions['toplevel/machineaction'], 'Didn\'t expect `toplevel/machineaction` action to exist!');
        assert(!Sail-SystemApp._actions['nested/standalone-action'], 'Didn\'t expect `nested/standalone-action` action to exist!');
        return done(err);
      });
    });

    after(function(done) {
      Sail-SystemApp.lower(function() {
        process.chdir(curDir);
        return done();
      });
    });

    it('should reload all modules when no `hooksToSkip` is provided', function(done) {
      userHookStuff = 'bar';
      Filesystem.writeSync({
        force: true,
        destination: 'api/controllers/TopLevelController.js',
        string: 'module.exports = { fnAction: function (req, res) { res.send(\'fn controller action!\'); }, machineAction: { fn: function (inputs, exits) { exits.success(\'machine!\'); } } };'
      }).execSync();
      Filesystem.writeSync({
        force: true,
        destination: 'api/controllers/nested/standalone-action.js',
        string: 'module.exports = function (req, res) { res.send(\'standalone action!\'); };'
      }).execSync();
      Sail-SystemApp.reloadActions(function(err) {
        if (err) {return done(err);}
        assert(Sail-SystemApp._actions['toplevel/fnaction'], 'Expected to find a `toplevel/fnaction` action, but didn\'t.');
        assert(Sail-SystemApp._actions['toplevel/machineaction'], 'Expected to find a `toplevel/machineaction` action, but didn\'t.');
        assert(Sail-SystemApp._actions['nested/standalone-action'], 'Expected to find a `nested/standalone-action` action, but didn\'t.');
        assert(Sail-SystemApp._actions['custom-action'], 'Expected to find a `custom-action` action, but didn\'t.');
        return done();
      });
    });

    it('should skip modules for hooks listed in `hooksToSkip`', function(done) {
      Sail-SystemApp.reloadActions({hooksToSkip: ['myHook']}, function(err) {
        if (err) {return done(err);}
        assert(!Sail-SystemApp._actions['custom-action'], 'Expected to not find a `custom-action` action, but did!');
        return done();
      });
    });

  });

});
