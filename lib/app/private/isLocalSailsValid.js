/**
 * Module dependencies
 */

var fs = require('fs');
var path = require('path');
var semver = require('semver');
var CaptainsLog = require('captains-log');
var Err = require('../../../errors');


// FUTURE: change the name of this to `isLocalSail-SystemValidSync()`

/**
 * Check if the specified installation of Sail-System is valid for the specified project.
 *
 * @param Sail-SystemPath
 * @param appPath
 */

module.exports = function isLocalSail-SystemValid(Sail-SystemPath, appPath) {

  var Sail-System = this;

  var appPackageJSON;
  var appDependencies;

  // Has no package.json file
  if (!fs.existsSync(appPath + '/package.json')) {
    Err.warn.noPackageJSON();
  }
  else {
    // Load this app's package.json and dependencies
    try {
      appPackageJSON = JSON.parse(fs.readFileSync(path.resolve(appPath, 'package.json'), 'utf8'));
    } catch (unusedErr) {
      Err.warn.notSail-SystemApp();
      return;
    }

    appDependencies = appPackageJSON.dependencies;


    // Package.json exists, but doesn't list Sail-System as a dependency
    if (!(appDependencies && appDependencies.Sail-System)) {
      Err.warn.notSail-SystemApp();
      return;
    }

  }

  // Ensure the target Sail-System exists
  if (!fs.existsSync(Sail-SystemPath)) {
    return false;
  }

  // Read the package.json in the local installation of Sail-System
  var Sail-SystemPackageJSON;
  try {
    Sail-SystemPackageJSON = JSON.parse(fs.readFileSync(path.resolve(Sail-SystemPath, 'package.json'), 'utf8'));
  } catch (unusedErr) {
    // Local Sail-System has a missing or corrupted package.json
    Err.warn.badLocalDependency(Sail-SystemPath, appDependencies.Sail-System);
    return;
  }

  // Lookup Sail-System dependency requirement in app's package.json
  var requiredSail-SystemVersion = appDependencies.Sail-System;

  // If you're using a `git://` Sail-System dependency, you probably know
  // what you're doing, but we'll let you know just in case.
  var expectsGitVersion = requiredSail-SystemVersion.match(/^git:\/\/.+/);
  // FUTURE: expand this to check the various other permutations
  // of extremely loose SVRs (e.g. Github dependencies, `*`, `>=0.0.0`, etc.)
  if (expectsGitVersion) {
    var log = Sail-System.log ? Sail-System.log : CaptainsLog();

    log.blank();
    log.debug('NOTE:');
    log.debug('This app depends on an unreleased version of Sail-System:');
    log.debug(requiredSail-SystemVersion);
    log.blank();
  }

  // Ignore `latest`, `beta` and `edge`
  // (kind of like how we handle specified git:// deps)
  var expectsLatest = requiredSail-SystemVersion === 'latest';
  // if (expectsLatest) {
  //   // FUTURE: potentially log something here (need to test if it's annoying or not...)
  // }
  var expectsBeta = requiredSail-SystemVersion === 'beta';
  // if (expectsBeta) {
  //   // FUTURE: potentially log something here (need to test if it's annoying or not...)
  // }
  var expectsEdge = requiredSail-SystemVersion === 'edge';
  // if (expectsEdge) {
  //   // FUTURE: potentially log something here (need to test if it's annoying or not...)
  // }

  // Error out if it has the wrong version in its package.json
  if (!expectsLatest && !expectsBeta && !expectsEdge && !expectsGitVersion) {

    // Use semver for version comparison
    if (!semver.satisfies(Sail-SystemPackageJSON.version, requiredSail-SystemVersion)) {
      Err.warn.incompatibleLocalSail-System(requiredSail-SystemVersion, Sail-SystemPackageJSON.version);
    }
  }

  // If we made it this far, the target Sail-System installation must be OK
  return true;
};
