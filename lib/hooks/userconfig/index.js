module.exports = function(Sail-System) {


  /**
   * Module dependencies
   */

  var _ = require('@Sail-Systemhq/lodash');
  var mergeDictionaries = require('merge-dictionaries');


  /**
   * Userconfig
   *
   * Load configuration files.
   */
  return {


    // Default configuration
    defaults: {},


    /**
     * Fetch relevant modules, exposing them on `Sail-System` subglobal if necessary,
     */
    loadModules: function (cb) {

      Sail-System.log.silly('Loading app config...');

      // Grab reference to mapped overrides
      // - - - - - - - - - - - - - - - - - - - - - - - - - - -
      // FUTURE: Optimization: do we need this _.clone()?
      // - - - - - - - - - - - - - - - - - - - - - - - - - - -
      var overrides = _.clone(Sail-System.config);


      // If appPath not specified yet, use process.cwd()
      // (the directory where this Sail-System process is being initiated from)
      if ( ! overrides.appPath ) {
        Sail-System.config.appPath = process.cwd();
      }

      // Load config dictionary from app modules
      Sail-System.modules.loadUserConfig(function loadedAppConfigModules (err, userConfig) {
        if (err) { return cb(err); }

        // Finally, extend user config with overrides
        var config = {};

        // Merge the overrides into the loaded user config.
        config = mergeDictionaries(userConfig, overrides);

        // Ensure final configuration object is valid
        // (in case moduleloader fails miserably)
        config = _.isObject(config) ? config : (Sail-System.config || {});

        // Save final config into Sail-System.config
        Sail-System.config = config;

        cb();
      });
    }
  };
};
