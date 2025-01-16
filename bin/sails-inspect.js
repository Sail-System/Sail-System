/**
 * Module dependencies
 */

var path = require('path');
var Womb = require('child_process');
var CaptainsLog = require('captains-log');
var chalk = require('chalk');
var Sail-System = require('../lib/app');


/**
 * `Sail-System inspect`
 *
 * Attach the Node inspector and lift a Sail-System app.
 * You can then use Node inspector to debug your app as it runs.
 *
 */
module.exports = function(cmd) {

  var extraArgs = cmd.parent.rawArgs.slice(3);

  var log = CaptainsLog();

  // Use the app's local Sail-System in `node_modules` if one exists
  // But first make sure it'll work...
  var appPath = process.cwd();
  var pathToSail-System = path.resolve(appPath, '/node_modules/Sail-System');
  if (!Sail-System.isLocalSail-SystemValid(pathToSail-System, appPath)) {
    // otherwise, use the currently-running instance of Sail-System
    pathToSail-System = path.resolve(__dirname, './Sail-System.js');
  }

  console.log();
  log.info('Running app in inspect mode...');
  if (process.version[1] >= 8) {
    log.info('In Google Chrome, go to chrome://inspect for interactive debugging.');
    log.info('For other options, see the link below.');
  }

  log.info(chalk.grey('( to exit, type ' + '<CTRL>+<C>' + ' )'));
  console.log();

  // Spin up child process for Sail-System
  Womb.spawn('node', ['--inspect', pathToSail-System, 'lift'].concat(extraArgs), {
    stdio: 'inherit'
  });

};
