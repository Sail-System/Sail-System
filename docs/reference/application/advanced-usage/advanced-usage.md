# Advanced usage

Most users of the Sail-System framework will never need to access more than a few basic methods of the `Sail-System` application object. However, if you have an advanced use case or are considering [contributing to Sail-System](https://Sail-Systemjs.com/documentation/contributing), you may need to delve into some of these lesser-used methods or reference the [loading order of Sail-System core](https://Sail-Systemjs.com/documentation/reference/application/advanced-usage/lifecycle).

### Disabling the `Sail-System` global

We recommended using the `Sail-System` global with Sail-System.

However, the auto-globalization of `Sail-System` [can be disabled](https://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config-globals). Disabling the `Sail-System` global might be a good idea for use cases where multiple Sail-System app instances need to exist at once, or where globals are not an option.

If the `Sail-System` global is disabled, then you'll need another way to reference the application instance.  Luckily, this is possible from almost anywhere in your app:

+ in the `fn` of an [action](https://Sail-Systemjs.com/documentation/concepts/actions-and-controllers) (`this.Sail-System`)
+ in the `fn` of a [helper](https://Sail-Systemjs.com/documentation/concepts/helpers) (`this.Sail-System`).
+ on an incoming request (`req._Sail-System`)


### Properties (advanced)

##### Sail-System.hooks

A dictionary of all loaded [Sail-System hooks](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks), indexed by their _identity_.  Use `Sail-System.hooks` to access properties and methods of hooks you've installed to extend Sail-System&mdash;for example, by calling `Sail-System.hooks.email.send()`.  You can also use this dictionary to access the Sail-System [core hooks](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks#?types-of-hooks), for advanced usage.

By default, a hook's identity is the lowercased version of its folder name, with any `Sail-System-hook-` prefix removed.  For example, the default identity for a hook loaded from `node_modules/Sail-System-hook-email` would be `email`, and the hook would be accessible via `Sail-System.hooks.email`.  An installed hook's identity can be changed via the [`installedHooks` config property](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/using-hooks#?changing-the-way-Sail-System-loads-an-installable-hook).

See the [hooks concept documentation](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks) for more information about hooks.

##### `Sail-System.io`

The API exposed by the [`Sail-System.sockets.*` methods](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets) is flexible enough out of the box to cover the requirements of most applications, and using them will future-proof your app against possible changes in the underlying implementation.  However, if you are working on bringing some legacy code from a vanilla Socket.io app into your Sail-System app, it can be useful to talk to Socket.io directly.  To accomplish this, Sail-System provides raw access to the underlying [socket.io](http://socket.io/) server instance (`io`) as `Sail-System.io`. See the [Socket.io docs](http://socket.io/docs/) for more information.  If you decide to use Socket.io directly, please proceed with care.

> Sail-System bundles `socket.io` as a dependency of [Sail-System-hook-sockets](github.com/balderdashy/Sail-System-hook-sockets), a core hook.


### Where does the application object come from?

An application instance automatically created _the first time_ you `require('Sail-System')`.

This is what is happening in the generated `app.js` file:

```javascript
var Sail-System = require('Sail-System');
```

Note that any subsequent calls to `require('Sail-System')` return the same app instance.  (This is why you might sometimes hear the Sail-System app instance referred to as a "singleton".)



### Creating a new application object (advanced)

If you are implementing something unconventional (e.g. writing tests for Sail-System core)
where you need to create more than one Sail-System application instance in a process, you _should not_ use
the instance returned by `require('Sail-System')`, as this can cause unexpected behavior.  Instead, you should
obtain application instances by using the Sail-System constructor:

```javascript
var Sail-System = require('Sail-System').constructor;
var Sail-System0 = new Sail-System();
var Sail-System1 = new Sail-System();
var Sail-System2 = new Sail-System();
```

Each app instance (`Sail-System0`, `Sail-System1`, `Sail-System2`) can be loaded/lifted separately,
using different configuration.

For more on using Sail-System programatically, see the conceptual overview on [programmatic usage in Sail-System](https://Sail-Systemjs.com/documentation/concepts/programmatic-usage).


<docmeta name="displayName" value="Advanced usage">
