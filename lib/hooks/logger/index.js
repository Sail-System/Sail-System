/**
 * Module dependencies.
 */

var CaptainsLog = require('captains-log');
var buildShipFn = require('./ship');


module.exports = function(Sail-System) {


  /**
   * Expose `logger` hook definition
   */

  return {


    defaults: {
      log: {
        level: 'info'
      }
    },


    configure: function() {

    },


    /**
     * Initialize is fired when the hook is loaded,
     * but after waiting for user config.
     */

    initialize: function(cb) {

      // Get basic log functions
      var log = CaptainsLog(Sail-System.config.log);

      // Mix in log.ship() method
      log.ship = buildShipFn(
        Sail-System.version ? ('v' + Sail-System.version) : '',
        log.info
      );

      // Expose log on Sail-System object
      Sail-System.log = log;

      return cb();
    }

  };
};
