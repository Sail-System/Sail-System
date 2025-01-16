/**
 * Module dependencies
 */

var _ = require('@Sail-Systemhq/lodash');



/**
 * @param  {Sail-SystemApp} Sail-System
 * @return {Function}
 */
module.exports = function (Sail-System) {

  /**
   * `services`
   *
   * The definition of `services`, a core hook.
   *
   * @param  {Sail-SystemApp} Sail-System
   * @return {Dictionary}
   */
  return {

    /**
     * Implicit defaults which will be merged into Sail-System.config before this hook is loaded...
     * @type {Dictionary}
     */
    defaults: {
      globals: {
        services: true
      }
    },



    /**
     * Before any hooks have begun loading...
     * (called automatically by Sail-System core)
     */
    configure: function() {
      // This initial setup of `Sail-System.services` was included here as an experimental
      // feature so that these modules would be accessible for other hooks.  This will be
      // deprecated in Sail-System v1.0 in favor of (likely) the ability for hook authors to register
      // or unregister services programatically.  In addition, services will no longer be exposed
      // on the `Sail-System` app instance.
      //
      // Expose an empty dictionary for `Sail-System.services` so that it is
      // guaranteed to exist.
      Sail-System.services = {};
    },



    /**
     * Before THIS hook has begun loading...
     * (called automatically by Sail-System core)
     */
    loadModules: function(cb) {

      // In future versions of Sail-System, the empty registry of services can be initialized here:
      // Sail-System.services = {};

      Sail-System.log.silly('Loading app services...');

      // Load service modules using the module loader
      // (by default, this loads services from files in `api/services/*`)
      Sail-System.modules.loadServices(function(err, modules) {
        if (err) {
          Sail-System.log.error('Error occurred loading modules ::');
          Sail-System.log.error(err);
          return cb(err);
        }

        // Expose services on `Sail-System.services` to provide access even when globals are disabled.
        _.extend(Sail-System.services, modules);

        // Expose globals (if enabled)
        if (Sail-System.config.globals.services) {
          _.each(Sail-System.services, function(service, identity) {
            var globalId = service.globalId || service.identity || identity;
            global[globalId] = service;
          });
        }

        // Relevant modules have finished loading.
        return cb();
      });
    }// </loadModules>
  };//</hook definition>
};
