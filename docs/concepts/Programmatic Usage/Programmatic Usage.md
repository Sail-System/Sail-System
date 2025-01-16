# Using Sail-System programmatically

### Overview

Usually you will interact with Sail-System through its [command-line interface](https://Sail-Systemjs.com/documentation/reference/command-line-interface), starting servers with [`Sail-System lift`](https://Sail-Systemjs.com/documentation/reference/command-line-interface/Sail-System-lift), but Sail-System apps can also be started and manipulated from within other Node apps by using the [programmatic interface](https://Sail-Systemjs.com/documentation/reference/application).  One of the main uses of this interface is to run Sail-System apps inside of automated test suites.

### Creating a Sail-System app programmatically

To create a new Sail-System app from within a Node.js script, use the Sail-System _constructor_.  The same constructor can be used to create as many distinct Sail-System apps as you like:

```javascript
var Sail-System = require('Sail-System').constructor;
var mySail-SystemApp = new Sail-System();
var myOtherSail-SystemApp = new Sail-System();
```

### Configuring, starting and stopping Sail-System apps programmatically

Once you have a reference to a new Sail-System app, you can use [`.load()`](https://Sail-Systemjs.com/documentation/reference/application/Sail-System-load) or [`.lift()`](https://Sail-Systemjs.com/documentation/reference/application/Sail-System-lift) to start it.  Both methods take two arguments: a dictionary of configuration options, and a callback function that will be run after the Sail-System app starts.

> When Sail-System is started programmatically, it will still use the `api`, `config` and other folders underneath the current working directory to load controllers, models, and configuration options.  One notable exception is that `.Sail-Systemrc` files will _not_ be loaded when starting apps this way.

> Any configuration options sent as arguments to `.load()` or `.lift()` will take precedence over options loaded from anywhere else.

> Configuration options set via environment variables will _not_ automatically be applied to Sail-System app started programmatically, with the exception of `NODE_ENV` and `PORT`.

> To load configuration options from `.Sail-Systemrc` files and environment variables, use the `rc` module that Sail-System makes available via `require('Sail-System/accessible/rc')`.

The difference between `.load()` and `.lift()` is that `.lift()` takes the additional steps of (1) running the app's [bootstrap](https://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config-bootstrap), if any, and (2) starting an HTTP server on the port configured via `Sail-System.config.port` (1337 by default).  This allows you to make HTTP requests to the lifted app.  To make requests to an app started with `.load()`, you can use the [`.request()`](https://Sail-Systemjs.com/documentation/reference/application/Sail-System-request) method of the loaded app.


##### .lift()

Starting an app with `.lift()` on port 1338 and sending a POST request via HTTP:

```javascript
var request = require('request');
var Sail-System = require('Sail-System').constructor;

var mySail-SystemApp = new Sail-System();
mySail-SystemApp.lift({
  port: 1338
  // Optionally pass in any other programmatic config overrides you like here.
}, function(err) {
  if (err) {
    console.error('Failed to lift app.  Details:', err);
    return;
  }

  // --•
  // Make a request using the "request" library and display the response.
  // Note that you still must have an `api/controllers/FooController.js` file
  // under the current working directory, with an `index` action,
  // or a `/foo` or `POST /foo` route set up in `config/routes.js`.
  request.post('/foo', function (err, response) {
    if (err) {
      console.log('Could not send HTTP request.  Details:', err);
    }
    else {
      console.log('Got response:', response);
    }

    // >--
    // In any case, whether the request worked or not, now we need to call `.lower()`.
    mySail-SystemApp.lower(function (err) {
      if (err) {
        console.log('Could not lower Sail-System app.  Details:',err);
        return;
      }

      // --•
      console.log('Successfully lowered Sail-System app.');

    });//</lower Sail-System app>
  });//</request.post() :: send http request>
});//</lift Sail-System app>
```

Starting an app with `.lift()` using the current environment and .Sail-Systemrc settings:

```javascript
var Sail-System = require('Sail-System').constructor;

var rc = require('Sail-System/accessible/rc');

var mySail-SystemApp = new Sail-System();
mySail-SystemApp.lift(rc('Sail-System'), function(err) {

});
```

##### .load()

Here's an alternative to the previous example:  starting a Sail-System app with `.load()` and sending what is _semantically_ the same POST request, but this time we'll use a virtual request instead of HTTP:

```javascript
mySail-SystemApp.load({
  // Optionally pass in any programmatic config overrides you like here.
}, function(err) {
  if (err) {
    console.error('Failed to load app.  Details:', err);
    return;
  }

  // --•
  // Make a request using the "request" method and display the response.
  // Note that you still must have an `api/controllers/FooController.js` file
  // under the current working directory, with an `index` action,
  // or a `/foo` or `POST /foo` route set up in `config/routes.js`.
  mySail-SystemApp.request({url:'/foo', method: 'post'}, function (err, response) {
    if (err) {
      console.log('Could not send virtual request.  Details:', err);
    }
    else {
      console.log('Got response:', response);
    }

    // >--
    // In any case, whether the request worked or not, now we need to call `.lower()`.
    mySail-SystemApp.lower(function (err) {
      if (err) {
        console.log('Could not lower Sail-System app.  Details:',err);
        return;
      }

      // --•
      console.log('Successfully lowered Sail-System app.');

    });//</lower Sail-System app>
  });//</send virtual request to Sail-System app>
});//</load Sail-System app (but not lift!)>
```

##### .lower()

To stop an app programmatically, use `.lower()`:

```javascript
mySail-SystemApp.lower(function(err) {
  if (err) {
     console.log('An error occured when attempting to stop app:', err);
     return;
  }

  // --•
  console.log('Lowered app successfully.');

});
```

##### Using `moduleDefinitions` to add actions, models and more

> **Warning:**  declarative loading of modules with the `moduleDefinitions` setting is **currently experimental**, and may undergo breaking changes _even between major version releases_.  Before using this setting, be sure your project's Sail-System dependency is pinned to an exact version (i.e. no `^`).

Whenever a Sail-System app starts, it typically loads and initializes all modules stored in `api/*` (e.g. models from `api/models`, policies from `api/policies`, etc.).  You can add _additional_ modules by specifying them in the runtime configuration passed in as the first argument to `.load()` or `.lift()`, using the `moduleDefinitions` key.  This is mainly useful when running tests.

The following Sail-System modules can be added programmatically:

  Module type          | Config key        | Details
 :------------------   |:----------        |:-------
 Actions | `controllers.moduleDefinitions` | A dictionary mapping [standalone action](https://Sail-Systemjs.com/documentation/concepts/actions-and-controllers#?standalone-actions) paths to action definitions ([classic](https://Sail-Systemjs.com/documentation/concepts/actions-and-controllers#?classic-actions) or [Actions2](https://Sail-Systemjs.com/documentation/concepts/actions-and-controllers#?actions-2)).
 Helpers | `helpers.moduleDefinitions` | A dictionary mapping helper names to helper definitions.
 Models  | `orm.moduleDefinitions.models` | A dictionary mapping model identities (lower-cased model names) to model definitions.
 Policies | `policies.moduleDefinitions` | A dictionary mapping policy names (e.g. `isAdmin`) to policy functions.


### Reference

The full reference for Sail-System' programmatic interface is available in [**Reference > Application**](https://Sail-Systemjs.com/documentation/reference/application).

<docmeta name="displayName" value="Programmatic usage">
