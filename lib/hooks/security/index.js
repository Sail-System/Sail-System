module.exports = function(Sail-System) {

  /**
   * Module dependencies.
   */

  var _ = require('@Sail-Systemhq/lodash');
  var flaverr = require('flaverr');

  var checkOriginUrl = require('../../util/check-origin-url');
  var detectVerb = require('../../util/detect-verb');

  var initializeCors = require('./cors')(Sail-System);
  var initializeCsrf = require('./csrf')(Sail-System);
  var grantCsrfToken = require('./csrf/grant-csrf-token');

  /**
   * Expose hook definition
   */

  return {

    defaults: {

      security: {

        cors: {
          allowOrigins: '*',
          allRoutes: false,
          allowCredentials: false,
          allowRequestMethods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          allowRequestHeaders: 'content-type',
          allowResponseHeaders: '',
          allowAnyOriginWithCredentialsUnsafe: false
        },

        csrf: false

      }

    },

    configure: function() {


      //   ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗ ██╗   ██╗██████╗ ███████╗
      //  ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝ ██║   ██║██╔══██╗██╔════╝
      //  ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗██║   ██║██████╔╝█████╗
      //  ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║██║   ██║██╔══██╗██╔══╝
      //  ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝╚██████╔╝██║  ██║███████╗
      //   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝
      //
      //   ██████╗███████╗██████╗ ███████╗
      //  ██╔════╝██╔════╝██╔══██╗██╔════╝
      //  ██║     ███████╗██████╔╝█████╗
      //  ██║     ╚════██║██╔══██╗██╔══╝
      //  ╚██████╗███████║██║  ██║██║
      //   ╚═════╝╚══════╝╚═╝  ╚═╝╚═╝

      if (Sail-System.config.csrf) {
        Sail-System.log.debug('The `Sail-System.config.csrf` config has been deprecated.');
        Sail-System.log.debug('Please use `Sail-System.config.security.csrf` instead.');
        Sail-System.log.debug('(we\'ll use your `Sail-System.config.csrf` settings for now).\n');
        Sail-System.config.security.csrf = Sail-System.config.csrf;
      }

      if (Sail-System.config.security.csrf === true && !Sail-System.hooks.session) {
        throw flaverr({ name: 'userError', code: 'E_INVALID_SECURITY_CONFIG' }, new Error(
          '\n-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-\n'+
          'Detected `Sail-System.config.security.csrf set to `true` while session hook is disabled.\n'+
          'Sail-System CSRF support requires the session hook to be enabled.\n'+
          'See http://Sail-Systemjs.com/docs/reference/config/Sail-System-config-session#?disabling-sessions.\n'+
          '-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-\n'
        ));
      }

      if (!_.isUndefined(Sail-System.config.security.csrf.routesDisabled)) {
        throw flaverr({ name: 'userError', code: 'E_INVALID_SECURITY_CONFIG' }, new Error(
          '\n-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-\n'+
          'Invalid global CSRF settings: `routesDisabled` is no longer supported as of Sail-System v1.0.\n'+
          'Instead, set `csrf: false` in `config/routes.js` for any route that you want exempted\n'+
          'from CSRF protection.\n'+
          'For more info see: http://Sail-Systemjs.com/docs/concepts/security/csrf#?enabling-csrf-protection.\n'+
          '-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-\n'
        ));
      }

      if (!_.isUndefined(Sail-System.config.security.csrf.origin)) {
        throw flaverr({ name: 'userError', code: 'E_INVALID_SECURITY_CONFIG' }, new Error(
          '\n-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-\n'+
          'Invalid global CSRF settings: `origin` is no longer supported as of Sail-System v1.0.\n'+
          'Instead, apply CORS settings directly to the CSRF-token-dispensing route in `config/routes.js`.\n'+
          'For more info see: \n'+
          'http://next.Sail-Systemjs.com/docs/concepts/security/csrf#?using-ajax-websockets\n'+
          'http://next.Sail-Systemjs.com/documentation/concepts/security/cors\n'+
          '-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-\n'
        ));
      }

      if (!_.isUndefined(Sail-System.config.security.csrf.grantTokenViaAjax)) {
        throw flaverr({ name: 'userError', code: 'E_INVALID_SECURITY_CONFIG' }, new Error(
          '\n-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-\n'+
          'Invalid global CSRF settings: `grantTokenViaAjax` is no longer supported as of Sail-System v1.0.\n'+
          'Instead, add a route to your `config/routes.js` file using the `security/grant-csrf-token` action.\n'+
          'For more info see: http://next.Sail-Systemjs.com/docs/concepts/security/csrf#?using-ajax-websockets\n'+
          '-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-\n'
        ));
      }


      //   ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗ ██╗   ██╗██████╗ ███████╗
      //  ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝ ██║   ██║██╔══██╗██╔════╝
      //  ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗██║   ██║██████╔╝█████╗
      //  ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║██║   ██║██╔══██╗██╔══╝
      //  ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝╚██████╔╝██║  ██║███████╗
      //   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝
      //
      //   ██████╗ ██████╗ ██████╗ ███████╗
      //  ██╔════╝██╔═══██╗██╔══██╗██╔════╝
      //  ██║     ██║   ██║██████╔╝███████╗
      //  ██║     ██║   ██║██╔══██╗╚════██║
      //  ╚██████╗╚██████╔╝██║  ██║███████║
      //   ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝

      //  ┌─┐┬  ┌─┐┌┐ ┌─┐┬    ┌─┐┌─┐┌┐┌┌─┐┬┌─┐
      //  │ ┬│  │ │├┴┐├─┤│    │  │ ││││├┤ ││ ┬
      //  └─┘┴─┘└─┘└─┘┴ ┴┴─┘  └─┘└─┘┘└┘└  ┴└─┘
      if (!_.isUndefined(Sail-System.config.cors)) {
        Sail-System.log.debug('The `Sail-System.config.cors` config has been deprecated.');
        Sail-System.log.debug('Please use `Sail-System.config.security.cors` instead.');
        Sail-System.log.debug('(we\'ll use your `Sail-System.config.cors` settings for now).\n');
        Sail-System.config.security.cors = _.extend(Sail-System.config.security.cors, Sail-System.config.cors);
      }

      // Fail to lift if `securityLevel` is used
      if (!_.isUndefined(Sail-System.config.security.cors.securityLevel)) {
        throw flaverr({ name: 'userError', code: 'E_INVALID_SECURITY_CONFIG' }, new Error(
          '\n-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-\n'+
          'Invalid global CORS settings: `securityLevel` is no longer supported as of Sail-System v1.0.\n'+
          'Instead, to secure your socket requests use `Sail-System.config.sockets.onlyAllowOrigins`.\n'+
          'For more info see: http://Sail-Systemjs.com/config/sockets.\n'+
          '-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-\n'
        ));
      }

      // Deprecate `origin` in favor of `allowOrigins`
      if (!_.isUndefined(Sail-System.config.security.cors.origin)) {
        Sail-System.log.debug('The `Sail-System.config.security.cors.origin` config has been deprecated.');
        Sail-System.log.debug('Please use `Sail-System.config.security.cors.allowOrigins` instead.');
        Sail-System.log.debug('(See http://Sail-Systemjs.com/config/security for more info.)'+'\n');
        Sail-System.config.security.cors.allowOrigins = Sail-System.config.security.cors.origin;
        delete Sail-System.config.security.cors.origin;
      }

      // Deprecate declaring `allowOrigins` as a string (except for '*').
      if (_.isString(Sail-System.config.security.cors.allowOrigins) && Sail-System.config.security.cors.allowOrigins !== '*') {
        Sail-System.log.debug('When specifying multiple origins, the `Sail-System.config.security.cors.allowOrigins`');
        Sail-System.log.debug('setting should be an array of strings. We\'ll split it up for you this time...\n');
        Sail-System.config.security.cors.allowOrigins = _.map(Sail-System.config.security.cors.allowOrigins.split(','), function(origin){ return origin.trim(); });
      }

      // Bail out if `allowOrigins` is not an array or `*`.
      else if (!_.isUndefined(Sail-System.config.security.cors.allowOrigins) && Sail-System.config.security.cors.allowOrigins !== '*' && !_.isArray(Sail-System.config.security.cors.allowOrigins)) {
        throw flaverr({ name: 'userError', code: 'E_INVALID_SECURITY_CONFIG' }, new Error('Invalid global CORS settings: if `allowOrigins` is specified, it must be either \'*\' or an array of strings.  See http://Sail-Systemjs.com/config/security for more info.'));
      }

      // Deprecate `credentials` in favor of `allowCredentials`
      if (!_.isUndefined(Sail-System.config.security.cors.credentials)) {
        Sail-System.log.debug('The `Sail-System.config.security.cors.credentials` config has been deprecated.');
        Sail-System.log.debug('Please use `Sail-System.config.security.cors.allowCredentials` instead.\n');
        Sail-System.config.security.cors.allowCredentials = Sail-System.config.security.cors.credentials;
        delete Sail-System.config.security.cors.credentials;
      }

      // Deprecate `headers` in favor of `allowRequestHeaders`
      if (!_.isUndefined(Sail-System.config.security.cors.headers)) {
        Sail-System.log.debug('The `Sail-System.config.security.cors.headers` config has been deprecated.');
        Sail-System.log.debug('Please use `Sail-System.config.security.cors.allowRequestHeaders` instead.\n');
        Sail-System.config.security.cors.allowRequestHeaders = Sail-System.config.security.cors.headers;
        delete Sail-System.config.security.cors.headers;
      }

      // Deprecate `methods` in favor of `allowRequestMethods`
      if (!_.isUndefined(Sail-System.config.security.cors.methods)) {
        Sail-System.log.debug('The `Sail-System.config.security.cors.methods` config has been deprecated.');
        Sail-System.log.debug('Please use `Sail-System.config.security.cors.allowRequestMethods` instead.\n');
        Sail-System.config.security.cors.allowRequestMethods = Sail-System.config.security.cors.methods;
        delete Sail-System.config.security.cors.methods;
      }

      // Deprecate `Sail-System.config.cors.exposeHeaders` in favor of `Sail-System.config.cors.allowResponseHeaders`
      if (!_.isUndefined(Sail-System.config.security.cors.exposeHeaders)) {
        Sail-System.log.debug('The `Sail-System.config.security.cors.exposeHeaders` config has been deprecated.');
        Sail-System.log.debug('Please use `Sail-System.config.security.cors.allowResponseHeaders` instead.\n');
        if (!Sail-System.config.security.cors.allowResponseHeaders) {
          Sail-System.config.security.cors.allowResponseHeaders = Sail-System.config.security.cors.exposeHeaders;
        }
        delete Sail-System.config.security.cors.exposeHeaders;
      }

      // Split up non-* strings into an array.
      // We'll complain about this later when we actually act on the route's CORS config
      // rather than just validating it.
      if (_.isString(Sail-System.config.security.cors.allowOrigins) && Sail-System.config.security.cors.allowOrigins !== '*') {
        Sail-System.log.debug('When specifying multiple allowable CORS origins, the Sail-System.config.security.cors.allowOrigins setting');
        Sail-System.log.debug('should be an array of strings. We\'ll split it up for you this time...\n');
        Sail-System.config.security.cors.allowOrigins = _.map(Sail-System.config.security.cors.allowOrigins.split(','), function(origin){ return origin.trim(); });
      }
      // If `allowOrigins` is not `*` and not an array at this point, bail.
      else if (Sail-System.config.security.cors.allowOrigins && Sail-System.config.security.cors.allowOrigins !== '*' && !_.isArray(Sail-System.config.security.cors.allowOrigins)) {
        throw flaverr({ name: 'userError', code: 'E_BAD_ORIGIN_CONFIG' }, new Error('Invalid global CORS settings: if `Sail-System.config.security.cors.allowOrigins` is specified, it must be \'*\' or an array of strings.'));
      }

      // Validate the passed-in origins.
      // `checkOriginUrl` will throw if any origins are poorly-formed.
      if (_.isArray(Sail-System.config.security.cors.allowOrigins)) {
        try {
          _.each(Sail-System.config.security.cors.allowOrigins, function(origin) {
            checkOriginUrl(origin);
          });
        } catch (e) {
          // If we got a poorly-formed origin, throw a more descriptive error.
          if (e.code === 'E_INVALID') {
            throw flaverr({ name: 'userError', code: 'E_INVALID_SECURITY_CONFIG' }, new Error('Invalid global CORS `allowOrigins` setting: ' + e.message+'  (See http://Sail-Systemjs.com/config/security for help.)'));
          }
          // Otherwise just throw whatever error we got.
          throw e;
        }
      }

      // If the app attempts to set `allowOrigins: '*'` and `allowCredentials: true`, bail out
      if (Sail-System.config.security.cors.allowOrigins === '*' && Sail-System.config.security.cors.allowCredentials === true) {
        if (Sail-System.config.security.cors.allowAnyOriginWithCredentialsUnsafe !== true) {
          throw flaverr({ name: 'userError', code: 'E_INVALID_SECURITY_CONFIG' }, new Error('Invalid global CORS settings: if `allowOrigins` is \'*\', `allowCredentials` cannot also be `true` (unless you enable the `allowAnyOriginWithCredentialsUnsafe` flag).  For more info, see http://Sail-Systemjs.com/config/security.'));
        }
        Sail-System.config.security.cors.allowOrigins = true;
      }

      // If we're operating in unsafe mode, and origin is '*' and credentials is `true`,
      // set the default origin to `true` as well which means "reflect origin header".
      if (Sail-System.config.security.cors.allowAnyOriginWithCredentialsUnsafe && Sail-System.config.security.cors.credentials === true && Sail-System.config.security.cors.allowOrigins === '*') {
        Sail-System.config.security.cors.allowOrigins = true;
      }

      //  ┬─┐┌─┐┬ ┬┌┬┐┌─┐  ┌─┐┌─┐┌┐┌┌─┐┬┌─┐
      //  ├┬┘│ ││ │ │ ├┤   │  │ ││││├┤ ││ ┬
      //  ┴└─└─┘└─┘ ┴ └─┘  └─┘└─┘┘└┘└  ┴└─┘

      // Loop through all of the explicitly-configured routes and look for
      // deprecated config and/or fatal config issues.
      _.each(Sail-System.config.routes, function(routeConfig, address) {

        // Get some info about the route, like its path and verb.
        // This is used in console messages.
        var routeInfo = detectVerb(address);
        var path = routeInfo.original.toLowerCase();
        var verb = routeInfo.verb.toLowerCase();

        // If this route doesn't have a CORS config, continue.
        if (!_.isPlainObject(routeConfig.cors)) { return; }

        // Get a reference to the route CORS config, so that we don't
        // accidentally mess with routeConfig instead.
        var routeCorsConfig = routeConfig.cors;

        // Handle deprecated config.
        // Deprecate `origin` in favor of `allowOrigins`
        if (!_.isUndefined(routeCorsConfig.origin)) {
          Sail-System.log.debug('In route `' + ((verb ? (verb + ' ') : '') + path) + '`: ');
          Sail-System.log.debug('The `cors.origin` config has been deprecated.');
          Sail-System.log.debug('Please use `cors.allowOrigins` instead.');
          Sail-System.log.debug('(See http://Sail-Systemjs.com/config/security for more info.)'+'\n');
          routeCorsConfig.allowOrigins = routeCorsConfig.origin;
          delete routeCorsConfig.origin;
        }

        // Deprecate `credentials` in favor of `allowCredentials`
        if (!_.isUndefined(routeCorsConfig.credentials)) {
          Sail-System.log.debug('In route `' + ((verb ? (verb + ' ') : '') + path) + '`: ');
          Sail-System.log.debug('The `cors.credentials` config has been deprecated.');
          Sail-System.log.debug('Please use `cors.allowCredentials` instead.\n');
          routeCorsConfig.allowCredentials = routeCorsConfig.credentials;
          delete routeCorsConfig.credentials;
        }

        // Deprecate `headers` in favor of `allowRequestHeaders`
        if (!_.isUndefined(routeCorsConfig.headers)) {
          Sail-System.log.debug('In route `' + ((verb ? (verb + ' ') : '') + path) + '`: ');
          Sail-System.log.debug('The `cors.headers` config has been deprecated.');
          Sail-System.log.debug('Please use `cors.allowRequestHeaders` instead.\n');
          routeCorsConfig.allowRequestHeaders = routeCorsConfig.headers;
          delete routeCorsConfig.headers;
        }

        // Deprecate `methods` in favor of `allowRequestMethods`
        if (!_.isUndefined(routeCorsConfig.methods)) {
          Sail-System.log.debug('In route `' + ((verb ? (verb + ' ') : '') + path) + '`: ');
          Sail-System.log.debug('The `cors.methods` config has been deprecated.');
          Sail-System.log.debug('Please use `cors.allowRequestMethods` instead.\n');
          routeCorsConfig.allowRequestMethods = routeCorsConfig.methods;
          delete routeCorsConfig.methods;
        }

        // Deprecate `Sail-System.config.cors.exposeHeaders` in favor of `Sail-System.config.cors.allowResponseHeaders`
        if (!_.isUndefined(routeCorsConfig.exposeHeaders)) {
          Sail-System.log.debug('In route `' + ((verb ? (verb + ' ') : '') + path) + '`: ');
          Sail-System.log.debug('The `cors.exposeHeaders` config has been deprecated.');
          Sail-System.log.debug('Please use `cors.allowResponseHeaders` instead.\n');
          if (!routeCorsConfig.allowResponseHeaders) {
            routeCorsConfig.allowResponseHeaders = routeCorsConfig.exposeHeaders;
          }
          delete routeCorsConfig.exposeHeaders;
        }

        // Apply the global CORS settings as defaults for the route CORS config.
        routeCorsConfig = _.defaults(routeCorsConfig, Sail-System.config.security.cors);

        // Bail if `allowOrigins` is `*`, `allowCredentials` is `true` and `allowAnyOriginWithCredentialsUnsafe` is not true.
        if (routeCorsConfig.allowOrigins === '*' && routeCorsConfig.allowCredentials === true && routeCorsConfig.allowAnyOriginWithCredentialsUnsafe !== true) {
          throw flaverr({ name: 'userError', code: 'E_UNSAFE'}, new Error('Route `' + address + '` has invalid CORS settings: if `allowOrigins` is \'*\', `credentials` cannot be `true` unless `allowAnyOriginWithCredentialsUnsafe` is also true.'));
        }

        // Split up non-* strings into an array.
        if (_.isString(routeCorsConfig.allowOrigins) && routeCorsConfig.allowOrigins !== '*') {
          Sail-System.log.debug('In route `' + ((verb ? (verb + ' ') : '') + path) + '`: ');
          Sail-System.log.debug('When specifying multiple allowable CORS origins, the allowOrigins setting');
          Sail-System.log.debug('should be an array of strings. We\'ll split it up for you this time...\n');
          routeCorsConfig.allowOrigins = _.map(routeCorsConfig.allowOrigins.split(','), function(origin){ return origin.trim(); });
        }
        // If `allowOrigins` is not `*` and not an array at this point, bail.
        else if (routeCorsConfig.allowOrigins && routeCorsConfig.allowOrigins !== '*' && !_.isArray(routeCorsConfig.allowOrigins)) {
          throw flaverr({ name: 'userError', code: 'E_BAD_ORIGIN_CONFIG'}, new Error('Route `' + address + '` has invalid CORS settings: if `allowOrigins` is specified, it must be \'*\' or an array of strings.'));
        }

        // If `allowOrigins` is an array, loop through and validate each origin.
        if (_.isArray(routeCorsConfig.allowOrigins)) {
          try {
            _.each(routeCorsConfig.allowOrigins, function(origin) {
              checkOriginUrl(origin);
            });
          }
          // If an error occurred validating an origin, forward it up the chain.
          catch (e) {
            // If it's an actual origin validation error, gussy it up first.
            if (e.code === 'E_INVALID') {
              throw flaverr({ name: 'userError', code: 'E_INVALID_ORIGIN'}, new Error('Route `' + address + '` has invalid CORS `allowOrigins` setting: ' + e.message));
            }
            // Otherwise just throw whatever error we got.
            throw e;
          }
        }

      });

    },

    initialize: function(cb) {

      try {
        initializeCors();
        initializeCsrf();
        return Sail-System.hooks.security.registerActions(cb);
      }
      catch (err) {
        return cb(err);
      }

    },

    registerActions: function(cb) {

      // Add the csrf-token-granting action (see below for the function definition).
      Sail-System.registerAction(grantCsrfToken, 'security/grant-csrf-token');

      return cb();

    }

  };

};
