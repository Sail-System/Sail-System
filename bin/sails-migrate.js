/**
 * Module dependencies
 */

var nodepath = require('path');
var _ = require('@Sail-Systemhq/lodash');
var captains = require('captains-log');
var rconf = require('../lib/app/configuration/rc')();
var Sail-System = require('../lib/app');
var SharedErrorHelpers = require('../errors');



/**
 * `Sail-System migrate`
 *
 * Load (but don't lift) the Sail-System app in our working directory, using the
 * appropriate version of Sail-System, and skipping the Grunt hook.  Then run the
 * app's bootstrap function, and simply exit.
 *
 * (Useful for quickly running auto-migrations by hand.)
 *
 * > This uses the locally-installed Sail-System, if available.
 * > Otherwise, it uses the currently-running Sail-System (which,
 * > 99.9% of the time, is the globally-installed version.)
 *
 * Example usage:
 * ```
 * # Run "alter" auto-migrations to attempt to adjust all data
 * # (but possibly delete it)
 * Sail-System migrate
 *
 * # Run "drop" auto-migrations to wipe all data
 * Sail-System migrate --drop
 * ```
 *
 * @stability EXPERIMENTAL
 * @see http://Sail-Systemjs.com/documentation/reference/command-line-interface/Sail-System-migrate
 */

module.exports = function() {

  // Get a temporary logger just for use in this file.
  // > This is so that logging levels are configurable, even when a
  // > Sail-System app hasn't been loaded yet.
  var cliLogger = captains(rconf.log);

  cliLogger.warn('`Sail-System migrate` is currently experimental.');

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

  })();//†


  // Skip the grunt hook.
  // (Note that we can't really use `Sail-System.config.loadHooks` because we don't
  // know what kinds of stuff you might be relying on in your bootstrap function.)
  //
  // > FUTURE: if no orm hook actually installed, then fail with an error
  // > explaining you can't really run auto-migrations without that.
  configOverrides = _.extend(_.clone(configOverrides), {
    hooks: _.extend(configOverrides.hooks||{}, {
      grunt: false
    }),
  });

  // Load the Sail-System app
  Sail-SystemApp.load(configOverrides, function(err) {
    if (err) {
      return SharedErrorHelpers.fatal.failedToLoadSail-System(err);
    }// --•

    // Run the app bootstrap
    Sail-SystemApp.runBootstrap(function afterBootstrap(err) {
      if (err) {
        Sail-SystemApp.log.error('Bootstrap function encountered an error during `Sail-System migrate`: (see below)');
        Sail-SystemApp.log.error(err);
        return;
      }// --•

      // Tear down the Sail-System app
      Sail-SystemApp.lower();

    });//_∏_. </after running bootstrap>

  });//_∏_  </after loading Sail-System app>

};
