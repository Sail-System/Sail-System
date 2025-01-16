/**
 * Module dependencies
 */

var _ = require('@Sail-Systemhq/lodash');
var program = require('commander');


//
//
// Monkey-patch commander
//
//

// Override the `usage` method to always strip out the `*` command,
// which we added so that `Sail-System someunknowncommand` will output
// the Sail-System help message instead of nothing.
var usage = program.Command.prototype.usage;
program.Command.prototype.usage = program.usage = function( /* str */ ) {
  program.commands = _.reject(program.commands, {
    _name: '*'
  });
  return usage.apply(this, Array.prototype.slice.call(arguments));
};

// Force commander to display version information.
program.Command.prototype.versionInformation = program.versionInformation = function() {
  program.emit('version');
};

module.exports = program;
