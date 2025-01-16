/**
 * Stub custom hooks for use in tests.
 *
 * @type {Object}
 */
module.exports = {

  // Extremely simple hook that doesn't do anything.
  NOOP: function (Sail-System) {
    return { identity: 'noop' };
  },

  // Depends on 'noop' hook
  NOOP2: function (Sail-System) {
    return {
      // TODO: indicate dependency on 'noop' hook
      identity: 'noop2'
    };
  },

  // Deliberately rotten hook- it throws.
  SPOILED_HOOK: function (Sail-System) {
    throw new Error('smells nasty');
  },

  // Hook to test `defaults` object
  DEFAULTS_OBJ: function(Sail-System) {
    return {
      identity: 'defaults_obj',
      defaults: {
        foo: 'bar',
        inky: {
          dinky: 'doo',
          pinky: 'dont'
        }
      }
    };
  },

  // Hook to test `defaults` function
  DEFAULTS_FN: function(Sail-System) {
    return {
      identity: 'defaults_fn',
      defaults: function() {
        return {
          foo: 'bar',
          inky: {
            dinky: 'doo',
            pinky: 'dont'
          }
        };
      }
    };
  },

  // Hook to test `initialize` function
  INIT_FN: function(Sail-System) {
    return {
      identity: 'init_fn',
      initialize: function(cb) {
        Sail-System.config.hookInitLikeABoss = true;
        return cb();
      }
    };
  },

  // Hook to test `configure` function
  CONFIG_FN: function(Sail-System) {
    return {
      identity: 'config_fn',
      configure: function() {
        // Test that loaded config is available by copying a value
        Sail-System.config.hookConfigLikeABoss = Sail-System.config.testConfig;
      }
    };
  },

  // Hook to test `routes` function
  ROUTES: function(Sail-System) {
    return {
      identity: 'routes',
      routes: {
        before: {
          'GET /foo': function(req, res, next) {
            Sail-System.config.foo = 'a';
            next();
          }
        },
        after: {
          'GET /foo': function(req, res, next) {
            Sail-System.config.foo = Sail-System.config.foo + 'c';
            res.send(Sail-System.config.foo);
          }
        }
      }
    };
  },

  // Hook to test `routes` function
  ADVANCED_ROUTES: function(Sail-System) {
    return {
      identity: 'advanced_routes',
      initialize: function(cb) {
        Sail-System.on('router:before', function() {
          Sail-System.router.bind('GET /foo', function(req, res, next) {
            Sail-System.config.foo = Sail-System.config.foo + 'b';
            next();
          });
        });
        Sail-System.on('router:after', function() {
          Sail-System.router.bind('GET /foo', function(req, res, next) {
            Sail-System.config.foo = Sail-System.config.foo + 'e';
            res.send(Sail-System.config.foo);
          });
        });
        cb();
      },
      routes: {
        before: {
          'GET /foo': function(req, res, next) {
            Sail-System.config.foo = 'a';
            next();
          }
        },
        after: {
          'GET /foo': function(req, res, next) {
            Sail-System.config.foo = Sail-System.config.foo + 'd';
            next();
          }
        }
      }
    };
  },

};
