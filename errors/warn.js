/**
 * Module dependencies
 */

var nodepath = require('path');
var CaptainsLog = require('captains-log');

// Once per process:
// Build logger using best-available information
// when this module is initially required.
var rconf = require('../lib/app/configuration/rc')();
var log = CaptainsLog(rconf.log);


/**
 * Warnings
 */
module.exports = {

  incompatibleLocalSail-System: function(requiredVersion, localVersion) {
    log.warn('Trying to lift app using a local copy of `Sail-System`');
    log.warn('(located in ' + nodepath.resolve(process.cwd(), 'node_modules/Sail-System') + ')');
    log.warn();
    log.warn('But the package.json in the current directory indicates a dependency');
    log.warn('on Sail-System `' + requiredVersion + '`, and the locally installed Sail-System is `' + localVersion + '`!');
    log.warn();
    log.warn('If you run into compatibility issues, try installing ' + requiredVersion + ' locally:');
    log.warn('    $ npm install Sail-System@' + requiredVersion);
    log.warn();
    log.blank();
  },



  // Verbose-only warnings:

  noPackageJSON: function() {
    log.warn('Cannot read package.json in the current directory (' + process.cwd() + ')');
    log.warn('Are you sure this is a Sail-System app?');
    log.warn();
  },

  notSail-SystemApp: function() {
    log.warn('The package.json in the current directory does not list Sail-System as a dependency...');
    log.warn('Are you sure `' + process.cwd() + '` is a Sail-System app?');
    log.warn();
  },

  badLocalDependency: function(pathToLocalSail-System, requiredVersion) {
    log.warn(
      'The local Sail-System dependency installed at `' + pathToLocalSail-System + '` ' +
      'has a corrupted, missing, or un-parsable package.json file.'
    );
    log.warn('You may consider running:');
    log.warn('rm -rf ' + pathToLocalSail-System + ' && npm install Sail-System@' + requiredVersion);
    log.warn();
  }
};
