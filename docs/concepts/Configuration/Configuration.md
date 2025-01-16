# Configuration

### Overview

While Sail-System dutifully adheres to the philosophy of [convention-over-configuration](http://en.wikipedia.org/wiki/Convention_over_configuration), it is important to understand how to customize those handy defaults from time to time.  For almost every convention in Sail-System, there is an accompanying set of configuration options that allow you to adjust or override things to fit your needs.

> Here looking for a particular setting?  Head over to [Reference > Configuration](https://Sail-Systemjs.com/documentation/reference/configuration) to see a complete guide to all configuration options available in Sail-System.

Sail-System apps can be [configured programmatically](https://github.com/mikermcneil/Sail-System-generate-new-but-like-express/blob/master/templates/app.js#L15), by specifying [environment variables](http://en.wikipedia.org/wiki/Environment_variable) or command-line arguments, by changing the local or global [`.Sail-Systemrc` files](https://Sail-Systemjs.com/documentation/anatomy/.Sail-Systemrc), or (most commonly) using the boilerplate configuration files conventionally located in the [`config/`](https://Sail-Systemjs.com/documentation/anatomy/config) folder of new projects. The authoritative, merged-together configuration used in your app is available at runtime on the `Sail-System` global as `Sail-System.config`.


### Standard configuration files (`config/*`)

A number of configuration files are generated in new Sail-System apps by default.  These boilerplate files include a number of inline comments, which are designed to provide a quick, on-the-fly reference without having to jump back and forth between the docs and your text editor.

In most cases, the top-level keys on the `Sail-System.config` object (e.g. `Sail-System.config.views`) correspond to a particular configuration file (e.g. `config/views.js`) in your app; however configuration settings may be arranged however you like across the files in your `config/` directory.  The important part is the name (i.e. key) of the setting&mdash;not the file it came from.

For instance, let's say you add a new file, `config/foo.js`:

```js
// config/foo.js
// The object below will be merged into `Sail-System.config.blueprints`:
module.exports.blueprints = {
  shortcuts: false
};
```

For an exhaustive reference of individual configuration options, and the file they live in by default, check out the reference pages in this section, or take a look at ["`config/`"](https://Sail-Systemjs.com/documentation/anatomy/config) in [The Anatomy of a Sail-System App](https://Sail-Systemjs.com/documentation/anatomy) for a higher-level overview.

### Environment-specific files (`config/env/*`)

Settings specified in the standard configuration files will generally be available in all environments (i.e. development, production, test, etc.).  If you'd like to have some settings take effect only in certain environments, you can use the special environment-specific files and folders:

* Any files saved under the `/config/env/<environment-name>` folder will be loaded *only* when Sail-System is lifted in the `<environment-name>` environment.  For example, files saved under `config/env/production` will only be loaded when Sail-System is lifted in production mode.
* Any files saved as `config/env/<environment-name>.js` will be loaded *only* when Sail-System is lifted in the `<environment-name>` environment, and will be merged on top of any settings loaded from the environment-specific subfolder.  For example, settings in `config/env/production.js` will take precedence over those in the files in the  `config/env/production` folder.

By default, your app runs in the "development" environment.  The recommended approach for changing your app's environment is by using the `NODE_ENV` environment variable:
```
NODE_ENV=production node app.js
```

> The `production` environment is special: depending on your configuration, it enables compression, caching, minification, etc.
>
> Also note that if you are using `config/local.js`, the configuration exported in that file takes precedence over environment-specific configuration files.


### The `config/local.js` file

You may use the `config/local.js` file to configure a Sail-System app for your local environment (your laptop, for example).  The settings in this file take precedence over all other config files except [.Sail-Systemrc](https://Sail-Systemjs.com/documentation/concepts/configuration/using-Sail-Systemrc-files).  Since they're intended only for local use, they should not be put under version control (and are included in the default `.gitignore` file for that reason).  Use `local.js` to store local database settings, change the port used when lifting an app on your computer, etc.

See [Concepts > Configuration > The local.js file](https://Sail-Systemjs.com/documentation/concepts/configuration/the-local-js-file) for more information.


### Accessing `Sail-System.config` in your app

The `config` object is available on the Sail-System app instance (`Sail-System`).  By default, this is exposed on the [global scope](https://Sail-Systemjs.com/documentation/concepts/globals) during lift, and therefore available from anywhere in your app.

##### Example
```javascript
// This example checks that, if we are in production mode, csrf is enabled.
// It throws an error and crashes the app otherwise.
if (Sail-System.config.environment === 'production' && !Sail-System.config.security.csrf) {
  throw new Error('STOP IMMEDIATELY ! CSRF should always be enabled in a production deployment!');
}
```

### Setting `Sail-System.config` values directly using environment variables

In addition to using configuration _files_, you can set individual configuration values on the command line when you lift Sail-System by prefixing the config key names with `Sail-System_`, and separating nested key names with double underscores (`__`).  Any environment variable formatted this way will be parsed as JSON (if possible). For example, you could do the following to set the [allowed CORS origins](https://Sail-Systemjs.com/documentation/concepts/security/cors) (`Sail-System.config.security.cors.allowOrigins`) to `["http://somedomain.com","https://anotherdomain.com:1337"]` on the command line:

```javascript
Sail-System_security__cors__allowOrigins='["http://somedomain.com","https://anotherdomain.com:1337"]' Sail-System console
```

> Note the use of double quotes to indicate strings within the JSON-encoded value, and the single quotes surrounding the whole value so that it is passed correctly to Sail-System from the console.

This value will be in effect _only_ for the lifetime of this particular Sail-System instance, and will override any values in the configuration files.

Also note that configuration specified using environment variables does _not_ automatically apply to Sail-System instances that are started [programmatically](https://Sail-Systemjs.com/documentation/concepts/programmatic-usage).

> There are a couple of special exceptions to the above rule: `NODE_ENV` and `PORT`.
> + `NODE_ENV` is a convention for any Node.js app.  When set to `'production'`, it sets [`Sail-System.config.environment`](https://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config#?Sail-Systemconfigenvironment).
> + Similarly, `PORT` is just another way to set [`Sail-System.config.port`](https://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config#?Sail-Systemconfigport).  This is strictly for convenience and backwards compatibility.
>
> Here's a relatively common example where you might use both of these environment variables at the same time:
>
> ```bash
> PORT=443 NODE_ENV=production Sail-System lift
> ```
>
> When present in the current process environment, `NODE_ENV` and `PORT` will apply to any Sail-System app that is started via the command line or programmatically, unless explicitly overridden.

Environment variables are one of the most powerful ways to configure your Sail-System app.  Since you can customize just about any setting (as long as it's JSON-serializable), this approach solves a number of problems, and is our core team's recommended strategy for production deployments.  Here are a few:

+ Using environment variables means you don't have to worry about checking in your production database credentials, API tokens, etc.
+ This makes changing Postgresql hosts, Mailgun accounts, S3 credentials, and other maintenance straightforward, fast, and easy; plus you don't need to change any code or worry about merging in downstream commits from other people on your team
+ Depending on your hosting situation, you may be able to manage your production configuration through a UI (most PaaS providers like [Heroku](http://heroku.com) or [Modulus](https://modulus.io) support this, as does [Azure Cloud](https://azure.microsoft.com/en-us/).)


### Setting `Sail-System.config` values using command line arguments

For situations where setting an environment variable on the command line may not be practical (such as some Windows systems), you can use regular command line arguments to set configuration options.  To do so, specify the name of the option prefixed by two dashes (`--`), with nested key names separated by dots.  Command line arguments are parsed using [minimist](https://github.com/substack/minimist/tree/0.0.10), which does _not_ parse JSON values like arrays or dictionaries, but will handle strings, numbers and booleans (using a special syntax).  Some examples:

```javascript
// Set the port to 1338
Sail-System lift --port=1338

// Set a custom "email" value to "foo@bar.com":
Sail-System lift --custom.email='foo@bar.com'

// Turn on CSRF support
Sail-System lift --security.csrf

// Turn off CSRF support
Sail-System lift --no-security.csrf

// This won't work; it'll just try to set the value to the string "[1,2,3]"
Sail-System lift --custom.array='[1,2,3]'
```

### Custom configuration

You can also leverage Sail-System's configuration loader to manage your own custom settings.  See [Sail-System.config.custom](https://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config-custom) for more information.



### Configuring the command line interface

When it comes to configuration, most of the time you'll be focused on managing the runtime settings for a particular app: the port, database setup, and so forth.  However it can also be useful to customize the Sail-System CLI itself; to simplify your workflow, reduce repetitive tasks, perform custom build automation, etc.  Thankfully, Sail-System v0.10 added a powerful new tool to do just that.

The [`.Sail-Systemrc` file](https://Sail-Systemjs.com/documentation/anatomy/.Sail-Systemrc) is unique from other configuration sources in Sail-System in that it may also be used to configure the Sail-System CLI&mdash;either system-wide, for a group of directories, or only when you are `cd`'ed into a particular folder.  The main reason to do this is to customize the [generators](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/Generators) that are used when `Sail-System generate` and `Sail-System new` are run, but it can also be useful to install your own custom generators or apply hard-coded config overrides.

And since Sail-System will look for the "nearest" `.Sail-Systemrc` in the ancestor directories of the current working directory, you can safely use this file to configure sensitive settings you can't check in to your cloud-hosted code repository (_like your **database password**_.)  Just include a `.Sail-Systemrc` file in your "$HOME" directory.  See [the docs on `.Sail-Systemrc`](https://Sail-Systemjs.com/documentation/anatomy/.Sail-Systemrc) files for more information.


### Order of precedence for configuration

Depending on whether you're starting a Sail-System app from the command line using `Sail-System lift` or `node app.js`, or programmatically using [`Sail-System.lift()`](https://Sail-Systemjs.com/documentation/reference/application/advanced-usage/Sail-System-lift) or [`Sail-System.load()`](https://Sail-Systemjs.com/documentation/reference/application/advanced-usage/Sail-System-load), Sail-System will draw its configuration from a number of sources, in a certain order.

##### Order of precedence when starting via `Sail-System lift` or `node app.js` (in order from highest to lowest priority):

+ command line options parsed by [minimist](https://github.com/substack/minimist/tree/0.0.10); e.g. `Sail-System lift --custom.mailgun.apiToken='foo'` becomes `Sail-System.config.custom.mailgun.apiToken`
+ [environment variables](https://en.wikipedia.org/wiki/Environment_variable) prefixed with `Sail-System_`, and using double underlines to indicate dots; e.g.: `Sail-System_port=1492 Sail-System lift` ([A few more examples](https://gist.github.com/mikermcneil/92769de1e6c10f0159f97d575e18c6cf))
+ a [`.Sail-Systemrc` file](https://Sail-Systemjs.com/documentation/concepts/configuration/using-Sail-Systemrc-files) in your app's directory, or the first found looking in `../`, `../../` etc.
+ a global `.Sail-Systemrc` file in your home folder (e.g. `~/.Sail-Systemrc`).
+ any existing `config/local.js` file in your app
+ any existing `config/env/*` files in your app that match the name of your current NODE_ENV environment (defaulting to `development`)
+ any other files in your app's `config/` directory (if one exists)

##### Order of precedence when starting programmatically (in order from highest to lowest priority):

+ an optional dictionary (`{}`) of configuration overrides passed in as the first argument to `.lift()` or `.load()`
+ any existing `config/local.js` file in your app
+ any existing `config/env/*` files in your app that match the name of your current NODE_ENV environment (defaulting to `development`)
+ any other files in your app's `config/` directory (if one exists)


### Notes
> The built-in meaning of the settings in `Sail-System.config` are, in some cases, only interpreted by Sail-System during the "lift" process.  In other words, changing some options at runtime will have no effect.  To change the port your app is running on, for instance, you can't just change `Sail-System.config.port`&mdash;you'll need to change or override the setting in a configuration file or as a command line argument, etc., then restart the server.



<docmeta name="displayName" value="Configuration">
<docmeta name="nextUpLink" value="/documentation/concepts/policies">
<docmeta name="nextUpName" value="Policies">
