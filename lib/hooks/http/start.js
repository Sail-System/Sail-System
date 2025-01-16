/**
 * Module dependencies.
 */

var async = require('async');
var flaverr = require('flaverr');


module.exports = function (Sail-System) {

  return function startServer (cb) {

    // Used to warn about possible issues if starting the server is taking a long time
    var liftAbortTimer;
    var liftTimeout = Sail-System.config.liftTimeout || 4000;
    // TODO: pull this defaulting into `defaults`
    // and also ensure this config is properly documented.

    async.auto({

      // Start Express server
      start: function (next) {

        var explicitHost = Sail-System.config.explicitHost;

        // If host is explicitly declared, include it in express's listen() call
        if (explicitHost) {
          Sail-System.log.verbose('Restricting access to explicit host: '+explicitHost);
          Sail-System.hooks.http.server.listen(Sail-System.config.port, explicitHost, next);
        }
        else {
          // Listen for error events that may be emitted as the server attempts to start
          Sail-System.hooks.http.server.on('error', failedToStart);
          Sail-System.hooks.http.server.listen(Sail-System.config.port, function(err) {
            // Remove the error listener so future error events emitted by the server
            // don't get handled by the "failedToStart" function below.
            Sail-System.hooks.http.server.removeListener('error', failedToStart);
            return next(err);
          });
        }

        // Start timer in case this takes suspiciously long...
        liftAbortTimer = setTimeout(failedToStart, liftTimeout);

        // If the server fails to start because of an error, or if it's just taking
        // too long, show some troubleshooting notes and bail out.
        function failedToStart(err) {

          // If this was called because of an actual error, clear the timeout
          // so failedToStart doesn't get called again.
          if (err) {
            clearTimeout(liftAbortTimer);
          }

          // If Sail-System is exiting already, don't worry about the timer going off.
          if (Sail-System._exiting) {return;}

          // Figure out if this user is on Windows
          var isWin = !!process.platform.match(/^win/);

          // If server isn't starting, provide general troubleshooting information,
          // sharpened with a few simple heuristics:
          console.log('');
          if (err) {
            Sail-System.log.error('Server failed to start.');
            if (err.code) {
              Sail-System.log.error('(received error: ' + err.code + ')');
            }
          } else {
            Sail-System.log.error('Server is taking a while to start up (it\'s been ' + (liftTimeout / 1000) + ' seconds).');
          }

          Sail-System.log.error();
          Sail-System.log.error('Troubleshooting tips:');
          Sail-System.log.error();

          // 0. Just a slow Grunt task
          if (Sail-System.hooks.grunt && ! (err && err.code === 'EADDRINUSE')) {
            if (process.env.NODE_ENV === 'production') {
              Sail-System.log.error(
                ' -> Do you have a slow Grunt task?  You are running in production mode where, by default, tasks are configured to minify the JavaScript and CSS/LESS files in your assets/ directory.  Sometimes, these processes can be slow, particularly if you have lots of these types of files.'
              );
            }
            else {
              Sail-System.log.error(
                ' -> Do you have a slow Grunt task, or lots of assets?'
              );
            }
            Sail-System.log.error();
          }

          // 1. Unauthorized
          if (Sail-System.config.port < 1024) {
            Sail-System.log.error(
            ' -> Do you have permission to use port ' + Sail-System.config.port + ' on this system?',
            // Don't mention `sudo` to Windows users-- I hear you guys get touchy about that sort of thing :)
            (isWin) ? '' : '(you might try `sudo`)'
            );

            Sail-System.log.error();
          }

          // 2. Invalid or unauthorized explicitHost configuration.
          if (explicitHost) {
            Sail-System.log.error(
            ' -> You might remove your explicit host configuration and try lifting again (you specified',
            '`'+explicitHost+'`',
            '.)');

            Sail-System.log.error();
          }

          // 3. Something else is running on this port
          Sail-System.log.error(
          ' -> Is something else already running on port', Sail-System.config.port,
          (explicitHost ? (' with hostname ' + explicitHost) : '') + '?'
          );
          Sail-System.log.error();

          // 4. invalid explicitHost
          if (!explicitHost) {
            Sail-System.log.error(
            ' -> Are you deploying on a platform that requires an explicit hostname,',
            'like OpenShift?');
            Sail-System.log.error(
            '    (Try setting the `explicitHost` config to the hostname where the server will be accessible.)'
            );
            Sail-System.log.error(
            '    (e.g. `mydomain.com` or `183.24.244.42`)'
            );
          }
          console.log('');

          // Lower Sail-System to do any necessary cleanup
          Sail-System.lower(function(){
            // Exit with a non-zero value to indicate an error
            process.exit(1);
            // TODO: For a more graceful shutdown, we should instead consider:
            // return next(new Error('blah blah'));
          });
        }//</failedToStart>
      },

      verify: ['start', function (results, next) {
        var explicitHost = Sail-System.config.explicitHost;

        // Check for port conflicts
        // Ignore this check if explicit host is set, since other more complicated things might be going on.
        if( !explicitHost && !Sail-System.hooks.http.server.address() ) {
          var portBusyErrorMsg = '';
          portBusyErrorMsg += 'Trying to start server on port ' + Sail-System.config.port + ' but can\'t...';
          portBusyErrorMsg += 'Something else is probably running on that port!' + '\n';
          portBusyErrorMsg += 'Please disable the other server, or choose a different port and try again.';
          Sail-System.log.error(portBusyErrorMsg);
          throw flaverr({ name: 'userError', code: 'E_PORT_BUSY' }, new Error(portBusyErrorMsg));
          // TODO: For a more graceful shutdown, we should instead consider:
          // return next(new Error(portBusyErrorMsg));
        }

        next();
      }]

    }, function expressListening (err) {
      clearTimeout(liftAbortTimer);
      if (err) { return cb(err); }

      // Announce that express is now listening on a port
      Sail-System.emit('hook:http:listening');
      return cb();
    });
  };

};
