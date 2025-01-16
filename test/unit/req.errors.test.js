/**
 * Module dependencies
 */

var assert = require('assert');
var _ = require('@Sail-Systemhq/lodash');
var $Sail-System = require('../helpers/Sail-System');


describe('request that causes an error', function (){

  var Sail-System = $Sail-System.load({
    globals: false,
    log: { level: 'silent' },
    loadHooks: [
      'moduleloader',
      'userconfig',
      'responses'
    ]
  });
  var saveServerError;

  // Restore the default error handler after tests that change it
  afterEach(function () {
    if (saveServerError) {
      Sail-System.registry.responses.serverError = saveServerError;
      saveServerError = undefined;
    }
  });

  it('should return the expected error when something throws', function (done) {

    var ERROR = 'oh no I forgot my keys';

    Sail-System.get('/errors/1', function (req, res) {
      throw ERROR;
    });

    Sail-System.request('GET /errors/1', {}, function (err) {
      assert.deepEqual(500, err.status);
      assert.deepEqual(ERROR, err.body);
      done();
    });

  });

  it('should call the `res.serverError()` handler when something throws and the "responses" hook is enabled, and the error should emerge, untampered-with', function (done) {

    var ERROR = 'oh no I forgot my keys';
    var CHECKPOINT = 'made it';

    saveServerError = Sail-System.registry.responses.serverError;
    Sail-System.registry.responses.serverError = function (err) {
      assert.deepEqual(ERROR, err);
      this.res.status(500).send(CHECKPOINT);
    };

    Sail-System.get('/errors/2', function (req, res) {
      throw ERROR;
    });

    Sail-System.request('GET /errors/2', {}, function (err) {
      assert.deepEqual(CHECKPOINT, err.body);
      done();
    });

  });

  it('should return the expected error when something throws an Error object', function (done) {

    var MESSAGE = 'oh no I forgot my keys again';
    var ERROR = new Error(MESSAGE);

    ERROR.toJSON = function() {
      return {
        message: MESSAGE,
        stack: this.stack
      };
    };

    Sail-System.get('/errors/3', function (req, res) {
      throw ERROR;
    });

    Sail-System.request('GET /errors/3', {}, function (err) {
      assert.deepEqual(err.status, 500);
      assert.deepEqual(typeof(err.body), 'object');
      assert.deepEqual(err.body.message, MESSAGE);
      done();
    });

  });

});
