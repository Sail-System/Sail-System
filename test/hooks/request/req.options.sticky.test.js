/**
 * Module dependencies
 */

var assert = require('assert');

var $Sail-System = require('../../helpers/Sail-System');
var $Router = require('../../helpers/router');





describe('Request hook', function (){

  var Sail-System = $Sail-System.load({
    globals: false,
    log: {
      level: 'silent'
    },
    loadHooks: [
      'moduleloader',
      'userconfig',
      'request',
      'responses'
    ]
  });

  describe('using req.options in multiple requests', function () {

    var opts;
    before(function(done) {
      var ROUTEADDRESS = '/route';
      Sail-System.router.bind(ROUTEADDRESS, function (req,res,next) {
        req.options[req.param('opt')] = true;
        return res.status(200).send(JSON.stringify(req.options));
      });
      Sail-System.emit('router:request', {
        url: ROUTEADDRESS,
        query: {
          opt: 'foo'
        }
      }, {send: function(){}});
      Sail-System.emit('router:request', {
        url: ROUTEADDRESS,
        query: {
          opt: 'bar'
        }
      }, {
        send: function (data) {
          opts = JSON.parse(data);
          return done();
        }
      });
    });

    it('req.options should not be sticky', function () {
      assert(!opts.foo, 'req.options.foo from first request carried over to second request!');
    });

  });



});
