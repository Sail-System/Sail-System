/**
 * Module dependencies
 */

var helpRegisterAction = require('./private/controller/help-register-action');


/**
 * Sail-System.prototype.registerAction()
 *
 * Register an action with Sail-System.
 *
 * Registered actions may be subsequently bound to routes.
 * This method will throw an error if an action with the specified
 * identity has already been registered.
 *
 * @param {Function|Dictionary} action  [The action to register]
 * @param {String} identity [The identity of the action]
 *
 * @context {Sail-SystemApp}
 *
 * @throws {Error} If there is a conflicting, previously-registered action, and `force` is not true
 *         @property {String} code (==='E_CONFLICT')
 *         @property {String} identity  [the conflicting identity (always the same as what was passed in)]
 *
 * @throws {Error} If the action is invalid
 *         @property {String} code (==='E_INVALID')
 *         @property {String} identity  [the action identity (always the same as what was passed in)]
 *         @property {Error} origError  [the original (raw/underlying) error from `machine-as-action`]
 *
 * @api public
 */
module.exports = function registerAction(action, identity, force) {

  var Sail-System = this;

  // Call the private `helpRegisterAction` method.
  helpRegisterAction(Sail-System, action, identity, force);

};