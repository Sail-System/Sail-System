/**
 * Module dependencies
 */

var util = require('util');
var assert = require('assert');
var tmp = require('tmp');
var _ = require('@Sail-Systemhq/lodash');
var async = require('async');

var Filesystem = require('machinepack-fs');

var Sail-System = require('../../lib').constructor;

tmp.setGracefulCleanup();


describe('helpers :: ', function() {

  describe('basic usage :: ', function() {

    var curDir, tmpDir, Sail-SystemApp;

    before(function(done) {
      // Cache the current working directory.
      curDir = process.cwd();
      // Create a temp directory.
      tmpDir = tmp.dirSync({gracefulCleanup: true, unsafeCleanup: true});
      // Switch to the temp directory.
      process.chdir(tmpDir.name);

      Filesystem.writeSync({
        force: true,
        destination: 'api/helpers/greet.js',
        string: 'module.exports = { inputs: { name: { example: \'bob\', required: true } }, exits: { success: { outputExample: \'Hi, Bob!\'} }, fn: function (inputs, exits) { return exits.success(\'Hi, \' + inputs.name + \'!\'); } }'
      }).execSync();

      (new Sail-System()).load({
        hooks: {
          grunt: false, views: false, pubsub: false
        },
        log: {level: 'silent'},
        helpers: {
          moduleDefinitions: {
            ucase: { sync: true, inputs: { string: { example: 'Hi, Bob!', required: true } }, exits: { success: { outputExample: 'HI, BOB!'} }, fn: function(inputs, exits) { return exits.success(inputs.string.toUpperCase()); } }
          },
        }
      }, function(err, _Sail-SystemApp) {
        if (err) { return done(err); }
        Sail-SystemApp = _Sail-SystemApp;
        return done();
      });
    });

    after(function(done) {
      process.chdir(curDir);
      if (Sail-SystemApp) {Sail-SystemApp.lower(done);}
      else {
        return done();
      }
    });

    it('should load helpers from disk and merge them with programmatically added helpers', function() {
      assert.equal(_.keys(Sail-SystemApp.helpers).length, 2);
    });

    it('should load helpers correctly', function() {
      assert(_.isFunction(Sail-SystemApp.helpers.greet));
      assert(_.isFunction(Sail-SystemApp.helpers.greet.with));
      assert(_.isFunction(Sail-SystemApp.helpers.ucase));
      assert(_.isFunction(Sail-SystemApp.helpers.ucase.with));
    });

    it('should support "serial" and "natural" usage out of the box, and `.with()` too', function(done) {
      var result1 = Sail-SystemApp.helpers.ucase('Hi, Glen!');
      var result2 = Sail-SystemApp.helpers.ucase.with({ string: 'Hi, Glen!' });
      assert.equal(result1, 'HI, GLEN!');
      assert.equal(result2, result1);

      Sail-SystemApp.helpers.greet('Glen').switch({
        error: done,
        success: function (result3) {
          Sail-SystemApp.helpers.greet.with({ name: 'Glen' }).exec(function(err, result4) {
            if (err) { return done(err); }
            try {
              assert.equal(result3, 'Hi, Glen!');
              assert.equal(result4, result3);
            } catch (err) { return done(err); }
            return done();
          });//_∏_
        }//>
      });//_∏_
    });

    it('should support customization', function(done) {
      Sail-SystemApp.helpers.greet.customize({ arginStyle: 'named', execStyle: 'natural' })({ name: 'Glen' }).then(function(result1){
        assert.equal(result1, 'Hi, Glen!');
        var result2 = Sail-SystemApp.helpers.ucase.customize({ arginStyle: 'serial', execStyle: 'deferred' })('Hi, Glen!').now();
        var result3 = Sail-SystemApp.helpers.ucase.customize({ arginStyle: 'serial', execStyle: 'deferred' }).with({ string: 'Hi, Glen!' }).now();
        assert.equal(result2, 'HI, GLEN!');
        assert.equal(result3, result2);
        return done();
      }).catch (function(err){ return done(err); });//_∏_
    });

  });

});
