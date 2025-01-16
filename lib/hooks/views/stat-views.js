/**
 * Stat view files and expose the existence tree on `Sail-System.views`.
 *
 * @param  {Sail-System}    Sail-System
 * @param  {Hook}     hook
 * @param  {Function} cb
 *         @param {Error} err
 *         @param {Dictionary} detectedViews
 *
 *
 * @api private
 */

module.exports = function statViews (Sail-System, hook, cb) {
  Sail-System.modules.statViews(function (err, detectedViews) {
    if (err) {
      return cb(err);
    }

    // Save existence tree in `Sail-System.views` for consumption later
    Sail-System.views = detectedViews || {};

    return cb(null, detectedViews);
  });

};
