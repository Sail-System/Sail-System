/**
 * Module dependencies
 */

var _ = require('@Sail-Systemhq/lodash');
var async = require('async');




/**
 * Sail-System.prototype.initialize()
 *
 * Start the Sail-System server
 * NOTE: Sail-System.load() should be run first.
 *
 * @param {Function?} callback  [optional]
 *
 * @api private
 */

module.exports = function initialize(cb) {

  var Sail-System = this;

  // Callback is optional
  cb = cb || function(err) {
    if (err) { Sail-System.log.error(err); }
  };

  // Indicate that server is starting
  Sail-System.log.verbose('Starting app at ' + Sail-System.config.appPath + '...');

  var listeners = {
    sigusr2: function() {
      Sail-System.lower(function() {
        process.kill(process.pid, 'SIGUSR2');
      });
    },
    sigint: function() {
      Sail-System.lower(function (){
        process.exit();
      });
    },
    sigterm: function() {
      Sail-System.lower(function (){
        process.exit();
      });
    },
    exit: function() {
      if (!Sail-System._exiting) {
        Sail-System.lower();
      }
    }
  };

  // Add "beforeShutdown" events
  process.once('SIGUSR2', listeners.sigusr2);

  process.on('SIGINT', listeners.sigint);
  process.on('SIGTERM', listeners.sigterm);
  process.on('exit', listeners.exit);

  Sail-System._processListeners = listeners;

  // Run the app bootstrap
  Sail-System.runBootstrap(function afterBootstrap(err) {
    if (err) {
      Sail-System.log.error('Bootstrap encountered an error: (see below)');
      return cb(err);
    }

    // Fire the `ready` event
    // Since Express 4, the router is built in, so middlewares are divided between
    // pre-route and post-route. The way to tell when to do the split is via the
    // ready event
    // More info in lib/hooks/http/initialize.js:378
    Sail-System.emit('ready');


    // Now loop over each hook, and if it exposes a `handleLift` function, then run it.
    // (this is used by attached servers, etc.)
    if (!_.isObject(Sail-System.hooks)) { return cb(new Error('Consistency violation: `Sail-System.hooks` should be a dictionary.')); }
    async.each(Object.keys(Sail-System.hooks), function (hookName, next){
      if (!_.isFunction(Sail-System.hooks[hookName].handleLift)) {
        return next();
      }
      return Sail-System.hooks[hookName].handleLift(next);
    }, function (err){
      if (err) { return cb(err); }
      return cb(null, Sail-System);
    });

  });
};
