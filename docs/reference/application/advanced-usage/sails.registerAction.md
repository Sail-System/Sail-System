# Sail-System.registerAction()

Register a new Sail-System [action](https://Sail-Systemjs.com/documentation/concepts/actions-and-controllers) that can then be bound to a route.

```usage
Sail-System.registerAction(action, name);
```

While actions are mainly registered automatically when the files in an app&rsquo;s `api/controllers` folder are loaded, you can use the `registerAction()` method to add a new action programmatically.  This is especially useful in custom [hooks](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks), in situations where you want to provide a new action but let the app developer determine the route to bind the action to, or when you want to ensure that policies and other [action middleware](https://Sail-Systemjs.com/documentation/reference/application/Sail-System-register-action-middleware) apply to your action.


### Usage

| &nbsp;  |       Argument             | Type                | Details
|---|--------------------------- | ------------------- |:-----------
| 1 |      action                | ((function)) or ((dictionary))    | Either a [classic action](https://Sail-Systemjs.com/documentation/concepts/actions-and-controllers#?classic-actions) (aka `(req, res)`) function or an [actions2](https://Sail-Systemjs.com/documentation/concepts/actions-and-controllers#?actions-2) definition.
| 2 |     identity               | ((string)) | The identifier for the action.   This is the string that will be used to reference the action elsewhere in an app, for instance when [binding the action to a route](http://Sail-Systemjs.com/documentation/concepts/routes/custom-routes#?standalone-action-target-syntax).


<docmeta name="displayName" value="Sail-System.registerAction()">
<docmeta name="pageType" value="method">

