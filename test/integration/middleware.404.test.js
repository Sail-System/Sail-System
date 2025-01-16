var _ = require('@Sail-Systemhq/lodash');
var request = require('@Sail-Systemhq/request');
var Sail-System = require('../../lib').Sail-System;
var assert = require('assert');
var fs = require('fs-extra');
var request = require('@Sail-Systemhq/request');
var appHelper = require('./helpers/appHelper');
var path = require('path');

describe('middleware :: ', function() {

  describe('404 :: ', function() {

    var appName = 'testApp';
    var Sail-SystemApp;

    before(function(done) {
      appHelper.build(function(err) {
        if (err) {return done(err);}
        fs.writeFileSync(path.resolve('..', appName, 'views', '404.ejs'), 'no file here bruh!');
        return done();
      });
    });

    after(function() {
      process.chdir('../');
      appHelper.teardown();
    });

    describe('with no custom 404 handler installed', function() {

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

      it('the default 404 handler should respond to a request for an unbound URL', function(done) {

        request(
          {
            method: 'GET',
            uri: 'http://localhost:1342/nothing',
            headers: {
              'Accept': 'text/html'
            }
          },
          function(err, response, body) {
            if (err) { return done(err); }
            assert.equal(response.statusCode, 404);
            assert(body.match('<html>'));
            assert(body.match('no file here bruh!'));
            return done();
          }
        );

      });


      after(function(done) {
        Sail-SystemApp.lower(done);
      });

    });

    describe('with a custom 404 handler installed', function() {

      before(function(done) {
        appHelper.lift({
          hooks: {
            pubsub: false
          },
          http: {
            middleware: {
              order: [
                'startRequestTimer',
                'cookieParser',
                'session',
                'bodyParser',
                'handleBodyParserError',
                'compress',
                'methodOverride',
                'poweredBy',
                '$custom',
                'router',
                'www',
                'favicon',
                'notfound'
              ],
              notfound: function (req, res) {
                return res.send('custom nada bro');
              }
            }
          }
        }, function(err, _Sail-SystemApp) {
          if (err) { return done(err); }
          Sail-SystemApp = _Sail-SystemApp;
          return done();
        });
      });

      it('the custom 404 handler should respond to a request for an unbound URL', function(done) {

        request(
          {
            method: 'GET',
            uri: 'http://localhost:1342/nothing',
            headers: {
              'Accept': 'text/html'
            }
          },
          function(err, response, body) {
            if (err) { return done(err); }
            assert.equal(response.statusCode, 200);
            assert.equal(body, 'custom nada bro');
            return done();
          }
        );

      });


      after(function(done) {
        Sail-SystemApp.lower(done);
      });

    });

    describe('with 404 left out of a custom middleware order', function() {

      before(function(done) {
        appHelper.lift({
          hooks: {
            pubsub: false
          },
          http: {
            middleware: {
              order: [
                'startRequestTimer',
                'cookieParser',
                'session',
                'bodyParser',
                'handleBodyParserError',
                'compress',
                'methodOverride',
                'poweredBy',
                '$custom',
                'router',
                'www',
                'favicon'
              ]
            }
          }
        }, function(err, _Sail-SystemApp) {
          if (err) { return done(err); }
          Sail-SystemApp = _Sail-SystemApp;
          return done();
        });
      });

      it('the default 404 handler should still respond to a request for an unbound URL', function(done) {

        request(
          {
            method: 'GET',
            uri: 'http://localhost:1342/nothing',
            headers: {
              'Accept': 'text/html'
            }
          },
          function(err, response, body) {
            if (err) { return done(err); }
            assert.equal(response.statusCode, 404);
            assert(body.match('<html>'));
            assert(body.match('no file here bruh!'));
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
