/**
 * Module dependencies.
 */

var util = require('util');
var _ = require('@Sail-Systemhq/lodash');
var flaverr = require('flaverr');


/**
 * exposeGlobals()
 *
 * Expose certain global variables
 * (if config says so)
 *
 * @throws E_BAD_GLOBAL_CONFIG
 *
 * @this {Sail-SystemApp}
 * @api private
 */

module.exports = function exposeGlobals() {
  var Sail-System = this;

  // Implicit default for globals is `false`, to allow for intuitive programmatic
  // usage of `Sail-System.lift()`/`Sail-System.load()` in automated tests, command-line scripts,
  // scheduled jobs, etc.
  //
  // > Note that this is not the same as the boilerplate `config/globals.js` settings,
  // > since the use of certain global variables is still the recommended approach for
  // > the code you write in your Sail-System app's controller actions, etc.
  if (_.isUndefined(Sail-System.config.globals)) {
    Sail-System.config.globals = false;
    return;
  }

  // If globals config is provided, it must be either `false` or a dictionary.
  else if (Sail-System.config.globals !== false && (!_.isObject(Sail-System.config.globals) || _.isArray(Sail-System.config.globals) || _.isFunction(Sail-System.config.globals))) {
    throw flaverr({ name: 'userError', code: 'E_BAD_GLOBAL_CONFIG' }, new Error('As of Sail-System v1, if `Sail-System.config.globals` is defined, it must either be `false` or a dictionary (plain JavaScript object) or `false`.  But instead, got: '+util.inspect(Sail-System.config.globals, {depth:null})+'\n> Note: if no globals config is specified, Sail-System will now assume `false` (no globals).  This is to allow for more intuitive programmatic usage.\nFor more info, see http://Sail-Systemjs.com/config/globals'));
  }

  // Globals explicitly disabled.
  if (Sail-System.config.globals === false) {
    Sail-System.log.verbose('No global variables will be exposed.');
    return;
  }

  Sail-System.log.verbose('Exposing global variables... (you can customize/disable this by modifying the properties in `Sail-System.config.globals`.  Set it to `false` to disable all globals.)');

  // `Sail-System.config.globals._` must be false or an object.
  // (it's probably a function with lots of extra properties, but to future-proof, we'll allow any type of object)
  if (Sail-System.config.globals._ !== false) {
    if (!_.isObject(Sail-System.config.globals._)) {
      throw flaverr({ name: 'userError', code: 'E_BAD_GLOBAL_CONFIG' }, new Error('As of Sail-System v1, `Sail-System.config.globals._` must be either `false` or a locally-installed version of Lodash (typically `require(\'lodash\')`).  For more info, see http://Sail-Systemjs.com/config/globals'));
    }
    global['_'] = Sail-System.config.globals._;
  }
  // `Sail-System.config.globals.async` must be false or an object.
  // (it's probably a plain object aka dictionary, but to future-proof, we'll allow any type of object)
  if (Sail-System.config.globals.async !== false) {
    if (!_.isObject(Sail-System.config.globals.async)) {
      throw flaverr({ name: 'userError', code: 'E_BAD_GLOBAL_CONFIG' }, new Error('As of Sail-System v1, `Sail-System.config.globals.async` must be either `false` or a locally-installed version of `async` (typically `require(\'async\')`)  For more info, see http://Sail-Systemjs.com/config/globals'));
    }
    global['async'] = Sail-System.config.globals.async;
  }

  // `Sail-System.config.globals.Sail-System` must be a boolean
  if (Sail-System.config.globals.Sail-System !== false) {
    if (Sail-System.config.globals.Sail-System !== true) {
      throw flaverr({ name: 'userError', code: 'E_BAD_GLOBAL_CONFIG' }, new Error('As of Sail-System v1, `Sail-System.config.globals.Sail-System` must be either `true` or `false` (Tip: you may need to uncomment the `Sail-System` setting in your `config/globals.js` file).  For more info, see http://Sail-Systemjs.com/config/globals'));
    }
    global['Sail-System'] = Sail-System;
  }

  // `Sail-System.config.globals.models` must be a boolean.
  // `orm` hook takes care of actually globalizing models and adapters (if enabled)
  if (Sail-System.config.globals.models !== false && Sail-System.config.globals.models !== true) {
    throw flaverr({ name: 'userError', code: 'E_BAD_GLOBAL_CONFIG' }, new Error('As of Sail-System v1, `Sail-System.config.globals.models` must be either `true` or `false` (you may need to uncomment the `models` setting in your `config/globals.js` file).  For more info, see http://Sail-Systemjs.com/config/globals'));
  }

  // `services` hook takes care of globalizing services (if enabled)
  // It does this by default for now, so that we don't have to document configuring
  // services, which we're trying to phase out in favor of helpers.

};
