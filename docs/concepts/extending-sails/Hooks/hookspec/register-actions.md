# `.registerActions()`

If your hook adds new actions to an app, and you want to guarantee that those actions will be maintained even after a call to [`Sail-System.reloadActions()`](https://Sail-Systemjs.com/documentation/reference/application/Sail-System-reload-actions), you should register the actions from within a `registerActions` method.

For example, the core Sail-System security hook registers the [`grant-csrf-token` action](https://Sail-Systemjs.com/documentation/concepts/security/csrf#?using-ajax-websockets) from within a `registerActions()` method.

`registerActions` should be implemented as a function with a single argument (a callback) to be called after the hook is done adding actions.  In the interest of avoiding duplicate code, you may want to call this method yourself from within the hook&rsquo;s [`initialize()` method]((https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/hook-specification/initialize)).

```
registerActions: function(cb) {

  // Register an action as `myhook/greet` that an app can bind to any route they like.
  Sail-System.registerAction(function greet(req, res) {
    var name = req.param('name') || 'stranger';
    return res.status(200).send('Hey there, ' + name + '!');
  }, 'myhook/greet');

  return cb();

}
```

<docmeta name="displayName" value=".registerActions()">
<docmeta name="stabilityIndex" value="3">
