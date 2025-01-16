# Disabling globals

Sail-System determines which globals to expose by looking at [`Sail-System.config.globals`](https://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config-globals), which is conventionallly configured in [`config/globals.js`](https://Sail-Systemjs.com/documentation/anatomy/config/globals.js).

To disable all global variables, just set the setting to `false`:

```js
// config/globals.js
module.exports.globals = false;
```

To disable _some_ global variables, specify an object instead, e.g.:

```js
// config/globals.js
module.exports.globals = {
  _: false,
  async: false,
  models: false,
  services: false
};
```

### Notes

> + Bear in mind that none of the globals, including `Sail-System`, are accessible until _after_ Sail-System has loaded.  In other words, you won't be able to use `Sail-System.models.user` or `User` outside of a function (since `Sail-System` will not have finished loading yet.)

<!-- not true anymore:
Most of this section of the docs focuses on the methods and properties of `Sail-System`, the singleton object representing your app.
-->

<docmeta name="displayName" value="Disabling globals">
