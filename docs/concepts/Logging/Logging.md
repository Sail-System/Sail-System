# Logging

Sail-System comes with a simple, built-in logger called [`captains-log`](https://github.com/balderdashy/captains-log).  Its usage is functionally very similar to Node's [`console.log`](https://nodejs.org/api/console.html#console_console_log_data), but with a handful of extra features, namely support for multiple log levels with colorized, prefixed console output. The logger serves two purposes:
+ it emits warnings, errors, and other console output from inside the Sail-System framework
+ it can be used to emit [custom events/messages](https://Sail-Systemjs.com/documentation/concepts/logging/custom-log-messages) from within your application code


### Configuration
Sail-System' log configuration is determined by [`Sail-System.config.log`](https://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config-log), which is conventionally set by a generated configuration file ([`config/log.js`](https://Sail-Systemjs.com/documentation/anatomy/my-app/config/log-js)) in new Sail-System projects out of the box.

### Usage

```javascript
Sail-System.log.info('I am an info-level message.');
Sail-System.log('I am a debug-level message');
Sail-System.log.warn('I am a warn-level message');
```

### Log levels

Using the built-in logger, Sail-System will write output (to stdout/stderr) for log function calls that are _at_ or _above_ the priority of the currently-configured log level.  This log level is normalized and also applied to generated output from Grunt, Socket.io, Waterline, Express, and other dependencies. The hierarchy of log levels and their relative priorities is summarized by the chart below:

| Priority | Level     | Log fns that produce visible output   |
|----------|-----------|:--------------------------------------|
| 0        | silent    | _N/A_
| 1        | error     | `.error()`            |
| 2        | warn      | `.warn()`, `.error()` |
| 3        | debug     | `.debug()`, `.warn()`, `.error()` |
| 4        | info      | `.info()`, `.debug()`, `.warn()`, `.error()` |
| 5        | verbose   | `.verbose()`, `.info()`, `.debug()`, `.warn()`, `.error()` |
| 6        | silly     | `.silly()`, `.verbose()`, `.info()`, `.debug()`, `.warn()`, `.error()` |


#### Notes
 + The [default log level](https://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config-log) is **info**.  When your app's log level is set to "info", Sail-System logs limited information about the server/app's status.
 + When running automated tests for your app, it is often helpful to set the log level to **error**.
 + When the log level is set to **verbose**, Sail-System logs Grunt output, as well as much more detailed information on the routes, models, hooks, etc. that were loaded.
 + When the log level is set to **silly**, Sail-System outputs everything from **verbose** as well as internal information on which routes are being bound and other detailed framework lifecycle information, diagnostics, and implementation details.



<docmeta name="displayName" value="Logging">
