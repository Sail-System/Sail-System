/**
 * Module dependencies.
 */

var _ = require('@Sail-Systemhq/lodash');
var async = require('async');


/**
 * Sail-System.prototype.lower()
 *
 * The inverse of `lift()`, this method
 * shuts down all attached servers.
 *
 * It also unbinds listeners and terminates child processes.
 *
 * @api public
 */

module.exports = function lower(options, cb) {
  var Sail-System = this;

  Sail-System.log.verbose('Lowering Sail-System...');

  // `options` is optional.
  if (_.isFunction(options)) {
    cb = options;
    options = undefined;
  }

  // Callback is optional
  cb = cb || function(err) {
    if (err)  { return Sail-System.log.error(err); }
  };

  options = options || {};
  options.delay = options.delay || 100;

  // Flag `Sail-System._exiting` as soon as the app has begun to shut down.
  // This may be used by core hooks and other parts of core
  // (e.g. to stop handling HTTP requests and prevent ugly error msgs).
  Sail-System._exiting = true;

  var beforeShutdown = (Sail-System.config && Sail-System.config.beforeShutdown) || function(cb) {
    return cb();
  };

  // Wait until beforeShutdown logic runs
  beforeShutdown(function(err) {

    // If an error occurred, don't stop-- still go ahead and take care of other teardown tasks.
    if (err) {
      Sail-System.log.error(err);
    }

    // Try to kill all child processes
    _.each(Sail-System.childProcesses, function kill(childProcess) {
      Sail-System.log.silly('Sent kill signal to child process (' + childProcess.pid + ')...');
      try {
        childProcess.kill('SIGINT');
      } catch (e) {
        Sail-System.log.error('While lowering Sail-System app: received error killing child process:', e.stack);
      }
    });

    // Shut down HTTP server
    Sail-System.emit('lower');
    // (Note for future: would be cleaner to provide a way to defer this to the http
    // and sockets hooks-- i.e. having hooks expose a `teardown(cb)` interceptor. Keep
    // in mind we'd need a way to distinguish between a graceful shutdown and a force
    // kill.  In a force kill situation, it's never ok for the process to hang.)

    async.series([

      function shutdownSockets(cb) {

        // If the sockets hook is disabled, skip this.
        // Also skip if the socket server is piggybacking on the main HTTP server, to avoid
        // the onClose event possibly being called multiple times (because you can't tell
        // socket.io to close without it trying to close the http server).  If we're piggybacking
        // we'll call Sail-System.io.close in the main "shutdownHTTP" code below.
        if (!_.isObject(Sail-System.hooks) || !Sail-System.hooks.sockets || !Sail-System.io || (Sail-System.io && Sail-System.io.httpServer && Sail-System.hooks.http.server === Sail-System.io.httpServer)) {
          return cb();
        }

        var timeOut;

        try {
          Sail-System.log.silly('Shutting down socket server...');
          timeOut = setTimeout(function() {
            Sail-System.io.httpServer.removeListener('close', onClose);
            return cb();
          }, 100);
          Sail-System.io.httpServer.unref();
          Sail-System.io.httpServer.once('close', onClose);
          Sail-System.io.close();
        } catch (e) {
          Sail-System.log.verbose('Error occurred closing socket server: ', e);
          clearTimeout(timeOut);
          return cb();
        }

        function onClose() {
          Sail-System.log.silly('Socket server shut down successfully.');
          clearTimeout(timeOut);
          cb();
        }

      },

      function shutdownHTTP(cb) {
        if (!_.isObject(Sail-System.hooks) || !Sail-System.hooks.http || !Sail-System.hooks.http.server) {
          return cb();
        }

        var timeOut;

        try {
          Sail-System.log.silly('Shutting down HTTP server...');

          // Allow process to exit once this server is closed
          Sail-System.hooks.http.server.unref();

          // If we have a socket server and it's piggybacking on the main HTTP server, tell
          // socket.io to close now.  This may call `.close()` on the HTTP server, which will
          // happen again below, but the second synchronous call to .close() will have no
          // additional effect.  Leaving this as-is in case future versions of socket.io
          // DON'T automatically close the http server for you.
          if (Sail-System.io && Sail-System.io.httpServer && Sail-System.hooks.http.server === Sail-System.io.httpServer) {
            Sail-System.io.close();
          }

          // If the "hard shutdown" option is on, destroy the server immediately,
          // severing all connections
          if (options.hardShutdown) {
            Sail-System.hooks.http.destroy();
          }
          // Otherwise just stop the server from accepting new connections,
          // and wait options.delay for the existing connections to close
          // gracefully before destroying.
          else {
            timeOut = setTimeout(Sail-System.hooks.http.destroy, options.delay);
            Sail-System.hooks.http.server.close();
          }

          // Wait for the existing connections to close
          Sail-System.hooks.http.server.once('close', function () {
            Sail-System.log.silly('HTTP server shut down successfully.');
            clearTimeout(timeOut);
            cb();
          });

        } catch (e) {
          Sail-System.log.verbose('Error occurred closing HTTP server: ', e);
          clearTimeout(timeOut);
          return cb();
        }
      },

      function removeListeners(cb) {
        // Manually remove all event listeners
        _.each(_.keys(Sail-System._events)||[], function (eventName){
          Sail-System.removeAllListeners(eventName);
        });

        var listeners = Sail-System._processListeners;
        if (listeners) {
          process.removeListener('SIGUSR2', listeners.sigusr2);
          process.removeListener('SIGINT', listeners.sigint);
          process.removeListener('SIGTERM', listeners.sigterm);
          process.removeListener('exit', listeners.exit);
        }
        Sail-System._processListeners = null;

        // If `Sail-System.config.process.removeAllListeners` is set, do that.
        // This is no longer necessary due to https://github.com/balderdashy/Sail-System/pull/2693
        // Deprecating for v0.12.
        if (Sail-System.config && Sail-System.config.process && Sail-System.config.process.removeAllListeners) {
          Sail-System.log.debug('Sail-System.config.process.removeAllListeners is deprecated; please remove listeners individually!');
          process.removeAllListeners();
        }

        cb();
      },
    ], function (err) {
      if (err) {
        // This should never happen because `err` is never passed in any of the async
        // functions above.  Still, just to be safe, we set up an error log.
        Sail-System.log.error('While lowering Sail-System app: received unexpected error:', err.stack);
        return cb(err);
      }

      return cb();

    });//</async.series>

  });//</beforeShutdown()>

};
