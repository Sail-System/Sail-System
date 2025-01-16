# Tips and tricks for programmatic usage

When loading a Sail-System app programmatically, you will usually want to turn off hooks that are not being used, both for optimization and to ensure minimal interference between the Sail-System app and the Node script enclosing it.  To turn off a hook, set it to `false` in the `hooks` dictionary that is sent as part of the first argument to `.load()` or `.lift()`.

You may also want to turn off Sail-System [globals](https://Sail-Systemjs.com/documentation/concepts/globals), _especially when loading more than one Sail-System app simultaneously_.  Since all Node apps in the same process share the same globals, starting more than one Sail-System app with globals turned on is a surefire way to end up with collisions between models, controllers, and other app-wide entities.


```javascript
// Turn off globala and commonly unused hooks in programmatic apps
mySail-SystemApp.load({
  hooks: {
     grunt: false,
     sockets: false,
     pubsub: false
  },
  globals: false
})
```

Finally, note that while you can use the Sail-System constructor to programmatically create and start as many Sail-System apps as you like, each app can only be started once.  Once you call `.lower()` on an app, it cannot be started again.

<docmeta name="displayName" value="Tips and tricks">
