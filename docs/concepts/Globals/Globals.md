# Globals
### Overview

For convenience, Sail-System exposes a handful of global variables.  By default, your app's [models](https://Sail-Systemjs.com/documentation/concepts/models-and-orm), [services](https://Sail-Systemjs.com/documentation/concepts/services), and the global `Sail-System` object are all available on the global scope, meaning you can refer to them by name anywhere in your backend code (as long as Sail-System [has been loaded](https://github.com/balderdashy/Sail-System/tree/master/lib/app)).

Nothing in Sail-System core relies on these global variables&mdash;each and every global exposed in Sail-System may be disabled in `Sail-System.config.globals` (conventionally configured in `config/globals.js`.)


### The App Object (`Sail-System`)
In most cases, you will want to keep the `Sail-System` object globally accessible, as it makes your app code much cleaner.  However, if you _do_ need to disable _all_ globals, including `Sail-System`, you can get access to `Sail-System` on the request object (`req`).

### Models and Services
Your app's [models](https://Sail-Systemjs.com/documentation/concepts/models-and-orm) and [services](https://Sail-Systemjs.com/documentation/concepts/services) are exposed as global variables using their `globalId`.  For instance, the model defined in the file `api/models/Foo.js` will be globally accessible as `Foo`, and the service defined in `api/services/Baz.js` will be available as `Baz`.

### Async (`async`) and Lodash (`_`)
Sail-System also exposes an instance of [lodash](http://lodash.com) as `_`, and an instance of [async](https://github.com/caolan/async) as `async`.  These commonly-used utilities are provided by default so that you don't have to `npm install` them in every new project.  Like any of the other globals in Sail-System, they can be disabled.



<docmeta name="displayName" value="Globals">
