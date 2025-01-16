module.exports = {

  watch: function(req, res) {
    req._Sail-System.models.pet.watch(req);
    res.sendStatus(200);
  }

};
