/**
 * Module dependencies
 */
var should = require('should');

var $Sail-System = require('../helpers/Sail-System');


describe('`Sail-System.router`', function() {

    var Sail-System = $Sail-System.load.withAllHooksDisabled();



    it('should be exposed on the `Sail-System` global', function () {
        Sail-System
            .router
            ._privateRouter
            .stack
                .should.be.ok;
    });
});
