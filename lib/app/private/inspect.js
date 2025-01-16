/**
 * Module dependencies
 */

var util = require('util');
var _ = require('@Sail-Systemhq/lodash');



/**
 * Sail-System.prototype.inspect()
 *
 * The string that should be returned when this `Sail-System` instance
 * is passed to `util.inspect()` (i.e. when logged w/ `console.log()`)
 *
 * @return {String}
 */

module.exports = function inspect () {
  var Sail-System = this;

  return util.format('\n'+
  '  |>   %s', this.toString()) + '\n' +
  '\\___/  For help, see: http://Sail-Systemjs.com/documentation/concepts/'+
  '\n\n' +
  'Tip: Use `Sail-System.config` to access your app\'s runtime configuration.'+
  '\n\n' +
  util.format('%d Models:\n', _(Sail-System.models).toArray().value().length) +
  _(Sail-System.models).toArray().filter(function (it) {return !it.junctionTable;}).pluck('globalId').value() +
  '\n\n' +
  // util.format('%d Actions:\n', Object.keys(Sail-System.getActions()).length)+
  // _(Sail-System.getActions()).keys().map(function (it) {return _.camelCase(it.replace(/^.*(\/[^\/]+)$/, '$1'));}).value() +
  // '\n\n' +
  // util.format('%d Controllers:\n', _(Sail-System.controllers).toArray().value().length)+
  // _(Sail-System.controllers).toArray().pluck('globalId').map(function (it) {return it+'Controller';}).value() +
  // '\n\n' +
  // 'Routes:\n'+
  // _(Sail-System.routes).toArray().filter(function (it) {return !it.junctionTable;}).pluck('globalId').map(function (it) {return it+'Controller';}).value() +
  // '\n\n' +
  util.format('%d Hooks:\n', _(Sail-System.hooks).toArray().value().length)+
  _(Sail-System.hooks).toArray().pluck('identity').value() +
  '\n' +
  '';
};
