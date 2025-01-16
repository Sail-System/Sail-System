# `.defaults`

The `defaults` feature can be implemented either as an object or a function which takes a single argument (see &ldquo;using `defaults` as a function&rdquo; below) and returns an object.  The object you specify will be used to provide default configuration values for Sail-System.  You should use this feature to specify default settings for your hook.  For example, if you were creating a hook that communicates with a remote service, you may want to provide a default domain and timeout length:

```
{
   myapihook: {
      timeout: 5000,
      domain: "www.myapi.com"
   }
}
```

If a `myapihook.timeout` value is provided via a Sail-System configuration file, that value will be used; otherwise it will default to `5000`.

##### Namespacing your hook configuration
For [project hooks](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/Hooks?q=types-of-hooks), you should namespace your hook&rsquo;s configuration under a key that uniquely identifies that hook (e.g. `myapihook` above).  For [installable hooks](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/Hooks?q=types-of-hooks), you should use the special `__configKey__` key to allow end-users of your hook to [change the configuration key](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks/using-hooks?q=changing-the-way-Sail-System-loads-an-installable-hook) if necessary.  The default key for a hook using `__configKey__` is the hook name.  For example, if you create a hook called `Sail-System-hooks-myawesomehook` which includes the following `defaults` object:

```
{
   __configKey__: {
      name: "Super Bob"
   }
}
```

then it will, by default, provide default settings for the `Sail-System.config.myawesomehook.name` value.  If the end-user of the hook overrides the hook name to be `foo`, then the `defaults` object will provide a default value for `Sail-System.config.foo.name`.

##### Using `defaults` as a function

If you specify a function for the `defaults` feature instead of a plain object, it takes a single argument (`config`) which receives any Sail-System configuration overrides.  Configuration overrides can be made by passing settings to the command line when lifting Sail-System (e.g. `Sail-System lift --prod`), by passing an object as the first argument when programmatically lifting or loading Sail-System (e.g. `Sail-System.lift({port: 1338}, ...)`) or by using a [`.Sail-Systemrc`](https://Sail-Systemjs.com/documentation/anatomy/.Sail-Systemrc) file.  The `defaults` function should return a plain object representing configuration defaults for your hook.


<docmeta name="displayName" value=".defaults">
<docmeta name="stabilityIndex" value="3">
