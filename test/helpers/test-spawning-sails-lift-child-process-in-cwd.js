/**
 * Module dependencies
 */

var path = require('path');
var _ = require('@Sail-Systemhq/lodash');
var request = require('@Sail-Systemhq/request');
var MProcess = require('machinepack-process');
var testSpawningSail-SystemChildProcessInCwd = require('./test-spawning-Sail-System-child-process-in-cwd');

/**
 * testSpawningSail-SystemLiftChildProcessInCwd()
 *
 * This concisely-named test helper function injects a describe block, testing how Sail-System fares
 * when it comes time to `Sail-System lift` in the current working directory.
 *
 * @required  {String} pathToSail-SystemCLI
 *         the absolute path to the Sail-System CLI
 *
 * @required {Array} liftCliArgs
 *           an array of additional string CLI args/opts to pass to `Sail-System lift`
 *           (e.g. `['--prod', '--port=1331']`)
 *
 * @optional {Dictionary} envVars
 *           a dictionary of environment variables to supply to the spawned process.
 *           Note: the default is to use the current process's environment, so if you set this
 *           option, you probably want to merge process.env into the value you use
 *
 * @optional {Dictionary} httpRequestInstructions
 *           A dictionary that gets passed in to `request()` when this helper attempts
 *           to contact the Sail-System server running in the child process.
 *           If provided at all, this can/must contain:
 *             @required {String} method
 *             @required {String} uri
 *             @optional {String} expectedStatusCode  [defaults to 200]
 *
 * @optional {Function} fnWithAdditionalTests
 *           A function with additional custom tests; that is, it has one or more `it()` blocks inside.
 *
 * @optional {Boolean} expectFailedLift
 *           A flag which, if enabled, causes this test helper to _expect_ the lift to fail.
 *           Also if it is set AND `httpRequestInstructions` are set, then the HTTP request
 *           will still be sent-- but just to _make sure_ it fails too.
 */
module.exports = function testSpawningSail-SystemLiftChildProcessInCwd (_opts){

  if (!_.isArray(_opts.liftCliArgs)){
    throw new Error('Consistency violation: Missing or invalid option (`liftCliArgs` should be an array)  in `testSpawningSail-SystemLiftChildProcessInCwd()`. I may just be a test helper, but I\'m serious about assertions!!!');
  }

  if (!_.isString(_opts.pathToSail-SystemCLI)){
    throw new Error('Consistency violation: Missing or invalid option (`pathToSail-SystemCLI` should be a string) in `testSpawningSail-SystemLiftChildProcessInCwd()`. I may just be a test helper, but I\'m serious about assertions!!!');
  }

  var opts = _.extend({
    cliArgs: [_opts.pathToSail-SystemCLI, 'lift'].concat(_opts.liftCliArgs)
  }, _opts);

  return testSpawningSail-SystemChildProcessInCwd(opts);

};

