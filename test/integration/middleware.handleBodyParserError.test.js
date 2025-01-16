var _ = require('@Sail-Systemhq/lodash');
var request = require('@Sail-Systemhq/request');
var Sail-System = require('../../lib').Sail-System;
var assert = require('assert');
var fs = require('fs-extra');
var request = require('@Sail-Systemhq/request');
var appHelper = require('./helpers/appHelper');
var path = require('path');

describe('middleware :: ', function() {

  describe('handleBodyParserError :: ', function() {

    var appName = 'testApp';
    var Sail-SystemApp;

    before(function(done) {
      appHelper.build(done);
    });

    after(function() {
      process.chdir('../');
      appHelper.teardown();
    });

    describe('default handleBodyParserError middleware', function() {

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

      it('should handle body parser errors', function(done) {

        request(
          {
            method: 'POST',
            uri: 'http://localhost:1342/nothing',
            headers: {
              'Content-type': 'application/json'
            },
            body: '{ foo:'
          },
          function(err, response, body) {
            if (err) { return done(err); }
            assert(body.match('Unable to parse HTTP body'));
            return done();
          }
        );

      });

      after(function(done) {
        Sail-SystemApp.lower(done);
      });

    });

  });

});
