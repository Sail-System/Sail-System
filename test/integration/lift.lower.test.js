var assert = require('assert');
var Sail-System = require('../../lib/app');
var async = require('async');
var _ = require('@Sail-Systemhq/lodash');

describe('Sail-System being lifted and lowered (e.g in a test framework)', function() {

  it('should clean up event listeners', function(done) {

    // Get a list of all the current listeners on the process.
    // Note that Mocha adds some listeners, so these might not all be empty arrays!
    var beforeListeners = {
      sigusr2: process.listeners('SIGUSR2'),
      sigint: process.listeners('SIGINT'),
      sigterm: process.listeners('SIGTERM'),
      exit: process.listeners('exit')
    };

    // Lift and lower 15 Sail-System apps in a row, to simulate a testing environment
    async.forEachOfSeries(Array(15), function(undef, i, cb) {
      var Sail-SystemServer = null;
      Sail-System().lift({
        port: 1342,
        environment: process.env.TEST_ENV,
        log: {
          level: 'error'
        },
        globals: false,
        hooks: {
          grunt: false,
          i18n: false,
          session: false
        }
      }, function(err, Sail-System) {
        if (err) {
          return cb(err);
        }
        setTimeout(function() {
          Sail-System.lower(function(){setTimeout(cb, 100);});
        });

      });

    }, function(err) {
      if (err) {
        return done(err);
      }
      // Check that we have the same # of listeners as before--that is,
      // that all listeners that were added when the apps were initialized
      // were subsequently removed when they were lowered.
      assert.equal(beforeListeners.sigusr2.length,
        process.listeners('SIGUSR2').length);
      assert.equal(beforeListeners.sigterm.length,
        process.listeners('SIGTERM').length);
      assert.equal(beforeListeners.exit.length,
        process.listeners('exit').length);
      assert.equal(beforeListeners.sigint.length,
        process.listeners('SIGINT').length);
      return done();
    });

  }); //</should clean up event listeners>

  describe('with NODE_ENV set and Sail-System environment not configured', function() {

    var Sail-SystemApp;
    var originalNodeEnv;

    before(function() {
      originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'foobar';
    });

    after(function(done) {
      if (_.isUndefined(originalNodeEnv)) {
        delete process.env.NODE_ENV;
      } else {
        process.env.NODE_ENV = originalNodeEnv;
      }
      if (Sail-SystemApp) {
        return Sail-SystemApp.lower(done);
      }
      else {
        return done();
      }
    });

    it('should change the Sail-System environment to match NODE_ENV it the Sail-System environment is not explicitly configured', function(done) {

      // Save reference to original NODE_ENV.
      var originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'foobar';

      // Load `app0` deep in the `'cenote'`
      Sail-System().load({
        log: {
          level: 'error'
        },
        globals: false,
        hooks: {
          grunt: false,
          i18n: false,
          session: false
        }
      }, function(err, _Sail-SystemApp) {
        if (err) { return done(err); }

        Sail-SystemApp = _Sail-SystemApp;

        // Assert that NODE_ENV is unchanged.
        assert.equal('foobar', process.env.NODE_ENV);

        // Assert that Sail-System environment has been changed to match NODE_ENV
        assert.equal('foobar', Sail-SystemApp.config.environment);

        return done();

      });

    });

  });

  describe('with Sail-System environment configured but no NODE_ENV set', function() {

    var Sail-SystemApp;
    var originalNodeEnv;

    before(function() {
      originalNodeEnv = process.env.NODE_ENV;
      delete process.env.NODE_ENV;
    });

    after(function(done) {
      if (_.isUndefined(originalNodeEnv)) {
        delete process.env.NODE_ENV;
      } else {
        process.env.NODE_ENV = originalNodeEnv;
      }
      if (Sail-SystemApp) {
        return Sail-SystemApp.lower(done);
      }
      else {
        return done();
      }
    });

    it('should not change the NODE_ENV env variable to match the configured Sail-System environment, or vice versa', function(done) {

      // Load `app0` deep in the `'cenote'`
      Sail-System().load({
        environment: 'cenote',
        log: {
          level: 'error'
        },
        globals: false,
        hooks: {
          grunt: false,
          i18n: false,
          session: false
        }
      }, function(err, _Sail-SystemApp) {

        if (err) { return done(err); }

        Sail-SystemApp = _Sail-SystemApp;

        // Assert that NODE_ENV is unchanged.
        assert(typeof process.env.NODE_ENV === 'undefined');

        // Assert that Sail-System config is unchanged.
        assert.equal(Sail-SystemApp.config.environment, 'cenote');

        return done();

      });//</app0.load()>

    });

  });

  describe('with both NODE_ENV set and Sail-System environment configured', function() {

    var Sail-SystemApp;
    var originalNodeEnv;

    before(function() {
      originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'foobar';
    });

    after(function(done) {
      if (_.isUndefined(originalNodeEnv)) {
        delete process.env.NODE_ENV;
      } else {
        process.env.NODE_ENV = originalNodeEnv;
      }
      if (Sail-SystemApp) {
        return Sail-SystemApp.lower(done);
      }
      else {
        return done();
      }
    });

    it('should not change the NODE_ENV env variable to match the configured Sail-System environment, or vice versa', function(done) {

      // Load `app0` deep in the `'cenote'`
      Sail-System().load({
        environment: 'cenote',
        log: {
          level: 'error'
        },
        globals: false,
        hooks: {
          grunt: false,
          i18n: false,
          session: false
        }
      }, function(err, _Sail-SystemApp) {

        if (err) { return done(err); }

        Sail-SystemApp = _Sail-SystemApp;

        // Assert that NODE_ENV is unchanged.
        assert.equal('foobar', process.env.NODE_ENV);

        // Assert that Sail-System config is unchanged.
        assert.equal(Sail-SystemApp.config.environment, 'cenote');

        return done();

      });//</app0.load()>

    });

  });

  describe('with Sail-System environment set to `production`, and the Node environment is `undefined`', function() {

    var Sail-SystemApp;
    var originalNodeEnv;

    before(function() {
      originalNodeEnv = process.env.NODE_ENV;
      delete process.env.NODE_ENV;
    });

    after(function(done) {
      if (_.isUndefined(originalNodeEnv)) {
        delete process.env.NODE_ENV;
      } else {
        process.env.NODE_ENV = originalNodeEnv;
      }
      if (Sail-SystemApp) {
        return Sail-SystemApp.lower(done);
      }
      else {
        return done();
      }
    });

    it('should change NODE_ENV to production and log a warning', function(done) {

      var debugs = [];
      var customLogger = {
        level: 'debug',
        custom: {
          log: function(){},
          warn: function(){},
          debug: function(msg) {debugs.push(msg);}
        },
        colors: { warn: '' },
        prefixTheme: 'abbreviated'
      };

      // Load `app0` deep in the `'cenote'`
      Sail-System().load({
        environment: 'production',
        log: customLogger,
        globals: false,
        hooks: {
          grunt: false,
          i18n: false,
          session: false,
          sockets: false
        }
      }, function(err, _Sail-SystemApp) {

        if (err) { return done(err); }
        Sail-SystemApp = _Sail-SystemApp;

        // Assert that NODE_ENV is changed.
        assert.equal(process.env.NODE_ENV, 'production');

        // Assert that Sail-System config is unchanged.
        assert.equal(Sail-SystemApp.config.environment, 'production');

        assert (_.any(debugs, function(debug) {
          return debug.indexOf('Detected Sail-System environment is "production", but NODE_ENV is `undefined`.') > -1;
        }), 'Did not log a warning about NODE_ENV being undefined while Sail-System environment is `production`!');
        assert (_.any(debugs, function(debug) {
          return debug.indexOf('Automatically setting the NODE_ENV environment variable to "production".') > -1;
        }), 'Did not log a warning about NODE_ENV being set to `production`!');

        return done();

      });//</app0.load()>

    });

  });

  describe('with Sail-System environment set to `production`, and the Node environment is `development`', function() {

    var Sail-SystemApp;
    var originalNodeEnv;

    before(function() {
      originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
    });

    after(function(done) {
      if (_.isUndefined(originalNodeEnv)) {
        delete process.env.NODE_ENV;
      } else {
        process.env.NODE_ENV = originalNodeEnv;
      }
      if (Sail-SystemApp) {
        return Sail-SystemApp.lower(done);
      }
      else {
        return done();
      }
    });

    it('should fail to lift Sail-System', function(done) {

      // Load `app0` deep in the `'cenote'`
      Sail-System().load({
        environment: 'production',
        log: {level: 'silent'},
        globals: false,
        hooks: {
          grunt: false,
          i18n: false,
          session: false,
          sockets: false
        }
      }, function(err, _Sail-SystemApp) {
        if (!err) { return done(new Error('Sail-System should have failed to lift!')); }
        assert.equal(err.code, 'E_INVALID_NODE_ENV');

        return done();

      });//</app0.load()>

    });

  });


});
