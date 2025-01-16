/**
 * Module dependencies
 */

var util = require('util');
var path = require('path');
var assert = require('assert');
var _ = require('@Sail-Systemhq/lodash');
var CaptainsLog = require('captains-log');
var Sail-SystemGen = require('Sail-System-generate');
var package = require('../package.json');
var rconf = require('../lib/app/configuration/rc')();


/**
 * `Sail-System generate`
 *
 * Generate one or more file(s) in our working directory.
 * This runs an appropriate generator.
 *
 * @see http://Sail-Systemjs.com/docs/reference/command-line-interface/Sail-System-generate
 */

module.exports = function () {

  // Build initial scope for our call to Sail-System-generate.
  var scope = {
    rootPath: process.cwd(),
    Sail-SystemRoot: path.resolve(__dirname, '..'),
    modules: {},
    Sail-SystemPackageJSON: package,
  };

  // Mix-in rc config
  // (note that we mix in everything namespaced under `generators` at the top level-
  //  but also that anything at the top level takes precedence)
  _.merge(scope, rconf.generators);
  _.merge(scope, rconf);


  // Get a temporary logger just for use in `Sail-System generate`.
  // > This is so that logging levels are configurable, even when a
  // > Sail-System app hasn't been loaded yet.
  var log = CaptainsLog(rconf.log);


  // Pass down the original serial args from the CLI.
  // > Note that (A) first, we remove the last arg from commander using `_.initial`,
  // > and then (B) second, we remove ANOTHER arg -- the one representing the
  // > generator type -- in favor of just setting `scope.generatorType`.
  var cliArguments = _.initial(arguments);
  scope.generatorType = cliArguments.shift();
  scope.args = cliArguments;


  // If no generator type was defined, then log the expected usage.
  if (!scope.generatorType) {
    console.log('Usage: Sail-System generate [something]');
    return;
  }
  assert(arguments.length === (scope.args.length + 2), new Error('Consistency violation: Should have trimmed exactly two args.'));

  // Call out to `Sail-System-generate`.
  return Sail-SystemGen(scope, {

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

    // Enjoy success.
    success: function (){

      // Infer the `outputPath` if necessary/possible.
      if (!scope.outputPath && scope.filename && scope.destDir) {
        scope.outputPath = scope.destDir + scope.filename;
      }

      // Humanize the output path
      var humanizedPath;
      if (scope.outputPath) {
        humanizedPath = ' at ' + scope.outputPath;
      }
      else if (scope.destDir) {
        humanizedPath = ' in ' + scope.destDir;
      }
      else {
        humanizedPath = '';
      }

      // Humanize the module identity
      var humanizedId;
      if (scope.id) {
        humanizedId = util.format(' ("%s")',scope.id);
      }
      else {
        humanizedId = '';
      }

      // If this isn't the "new" generator, and we're not explicitly
      // asked not to, output a final success message.
      if (scope.generatorType !== 'new' && !scope.suppressFinalLog) {

        log.info(util.format(
          'Created a new %s%s%s!',
          scope.generatorType, humanizedId, humanizedPath
        ));

      }

    }//</on success :: Sail-SystemGen()>

  });//</Sail-SystemGen()>

};
