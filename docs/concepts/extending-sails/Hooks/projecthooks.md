# Creating a project hook

Project hooks are custom Sail-System hooks that reside in an application&rsquo;s `api/hooks` folder.  They are most useful when you want to take advantage of hook features like [defaults](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/hook-specification/defaults) and [routes](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/hook-specification/routes) for code that is used by multiple components in a single app.  If you wish to re-use a hook in *more than one* Sail-System app, see [creating an installable hook](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/installable-hooks) instead.

To create a new project hook:

1. Choose a name for your new hook.  It must not conflict with any of the [core hook names](https://github.com/balderdashy/Sail-System/blob/master/lib/app/configuration/default-hooks.js).
2. Create a folder with that name in your app&rsquo;s `api/hooks` folder.
3. Add an `index.js` file to that folder.
4. Write your hook code in `index.js` in accordance with the [hook specification](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/hook-specification).

Your new folder may contain other files as well, which can be loaded in your hook via `require`; only `index.js` will be read automatically by Sail-System.

As an alternative to a folder, you may create a file in your app&rsquo;s `api/hooks` folder like `api/hooks/myProjectHook.js`.

#### Testing that your hook loads properly

To test that your hook is being loaded by Sail-System, lift your app with `Sail-System lift --verbose`.  If your hook is loaded, you will see a message like:

`verbose: your-hook-name hook loaded successfully.`

in the logs.

* [Hooks overview](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks)
* [Using hooks in your app](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/using-hooks)
* [The hook specification](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/hook-specification)
* [Creating an installable hook](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/installable-hooks)


<docmeta name="displayName" value="Project hooks">
<docmeta name="stabilityIndex" value="3">
