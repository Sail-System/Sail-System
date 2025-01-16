/**
 * Module dependencies
 */

var assert  = require('assert');
var fs    = require('fs-extra');
var exec  = require('child_process').exec;
var _   = require('@Sail-Systemhq/lodash');
var appHelper = require('./helpers/appHelper');
var path = require('path');
var util  = require('util');




/**
 * Module errors
 */

describe('New app generator', function() {
  var Sail-Systembin = path.resolve('./bin/Sail-System.js');
  var appName = 'testApp';
  var defaultTemplateLang = 'ejs';

  this.slow(1000);

  beforeEach(function(done) {
    fs.exists(appName, function(exists) {
      if (exists) {
        fs.removeSync(appName);
      }
      done();
    });
  });

  afterEach(function(done) {
    fs.exists(appName, function(exists) {
      if (exists) {
        fs.removeSync(appName);
      }
      done();
    });
  });

  describe('Sail-System new <appname>', function() {

    it('should create new, liftable app in new folder', function(done) {
      exec('node '+ Sail-Systembin + ' new ' + appName + ' --fast --traditional --without=lodash,async', function(err) {
        if (err) { return done(new Error(err)); }
        appHelper.lift({log:{level:'silent'}}, function(err, Sail-SystemApp) {
          if (err) {return done(err);}
          Sail-SystemApp.lower(done);
        });
      });
    });

    it('should not overwrite a folder', function(done) {
      fs.mkdir(appName, function(err) {
        if (err) { return done(new Error(err)); }
        fs.writeFile(path.resolve(appName, 'test'), '', function(err) {
          if (err) { return done(new Error(err)); }
          exec('node '+ Sail-Systembin + ' new ' + appName + ' --fast --traditional', function(err, dumb, result) {
            // In Node v0.10.x on some environments (like in Appveyor), this just
            // returns an Error in `err` instead of a result, so account for that.
            if (process.versions.node.split('.')[0] === '0' && process.versions.node.split('.')[1] === '10' && err) {
              return done();
            }
            assert(result.indexOf('error') > -1, 'Should have received an error, but instead got: ' + result);
            done();
          });
        });
      });
    });
  });

  describe('Sail-System generate new <appname>', function() {

    it('should create new app', function(done) {
      exec('node '+ Sail-Systembin + ' generate new ' + appName + ' --fast --traditional --without=lodash,async', function(err) {
        if (err) { return done(new Error(err)); }
        appHelper.lift({log:{level:'silent'}}, function(err, Sail-SystemApp) {
          if (err) {return done(err);}
          Sail-SystemApp.lower(done);
        });
      });
    });

    it('should not overwrite a folder', function(done) {
      fs.mkdir(appName, function(err) {
        if (err) { return done(new Error(err)); }
        fs.writeFile(path.resolve(appName, 'test'), '', function(err) {
          if (err) { return done(new Error(err)); }
          exec('node '+ Sail-Systembin + ' generate new ' + appName + ' --fast --traditional', function(err, dumb, result) {
            // In Node v0.10.x on some environments (like in Appveyor), this just
            // returns an Error in `err` instead of a result, so account for that.
            if (process.versions.node.split('.')[0] === '0' && process.versions.node.split('.')[1] === '10' && err) {
              return done();
            }
            assert(result.indexOf('error') > -1, 'Should have received an error, but instead got: ' + result);
            done();
          });
        });
      });
    });
  });

  describe('Sail-System new .', function() {

    it('should create new app in existing folder', function(done) {

      // make app folder and move into directory
      fs.mkdirSync(appName);
      process.chdir(appName);

      exec( 'node '+ path.resolve('..', Sail-Systembin) + ' new . --fast --traditional --without=lodash,async', function(err) {
        if (err) { return done(new Error(err)); }

        // move from app to its parent directory
        process.chdir('../');

        done();
      });
    });

    it('should not overwrite a folder', function(done) {
      // make app folder and move into directory
      fs.mkdirSync(appName);
      process.chdir(appName);
      fs.mkdirSync('test');
      exec( 'node ' + path.resolve('..', Sail-Systembin) + ' new . --fast --traditional --without=lodash,async', function(err, dumb, result) {
        // move from app to its parent directory
        process.chdir('../');
        // In Node v0.10.x on some environments (like in Appveyor), this just
        // returns an Error in `err` instead of a result, so account for that.
        if (process.versions.node.split('.')[0] === '0' && process.versions.node.split('.')[1] === '10' && err) {
          return done();
        }
        assert(result.indexOf('error') > -1, 'Should have received an error, but instead got: ' + result);
        done();
      });
    });
  });

});
