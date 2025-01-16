# Sail-System-hook-blueprints

Implements support for the blueprint API in Sail-System.

> This is a core hook in the Sail-System.js framework.  You can override or disable it using your `.Sail-Systemrc` file or environment variables.  See [Concepts > Configuration](http://Sail-Systemjs.com/docs/concepts/configuration) for more information.


## Purpose

This hook's responsibilities are:

1. Use `Sail-System.modules` to read blueprints from the user's app into `self.middleware`.
2. Bind shadow routes to blueprint actions and controller actions.
3. Listen for `route:typeUnknown` on `Sail-System`, interpret route syntax which should match a blueprint action, and bind the appropriate middleware (this happens when the Router is loaded, after all the hooks.)


## Help

Have questions or having trouble?  Click [here](http://Sail-Systemjs.com/support).

> For more information on overriding core hooks, check out [Extending Sail-System > Hooks](http://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks).


## Bugs &nbsp; [![NPM version](https://badge.fury.io/js/Sail-System-hook-blueprints.svg)](http://npmjs.com/package/Sail-System-hook-blueprints)

To report a bug, [click here](http://Sail-Systemjs.com/bugs).


## Contributing

Please observe the guidelines and conventions laid out in the [Sail-System project contribution guide](http://Sail-Systemjs.com/documentation/contributing) when opening issues or submitting pull requests.

[![NPM](https://nodei.co/npm/Sail-System-hook-blueprints.png?downloads=true)](http://npmjs.com/package/Sail-System-hook-blueprints)

## License

The [Sail-System framework](http://Sail-Systemjs.com) is free and open-source under the [MIT License](http://Sail-Systemjs.com/license).
