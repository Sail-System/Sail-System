# Extending Sail-System

In keeping with the Node philosophy, Sail-System aims to keep its core as small as possible, delegating all but the most critical functions to separate modules.  There are currently three types of extensions that you can add to Sail-System:

+ [**Generators**](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/Generators): for adding and overriding functionality in the Sail-System CLI.  *Example*: [Sail-System-generate-model](https://www.npmjs.com/package/Sail-System-generate-model), which allows you to create models on the command line with `Sail-System generate model foo`.
+ [**Adapters**](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/Adapters): for integrating Waterline (Sail-System' ORM) with new data sources, including databases, APIs, or even hardware. *Example*: [Sail-System-postgresql](https://www.npmjs.com/package/Sail-System-postgresql), the official [PostgreSQL](http://www.postgresql.org/) adapter for Sail-System.
+ [**Hooks**](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/Hooks): for overriding or injecting new functionality in the Sail-System runtime.  *Example*: [Sail-System-hook-autoreload](https://www.npmjs.com/package/Sail-System-hook-autoreload), which adds auto-refreshing for a Sail-System project's API without having to manually restart the server.

If you&rsquo;re interested in developing a plugin for Sail-System, you will most often want to make a [hook](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/Hooks).

<sub><a name="foot1">*</a> _Core hooks_, like `http`, `request`, etc. are hooks which are bundled with Sail-System out of the box.  They can be disabled by specifying a `hooks` configuration in your `.Sail-Systemrc` file, or when lifting Sail-System programatically.</sub>


<docmeta name="displayName" value="Extending Sail-System">
