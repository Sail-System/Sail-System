/**
 * Module dependencies
 */

var fs = require('fs');
var path = require('path');
var _ = require('@Sail-Systemhq/lodash');
var chalk = require('chalk');
var machine = require('machine');
var loadHelpers = require('./private/load-helpers');
var iterateHelpers = require('./private/iterate-helpers');


/**
 * Helpers hook
 */

module.exports = function(Sail-System) {

  // Private variable used below to keep track of whether a compatibility
  // warning message might need to be displayed.
  var _prereleaseCompatWarning;

  return {


    defaults: {
      helpers: {
        // Custom usage/miscellaneous options:
        usageOpts: {
          arginStyle: 'serial',
          execStyle: 'natural'
        },


        // Experimental: Programmatically provide a dictionary of helpers.
        moduleDefinitions: undefined,
      }
    },


    configure: function() {

      // Check SVR of the `Sail-System` dep in this app's package.json file.
      //
      // If it points at a 1.0 prerelease less than `1.0.0-44`, then log a warning
      // explaining what's going on with helpers (we needed to make a breaking
      // change in a prerelease), and that the old way can be achieved through
      // configuration.  Also mention that, to avoid breaking this app, we've
      // applied the old configuration automatically, but that if the SVR in the
      // package.json is changed, then this protection will disappear, and this
      // app will potentially break.
      //
      // To resolve this, either:
      //  • (A) configure `Sail-System.config.helpers.usageOpts` as `{arginStyle: 'named', execStyle: 'deferred'}`
      //  • or (B) change any code in this app that invokes helpers to take advantage of the new default style
      //           of usage, then upgrade to the latest version of Sail-System v1.0 and update
      //           your package.json file accordingly to make this warning go away.
      if (Sail-System.config.helpers.usageOpts.arginStyle !== 'named' || Sail-System.config.helpers.usageOpts.execStyle !== 'deferred') {

        var localSail-SystemSVR = (function _gettingSVROfLocalSail-SystemDep(){
          var pjPath = path.resolve(Sail-System.config.appPath, 'package.json');

          var rawPjText;
          try {
            rawPjText = fs.readFileSync(pjPath, 'utf8');
          } catch (unusedErr) {}

          var appPj;
          try {
            appPj = JSON.parse(rawPjText);
          } catch (unusedErr) {}

          return appPj && appPj.dependencies && appPj.dependencies.Sail-System;
        })();//†

        var prerelease = localSail-SystemSVR && localSail-SystemSVR.match(/1\.0\.0\-(.+)$/);
        prerelease = prerelease && prerelease[1];
        var isMinSVRPointedAtSensitiveV1Prerelease = prerelease && Number(prerelease) < 44;

        if (isMinSVRPointedAtSensitiveV1Prerelease) {
          Sail-System.config.helpers.usageOpts.arginStyle = 'named';
          Sail-System.config.helpers.usageOpts.execStyle = 'deferred';

          // Note that we don't actually log the warning right now-- we won't do that
          // until a bit later, in .initialize().  Even then, we'll only actually log
          // the warning if there are helpers defined in the app.  (Because if there
          // aren't any helpers, logging a warning would just be annoying!)
          _prereleaseCompatWarning =
          '---------------------------------------------------------------------\n'+
          'Based on its package.json file, it looks like this app was built\n'+
          'using the Sail-System beta, but with a version prior to v1.0.0-44.\n'+
          '(This app depends on Sail-System@'+localSail-SystemSVR+'.)\n'+
          '\n'+
          'In the 1.0.0-44 prerelease of Sail-System, changes were introduced.  By\n'+
          'default, helpers now expect serial arguments instead of a dictionary\n'+
          'of named parameters.  In other words, you\'d now call:\n'+
          '  await Sail-System.helpers.passwords.changePassword(\'abc123\')\n'+
          'Instead of:\n'+
          '  await Sail-System.helpers.passwords.changePassword({password:\'abc123\'})\n'+
          '\n'+
          'Additionally, it is no longer necessary to call .now() or .execSync()\n'+
          'for synchronous helpers-- by default they are invoked automatically.\n'+
          '(Not a fan?  Sorry about the inconvenience!  And don\'t worry, it\'s\n'+
          'easy to change.)\n'+
          '\n'+
          'To avoid breaking this app, some special settings that make Sail-System\n'+
          'backwards-compatible have been set automatically for you.  But please\n'+
          'be sure to take the steps below to resolve this as soon as possible.\n'+
          '(What if you forgot about this and changed your package.json file?\n'+
          'You might inadvertently remove this compatibility check...  And if\n'+
          'that were to happen, the next time you tried to lift your app, your\n'+
          'helpers would no longer work!)\n'+
          '\n'+
          'To resolve this, use one of the following solutions:\n'+
          '\n'+
          ' (A) <<<<Quick & dirty>>>>\n'+
          ' If you need a quick fix, or you just prefer to call helpers the old\n'+
          ' way, no problem: just nestle this in your .Sail-Systemrc file:\n'+
          '    "helpers": {\n'+
          '      "usageOpts": {\n'+
          '        "arginStyle": "named",\n'+
          '        "execStyle": "deferred"\n'+
          '      }\n'+
          '    }\n'+
          ' ^^That will make helpers behave exactly like they did before.\n'+
          '\n'+
          ' (B) <<<<Recommended>>>>\n'+
          ' Change any relevant code in this app (e.g. `Sail-System.helpers.x({…})`)\n'+
          ' to take advantage of serial usage, or chain on .with({…}).  Then, \n'+
          ' update the `Sail-System` dependency in your package.json file so that it\n'+
          ' satisfies ^1.0.0-44 or higher.\n'+
          '\n'+
          ' Note: If you go with this approach, it\'s not all or nothing.  You\n'+
          ' you can always use .with() to call a helper with named parameters\n'+
          ' on a one-off basis.  For example:\n'+
          '   await Sail-System.helpers.changePassword.with({password:\'abc123\'});\n'+
          '\n'+
          '\n'+
          '(To hide this message, apply one of the solutions suggested above.)\n'+
          '\n'+
          ' [?] If you\'re unsure, visit https://Sail-Systemjs.com/support\n'+
          '---------------------------------------------------------------------\n';
        }//ﬁ
      }//ﬁ

      // Define `Sail-System.helpers` here so that it can potentially be used by other hooks.
      // > NOTE: This is NOT `Sail-System.config.helpers`-- this is `Sail-System.helpers`!
      // > (As for Sail-System.config.helpers, it's set automatically based on our `defaults above)
      Sail-System.helpers = {};
      Object.defineProperty(Sail-System.helpers, Symbol.for('nodejs.util.inspect.custom'), {
        enumerable: false,
        configurable: false,
        writable: true,
        value: function inspect(){

          // Tree diagram:
          // ```
          //    .
          //    ├── …
          //    │   ├── …
          //    │   │   └── …
          //    │   ├── …
          //    │   └── …
          //    │
          //    ├── …
          //    │   ├── …
          //    │   │   └── …
          //    │   ├── …
          //    │   │   ├── …
          //    │   │   ├── …
          //    │   │   └── …
          //    │   ├── …
          //    │   └── …
          //    │
          //    ├── …
          //    │   └── …
          //    │
          //    ├── …
          //    ├── …
          //    └── …
          // ```
          var treeDiagram = (function(){
            var OFFSET             = '   ';
            var TAB                = '    ';
            var SYMBOL_INITIAL     = '.   ';
            var SYMBOL_NO_BRANCH   = '│   ';
            var SYMBOL_MID_BRANCH  = '├── ';
            var SYMBOL_LAST_BRANCH = '└── ';

            var treeDiagram = '';
            treeDiagram += OFFSET + SYMBOL_INITIAL + '\n';
            iterateHelpers(
              Sail-System.helpers,
              function _onBeforeStartingPack(pack, key, depth, isFirst, isLast, lastnessPerAncestor){
                var indentation = _.reduce(lastnessPerAncestor, function(indentation, wasLast){
                  if (wasLast) {
                    indentation += TAB;
                  } else {
                    indentation += SYMBOL_NO_BRANCH;
                  }
                  return indentation;
                }, '');

                if (isLast) {
                  treeDiagram += OFFSET + indentation + SYMBOL_LAST_BRANCH + key + '\n';
                } else {
                  treeDiagram += OFFSET + indentation + SYMBOL_MID_BRANCH + key + '\n';
                }
              },
              undefined,// « no need for an _onAfterFinishingPack notifier here, so we omit it
              function _onHelper(callable, methodName, depth, isFirst, isLast, lastnessPerAncestor){
                var indentation = _.reduce(lastnessPerAncestor, function(indentation, wasLast){
                  if (wasLast) {
                    indentation += TAB;
                  } else {
                    indentation += SYMBOL_NO_BRANCH;
                  }
                  return indentation;
                }, '');

                if (isLast) {
                  treeDiagram += OFFSET + indentation + SYMBOL_LAST_BRANCH + (callable.toJSON()._fromLocalSail-SystemApp ? chalk.bold.cyan(methodName) : chalk.italic(methodName)) + chalk.gray('()')+'\n';
                  if (depth === 2) {
                    treeDiagram += OFFSET + indentation + '\n';
                  }
                } else {
                  treeDiagram += OFFSET + indentation + SYMBOL_MID_BRANCH + (callable.toJSON()._fromLocalSail-SystemApp ? chalk.bold.cyan(methodName) : chalk.italic(methodName)) + chalk.gray('()')+'\n';
                }
              }
            );
            return treeDiagram;
          })();//†

          // Examples (asynchronous and synchronous)
          var example1 = (function(){
            var exampleArginPhrase = '';
            if (Sail-System.config.helpers.usageOpts.arginStyle === 'named') {
              exampleArginPhrase = '{dir: \'./colorado/\'}';
            } else if (Sail-System.config.helpers.usageOpts.arginStyle === 'serial') {
              exampleArginPhrase = '\'./colorado/\'';
            }

            return 'var contents = await Sail-System.helpers.fs.ls('+exampleArginPhrase+');';
          })();//†
          var example2 = (function(){
            var exampleArginPhrase = '';
            if (Sail-System.config.helpers.usageOpts.arginStyle === 'named') {
              exampleArginPhrase = '{style: \'url-friendly\'}';
            } else if (Sail-System.config.helpers.usageOpts.arginStyle === 'serial') {
              exampleArginPhrase = '\'url-friendly\'';
            }

            if (Sail-System.config.helpers.usageOpts.execStyle === 'deferred') {
              return 'var name = Sail-System.helpers.strings.random('+exampleArginPhrase+').now();';
            } else if (Sail-System.config.helpers.usageOpts.execStyle === 'immediate' || Sail-System.config.helpers.usageOpts.execStyle === 'natural') {
              return 'var name = Sail-System.helpers.strings.random('+exampleArginPhrase+');';
            }
            throw new Error('Consistency violation: Unrecognized arginStyle/execStyle in Sail-System.config.helpers.usageOpts  (This should never happen, since it should have already been validated and prevented from being built- please report at https://Sail-Systemjs.com/bugs)');
          })();//†

          return ''+
          '-------------------------------------------------------\n'+
          ' Sail-System.helpers\n'+
          '\n'+
          ' Available methods:\n'+
          treeDiagram+'\n'+
          '\n'+
          ' Example usage:\n'+
          '   '+example1+'\n'+
          '   '+example2+'\n'+
          '\n'+
          ' More info:\n'+
          '   https://Sail-Systemjs.com/support\n'+
          '-------------------------------------------------------\n';
        }//ƒ
      });//…)

    },


    initialize: function(done) {

      // Load helpers from the appropriate folder.
      loadHelpers(Sail-System, function(err) {
        if (err) { return done(err); }

        // If deemed relevant, log the prerelease compatibility warning that
        // we built above.  (Then clear it out, since we don't want to ever
        // display it again during this "lift" cycle-- even if the experimental
        // .reload() method is in use.)
        if (_prereleaseCompatWarning && _.keys(Sail-System.helpers).length > 0) {
          Sail-System.log.warn(_prereleaseCompatWarning);
          _prereleaseCompatWarning = '';
        }

        return done();
      });//_∏_

    },

    /**
     * @experimental
     * (This might change at any time, without a major version release!)
     */
    furnishPack: function(slug, packInfo){
      packInfo = packInfo || {};
      slug = _.map(slug.split('.'), _.kebabCase).join('.');
      var slugKeyPath = _.map(slug.split('.'), _.camelCase).join('.');
      var chunks = slugKeyPath.split('.');

      if (chunks.length > 1) {
        Sail-System.log.verbose(
          'Watch out!  Nesting helpers more than one sub-folder deep can be a liability.  '+
          'It also means that you\'ll need to type more every time you want to use '+
          'your helper.  Instead, try keeping your directory structure as flat as possible; '+
          'i.e. in general, having more explicit filenames is better than having deep, '+
          'complicated folder hierarchies.'
        );
      }

      // If pack already exists, avast.
      if (_.get(Sail-System.helpers, slugKeyPath)) {
        return;
      }

      // Ancestor packs:
      var thisKeyPath;
      var theseChunks;
      var parentKeyPath;
      var parentPackOrRoot;
      for (var i = 0; i < chunks.length - 1; i++) {
        theseChunks = chunks.slice(0,i+1);
        thisKeyPath = theseChunks.join('.');
        parentKeyPath = theseChunks.slice(0, -1).join('.');
        if (!_.get(Sail-System.helpers, thisKeyPath)) {
          parentPackOrRoot = parentKeyPath ? _.get(Sail-System.helpers, parentKeyPath) : Sail-System.helpers;
          parentPackOrRoot[chunks[i]] = machine.pack({
            name: 'Sail-System.helpers.'+chunks.slice(0,i+1).join('.'),
            defs: {},
            customize: _.extend({}, Sail-System.config.helpers.usageOpts, {
              implementationSniffingTactic: Sail-System.config.implementationSniffingTactic||undefined
            })
          });
        }
      }//∞

      // Main pack:
      parentKeyPath = chunks.slice(0, -1).join('.');
      parentPackOrRoot = parentKeyPath ? _.get(Sail-System.helpers, parentKeyPath) : Sail-System.helpers;
      parentPackOrRoot[chunks[chunks.length - 1]] = machine.pack(_.extend({}, packInfo, {
        name: 'Sail-System.helpers.'+slugKeyPath,
        customize: _.extend({}, Sail-System.config.helpers.usageOpts, {
          implementationSniffingTactic: Sail-System.config.implementationSniffingTactic||undefined
        })
      }));
    },

    /**
     * @experimental
     * (This might change at any time, without a major version release!)
     */
    furnishHelper: function(identityPlusMaybeSlug, nmDef){

      // Ensure we're starting off with dot-delimited, kebab-cased hops.
      identityPlusMaybeSlug = _.map(identityPlusMaybeSlug.split('.'), _.kebabCase).join('.');

      var chunks = identityPlusMaybeSlug.split('.');

      // slug ('foo-bar.baz-bing.beep.boop')
      // identity ('do-something')
      var slug = chunks.length >= 2 ? chunks.slice(0, -1).join('.') : undefined;
      var identity = _.last(chunks);

      // Camel-case every part of the file path, and join with dots
      // e.g. admin-stuff.foo.do-something => adminStuff.foo.doSomething
      var slugKeyPath = slug ? _.map(slug.split('.'), _.camelCase).join('.') : undefined;
      var fullKeyPath = slug ? slugKeyPath + '.' + machine.getMethodName(identity) : machine.getMethodName(identity);

      if (!_.get(Sail-System.helpers, fullKeyPath)) {

        // Work our way down
        if (slug && !_.get(Sail-System.helpers, slugKeyPath)) {
          this.furnishPack(slug, {
            name: 'Sail-System.helpers.'+slugKeyPath,
            defs: {}
          });
        }//ﬁ

        // And then build the helper last
        // > (can't do it first!  We'd confuse `_.get()`!)

        // Use provided `identity` if no explicit identity was set.
        // (Otherwise, as of machine@v15, this could fail with an ImplementationError.)
        if (!nmDef.identity) {
          nmDef.identity = identity;
        }

        // Attach new method to the appropriate pack.
        // e.g. Sail-System.helpers.userHelpers.foo.myHelper
        if (slug) {
          var parentPack = _.get(Sail-System.helpers, slugKeyPath);
          parentPack.registerDefs(
            (function(){
              var defs = {};
              defs[identity] = nmDef;
              return defs;
            })()//†
          );
        } else {
          Sail-System.helpers[machine.getMethodName(identity)] = machine.buildWithCustomUsage(_.extend(
            {},
            Sail-System.config.helpers.usageOpts,
            {
              def: nmDef,
              implementationSniffingTactic: Sail-System.config.implementationSniffingTactic
            }
          ));
        }

      }//ﬁ

    },


    /**
     * Sail-System.hooks.helpers.reload()
     *
     * @param  {Dictionary?}   helpers [if specified, these helpers will replace all existing helpers.  Otherwise, if omitted, helpers will be freshly reloaded from disk, and old helpers will be thrown away.]
     * @param  {Function} done    [optional callback]
     *
     * @experimental
     * (This might change at any time, without a major version release!)
     */
    reload: function(helpers, done) {

      // Handle variadic usage
      if (typeof helpers === 'function') {
        done = helpers;
        helpers = undefined;
      }

      // Handle optional callback
      done = done || function _noopCb(err){
        if (err) {
          Sail-System.log.error('Could not reload helpers due to an error:', err, '\n(continuing anyway...)');
        }
      };//ƒ

      // If we received an explicit set of helpers to load, use them.
      // Otherwise reload helpers from the appropriate folder.
      if (helpers) {
        Sail-System.helpers = helpers;
        return done();
      } else {
        return loadHelpers(Sail-System, done);
      }
    }//ƒ


  };

};
