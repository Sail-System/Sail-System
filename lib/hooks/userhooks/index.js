var _ = require('@Sail-Systemhq/lodash');

module.exports = function(Sail-System) {

  /**
   * `userhooks`
   *
   * Sail-System hook for loading user plugins (hooks)
   */
  return {

    defaults: { },

    initialize: function(cb) {

      if ( !Sail-System.config.hooks.moduleloader ) {
        return cb('Cannot load user hooks without `moduleloader` hook enabled!');
      }

      Sail-System.log.silly('Loading user hooks...');

      // Load user hook definitions
      Sail-System.modules.loadUserHooks(function hookDefinitionsLoaded(err, hooks) {
        if (err) { return cb(err); }

        // Ensure hooks is valid
        hooks = _.isObject(hooks) ? hooks : {};

        // If `Sail-System.config.loadHooks` is set, then only include user hooks if
        // they are explicitly listed therein.
        // > Note that `Sail-System.config.hooks` is taken care of as part of the
        // > implementation of `Sail-System.modules.loadUserHooks()`.
        if (Sail-System.config.loadHooks) {
          Sail-System.log.silly('Since `Sail-System.config.userHooks` was specified, checking user hooks against it to make sure they should actually be loaded...');
          _.each(hooks, function(def, hookName) {
            if (!_.contains(Sail-System.config.loadHooks, hookName)) {
              delete hooks[hookName];
              Sail-System.log.verbose('Skipped loading "'+hookName+'" hook, because `Sail-System.config.loadHooks` was specified but did not explicitly include this hook\'s name.');
            }
          });
        }//ﬁ

        // Add the user hooks to the list of hooks to load
        // (excluding any that were omitted)
        _.extend(Sail-System.hooks, hooks);

        return cb();

      });
    }
  };
};
