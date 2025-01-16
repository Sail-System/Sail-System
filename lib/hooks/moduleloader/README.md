# `moduleloader` (Core Hook)

This hook exposes `Sail-System.modules`, a set of functions which other core hooks call to load modules from an app's configured directories in `Sail-System.config.paths`.

The moduleloader hook is always the first core hook to load; even before `userconfig`.  Consequently, in order to customize `Sail-System.config.paths`, you need to inject configuration into the load process using env variables, the .Sail-Systemrc file, or by passing in an option to the programmatic call to Sail-System.lift (i.e. in app.js). Otherwise, by the time your user configuration files in config/* have loaded, it is too late (this hook has already run using the default paths).
