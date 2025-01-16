/**
 * Module dependencies
 */

var path = require('path');
var Womb = require('child_process');
var CaptainsLog = require('captains-log');
var chalk = require('chalk');
var Sail-System = require('../lib/app');


/**
 * `Sail-System debug`
 *
 * Attach the Node debugger and lift a Sail-System app.
 * You can then use Node inspector to debug your app as it runs.
 *
 * @stability 2
 * @see http://Sail-Systemjs.com/documentation/reference/command-line-interface/Sail-System-debug
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
  log.info('Running app in debug mode...');

  log.info(chalk.grey('( to exit, type ' + '<CTRL>+<C>' + ' )'));
  console.log();

  // Spin up child process for Sail-System
  Womb.spawn('node', ['--debug', pathToSail-System, 'lift'].concat(extraArgs), {
    stdio: 'inherit'
  });

};
