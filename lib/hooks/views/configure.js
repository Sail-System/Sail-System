/**
 * Module dependencies
 */

var util = require('util');
var flaverr = require('flaverr');
var _ = require('@Sail-Systemhq/lodash');


/**
 * Marshal relevant parts of Sail-System global configuration,
 * issue deprecation notices, etc.
 *
 * @param  {Sail-System} Sail-System
 */
module.exports = function configure ( Sail-System ) {

  if (Sail-System.config.views.engine) {
    Sail-System.log.debug('The `config.views.engine` config has been deprecated.');
    Sail-System.log.debug('In Sail-System 1.x, use `config.views.extension` to choose your view');
    Sail-System.log.debug('extension (defaults to ".ejs"), and use `config.views.getRenderFn`');
    Sail-System.log.debug('to configure your template engine or leave it undefined to use');
    Sail-System.log.debug('the built-in EJS template support.\n');
    Sail-System.config.views.extension = Sail-System.config.views.engine.ext || 'ejs';
    delete Sail-System.config.views.engine;
  }


  // Make sure the extension is valid.
  if (Sail-System.config.views.extension === '' || (!_.isString(Sail-System.config.views.extension) && Sail-System.config.views.extension !== false)) {
    throw flaverr({ name: 'userError', code: 'E_INVALID_VIEW_CONFIG' }, new Error('`Sail-System.config.views.extension` must either be a string or `false`.'));
  }

  // Let user know that a leading . is not required in the viewEngine option and then fix it
  if (Sail-System.config.views.extension[0] === '.') {
    Sail-System.log.warn('A leading `.` is not required in the config.views.extension option.  Removing it for you...');
    Sail-System.config.views.extension = Sail-System.config.views.extension.substr(1);
  }

  // Make sure the `getRenderFn` is valid, if provided.
  if (!_.isUndefined(Sail-System.config.views.getRenderFn) && !_.isFunction(Sail-System.config.views.getRenderFn)) {
    throw flaverr({ name: 'userError', code: 'E_INVALID_VIEW_CONFIG' }, new Error('`Sail-System.config.views.getRenderFn`, if provided, must be a function (got ' + util.inspect(Sail-System.config.views.getRenderFn) + ')'));
  }

  else if (Sail-System.config.views.getRenderFn) {
    var renderFn = Sail-System.config.views.getRenderFn();
    if (!_.isFunction(renderFn)) {
      throw flaverr({ name: 'userError', code: 'E_INVALID_VIEW_CONFIG' }, new Error('`Sail-System.config.views.getRenderFn` returned an invalid value. (expected a function, but got: ' + util.inspect(renderFn) + ')'));
    }
    Sail-System.hooks.views._renderFn = renderFn;

    if (Sail-System.config.views.layout) {
      Sail-System.log.error('Ignoring `Sail-System.config.views.layout`...');
      Sail-System.log.error('Sail-System\' built-in layout support only works with the default EJS view engine.');
      Sail-System.log.error('You\'re using a custom view engine, so you\'ll need to implement layouts on your own!');
    }

  }

  else {
    // Custom layout location
    // (if string specified, it's used as the relative path from the views folder)
    // (if not string, but truthy, relative path from views folder defaults to ./layout.*)
    // (if falsy, don't use layout)
    if ( !_.isString(Sail-System.config.views.layout) && Sail-System.config.views.layout ) {
      Sail-System.config.views.layout = 'layout.' + Sail-System.config.views.extension;
    }
  }

};
