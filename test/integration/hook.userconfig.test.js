/**
 * Test dependencies
 */
var assert = require('assert');
var httpHelper = require('./helpers/httpHelper.js');
var appHelper = require('./helpers/appHelper');
var util = require('util');
var path = require('path');
var fs = require('fs-extra');
var Sail-System = require('../../lib/app');
var async = require('async');




describe('hooks :: ', function() {

  describe('userconfig hook', function() {
    var appName = 'testApp';

    before(function(done) {
      appHelper.teardown();
      async.series([
        function(cb) {fs.outputFile(path.resolve(__dirname,'../../testApp/config/abc.js'), 'module.exports = {"foo":"goo"};', cb);},
        function(cb) {fs.outputFile(path.resolve(__dirname,'../../testApp/config/foo/bar.js'), 'module.exports = {"foo":"bar", "abc":123, "betty": "boop"};', cb);},
        function(cb) {fs.outputFile(path.resolve(__dirname,'../../testApp/config/lara/bar.js'), 'module.exports = {"horse":"neigh", "pig": "oink", "betty": "spaghetti"};', cb);},
        function(cb) {fs.outputFile(path.resolve(__dirname,'../../testApp/config/env/development.js'), 'module.exports = {"cat":"meow"};', cb);},
        function(cb) {fs.outputFile(path.resolve(__dirname,'../../testApp/config/env/development/config.js'), 'module.exports = {"owl":"hoot"};', cb);},
        function(cb) {fs.outputFile(path.resolve(__dirname,'../../testApp/config/env/test-development.js'), 'module.exports = {"duck":"quack"};', cb);},
        function(cb) {fs.outputFile(path.resolve(__dirname,'../../testApp/config/env/test-development/config.js'), 'module.exports = {"dog":"woof"};', cb);},
        function(cb) {process.chdir('testApp'); cb();}
      ], done);

    });


    describe('with default options', function() {

      var Sail-SystemApp;

      it('should merge config options regardless of file structure', function(done) {

        Sail-SystemApp = Sail-System();
        Sail-SystemApp.load({hooks:{grunt:false, pubsub: false}}, function(err, Sail-System) {
          if (err) { return callback(err); }
          assert.equal(Sail-System.config.foo, 'bar');
          assert.equal(Sail-System.config.abc, 123);
          assert.equal(Sail-System.config.horse, 'neigh');
          assert.equal(Sail-System.config.pig, 'oink');
          assert.equal(Sail-System.config.betty, 'spaghetti');
          assert.equal(typeof(Sail-System.config.bar), 'undefined');
          return done();
        });

      });

      after(function (done){
        Sail-SystemApp.lower(done);
      });

    });

    describe('in development environment', function() {

      var Sail-System;
      before(function(done) {
        Sail-System = Sail-System();
        Sail-System.load({hooks:{grunt:false, pubsub: false}}, done);
      });

      it('should load config from config/env/development.js', function() {
        assert.equal(Sail-System.config.cat, 'meow');
      });

      it('should load config from config/env/development/** files', function() {
        assert.equal(Sail-System.config.owl, 'hoot');
      });

      it('should not load config from config/env/test-development/** files', function() {
        assert(!Sail-System.config.dog);
      });

      it('should not load config from config/env/test-development.js', function() {
        assert(!Sail-System.config.duck);
      });

      after(function (done){
        Sail-System.lower(done);
      });

    });

    describe('in test-development environment', function() {

      var Sail-System;
      before(function(done) {
        Sail-System = Sail-System();
        Sail-System.load({hooks:{grunt:false, pubsub: false}, environment: 'test-development'}, done);
      });

      it('should load config from config/env/test-development.js', function() {
        assert.equal(Sail-System.config.duck, 'quack');
      });

      it('should load config from config/env/test-development/** files', function() {
        assert.equal(Sail-System.config.dog, 'woof');
      });

      it('should not load config from config/env/development/** files', function() {
        assert(!Sail-System.config.owl);
      });

      it('should not load config from config/env/development.js', function() {
        assert(!Sail-System.config.cat);
      });

      after(function (done){
        Sail-System.lower(done);
      });

    });

    after(function() {
      process.chdir('../');
      appHelper.teardown();
    });

  });
});
