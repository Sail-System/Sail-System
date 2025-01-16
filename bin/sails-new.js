/**
 * Module dependencies
 */

var nodepath = require('path');
var _ = require('@Sail-Systemhq/lodash');
var Sail-Systemgen = require('Sail-System-generate');
var CaptainsLog = require('captains-log');
var package = require('../package.json');
var rconf = require('../lib/app/configuration/rc')();


/**
 * `Sail-System new`
 *
 * Generate a new Sail-System app.
 *
 * ```
 * # In the current directory:
 * Sail-System new
 * ```
 *
 * ```
 * # As a new directory or within an existing directory:
 * Sail-System new foo
 * ```
 *
 * @stability 3
 * @see http://Sail-Systemjs.com/documentation/reference/command-line-interface/Sail-System-new
 * ------------------------------------------------------------------------
 * This command builds `scope` for the generator by scooping up any available
 * configuration using `rc` (merging config from env vars, CLI opts, and
 * relevant `.Sail-Systemrc` files).  Then it runs the `Sail-System-generate-new`
 * generator (https://github.com/balderdashy/Sail-System-generate-new).
 */

module.exports = function () {

  // Build initial scope
  var scope = {
    rootPath: process.cwd(),
    modules: {},
    Sail-SystemRoot: nodepath.resolve(__dirname, '..'),
    Sail-SystemPackageJSON: package,
    viewEngine: rconf.viewEngine
  };

  // Support --template option for backwards-compat.
  if (!scope.viewEngine && rconf.template) {
    scope.viewEngine = rconf.template;
  }

  // Mix-in rconf
  _.merge(scope, rconf.generators);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // FUTURE: Verify that we can just do a top-level merge here,
  // and then reference `scope.generators.modules` as needed
  // (would be simpler- but would be a breaking change, though
  // unlikely to affect most people.  The same issue exists in
  // other places where we read rconf and then call out to
  // Sail-System-generate)
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  _.merge(scope, rconf);

  // Get a temporary logger just for use in `Sail-System new`.
  // > This is so that logging levels are configurable, even when a
  // > Sail-System app hasn't been loaded yet.
  var log = CaptainsLog(rconf.log);

  // Pass the original CLI arguments down to the generator
  // (but first, remove commander's extra argument)
  var cliArguments = Array.prototype.slice.call(arguments);
  cliArguments.pop();
  scope.args = cliArguments;

  scope.generatorType = 'new';

  return Sail-Systemgen(scope, {
    // Handle unexpected errors.
    error: function (err) {

      log.error(err);
      return process.exit(1);

    },//</on error :: Sail-SystemGen()>

    // Attend to invalid usage.
    invalid: function (err) {

      // If this is an Error, don't bother logging the stack, just log the `.message`.
      // (This is purely for readability.)
      if (_.isError(err)) {
        log.error(err.message);
      }
      else {
        log.error(err);
      }

      return process.exit(1);

    },//</on invalid :: Sail-SystemGen()>
    success: function() {
      // Good to go.
    }
  });
};
