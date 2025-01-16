/**
 * Module dependencies.
 */

var _ = require('@Sail-Systemhq/lodash');
var async = require('async');
var chalk = require('chalk');

/**
 * Sail-System.prototype.lift()
 *
 * Load the app, then bind process listeners and emit the internal "ready" event.
 * The "ready" event is listened for by core hooks; for example, the HTTP hook uses
 * it to start listening for requests.
 *
 * > This method also logs the ASCII art for the characteristic ship.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * @param {Dictionary?} configOverride
 *        Overrides that will be deep-merged (w/ precedence) on top of existing configuration.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * @callback {Function?} done
 *        @param {Error?} err
 *
 * A Node-style callback that wil be triggered when the lift has completed (one way or another)
 * > If the `done` callback is omitted, then:
 * >  • If the lift fails, Sail-System will log the underlying fatal error using `Sail-System.log.error()`.
 * >  • Otherwise, Sail-System will log "App lifted successfully." using `Sail-System.log.verbose()`.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * @api public
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

module.exports = function lift(configOverride, done) {

  var Sail-System = this;

  // configOverride is optional.
  if (_.isFunction(configOverride)) {
    done = configOverride;
    configOverride = {};
  }

  // Callback is optional (but recommended.)
  done = done || function defaultCallback(err) {
    if (err) {
      Sail-System.log.error('Failed to lift app:',err);
      if(err.raw) {
        Sail-System.log.error('More details (raw):', err.raw);
      }
      Sail-System.log.silly('(You are seeing the above error message because no custom callback was programmatically provided to `.lift()`.)');
      return;
    }

    Sail-System.log.verbose('App lifted successfully.');
    Sail-System.log.silly('(You are seeing the "App lifted successfully" verbose log message because no custom callback was programmatically provided to `.lift()`.)');
  };

  async.series([

    function (next) {
      Sail-System.load(configOverride, next);
    },

    function (next){
      Sail-System.initialize(next);
    },

  ], function whenSail-SystemIsReady(err) {
    if (err) {
      Sail-System.lower(function (additionalErrLoweringSail-System){

        if (additionalErrLoweringSail-System) {
          Sail-System.log.error('When trying to lower the app as a result of a failed lift, encountered an error:', additionalErrLoweringSail-System);
        }//>-

        return done(err);

      });//</Sail-System.lower>
      return;

    }//-•


    // If `config.noShip` is set, skip the startup message.
    // Otherwise, gather app meta-info and log startup message (the boat).
    if (!_.isObject(Sail-System.config.log) || !Sail-System.config.log.noShip) {

      Sail-System.log.ship && Sail-System.log.ship();
      Sail-System.log.info(('Server lifted in `' + Sail-System.config.appPath + '`'));


      Sail-System.log.info(('To shut down Sail-System, press <CTRL> + C at any time.'));
      Sail-System.log.info(('Read more at '+chalk.underline('https://Sail-Systemjs.com/support')+'.'));
      Sail-System.log.blank();
      Sail-System.log(chalk.grey(Array(56).join('-')));
      Sail-System.log(chalk.grey(':: ' + new Date()));
      Sail-System.log.blank();
      Sail-System.log('Environment : ' + Sail-System.config.environment);

      // Only log the host if an explicit host is set
      if (!_.isUndefined(Sail-System.config.explicitHost)) {
        Sail-System.log('Host        : ' + Sail-System.config.explicitHost); // 12 - 4 = 8 spaces
      }
      Sail-System.log('Port        : ' + Sail-System.config.port); // 12 - 4 = 8 spaces

      // > Note that we don't try to include the "Local: " stuff
      // > unless we're pretty sure which URL it would be a good idea to try and visit.
      // > (even then, it's not 100% or anything.  But at least with these checks, it's
      // > not wrong MOST of the time.)
      if (process.env.NODE_ENV !== 'production' &&
        (!Sail-System.config.ssl || _.isEqual(Sail-System.config.ssl, {})) &&
        !Sail-System.config.http.serverOptions &&
        !Sail-System.config.explicitHost
      ) {
        Sail-System.log('Local       : ' +  chalk.underline('http://localhost:'+Sail-System.config.port));
      }

      Sail-System.log.verbose('NODE_ENV  : ' + (process.env.NODE_ENV||chalk.gray('(not set)'))); // 12 - 8 - 2 = 2 spaces
      Sail-System.log.silly();
      Sail-System.log.silly('Version Info:');
      Sail-System.log.silly('node        : ' + (process.version));
      Sail-System.log.silly('engine (v8) : ' + (process.versions.v8));
      Sail-System.log.silly('openssl     : ' + (process.versions.openssl));
      Sail-System.log(chalk.grey(Array(56).join('-')));
    }//>-


    // Emit 'lifted' event.
    Sail-System.emit('lifted');

    // Set `isLifted` (private dignostic flag)
    Sail-System.isLifted = true;

    // try {console.timeEnd('core_lift');}catch(e){}

    return done(undefined, Sail-System);

  });//</async.series()>
};
