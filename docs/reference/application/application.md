# Application (`Sail-System`)

The Sail-System application object contains all relevant runtime state for a Sail-System application.
By default, it is exposed globally as `Sail-System` and accessible almost anywhere in your code.

> Most users of the framework will only need to know about the `Sail-System` application object in order to access a few basic methods and their custom configuration. Less commonly used methods can be found in the [advanced usage](https://Sail-Systemjs.com/documentation/reference/application/advanced-usage) section.


### Properties

The application object has a number of useful methods and properties.
The officially supported methods on the `Sail-System` object are covered by the other
pages in this section.  Here are a few of its most useful properties:

##### Sail-System.models

A dictionary of all loaded [Sail-System models](https://Sail-Systemjs.com/documentation/concepts/models-and-orm/models), indexed by their _identity_.

By default, a model's identity is the lowercased version of its filename, without the **.js** extension.  For example, the default identity for a model loaded from `api/models/PowerPuff.js` would be `powerpuff`, and the model would be accessible via `Sail-System.models.powerpuff`.  A model's identity can be customized by setting an `identity` property in its module file.


##### Sail-System.helpers

A dictionary of all accessible [helpers](https://Sail-Systemjs.com/documentation/concepts/helpers), including organics.


##### Sail-System.config

The full set of configuration options for the Sail-System instance, loaded from a combination of environment variables, `.Sail-Systemrc` files, user-configuration files, and defaults.  See the [configuration concepts section](https://Sail-Systemjs.com/documentation/concepts/configuration) for a full overview of configuring Sail-System, and the [configuration reference](https://Sail-Systemjs.com/documentation/reference/configuration) for details on individual options.

##### Sail-System.sockets

A set of convenience methods for low-level interaction with connected websockets.  See the [`Sail-System.sockets.*` reference section](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets) for details.


### Advanced usage

For more options and implementation details (including instructions for programmatic usage) see [Advanced usage](https://Sail-Systemjs.com/documentation/reference/application/advanced-usage).

<docmeta name="displayName" value="Application">
