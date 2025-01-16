/**
 * Module dependencies
 */

var _ = require('@Sail-Systemhq/lodash');
var actionUtil = require('../actionUtil');
var formatUsageError = require('../formatUsageError');

/**
 * Find One Record
 *
 * http://Sail-Systemjs.com/docs/reference/blueprint-api/find-one.
 *
 * > Blueprint action to find and return the record with the specified id.
 *
 */

module.exports = function findOneRecord (req, res) {

  var parseBlueprintOptions = req.options.parseBlueprintOptions || req._Sail-System.config.blueprints.parseBlueprintOptions;

  // Set the blueprint action for parseBlueprintOptions.
  req.options.blueprintAction = 'findOne';

  var queryOptions = parseBlueprintOptions(req);
  var Model = req._Sail-System.models[queryOptions.using];

  // Only use the `where`, `select` or `omit` from the criteria (nothing else is valid for findOne).
  queryOptions.criteria = _.pick(queryOptions.criteria, ['where', 'select', 'omit']);

  // Only use the primary key in the `where` clause.
  queryOptions.criteria.where = _.pick(queryOptions.criteria.where, Model.primaryKey);


  Model
  .findOne(queryOptions.criteria, queryOptions.populates).meta(queryOptions.meta)
  .exec(function found(err, matchingRecord) {
    if (err) {
      // If this is a usage error coming back from Waterline,
      // (e.g. a bad criteria), then respond w/ a 400 status code.
      // Otherwise, it's something unexpected, so use 500.
      switch (err.name) {
        case 'UsageError': return res.badRequest(formatUsageError(err, req));
        default: return res.serverError(err);
      }
    }//-•

    if(!matchingRecord) {
      req._Sail-System.log.verbose('In `findOne` blueprint action: No record found with the specified id (`'+queryOptions.criteria.where[Model.primaryKey]+'`).');
      return res.notFound();
    }

    if (req._Sail-System.hooks.pubsub && req.isSocket) {
      Model.subscribe(req, [matchingRecord[Model.primaryKey]]);
      actionUtil.subscribeDeep(req, matchingRecord);
    }

    return res.ok(matchingRecord);

  });

};
