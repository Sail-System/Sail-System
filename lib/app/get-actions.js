/**
 * Module dependencies.
 */

var _ = require('@Sail-Systemhq/lodash');

/**
 * Sail-System.prototype.getActions()
 *
 * Return a shallow clone of the loaded actions dictionary.
 *
 * @returns {Dictionary} A shallow clone of all actions, indexed by their unique identifier.
 *
 * @this {Sail-SystemApp}
 * ----------------------------------------------------------------------------------------
 *
 * Usage:
 *
 * ```
 * Sail-System.getActions();
 * // =>
 * // {
 * //   'duck/quack': {...},
 * //   // ...
 * // }
 * ```
 */
module.exports = function getActions() {

  // Return a shallow clone of the actions dictionary, so that the caller
  // can't modify the actions.
  return _.clone(this._actions);

};
