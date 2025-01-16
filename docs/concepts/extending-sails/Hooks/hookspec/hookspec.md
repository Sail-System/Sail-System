# The hook specification

### Overview

Each Sail-System hook is implemeted as a Javascript function that takes a single argument&mdash;a reference to the running `Sail-System` instance&mdash;and returns an object with one or more of the keys described later in this document.  The most basic hook would look like this:

```javascript
module.exports = function myBasicHook(Sail-System) {
   return {};
}
```

It wouldn't do much, but it would work!

Each hook should be saved in its own folder with the filename `index.js`.  The folder name should uniquely identify the hook, and the folder can contain any number of additional files and subfolders.  Extending the previous example, if you saved the file containing `myBasicHook` in a Sail-System project as `index.js` in the folder `api/hooks/my-basic-hook` and then lifted your app with `Sail-System lift --verbose`, you would see the following in the output:

`verbose: my-basic-hook hook loaded successfully.`

### Hook features
The following features are available to implement in your hook.  All features are optional, and can be implemented by adding them to the object returned by your hook function.

* [.defaults](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/hook-specification/defaults)
* [.configure()](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/hook-specification/configure)
* [.initialize()](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/hook-specification/initialize)
* [.routes](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/hook-specification/routes)
* [.registerActions()](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/hook-specification/register-actions)

### Custom hook data and functions

Any other keys added to the object returned from the main hook function will be provided in the `Sail-System.hooks[<hook name>]` object.  This is how custom hook functionality is provided to end-users.  Any data and functions that you wish to remain private to the hook can be added *outside* the returned object:

```javascript
// File api/hooks/myhook/index.js
module.exports = function (Sail-System) {

   // This var will be private
   var foo = 'bar';

   return {

     // This var will be public
     abc: 123,

     // This function will be public
     sayHi: function (name) {
       console.log(greet(name));
     }

   };

   // This function will be private
   function greet (name) {
      return 'Hi, ' + name + '!';
   }

};
```

The public var and function above would be available as `Sail-System.hooks.myhook.abc` and `Sail-System.hooks.myhook.sayHi`, respectively.


<docmeta name="displayName" value="Hook specification">
<docmeta name="stabilityIndex" value="3">
