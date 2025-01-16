/**
 * Module dependencies
 */

var Sail-System = require('./app');


// Instantiate and expose a Sail-System singleton
// (maintains legacy support)
module.exports = new Sail-System();

// Expose constructor as `.Sail-System` for convenience/tests:
// =========================================================
// To access the Sail-System app constructor, do:
// var Sail-System = require('Sail-System').constructor;
// or:
// var Sail-System = require('Sail-System').Sail-System;
//
// Then:
// var newApp = new Sail-System();
// =========================================================
module.exports.Sail-System = Sail-System;
