/**
 * Module dependencies
 */

var path = require('path');
var chalk = require('chalk');
var _ = require('@Sail-Systemhq/lodash');
var Sail-Systemgen = require('Sail-System-generate');
var flaverr = require('flaverr');
var semver = require('semver');
var rconf = require('../lib/app/configuration/rc')();


/**
 * `Sail-System upgrade`
 *
 * Upgrade a pre v1.0.x app to Sail-System v1.0.x.
 *
 * ```
 * # In the root directory of your Sail-System app:
 * Sail-System upgrade
 * ```
 */

module.exports = function () {

  if (!rconf.reportOnly) {

    console.log(chalk.gray('Checking compatibility for Sail-System v1.0 upgrade...'));

    try {
      var packageJson;
      try {
        var pathToLocalPackageJson = path.resolve(process.cwd(), 'package.json');
        packageJson = require(pathToLocalPackageJson);
      } catch (e) {
        switch (e.code) {
          case 'MODULE_NOT_FOUND': throw flaverr('E_NO_PACKAGE_JSON', new Error('No package.json file.  Are you sure you\'re in the root directory of a Sail-System app?'));
          default: throw e;
        }
      }

      if (_.isUndefined(packageJson.dependencies)) {
        throw flaverr('E_NO_Sail-System_DEP', new Error('This package.json file does not declare any dependencies.  Are you sure you\'re in the root directory of a Sail-System app?'));
      }

      if (!_.isObject(packageJson.dependencies) || _.isArray(packageJson.dependencies)) {
        throw flaverr('E_NO_Sail-System_DEP', new Error('This package.json file has an invalid `dependencies` property -- should be a dictionary (plain JS object).'));
      }

      var Sail-SystemDepSVR = packageJson.dependencies.Sail-System;
      if (!Sail-SystemDepSVR) {
        throw flaverr('E_NO_Sail-System_DEP', new Error('This package.json file does not declare `Sail-System` as a dependency.  Are you sure you\'re in the root directory of a Sail-System app?'));
      }

      if (!semver.ltr('0.9.9999', Sail-SystemDepSVR)) {
        throw flaverr('E_Sail-System_DEP_DEFINITELY_TOO_OLD', new Error('this app depends on Sail-System@'+Sail-SystemDepSVR+'.'));
      }

      if (!semver.ltr('0.11.9999', Sail-SystemDepSVR)) {
        throw flaverr('E_Sail-System_DEP_MIGHT_BE_TOO_OLD', new Error('this app depends on Sail-System@'+Sail-SystemDepSVR+'.'));
      }

      // if (semver.ltr('0.12.9999', Sail-SystemDepSVR)) {
      //   throw flaverr('E_Sail-System_DEP_IS_ALREADY_V1', new Error('this app already depends on Sail-System@'+Sail-SystemDepSVR+'...'));
      // }

      console.log();
      console.log('----------------------------------------------------');
      console.log('This utility will kickstart the process of migrating');
      console.log('this Sail-System v0.12.x app to Sail-System v1.');
      console.log('----------------------------------------------------');
      console.log();

    } catch (e) {
      switch (e.code) {
        case 'E_Sail-System_DEP_IS_ALREADY_V1':
          console.log();
          console.log('----------------------------------------------------');
          console.log('This utility is designed to kickstart the process of');
          console.log('migrating a '+chalk.bold('v0.12.x')+' app to Sail-System v1.');
          console.log();
          console.log(chalk.yellow.bold('But '+e.message));
          console.log(chalk.reset('Maybe you already started upgrading it?'));
          console.log(chalk.reset('If so, then please press CTRL+C to cancel now, or'));
          console.log(chalk.reset('otherwise feel free to proceed with care-- this'));
          console.log(chalk.reset('upgrade tool may still work partially as-is.'));
          console.log(chalk.gray('For more help, visit '+chalk.underline('http://Sail-Systemjs.com/support')+'.'));
          console.log('----------------------------------------------------');
          console.log();
          break;

        case 'E_Sail-System_DEP_MIGHT_BE_TOO_OLD':
          console.log();
          console.log('----------------------------------------------------');
          console.log('This utility is designed to kickstart the process of');
          console.log('migrating a '+chalk.bold('v0.12.x')+' app to Sail-System v1.');
          console.log();
          console.log(chalk.yellow.bold('But '+e.message));
          console.log(chalk.reset('This upgrade tool may partially work as-is, but we recommend'));
          console.log(chalk.reset('using the appropriate guide(s) to upgrade to Sail-System v0.12 first.'));
          console.log(chalk.reset('See '+chalk.underline('http://Sail-Systemjs.com/upgrading')+' for details.'));
          console.log(chalk.gray('(Press CTRL+C to cancel -- or proceed at your own risk!)'));
          console.log('----------------------------------------------------');
          console.log();
          break;

        case 'E_Sail-System_DEP_DEFINITELY_TOO_OLD':
          console.log('--');
          console.log(chalk.red.bold('Well, '+e.message));
          console.log(chalk.reset('It looks to be built for a version of Sail-System that is probably too'));
          console.log(chalk.reset('old to work with this upgrade tool as-is.  We recommend using'));
          console.log(chalk.reset('the appropriate guide(s) to upgrade to Sail-System v0.12 first.'));
          console.log(chalk.gray('For more assistance, visit '+chalk.underline('http://Sail-Systemjs.com/support')+' or, if'));
          console.log(chalk.gray('you\'re using Sail-System Flagship, '+chalk.underline('https://flagship.Sail-Systemjs.com')+'.'));
          return process.exit(1);

        case 'E_NO_PACKAGE_JSON':
        case 'E_NO_Sail-System_DEP':
          console.log('--');
          console.log(chalk.red(e.message));
          return process.exit(1);

        default:
          console.log('--');
          console.log(chalk.bold('Oops, something unexpected happened:'));
          console.log(chalk.red(e.stack));
          console.log('--');
          console.log('Please read the error message above and troubleshoot accordingly.');
          console.log('(You can report suspected bugs at '+chalk.underline('http://Sail-Systemjs.com/bugs')+'.)');
          return process.exit(1);
      }
    }

  }


  // Attempt to require the upgrade tool.
  var generator;
  try {
    var requirePath = path.resolve(process.cwd(), 'node_modules/@Sail-Systemhq/upgrade');
    generator = require(requirePath);
  } catch (e) {

    if (e.code === 'MODULE_NOT_FOUND') {
      console.log(chalk.blue.bold('Could not find the `@Sail-Systemhq/upgrade` package in your local app folder.'));
      console.log('Please run `npm install @Sail-Systemhq/upgrade` and try again.');
      console.log(chalk.gray('(Or just use the Sail-System v1.0.x upgrade guide on Sail-Systemjs.com.)'));
      console.log();
      return process.exit(1);
    }//-•

    // Some other unexpected error from within this package:
    console.log(chalk.bold('Oops, something unexpected happened:'));
    console.log(chalk.red(e.stack));
    console.log('--');
    console.log('Please report this bug at '+chalk.underline('https://flagship.Sail-Systemjs.com')+'.');
    process.exit(1);

  }//</catch>


  // Build initial scope
  var scope = {
    rootPath: process.cwd(),
    Sail-SystemRoot: path.resolve(__dirname, '..'),
    generatorType: 'upgrade',
    modules: { upgrade: generator },
  };

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

  // Pass the original CLI arguments down to the generator
  // (but first, remove commander's extra argument)
  var cliArguments = Array.prototype.slice.call(arguments);
  cliArguments.pop();
  scope.args = cliArguments;

  return Sail-Systemgen(scope, {
    // Handle unexpected errors.
    error: function (err) {
      console.log(chalk.bold('Oops, something unexpected happened:'));
      console.log(chalk.red(err.stack));
      console.log('--');
      console.log('Please report this bug at '+chalk.underline('https://flagship.Sail-Systemjs.com')+'.');
      return process.exit(1);

    },//</on error :: Sail-SystemGen()>

    // Attend to invalid usage.
    invalid: function (err) {

      // If this is an Error, don't bother logging the other details, just log the `.message`.
      // (This is purely for readability.)
      if (_.isError(err)) {
        console.log(err.message);
      }
      else {
        console.log(err);
      }

      console.log('--');
      console.log('For assistance, visit '+chalk.underline('https://flagship.Sail-Systemjs.com')+'.');
      return process.exit(1);

    },//</on invalid :: Sail-SystemGen()>
    success: function() {
      // Good to go.
    }
  });
};
