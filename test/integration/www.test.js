/**
 * Test dependencies
 */

var assert = require('assert');
var fs = require('fs-extra');
var exec = require('child_process').exec;
var path = require('path');
var spawn = require('child_process').spawn;
var tmp = require('tmp');

// Make existsSync not crash on older versions of Node
fs.existsSync = fs.existsSync || require('path').existsSync;

describe('Running Sail-System www', function() {
  var Sail-SystemBin = path.resolve('./bin/Sail-System.js');
  var appName = 'testApp';

  before(function() {
    if (fs.existsSync(appName)) {
      fs.removeSync(appName);
    }
  });

  describe('in an empty directory', function() {

    before(function() {
      // Make empty folder and move into it
      fs.mkdirSync('empty');
      process.chdir('empty');
      Sail-SystemBin = path.resolve('..', Sail-SystemBin);
    });

    // TODO: run tests in here

    after(function() {
      // Delete empty folder and move out of it
      process.chdir('../');
      fs.rmdirSync('empty');
      Sail-SystemBin = path.resolve(Sail-SystemBin);
    });

  });

  describe('in a Sail-System app directory', function() {

    var Sail-SystemChildProc;
    var curDir;
    var tmpDir;

    before(function(done) {
      // Cache the current working directory.
      curDir = process.cwd();

      // Create a temp directory.
      tmpDir = tmp.dirSync({gracefulCleanup: true, unsafeCleanup: true});

      // Switch to the temp directory.
      process.chdir(tmpDir.name);

      return done();
    });

    after(function(done) {
      process.chdir(curDir);
      return done();
    });

    it('should start server without error', function(done) {

      exec('node ' + Sail-SystemBin + ' new ' + appName + ' --fast --traditional --without=lodash,async', function(err) {
        if (err) { return done(new Error(err)); }

        // Move into app directory
        process.chdir(appName);
        Sail-SystemBin = path.resolve('..', Sail-SystemBin);

        Sail-SystemChildProc = spawn('node', [Sail-SystemBin, 'www']);

        // Any output from stderr is considered an error by this test.
        Sail-SystemChildProc.stderr.on('data', function(data) {
          return done(data);
        });

        Sail-SystemChildProc.stdout.on('data', function(data) {
          var dataString = data + '';
          assert(dataString.indexOf('error') === -1);
          Sail-SystemChildProc.stdout.removeAllListeners('data');
          // Move out of app directory
          process.chdir('../');
          Sail-SystemChildProc.kill();
          return done();
        });
      });
    });

  });

  describe('with command line arguments', function() {

    var Sail-SystemChildProc;
    var curDir;
    var tmpDir;

    beforeEach(function(done) {
      // Cache the current working directory.
      curDir = process.cwd();

      // Create a temp directory.
      tmpDir = tmp.dirSync({gracefulCleanup: true, unsafeCleanup: true});

      // Switch to the temp directory.
      process.chdir(tmpDir.name);

      // Create a new Sail-System app in the temp directory.
      exec('node ' + Sail-SystemBin + ' new ' + appName + ' --fast --traditional --without=lodash,async', function(err) {
        if (err) { return done(new Error(err)); }
        process.chdir(path.resolve(tmpDir.name, appName));
        return done();
      });

    });

    afterEach(function(done) {
      Sail-SystemChildProc.stderr.removeAllListeners('data');
      process.chdir(curDir);
      Sail-SystemChildProc.kill();
      return done();
    });

    it('--dev should execute grunt build', function(done) {

      // Change environment to production in config file
      fs.writeFileSync('config/application.js', 'module.exports = ' + JSON.stringify({
        appName: 'Sail-System Application',
        port: 1342,
        environment: 'production',
        log: {
          level: 'info'
        }
      }));

      Sail-SystemChildProc = spawn('node', [Sail-SystemBin, 'www', '--dev']);

      Sail-SystemChildProc.stdout.on('data', function(data) {
        var dataString = data + '';
        if (dataString.indexOf('`grunt build`') !== -1) {
          return done();
        }
      });
    });


    it('--prod should execute grunt buildProd', function(done) {

      // Overrwrite session config file
      // to set session adapter:null ( to prevent warning message from appearing on command line )
      fs.writeFileSync('config/session.js', 'module.exports.session = { adapter: null }');

      Sail-SystemChildProc = spawn('node', [Sail-SystemBin, 'www', '--prod']);

      Sail-SystemChildProc.stdout.on('data', function(data) {
        var dataString = data + '';
        if (dataString.indexOf('`grunt buildProd`') !== -1) {

          return done();
        }
      });
    });

  });

});
