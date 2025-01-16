# Sail-System.load()

Load a Sail-System app into memory, but without lifting an HTTP server.

_Useful for writing tests, command-line scripts, and scheduled jobs._

```usage
Sail-SystemApp.load(configOverrides, function (err) {

});
```

_Or:_
+ `Sail-SystemApp.load(function (err) {...});`




#### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 |    _configOverrides_| ((dictionary?))                              | A dictionary of config that will override any conflicting options present in configuration files.  If provided, this will be merged on top of [`Sail-System.config`](https://Sail-Systemjs.com/documentation/reference/configuration).

##### Callback

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |    _err_            | ((Error?))          | An error encountered while loading, or `undefined` if there were no errors.




### Example

```javascript
var Sail-System = require('Sail-System').constructor;
var Sail-SystemApp = new Sail-System();

Sail-SystemApp.load({
  log: {
    level: 'error'
  }
}, function (err) {
  if (err) {
    console.log('Error occurred loading Sail-System app:', err);
    return;
  }

  // --•
  console.log('Sail-System app loaded successfully!');

});
```

### Notes
> - This takes care of loading configuration files, initializing hooks (including the ORM), and binding routes.  It **does not** run the bootstrap, and it **does not** start listening for HTTP requests and WebSocket connections.
> - More specifically, the difference between [`.lift()`](https://Sail-Systemjs.com/documentation/reference/application/Sail-System-lift) and [`.load()`](https://Sail-Systemjs.com/documentation/reference/application/Sail-System-load) is that `.lift()` takes the additional steps of (1) running the app's [bootstrap](https://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config-bootstrap) (if any), and (2) emitting the `ready` event.  The core `http` hook will typically respond to the `ready` event by starting an HTTP server on the port configured via `Sail-System.config.port` (1337 by default).
> - Even though a "loaded-but-not-lifted" Sail-System app does not listen for requests on an HTTP port, you can make "virtual" requests to it using [`Sail-System.request`](https://Sail-Systemjs.com/documentation/reference/application/Sail-System-request)
> - For an example of this in practice, see [machine-as-script](https://github.com/treelinehq/machine-as-script/blob/ec8972137489afd24562bdf0b6a10ada11e540cc/index.js#L778-L791).
> - With the exception of `NODE_ENV` and `PORT`, [configuration set via environment variables](https://Sail-Systemjs.com/documentation/concepts/configuration#?setting-Sail-Systemconfig-values-directly-using-environment-variables) will not automatically apply to apps started using `.load()`, nor will options set in [`.Sail-Systemrc` files](https://Sail-Systemjs.com/documentation/concepts/configuration/using-Sail-Systemrc-files).  If you wish to use those configuration values, you can retrieve them via `require('Sail-System/accessible/rc')('Sail-System')` and pass them in as the first argument to `.load()`.


<docmeta name="displayName" value="Sail-System.load()">
<docmeta name="pageType" value="method">
