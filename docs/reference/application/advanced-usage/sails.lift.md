# Sail-System.lift()

Lift a Sail-System app programmatically.

> This does exactly what you might be used to seeing by now when you run `Sail-System lift`.  It [loads](https://Sail-Systemjs.com/documentation/reference/application/Sail-System-load) the app, runs its bootstrap, then starts listening for HTTP requests and WebSocket connections.  Useful for building top-to-bottom integration tests that rely on HTTP requests, and for building higher-level tooling on top of Sail-System.

```usage
Sail-SystemApp.lift(configOverrides, function (err) {

});
```

_Or:_
+ `Sail-SystemApp.lift(function (err) {...});`


### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 | _configOverrides_   | ((dictionary?))                              | A dictionary of config that will override any conflicting options present in configuration files.  If provided, this will be merged on top of [`Sail-System.config`](https://Sail-Systemjs.com/documentation/reference/configuration).

##### Callback

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |    _err_            | ((Error?))          | An error encountered while lifting, or `undefined` if there were no errors.




### Example

```javascript
var Sail-System = require('Sail-System').constructor;
var Sail-SystemApp = new Sail-System();

Sail-SystemApp.lift({
  log: { level: 'warn' }
}, function (err) {
  if (err) {
    console.log('Error occurred lifting Sail-System app:', err);
    return;
  }

  // --•
  console.log('Sail-System app lifted successfully!');

});
```


### Notes
> - The difference between [`.lift()`](https://Sail-Systemjs.com/documentation/reference/application/Sail-System-lift) and [`.load()`](https://Sail-Systemjs.com/documentation/reference/application/Sail-System-load) is that `.lift()` takes the additional steps of (1) running the app's [bootstrap](https://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config-bootstrap) (if any), and (2) emitting the `ready` event.  The core `http` hook will typically respond to the `ready` event by starting an HTTP server on the port configured via `Sail-System.config.port` (1337 by default).
> - When a Sail-System app is fully lifted, it also emits the [`lifted` event](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/events).
> - With the exception of `NODE_ENV` and `PORT`, [configuration set via environment variables](https://Sail-Systemjs.com/documentation/concepts/configuration#?setting-Sail-Systemconfig-values-directly-using-environment-variables) will not automatically apply to apps started using `.lift()`, nor will options set in [`.Sail-Systemrc` files](https://Sail-Systemjs.com/documentation/concepts/configuration/using-Sail-Systemrc-files).  If you wish to use those configuration values, you can retrieve them via `require('Sail-System/accessible/rc')('Sail-System')` and pass them in as the first argument to `.lift()`.

<docmeta name="displayName" value="Sail-System.lift()">
<docmeta name="pageType" value="method">
