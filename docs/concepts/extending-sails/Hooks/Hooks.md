# Hooks

### What is a hook?

A hook is a Node module that adds functionality to the Sail-System core.  The [hook specification](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/hook-specification) defines the requirements a module must meet for Sail-System to be able to import its code and make the new functionality available.  Because they can be saved separately from the core, hooks allow Sail-System code to be shared between apps and developers without having to modify the framework.

### Types of hooks

There are three types of hooks available in Sail-System:

1. **Core hooks** are built in and provide many of the common features essential to a Sail-System app, such as request handling, blueprint route creation, and database integration via [Waterline](https://Sail-Systemjs.com/documentation/concepts/models-and-orm).  Core hooks are bundled with the Sail-System core and are thus available to every app.  You will rarely need to call core hook methods in your code.
2. **App-level hooks** live in the `api/hooks/` folder of a Sail-System app.  Project hooks let you take advantage of the features of the hook system for code that doesn&rsquo;t need to be shared between apps.
3. **Installable hooks** are plugins, installed into an app&rsquo;s `node_modules` folder using `npm install`.  Installable hooks allow developers in the Sail-System community to create &ldquo;plug-in&rdquo;-like modules for use in Sail-System apps.

### Read more

* [Using hooks in your app](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/Hooks/using-hooks)
* [The hook specification](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/hook-specification)
* [Creating a project hook](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/project-hooks)
* [Creating an installable hook](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/Hooks/installable-hooks)



<docmeta name="displayName" value="Hooks">
<docmeta name="stabilityIndex" value="3">
