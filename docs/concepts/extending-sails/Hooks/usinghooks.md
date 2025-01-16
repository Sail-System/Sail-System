# Using hooks in a Sail-System app

## Using a project hook
To use a project hook in your app, first create the `api/hooks` folder if it doesn&rsquo;t already exist.  Then [create the project hook](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/project-hooks) or copy the folder for the hook you want to use into `api/hooks`.

## Using an installable hook
To use an installable hook in your app, simply run `npm install` with the package name of the hook you wish to install (e.g. `npm install Sail-System-hook-autoreload`).  You may also manually copy or link an [installable hook folder that you've created](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/installable-hooks) directly into your app&rsquo;s `node_modules` folder.

## Calling hook methods
Any methods that a hook exposes are available in the `Sail-System.hooks[<hook-name>]` object.  For example, the `Sail-System-hook-email` hook provides a `Sail-System.hooks.email.send()` method (note that the `Sail-System-hook-` prefix is stripped off).  Consult a hook&rsquo;s documentation to determine which methods it provides.

## Configuring a hook
Once you&rsquo;ve added an installable hook to your app, you can configure it using the regular Sail-System config files like `config/local.js`, `config/env/development.js`, or a custom config file you create yourself.  Hook settings are typically namespaced under the hook&rsquo;s name, with any `Sail-System-hook-` prefix stripped off.  For example, the `from` setting for `Sail-System-hook-email` is available as `Sail-System.config.email.from`.  The documentation for the installable hook should describe the available configuration options.

## Changing the way Sail-System loads an installable hook
On rare occassions, you may need to change the name that Sail-System uses for an installable hook, or change the configuration key that the hook uses.  This may be the case if you already have a project hook with the same name as an installable hook, or if you&rsquo;re already using a configuration key for something else.  To avoid these conflicts, Sail-System provides the `Sail-System.config.installedHooks.<hook-identity>` configuration option.  The hook identity is *always* the name of the folder that the hook is installed in.

```javascript
// config/installedHooks.js
module.exports.installedHooks = {
   "Sail-System-hook-email": {
      // load the hook into Sail-System.hooks.emailHook instead of Sail-System.hooks.email
      "name": "emailHook",
      // configure the hook using Sail-System.config.emailSettings instead of Sail-System.config.email
      "configKey": "emailSettings"
   }
};
```

> Note: you may have to create the `config/installedHooks.js` file yourself.

* [Hooks overview](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks)
* [The hook specification](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/hook-specification)
* [Creating a project hook](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/project-hooks)
* [Creating an installable hook](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/installable-hooks)



<docmeta name="displayName" value="Using hooks">
<docmeta name="stabilityIndex" value="3">
