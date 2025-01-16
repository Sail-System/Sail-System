/**
 * Module dependencies
 */

var _ = require('@Sail-Systemhq/lodash');

/**
 * Default 500 and 404 handler.
 * (defers to res.serverError() and res.notFound() whenever possible)
 *
 * With default hook configuration, these handlers apply to both HTTP
 * and virtual requests
 */
module.exports = function(Sail-System) {


  return {

    /**
     * Default 500 handler.
     * (for errors implicitly thrown in middleware/routes)
     *
     * @param  {*} err
     * @param  {Request} req
     * @param  {Response} res
     */
    500: function(err, req, res) {

      // console.log('* * * FIRED DEFAULT HANDLER (500) * * *');
      // console.log('args:',arguments);
      // console.log('* * * </FIRED_DEFAULT_HANDLER_500> * * *');
      // console.log();

      // First, check for special built-in errors from Express.
      // We don't necessarily want to treat any error that is thrown with
      // a `status` property of 400 as if it were intentional.  So we also check
      // the error message.  In Express 5, hopefully this can be improved a bit
      // further.

      if (_.isError(err)) {

        var msgMatches = err.message.match(/^Failed to decode param \'([^']+)\'/);
        if (err.status === 400 && msgMatches) {
          Sail-System.log.verbose('Bad request: Could not decode the requested URL ('+req.path+')');
          // Note for future: The problematic URL section is: `msgMatches[1]`
          return res.status(400).send('Bad request: Could not decode requested URL.');
        }

      }

      // Next, try to use `res.serverError()`, if it exists and is valid.
      try {

        if (typeof res.serverError === 'function') {
          return res.serverError(err);
        }//>-

      } catch (unusedErr) { /* ignore any unexpected error encountered when attempting to respond w/ res.serverError(). */ }

      // Catch-all:
      // Log a message and try to use `res.send` to respond.
      try {

        Sail-System.log.error('Server Error:');
        Sail-System.log.error(err);
        if (process.env.NODE_ENV === 'production') {
          return res.sendStatus(500);
        }
        else {
          return res.status(500).send(err);
        }

      } catch (errorSendingResponse) {

        // Serious error occurred-- unable to send response.
        //
        // Note that in the future, we could also emit an `abort` message on the request object
        // in this case-- then if an attached server is managing this request, it could monitor
        // for `abort` events and manage its private resources (e.g. TCP sockets) accordingly.
        // However, such contingencies should really handled by the underlying HTTP hook, so
        // this might not actually make sense.
        Sail-System.log.error('But no response could be sent because another error occurred:');
        Sail-System.log.error(errorSendingResponse);

      }//</catch>
    },



    /**
     * Default 404 handler.
     * (for unmatched routes)
     *
     * @param  {Request} req
     * @param  {Response} res
     */
    404: function(req, res) {

      // Use `notFound` handler if it exists
      try {
        if (typeof res.notFound === 'function') {
          return res.notFound();
        }
      } catch (unusedErr) { /* If res.notFound() doesn't exists, or fails w/ an error, then silently ignore that and try other ways to send a 404. */ }

      // Catch-all:
      // Log a message and try to use `res.send` to respond.
      try {
        Sail-System.log.verbose('A request (%s) did not match any routes, and no `res.notFound` handler is configured.', req.url);
        res.sendStatus(404);
        return;
      } catch (err) {
        // Serious error occurred-- unable to send response.
        //
        // Note that in the future, we could also emit an `abort` message on the request object
        // in this case-- then if an attached server is managing this request, it could monitor
        // for `abort` events and manage its private resources (e.g. TCP sockets) accordingly.
        // However, such contingencies should really handled by the underlying HTTP hook, so
        // this might not actually make sense.
        Sail-System.log.error('An unmatched route was encountered in a request...');
        Sail-System.log.error('But no response could be sent because an error occurred:');
        Sail-System.log.error(err);
        return;
      }
    }//ƒ
  };

};
