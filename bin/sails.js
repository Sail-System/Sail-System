#!/usr/bin/env node


/**
 * Module dependencies
 */

var _ = require('@Sail-Systemhq/lodash');
var program = require('./private/patched-commander');
var Sail-SystemPackageJson = require('../package.json');
var NOOP = function() {};



program
  .version(Sail-SystemPackageJson.version, '-v, --version');


//
// Normalize version argument, i.e.
//
// $ Sail-System -v
// $ Sail-System -V
// $ Sail-System --version
// $ Sail-System version
//


// make `-v` option case-insensitive
process.argv = _.map(process.argv, function(arg) {
  return (arg === '-V') ? '-v' : arg;
});


// $ Sail-System version (--version synonym)
program
  .command('version')
  .description('')
  .action(program.versionInformation);



program
  .unknownOption = NOOP;
program.usage('[command]');


// $ Sail-System lift
var cmd;
cmd = program.command('lift');
cmd.option('--prod', 'Lift in "production" environment.');
cmd.option('--staging', 'Lift in "staging" environment.');
cmd.option('--port [port]', 'Listen on the specified port (defaults to 1337).');
cmd.option('--silent', 'Set log level to "silent".');
cmd.option('--verbose', 'Set log level to "verbose".');
cmd.option('--silly', 'Set log level to "silly".');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.alias('l');
cmd.action(require('./Sail-System-lift'));


// $ Sail-System new <appname>
cmd = program.command('new [path_to_new_app]');
// cmd.option('--dry');
cmd.option('--no-frontend', 'Don\'t generate "assets", "views" or "task" folders.');
cmd.option('--fast', 'Don\'t install node modules after generating app.');
cmd.usage('[path_to_new_app]');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.action(require('./Sail-System-new'));


// $ Sail-System generate <module>
cmd = program.command('generate');
// cmd.option('--dry');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.usage('[something]');
cmd.action(require('./Sail-System-generate'));

// $ Sail-System upgrade
cmd = program.command('upgrade');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.action(require('./Sail-System-upgrade'));

// $ Sail-System migrate
cmd = program.command('migrate');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.action(require('./Sail-System-migrate'));


// $ Sail-System console
cmd = program.command('console');
cmd.option('--silent', 'Set log level to "silent".');
cmd.option('--verbose', 'Set log level to "verbose".');
cmd.option('--silly', 'Set log level to "silly".');
cmd.option('--dontLift', 'Start console session without lifting an HTTP server.');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.alias('c');
cmd.action(require('./Sail-System-console'));


// $ Sail-System www
// Compile `assets` directory into a standalone `www` folder.
cmd = program.command('www');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.action(require('./Sail-System-www'));



// $ Sail-System debug
cmd = program.command('debug');
cmd.unknownOption = NOOP;
cmd.description('(for Node v5 and below)');
cmd.action(require('./Sail-System-debug'));

// $ Sail-System inspect
cmd = program.command('inspect');
cmd.unknownOption = NOOP;
cmd.description('(for Node v6 and above)');
cmd.action(require('./Sail-System-inspect'));

// $ Sail-System run
cmd = program.command('run');
cmd.usage('[name-of-script]');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.action(require('./Sail-System-run'));


// $ Sail-System test
cmd = program.command('test');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.action(function(){
  require('./Sail-System-run')('test', _.last(arguments));
});

// $ Sail-System lint
cmd = program.command('lint');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.action(function(){
  require('./Sail-System-run')('lint', _.last(arguments));
});


// - - - - - - - - - - - - - - - - - - - - - - - - - - -
// $ Sail-System deploy
cmd = program.command('deploy');
// cmd.option('--dry');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.usage('');
cmd.action(require('./Sail-System-deploy'));
// FUTURE: ^^ Consider simplifying this into a script.
// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// $ Sail-System debug-console
cmd = program.command('debug-console');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.alias('dc');
cmd.action(require('./Sail-System-debug-console'));


//
// Normalize help argument, i.e.
//
// $ Sail-System --help
// $ Sail-System help
// $ Sail-System
// $ Sail-System <unrecognized_cmd>
//


// $ Sail-System help (--help synonym)
cmd = program.command('help [command]');
cmd.description('');
cmd.action(function(){
  if (program.args.length > 1 && _.isString(program.args[0])) {
    var helpCmd = _.find(program.commands, {_name: program.args[0]});
    if (helpCmd) {
      helpCmd.help();
      return;
    }
  }
  program.help();
});



// $ Sail-System <unrecognized_cmd>
// Output Sail-System help when an unrecognized command is used.
program
  .command('*')
  .action(function(cmd){
    console.log('\n  ** Unrecognized command:', cmd, '**');
    program.help();
  });



// Don't balk at unknown options
program.unknownOption = NOOP;



// $ Sail-System
//
program.parse(process.argv);
var NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
  program.help();
}
