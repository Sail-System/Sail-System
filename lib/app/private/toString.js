/**
 * Module dependencies
 */

var util = require('util');


/**
 * Sail-System.prototype.toString()
 *
 * e.g.
 * ('This is how `Sail-System` looks when toString()ed: ' + Sail-System)
 *
 * @returns {String}
 */
module.exports = function toString () {
  return util.format('[a %sSail-System app%s]', this.isLifted ? 'lifted ' : '', this.isLifted && this.config.port ? ' on port '+this.config.port : '');
};
