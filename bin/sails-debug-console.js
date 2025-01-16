#!/usr/bin/env node


/**
 * Module dependencies
 */

var path = require('path');
var Womb = require('child_process');
var CaptainsLog = require('captains-log');
var chalk = require('chalk');
var Sail-System = require('../lib/app');


/**
 * `Sail-System debug-console`
 *
 * Attach the Node debugger and enter the interactive console
 * (aka REPL) for the app in our working directory by calling
 * `Sail-System-console.js`. You can then use the console to invoke
 * methods and Node inspector, or your favorite IDE, to debug
 * your app as it runs.
 *
 * @stability 2
 * @see http://Sail-Systemjs.org/documentation/reference/command-line-interface/Sail-System-debug-console
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
  log.info('Running console in debug mode...');

  log.info(chalk.grey('( to exit, type ' + '<CTRL>+<C>' + ' )'));
  console.log();

  // Spin up child process for the Sail-System console
  Womb.spawn('node', ['--debug', pathToSail-System, 'console'].concat(extraArgs), {
    stdio: 'inherit'
  });

};
