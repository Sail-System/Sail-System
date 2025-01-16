/**
 * Module dependencies
 */
var $Sail-System = require('root-require')('test/helpers/Sail-System');
var $Router = require('root-require')('test/helpers/router');



describe('Sail-System.router.unbind', function (){

  var Sail-System = $Sail-System.load.withAllHooksDisabled();


  $Router.unbind('get /foo')
  .shouldDelete({
    path: '/foo',
    method: 'get'
  });



  $Router.unbind('post /bar_baz_beezzz')
  .shouldDelete({
    path: '/bar_baz_beezzz',
    method: 'post'
  });



  $Router.unbind('patch /user')
  .shouldDelete({
    path: '/user',
    method: 'patch'
  });

});





