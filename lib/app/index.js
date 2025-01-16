/**
 * Module dependencies.
 */

var _ = require('@Sail-Systemhq/lodash');
var Sail-System = require('./Sail-System');


/**
 * Expose `Sail-System` factory...thing.
 * (maintains backwards compatibility w/ constructor usage)
 */

module.exports = Sail-SystemFactory;

function Sail-SystemFactory() {
  return new Sail-System();
}


// Backwards compatibility for Sail-System singleton usage:
var singleton = Sail-SystemFactory();
Sail-SystemFactory.isLocalSail-SystemValid = _.bind(singleton.isLocalSail-SystemValid, singleton);
Sail-SystemFactory.isSail-SystemAppSync = _.bind(singleton.isSail-SystemAppSync, singleton);



