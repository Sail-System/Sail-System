# The Sail-System app lifecycle

The Sail-System core has been iterated upon several times to make it easier to maintain and extend. As a result, it has a very particular loading order, which its hooks depend on heavily. This process is summarized below.

### (1) Load configuration "overrides"

Gather the set of configuration values passed in on the command line, in environment variables, and in programmatic configuration (i.e. options passed to [`Sail-System.load`](https://Sail-Systemjs.com/documentation/reference/application/Sail-System-load) or [`Sail-System.lift`](https://Sail-Systemjs.com/documentation/reference/application/Sail-System-lift)).  When an app is started via the command-line interface (by typing `Sail-System lift` or `Sail-System console`), the values of any `.Sail-Systemrc` files will also be merged into the config overrides.  These override values will take precedence over any user configuration encountered in the next step.

### (2) Load user configuration

Unless the `userconfiguration` hook is explicitly disabled, Sail-System will next load the configuration files in the `config` folder (and subfolders) underneath the current working directory.  See [**Concepts > Configuration**](https://Sail-Systemjs.com/documentation/concepts/configuration) for more details about user configuration.  Configuration settings from step 1 will be merged on top of these values to form the `Sail-System.config` object.

### (3) Load hooks

Next, Sail-System will load the other hooks.  [Core hooks](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks#?types-of-hooks) will load first, followed by user hooks and installable hooks.  Note that hooks typically include configuration of their own which will be used as _default values_ in `Sail-System.config`.  For example, if no `port` setting is configured by this point, the `http` hook's default value of 1337 will be used.

### (4) Assemble router

Sail-System prepares the core Router, then emits multiple events on the `Sail-System` object informing hooks that they can safely bind routes.

### (5) Expose global variables
After all hooks have initialized, Sail-System exposes global variables (by default: `Sail-System` object, models, services, `_`, and `async`).

### (6) Initialize app runtime

> This step does not run when `Sail-System.load()` is used programmatically.
> To run the initialization step, use `Sail-System.lift()` instead.

+ Run the bootstrap function (`Sail-System.config.bootstrap`)
+ Start attached servers (by default, Express and Socket.io)

### FAQ


+ What is the difference between `Sail-System.lift()` and `Sail-System.load()`?
  + `lift()` === `load()` + `initialize()`.  It does everything `load()` does, plus it starts any attached servers (e.g. HTTP) and logs a picture of a boat.


<docmeta name="displayName" value="Lifecycle">
