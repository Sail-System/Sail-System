var _ = require('@Sail-Systemhq/lodash');
var request = require('@Sail-Systemhq/request');
var Sail-System = require('../../lib').Sail-System;
var assert = require('assert');
var fs = require('fs-extra');
var request = require('@Sail-Systemhq/request');
var appHelper = require('./helpers/appHelper');
var path = require('path');

describe('middleware :: ', function() {

  describe('favicon :: ', function() {

    var appName = 'testApp';
    var Sail-SystemApp;

    describe('with no favicon file in the assets folder', function() {

      before(function(done) {
        appHelper.build(done);
      });

      before(function(done) {
        appHelper.lift({
          hooks: {
            pubsub: false
          }
        }, function(err, _Sail-SystemApp) {
          if (err) { return done(err); }
          Sail-SystemApp = _Sail-SystemApp;
          return done();
        });
      });

      it('the default Sail-Systemboat favicon should be provided', function(done) {

        var default_favicon = fs.readFileSync(path.resolve(__dirname, '../../lib/hooks/http/default-favicon.ico'));
        request(
          {
            method: 'GET',
            uri: 'http://localhost:1342/favicon.ico',
          },
          function(err, response, body) {
            if (err) { return done(err); }
            assert.equal(response.statusCode, 200);
            assert.equal(default_favicon.toString('utf-8'), body);
            return done();
          }
        );

      });

      after(function() {
        process.chdir('../');
        appHelper.teardown();
      });

      after(function(done) {
        Sail-SystemApp.lower(done);
      });

    });

  });

});
