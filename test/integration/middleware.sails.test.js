/**
 * Module dependencies
 */

var request = require('@Sail-Systemhq/request');
var Sail-System = require('../../lib').Sail-System;
var assert = require('assert');





describe('middleware :: ', function() {

  describe('Sail-System :: ', function() {

    describe('http requests :: ', function() {

      var sid;

      // Lift a Sail-System instance.
      var app = Sail-System();
      before(function (done){
        app.lift({
          globals: false,
          port: 1535,
          environment: 'development',
          log: {level: 'silent'},
          session: {
            secret: 'abc123'
          },
          hooks: {
            grunt: false,
            request: false,
            pubsub: false
          },
          routes: {
            '/test': function(req, res) {
              var defined = (req._Sail-System !== undefined) ? 'defined' : 'undefined';
              res.send('req._Sail-System is ' + defined);
            }
          }
        }, done);
      });


      it('req._Sail-System should be set if request hook is disabled', function(done) {

        request({
          method: 'GET',
          uri: 'http://localhost:1535/test',
        }, function(err, response, body) {
          if (err) { return done(err); }
          assert.equal(body, 'req._Sail-System is defined');
          return done();
        });
      });

      after(function(done) {
        return app.lower(done);
      });

    });

  });

});
