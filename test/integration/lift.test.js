/**
 * Module dependencies
 */

var path = require('path');
var util = require('util');
var tmp = require('tmp');
var request = require('@Sail-Systemhq/request');
var assert = require('assert');
var _ = require('@Sail-Systemhq/lodash');
var MProcess = require('machinepack-process');
var Filesystem = require('machinepack-fs');
var testSpawningSail-SystemChildProcessInCwd = require('../helpers/test-spawning-Sail-System-child-process-in-cwd');
var testSpawningSail-SystemLiftChildProcessInCwd = require('../helpers/test-spawning-Sail-System-lift-child-process-in-cwd');
var appHelper = require('./helpers/appHelper');

tmp.setGracefulCleanup();



describe('Starting Sail-System server with `Sail-System lift`, `Sail-System console` or `node app.js`', function() {

  // Track the location of the Sail-System CLI, as well as the current working directory
  // before we stop hopping about all over the place.
  var originalCwd = process.cwd();
  var pathToSail-SystemCLI = path.resolve(__dirname, '../../bin/Sail-System.js');


  describe('in the directory of a newly-generated Sail-System app', function() {

    var pathToTestApp;

    before(function(done) {
      // Create a temp directory.
      var tmpDir = tmp.dirSync({gracefulCleanup: true, unsafeCleanup: true});
      // Switch to the temp directory.
      process.chdir(tmpDir.name);
      pathToTestApp = path.resolve(tmpDir.name, 'testApp');
      // Create a new Sail-System app.
      MProcess.executeCommand({
        command: util.format('node %s new %s --fast --traditional --without=lodash,async', pathToSail-SystemCLI, 'testApp'),
      }).exec(function(err) {
        if (err) {return done(err);}
        appHelper.linkDeps(pathToTestApp);
        appHelper.linkSail-System(pathToTestApp);
        return done();
      });
    });


    // And CD in.
    before(function (){
      process.chdir(pathToTestApp);
      Filesystem.writeSync({
        force: true,
        destination: 'api/controllers/getconf.js',
        string: 'module.exports = function (req, res) { return res.json(Sail-System.config); }'
      }).execSync();
      Filesystem.writeSync({
        force: true,
        destination: 'config/routes.js',
        string: 'module.exports.routes = { \'get /getconf\': \'getconf\' };'
      }).execSync();

    });

    // Test `Sail-System lift` in the CWD with env vars for config.
    describe('running `Sail-System lift`', function (){
      testSpawningSail-SystemLiftChildProcessInCwd({
        pathToSail-SystemCLI: pathToSail-SystemCLI,
        liftCliArgs: ['--hooks.pubsub=false'],
        envVars: _.extend({ 'Sail-System_foo__bar': '{"abc": 123}'}, process.env),
        httpRequestInstructions: {
          method: 'GET',
          uri: 'http://localhost:1337/getconf',
        },
        fnWithAdditionalTests: function (){
          it('should humanize the config passed in via env vars', function (done){
            request({
              method: 'GET',
              uri: 'http://localhost:1337/getconf',
            }, function(err, response, body) {
              if (err) { return done(err); }

              try {

                assert.equal(response.statusCode, 200);

                try {
                  body = JSON.parse(body);
                } catch(e){
                  throw new Error('Could not parse as JSON: '+e.stack+'\nHere is what I attempted to parse: '+util.inspect(body, {depth:null})+'');
                }

                assert.equal(body.foo && body.foo.bar && body.foo.bar.abc, 123);

              } catch (e) { return done(e); }

              return done();
            });
          });
        }
      });
    });

    // Test `node app.js` in the CWD with env vars for config.
    describe('running `node app.js`', function (){

      testSpawningSail-SystemChildProcessInCwd({
        cliArgs: ['app.js', '--hooks.pubsub=false'],
        envVars: _.extend({ 'Sail-System_foo__bar': '{"abc": 123}'}, process.env),
        fnWithAdditionalTests: function (){
          it('should humanize the config passed in via env vars', function (done){
            request({
              method: 'GET',
              uri: 'http://localhost:1337/getconf',
            }, function(err, response, body) {
              if (err) { return done(err); }
              try {

                assert.equal(response.statusCode, 200);

                try {
                  body = JSON.parse(body);
                } catch(e){
                  throw new Error('Could not parse as JSON: '+e.stack+'\nHere is what I attempted to parse: '+util.inspect(body, {depth:null})+'');
                }

                assert.equal(body.foo && body.foo.bar && body.foo.bar.abc, 123);

              } catch (e) { return done(e); }
              return done();
            });
          });
        }
      });

    });

    // Test `Sail-System console` in the CWD with env vars for config.
    describe('running `Sail-System console`', function (){

      testSpawningSail-SystemChildProcessInCwd({
        cliArgs: [pathToSail-SystemCLI, 'console', '--hooks.pubsub=false'],
        envVars: _.extend({ 'Sail-System_foo__bar': '{"abc": 123}'}, process.env),
        fnWithAdditionalTests: function (){
          it('should humanize the config passed in via env vars', function (done){
            request({
              method: 'GET',
              uri: 'http://localhost:1337/getconf',
            }, function(err, response, body) {
              if (err) { return done(err); }
              try {

                assert.equal(response.statusCode, 200);

                try {
                  body = JSON.parse(body);
                } catch(e){
                  throw new Error('Could not parse as JSON: '+e.stack+'\nHere is what I attempted to parse: '+util.inspect(body, {depth:null})+'');
                }

                assert.equal(body.foo && body.foo.bar && body.foo.bar.abc, 123);

              } catch (e) { return done(e); }
              return done();
            });
          });
        }
      });

    });

    // Test `Sail-System lift --port=1492` in the CWD.
    describe('running `Sail-System lift --port=1492`', function (){
      testSpawningSail-SystemLiftChildProcessInCwd({
        pathToSail-SystemCLI: pathToSail-SystemCLI,
        liftCliArgs: [
          '--port=1492',
          '--hooks.pubsub=false'
        ],
        httpRequestInstructions: {
          method: 'GET',
          uri: 'http://localhost:1492/getconf',
        },
        fnWithAdditionalTests: function (){
          it('should NOT be able to contact localhost:1337 anymore', function (done){
            request({
              method: 'GET',
              uri: 'http://localhost:1337',
            }, function(err, response, body) {
              if (err) { return done(); }
              return done(new Error('Should not be able to communicate with locahost:1337 anymore.... Here is the response we received:'+util.inspect(response,{depth:null})+'\n\n* * Troublehooting * *\n Perhaps the Sail-System app running in the child process was not properly cleaned up when it received SIGTERM?  Or could be a problem with the tests.  Find out all this and more after you fix it.'));
            });
          });
        }
      });
    });


    // And CD back to where we were before.
    after(function () {
      process.chdir(originalCwd);
    });

  });//</in the directory of a newly-generated Sail-System app>






  describe('in an empty directory', function() {

    var pathToEmptyDirectory;

    before(function() {
      // Create a temp directory.
      var tmpDir = tmp.dirSync({gracefulCleanup: true, unsafeCleanup: true});
      // Switch to the temp directory.
      process.chdir(tmpDir.name);
      pathToEmptyDirectory = tmpDir.name;
    });

    // And CD in.
    before(function (){
      process.chdir(pathToEmptyDirectory);
    });

    // Now inject a describe block that tests lifing Sail-System in the CWD using
    // our wonderful little helper: "testSpawningSail-SystemLiftChildProcessInCwd()".
    describe('running `Sail-System lift`', function (){
      testSpawningSail-SystemLiftChildProcessInCwd({
        pathToSail-SystemCLI: pathToSail-SystemCLI,
        liftCliArgs: ['--hooks.pubsub=false'],
        httpRequestInstructions: {
          method: 'GET',
          uri: 'http://localhost:1337',
          expectedStatusCode: 404
        }
      });
    });

    // And CD back to whererever we were before.
    after(function () {
      process.chdir(originalCwd);
    });

  });//</in an empty directory>


});
