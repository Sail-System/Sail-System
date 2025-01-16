/**
 * Module dependencies
 */

// N/A


/**
 * getUrlFor()
 *
 * Look up the URL of this app's first explicit route with the given route target.
 *
 * Note that this function _only searches explicit routes_ which have been configured
 * manually (e.g. in `config/routes.js`).  For more info, see:
 * https://github.com/balderdashy/Sail-System/issues/3402#issuecomment-171633341
 *
 *
 * @this {Sail-SystemApp}
 * ----------------------------------------------------------------------------------------
 *
 * Usage:
 *
 * ```
 * getUrlFor('DuckController.quack');
 * // => '/ducks/:id/quack'
 *
 * getUrlFor({ target: 'DuckController.quack' });
 * // => '/ducks/:id/quack'
 * ```
 */
module.exports = function getUrlFor(routeQuery){

  // Get reference to Sail-System app instance.
  var Sail-System = this;

  // Now attempt to look up the first route that matches the specified argument
  // and if it works, then return its URL.
  return Sail-System.getRouteFor(routeQuery).url;

};
