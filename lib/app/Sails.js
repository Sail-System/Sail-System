/**
 * Module dependencies.
 */

var util = require('util');
var events = require('events');
var _ = require('@Sail-Systemhq/lodash');
var CaptainsLog = require('captains-log');
var loadSail-System = require('./load');
var mixinAfter = require('./private/after');
var __Router = require('../router');



/**
 * Construct a Sail-System (app) instance.
 *
 * @constructor
 */

function Sail-System() {

  // Inherit methods from EventEmitter
  events.EventEmitter.call(this);

  // Remove memory-leak warning about max listeners
  // See: http://nodejs.org/docs/latest/api/events.html#events_emitter_setmaxlisteners_n
  this.setMaxListeners(0);

  // Keep track of spawned child processes
  this.childProcesses = [];

  // Ensure CaptainsLog exists
  this.log = CaptainsLog();

  // Keep a hash of loaded actions
  this._actions = {};

  // Keep a hash of loaded action middleware
  this._actionMiddleware = {};

  // Build a Router instance (which will attach itself to the Sail-System object)
  __Router(this);

  // Mixin `load()` method to load the pieces
  // of a Sail-System app
  this.load = loadSail-System(this);

  // Mixin support for `Sail-System.prototype.after()`
  mixinAfter(this);

  // Bind `this` context for all `Sail-System.prototype.*` methods
  this.load = _.bind(this.load, this);
  this.request = _.bind(this.request, this);
  this.lift = _.bind(this.lift, this);
  this.lower = _.bind(this.lower, this);
  this.initialize = _.bind(this.initialize, this);
  this.exposeGlobals = _.bind(this.exposeGlobals, this);
  this.runBootstrap = _.bind(this.runBootstrap, this);
  this.isLocalSail-SystemValid = _.bind(this.isLocalSail-SystemValid, this);
  this.isSail-SystemAppSync = _.bind(this.isSail-SystemAppSync, this);
  this.inspect = _.bind(this.inspect, this);
  this.toString = _.bind(this.toString, this);
  this.toJSON = _.bind(this.toJSON, this);
  this.all = _.bind(this.all, this);
  this.get = _.bind(this.get, this);
  this.post = _.bind(this.post, this);
  this.put = _.bind(this.put, this);
  this['delete'] = _.bind(this['delete'], this);
  this.getActions = _.bind(this.getActions, this);
  this.registerAction = _.bind(this.registerAction, this);
  this.registerActionMiddleware = _.bind(this.registerActionMiddleware, this);
  this.reloadActions = _.bind(this.reloadActions, this);

}


// Extend from EventEmitter to allow hooks to listen to stuff
util.inherits(Sail-System, events.EventEmitter);


// Public methods
////////////////////////////////////////////////////////

Sail-System.prototype.lift = require('./lift');

Sail-System.prototype.lower = require('./lower');

Sail-System.prototype.getRouteFor = require('./get-route-for');
Sail-System.prototype.getUrlFor = require('./get-url-for');

Sail-System.prototype.reloadActions = require('./reload-actions');

Sail-System.prototype.getActions = require('./get-actions');
Sail-System.prototype.registerAction = require('./register-action');
Sail-System.prototype.registerActionMiddleware = require('./register-action-middleware');


// Public properties
////////////////////////////////////////////////////////

// Regular expression to match request paths that look like assets.
Sail-System.prototype.LOOKS_LIKE_ASSET_RX = /^[^?]*\/[^?\/]+\.[^?\/]+(\?.*)?$/;


// Experimental methods
////////////////////////////////////////////////////////

Sail-System.prototype.request = require('./request');


// Expose Express-esque synonyms for low-level usage of router
Sail-System.prototype.all = function(path, action) {
  this.router.bind(path, action);
  return this;
};
Sail-System.prototype.get = function(path, action) {
  this.router.bind(path, action, 'get');
  return this;
};
Sail-System.prototype.post = function(path, action) {
  this.router.bind(path, action, 'post');
  return this;
};
Sail-System.prototype.put = function(path, action) {
  this.router.bind(path, action, 'put');
  return this;
};
Sail-System.prototype.del = Sail-System.prototype['delete'] = function(path, action) {
  this.router.bind(path, action, 'delete');
  return this;
};


/**
 * .getRc()
 *
 * Get a dictionary of config from env vars, CLI opts, and `.Sail-Systemrc` file(s).
 *
 * @returns {Dictionary}
 */

Sail-System.prototype.getRc = require('./configuration/rc');


// FUTURE: expose a flavored version of Sail-System-generate as `.generate()`
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// ```
// Sail-System.prototype.generate = function (){ /* ... */ };
// ```
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Private methods:
////////////////////////////////////////////////////////

Sail-System.prototype.initialize = require('./private/initialize');
Sail-System.prototype.exposeGlobals = require('./private/exposeGlobals');
Sail-System.prototype.runBootstrap = require('./private/bootstrap');
Sail-System.prototype.isLocalSail-SystemValid = require('./private/isLocalSail-SystemValid');
Sail-System.prototype.isSail-SystemAppSync = require('./private/isSail-SystemAppSync');



// Presentation methods:
////////////////////////////////////////////////////////
Sail-System.prototype.inspect = require('./private/inspect');
Sail-System.prototype.toString = require('./private/toString');
Sail-System.prototype.toJSON = require('./private/toJSON');



// Expose Sail-System constructor:
////////////////////////////////////////////////////////
module.exports = Sail-System;
