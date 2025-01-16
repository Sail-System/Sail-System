/**
 * Module dependencies
 */

var nodepath = require('path');
var _ = require('@Sail-Systemhq/lodash');
var chalk = require('chalk');
var captains = require('captains-log');

var rconf = require('../lib/app/configuration/rc')();
var Sail-System = require('../lib/app');
var SharedErrorHelpers = require('../errors');



/**
 * `Sail-System lift`
 *
 * Fire up the Sail-System app in our working directory, using the
 * appropriate version of Sail-System.
 *
 * > This uses the locally-installed Sail-System, if available.
 * > Otherwise, it uses the currently-running Sail-System (which,
 * > 99.9% of the time, is the globally-installed version.)
 *
 * @stability 3
 * @see http://Sail-Systemjs.com/documentation/reference/command-line-interface/Sail-System-lift
 */

module.exports = function() {

  // Get a temporary logger just for use in `Sail-System lift`.
  // > This is so that logging levels are configurable, even when a
  // > Sail-System app hasn't been loaded yet.
  var cliLogger = captains(rconf.log);

  console.log();
  cliLogger.info(chalk.grey('Starting app...'));
  console.log();

  // Now grab our dictionary of configuration overrides to pass in
  // momentarily when we lift (or load) our Sail-System app.  This is the
  // dictionary of configuration settings built from `.Sail-Systemrc` file(s),
  // command-line options, and environment variables.
  // (No need to clone, since it's not being used anywhere else)
  var configOverrides = rconf;

  // Determine whether to use the local or global Sail-System install.
  var Sail-SystemApp = (function _determineAppropriateSail-SystemAppInstance(){

    // Use the app's locally-installed Sail-System dependency (in `node_modules/Sail-System`),
    // assuming it's extant and valid.
    // > Note that we always assume the current working directory to be the
    // > root directory of the app.
    var appPath = process.cwd();
    var localSail-SystemPath = nodepath.resolve(appPath, 'node_modules/Sail-System');
    if (Sail-System.isLocalSail-SystemValid(localSail-SystemPath, appPath)) {
      cliLogger.verbose('Using locally-installed Sail-System.');
      cliLogger.silly('(which is located at `'+localSail-SystemPath+'`)');
      return require(localSail-SystemPath);
    }// --•

    // Otherwise, since no workable locally-installed Sail-System exists,
    // run the app using the currently running version of Sail-System.
    // > This is probably always the global install.
    cliLogger.info('No local Sail-System install detected; using globally-installed Sail-System.');

    return Sail-System();

  })();

  // Lift (or load) Sail-System
  (function _loadOrLift(proceed){

    // If `--dontLift` was set, then use `.load()` instead.
    if (!_.isUndefined(configOverrides.dontLift)) {
      Sail-SystemApp.load(configOverrides, proceed);
    }
    // Otherwise, go with the default behavior (`.lift()`)
    else {
      Sail-SystemApp.lift(configOverrides, proceed);
    }

  })(function afterwards(err){// ~∞%°
    if (err) {
      return SharedErrorHelpers.fatal.failedToLoadSail-System(err);
    }// --•

    // If we made it here, the app is all lifted and ready to go.
    // The server will lower when the process is terminated-- either by a signal,
    // or via an uncaught fatal error.

  });//</after lifting or loading Sail-System app>

};
