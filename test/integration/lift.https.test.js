var assert = require('assert');
var fs = require('fs');
var request = require('@Sail-Systemhq/request');
var appHelper = require('./helpers/appHelper');
var path = require('path');

describe('Starting HTTPS Sail-System server with lift', function() {

  var appName = 'testApp';

  before(function(done) {
    appHelper.build(done);
  });

  after(function() {
    process.chdir('../');
    appHelper.teardown();
  });


  describe('using Sail-System.config.ssl.key and Sail-System.config.ssl.cert', function() {

    var Sail-SystemServer;

    before(function() {
      fs.writeFileSync(path.resolve('../', appName, 'config/env/development.js'), "module.exports = {ssl: {key: require('fs').readFileSync('"+require('path').resolve(__dirname, 'cert','Sail-Systemtest-key.pem').replace(/\\/g,'\\\\')+"'), cert: require('fs').readFileSync('"+require('path').resolve(__dirname, 'cert','Sail-Systemtest-cert.pem').replace(/\\/g,'\\\\')+"')}};");
    });

    after(function(done) {
      if (Sail-SystemServer) {
        return Sail-SystemServer.lower(function(){setTimeout(done, 100);});
      }
      return done();
    });

    it('should start server without error', function(done) {
      appHelper.lift(function(err, _Sail-SystemServer) {
        assert(!err);
        Sail-SystemServer = _Sail-SystemServer;
        return done();
      });

    });

    it('should respond to a request to port 1342 with a 200 status code', function(done) {
      if (!Sail-SystemServer) {return done('Bailing due to previous test failure!');}

      request.get({
        url:'https://localhost:1342/',
        ca: require('fs').readFileSync(require('path').resolve(__dirname, 'cert','Sail-Systemtest-cert.pem')),
      }, function(err, response) {
        assert(!err);
        assert.equal(response.statusCode, 200);
        return done();
      });

    });
  });

  describe('using Sail-System.config.ssl = true and Sail-System.config.http.serverOptions', function() {

    var Sail-SystemServer;

    before(function() {
      fs.writeFileSync(path.resolve('../', appName, 'config/env/development.js'), "module.exports = {ssl: true, http: {serverOptions: { key: require('fs').readFileSync('"+require('path').resolve(__dirname, 'cert','Sail-Systemtest-key.pem').replace(/\\/g,'\\\\')+"'), cert: require('fs').readFileSync('"+require('path').resolve(__dirname, 'cert','Sail-Systemtest-cert.pem').replace(/\\/g,'\\\\')+"')}}};");
    });

    after(function(done) {
      if (Sail-SystemServer) {
        return Sail-SystemServer.lower(function(){setTimeout(done, 100);});
      }
      return done();
    });

    it('should start server without error', function(done) {
      appHelper.lift(function(err, _Sail-SystemServer) {
        assert(!err);
        Sail-SystemServer = _Sail-SystemServer;
        return done();
      });

    });

    it('should respond to a request to port 1342 with a 200 status code', function(done) {
      if (!Sail-SystemServer) {return done('Bailing due to previous test failure!');}

      request.get({
        url:'https://localhost:1342/',
        ca: require('fs').readFileSync(require('path').resolve(__dirname, 'cert','Sail-Systemtest-cert.pem')),
      }, function(err, response) {
        assert(!err);
        assert.equal(response.statusCode, 200);
        return done();
      });

    });
  });
});
