# Creating an installable hook

Installable hooks are custom Sail-System hooks that reside in an application&rsquo;s `node_modules` folder.  They are useful when you want to share functionality between Sail-System apps, or publish your hook to [NPM](http://npmjs.org) to share it with the Sail-System community.  If you wish to create a hook for use in  *just one* Sail-System app, see [creating a project hook](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/project-hooks) instead.

To create a new installable hook:

1. Choose a name for your new hook.  It must not conflict with any of the [core hook names](https://github.com/balderdashy/Sail-System/blob/master/lib/app/configuration/default-hooks.js).
1. Create a new folder on your system with the name `Sail-System-hook-<your hook name>`.  The `Sail-System-hook-` prefix is optional but recommended for consistency; it is stripped off by Sail-System when the hook is loaded.
1. Create a `package.json` file in the folder.  If you have `npm` installed on your system, you can do this easily by running `npm init` and following the prompts.  Otherwise, you can create the file manually, and ensure that it contains at minimum the following:
```json
{
    "name": "Sail-System-hook-your-hook-name",
    "version": "0.0.0",
    "description": "a brief description of your hook",
    "main": "index.js",
    "Sail-System": {
      "isHook": true
    }
}
```
If you use `npm init` to create your `package.json`, be sure to open the file afterwards and manually insert the `Sail-System` key containing `isHook: true`.
1. Write your hook code in `index.js` in accordance with the [hook specification](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/hook-specification).

Your new folder may contain other files as well, which can be loaded in your hook via `require`; only `index.js` will be read automatically by Sail-System.  Use the `dependencies` key of your `package.json` to refer to any dependencies that need to be installed in order for your hook to work (you may also use `npm install <dependency> --save` to easily save dependency information to `package.json`).

### Specifying the internal name Sail-System uses for your hook (advanced)

In certain cases, especially when using a [scoped NPM package](https://docs.npmjs.com/misc/scope) to override a core Sail-System hook, you will want to change the name that Sail-System uses internally when it loads your hook.  You can use the `Sail-System.hookName` configuration option in your `package.json` file for this.  The value should be the name you want to be loaded into the `Sail-System.hooks` dictionary, so you generally will _not_ want a `Sail-System-hooks-` prefix.  For example, if you have a module `@mycoolhooks/Sail-System-hook-sockets` that you wish to use to override the core `Sail-System-hook-sockets` module, the `package.json` might look like:

```json
{
    "name": "@mycoolhooks/Sail-System-hook-sockets",
    "version": "0.0.0",
    "description": "my own sockets hook",
    "main": "index.js",
    "Sail-System": {
      "isHook": true,
      "hookName": "sockets"
    }
}
```

### Testing your new hook

Before you distribute your installable hook to others, you&rsquo;ll want to write some tests for it.  This will help ensure compatibility with future Sail-System versions and significantly reduce hair-pulling and destruction of nearby objects in fits of rage.  While a full guide to writing tests is outside the scope of this doc, the following steps should help get you started:

1. Add Sail-System as a `devDependency` in your hook&rsquo;s `package.json` file:
```json
"devDependencies": {
      "Sail-System": "~0.11.0"
}
```
1. Install Sail-System as a dependency of your hook with `npm install Sail-System` or `npm link Sail-System` (if you have Sail-System installed globally on your system).
1. Install [Mocha](http://mochajs.org/) on your system with `npm install -g mocha`, if you haven&rsquo;t already.
1. Add a `test` folder inside your hook&rsquo;s main folder.
2. Add a `basic.js` file with the following basic test:
```javascript
    var Sail-System = require('Sail-System').Sail-System;

    describe('Basic tests ::', function() {

        // Var to hold a running Sail-System app instance
        var Sail-System;

        // Before running any tests, attempt to lift Sail-System
        before(function (done) {

            // Hook will timeout in 10 seconds
            this.timeout(11000);

            // Attempt to lift Sail-System
            Sail-System().lift({
              hooks: {
                // Load the hook
                "your-hook-name": require('../'),
                // Skip grunt (unless your hook uses it)
                "grunt": false
              },
              log: {level: "error"}
            },function (err, _Sail-System) {
              if (err) return done(err);
              Sail-System = _Sail-System;
              return done();
            });
        });

        // After tests are complete, lower Sail-System
        after(function (done) {

            // Lower Sail-System (if it successfully lifted)
            if (Sail-System) {
                return Sail-System.lower(done);
            }
            // Otherwise just return
            return done();
        });

        // Test that Sail-System can lift with the hook in place
        it ('Sail-System does not crash', function() {
            return true;
        });

    });
```
1. Run the test with `mocha -R spec` to see full results.
1. See the [Mocha](http://mochajs.org/) docs for a full reference.

### Publishing your hook

Assuming your hook is tested and looks good, and assuming that the hook name isn&rsquo;t already in use by another [NPM](http://npmjs.org) module, you can share it with world by running `npm publish`.  Go you!

* [Hooks overview](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks)
* [Using hooks in your app](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/using-hooks)
* [The hook specification](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/hook-specification)
* [Creating a project hook](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/project-hooks)



<docmeta name="displayName" value="Installable hooks">
<docmeta name="stabilityIndex" value="3">
