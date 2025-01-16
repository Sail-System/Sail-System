# `Sail-System.config.views`

Configuration for your app's server-side [views](https://Sail-Systemjs.com/documentation/concepts/Views).  The options are conventionally specified in the [`config/views.js`](https://Sail-Systemjs.com/documentation/anatomy/config/views.js) configuration file.


### Properties

| Property    | Type       | Default   | Details |
|:------------|:----------:|:----------|:--------|
| `layout`    | ((string)) -or- ((boolean))     | `"layout"`  | Set the default [layout](https://Sail-Systemjs.com/documentation/concepts/views/layouts) for your app by specifying the relative path to the desired layout file from your views folder (i.e. `views/`), or disable layout support altogether with `false`.  Built-in support for layouts is only relevant when using `ejs` (see below).
| `extension` | ((string)) | "ejs" | The file extension for view files. |
| `getRenderFn` | ((function)) | none | A function that Sail-System will call to get the rendering function for your desired view engine.  See the [view engine documentation](http://Sail-Systemjs.com/documentation/concepts/views/view-engines) for more info about specifying a `getRenderFn` value.  If this setting is undefined, Sail-System will use the built-in EJS renderer.
| `locals`    | ((dictionary)) | `{}` | Default data to be included as [view locals](http://Sail-Systemjs.com/documentation/concepts/views/locals) every time a server-side view is compiled anywhere in this app.  If an optional `locals` argument was passed in directly via `res.view()`, its properties take precedence when both dictionaries are merged and provided to the view (more on that below). |

### Notes

> + If your app is NOT using `ejs` (the default view engine) Sail-System will function as if the `layout` option was set to `false`.  To take advantage of layouts when using a custom view engine like Jade or Handlebars, check out [that view engine's documentation](https://Sail-Systemjs.com/documentation/concepts/views/view-engines) to find the appropriate syntax.
> + As of Sail-System 0.12.0, app-wide locals from `Sail-System.config.views.locals` are combined with any one-off locals you use with `res.view()` using a **shallow merge strategy**.  That is, if your app-wide locals configuration is `{foo: 3, bar: { baz: 'beep' } }`, and then you use `res.view({bar: 'boop'})`, your view will have access to `foo` (`3`) and `bar` (`'boop'`).




<docmeta name="displayName" value="Sail-System.config.views">
<docmeta name="pageType" value="property">


