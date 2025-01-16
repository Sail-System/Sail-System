module.exports = function(Sail-System) {

  var phrase;
  return {

    defaults: {
      __configKey__: {
        phrase: 'make it rain'
      }
    },

    initialize: function(cb) {
      phrase = Sail-System.config[this.configKey].phrase;
      this.isShoutyHook = true;
      cb();
    },

    routes: {
      before: {
        'GET /shout': function(req, res, next) {
          res.send(phrase);
        }
      }
    }

  };

};
