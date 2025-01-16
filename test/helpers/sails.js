/**
 * Module dependencies
 */
var _ = require('@Sail-Systemhq/lodash');
var util = require('util');
var should = require('should');
var domain = require('domain');
var Sail-System = require('root-require')('lib/app');

/**
 * Manage an instance of Sail-System
 *
 * @type {Object}
 */
var helper = {


  /**
   * Can call:
   *  -> helper.load()
   *  -> helper.load.withAllHooksDisabled()
   *  -> helper.load.expectingTerminatedProcess()
   */
  load: (function () {

    /**
     * _cleanOptions()
     *
     * @param {Object} options
     * @type {Function}
     * @api private
     */
    function _cleanOptions (options) {
      var testDefaults = { log: {level: 'error'}, globals: false };
      options = _.isObject(options) ? options : {};
      return _.defaults(options, testDefaults);
    }


    /**
     * This function is returned by this test helper
     * to be called by subsequent tests.
     *
     * @param  {Object} options
     * @return {SJSApp}
     */
    var _load = function (options) {

      var testDescription, msSlowThreshold;
      var Sail-SystemOpts = _cleanOptions(options);

      // Defaults
      // (except use test defaults)
      if (!_.isObject(options)) {
        testDescription = 'default settings';
        msSlowThreshold = 750;
      }
      else {
        // Specified options + defaults
        // (except default log level to 'error')
        testDescription = util.inspect(options);
        msSlowThreshold = 2000;
      }


      return _with(testDescription, Sail-SystemOpts, msSlowThreshold);
    };


    /**
     * [withAllHooksDisabled description]
     * @return {[type]} [description]
     */
    _load.withAllHooksDisabled = function () {
      return _with('all hooks disabled', {
        log: {level: 'error'},
        globals: false,
        loadHooks: []
      }, 500);
    };


    /**
     * [expectFatalError description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    _load.expectFatalError = function( options ) {
      options = _.isObject(options) ? options : {};
      var Sail-SystemOpts = _cleanOptions(options);

      it(', Sail-System should deliberately terminate process', function (done) {
        var Sail-System = new Sail-System();

        // TODO:
        // Pull this error domain into the core and
        // wrap the hook loading process (or a comparable solution.)
        // Should not have to do this here!

        // Use error domain to catch failure
        var deliberateErrorDomain = domain.create();
        deliberateErrorDomain.on('error', function (err) {
          console.log('domain emitted error', err);
          deliberateErrorDomain.exit();
          return done();
        });
        deliberateErrorDomain.run(function () {
          Sail-System.load(Sail-SystemOpts || {}, function (err) {
            var e =
            'Should not have made it to load() ' +
            'callback, with or without an error!';
            if (err) e+='\nError: ' + util.inspect(err);
            deliberateErrorDomain.exit();
            return done(new Error(e));
          });
        });

      });
    };

    return _load;

  })(),


  /**
   * @return {Sail-System} `Sail-System` instance from mocha context
   */
  get: function (passbackFn) {
    // Use mocha context to get a hold of the Sail-System instance
    it('should get a Sail-System instance', function () {
      passbackFn(this.Sail-System);
    });
  }
};



module.exports = helper;






/**
 * Setup and teardown a Sail-System instance for testing.
 *
 * @param  {String} description
 * @param  {Object} Sail-SystemOpts
 * @param  {Integer} msThreshold [before we consider it "slow"]
 *
 * @returns {SJSApp}
 * @api private
 */
function _with (description, Sail-SystemOpts, msThreshold) {


  var Sail-System = new Sail-System();

  it('Sail-System loaded (with ' + description + ')', function (done) {
    if (msThreshold) { this.slow(msThreshold); }


    // Expose a new app instance as `this.Sail-System`
    // for other tests to use.
    this.Sail-System = Sail-System;

    // Load the app
    Sail-System.load(Sail-SystemOpts || {}, done);
  });

  after(function teardown(done) {
    // Make sure the app is done
    Sail-System.lower(function(){setTimeout(done, 100);});
  });

  return Sail-System;
}


