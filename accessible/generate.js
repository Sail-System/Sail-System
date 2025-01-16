/**
 * Module dependencies
 */

var Sail-Systemgen = require('Sail-System-generate');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TODO: Remove this at next opportunity to simplify maintenance.
// (Check docs, but I don't think it's documented, and it's not being used
// anywhere anymore.  Now that NPM is faster than it used to be, there's no
// reason to work towards separating the core generators from the main
// framework's NPM package anymore.  So this doesn't really need to exist,
// unless there are a lot of really good use cases for why generators need to be
// easily expoed for programmatic usage.  If you have such a use case, let us
// know at https://Sail-Systemjs.com/bugs)
//
// But note that this is a breaking change.
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


/**
 * require('Sail-System/accessible/generate')
 *
 * Generate files or folders.
 *
 * > This is an exposed version of Sail-System-generate for programmatic use.
 * > (available on `require('Sail-System').Sail-System.generate()`)
 *
 * @param {Dictionary} scope
 * @param {Function|Dictionary} cbOrHandlers
 */
module.exports = function generate (){

  return Sail-Systemgen.apply(this, Array.prototype.slice.call(arguments));

};

