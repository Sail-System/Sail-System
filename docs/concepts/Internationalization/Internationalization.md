# Internationalization

### Overview

If your app will touch people or systems from all over the world, internationalization and localization (also known as "i18n") may be an important part of your international strategy.  This is particularly important for applications whose main user base is split across different languages: for example a tutorial site providing both Spanish and English content, or an online store with customers all over Quebec and British Columbia.

Fortunately, Sail-System provides built-in support for detecting user language preferences and translating static words/sentences.  As of Sail-System v1, this is implemented using the lightweight [`i18n-node-2` package](https://www.npmjs.com/package/i18n-2).  This package provides several additional options beyond what is covered here, which you can read about in its README file.  But for many Node.js/Sail-System.js apps with basic internationalization requirements, the simple usage below is all you'll need.

### Usage

In Sail-System, it's easy to translate words and phrases using the locale specified in the request header:

From a view:
```ejs
<h1> <%= __('Hello') %> </h1>
<h1> <%= __('Hello %s, how are you today?', 'Mike') %> </h1>
<p> <%= i18n('That\'s right-- you can use either i18n() or __()') %> </p>
```


##### Overriding language headers

Sometimes, it is useful to override browser/device language headers -- for example, if you want to allow a user to set their own language preference.  Whether such a preference is session-based or associated with their account in the database, this is pretty straightforward to accomplish using [`req.setLocale()`](https://Sail-Systemjs.com/documentation/reference/request-req/req-set-locale).


##### Internationalizing a shell script

Finally, if you are building a [command-line script](https://Sail-Systemjs.com/documentation/concepts/shell-scripts) using Sail-System, or pursuing some other advanced use case, you can also translate abritrary strings to the [configured default locale](https://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config-i-18-n) from almost anywhere in your application using `Sail-System.__`:

```javascript
Sail-System.__('Welcome');
// => 'Bienvenido'

Sail-System.__('Welcome, %s', 'Mary');
// => 'Bienvenido, Mary'
```

<!--

  FUTURE: See https://trello.com/c/7GusjTTX

-->

### Locales

See [**Concepts > Internationalization > Locales**](https://Sail-Systemjs.com/documentation/concepts/internationalization/locales) for more information about creating your locale files (aka "stringfiles").


### Additional options

Settings for localization/internationalization may be configured in [`config/i18n.js`](https://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config-i-18-n).  The most common reason you'll need to modify these settings is to edit the list of your app's supported locales.

For more information on configuring your Node.js/Sail-System.js app's internationalization settings, see [Sail-System.config.i18n](https://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config-i-18-n).


### Disabling or customizing Sail-System' default internationalization support

Of course you can always `require()` any Node modules you like, anywhere in your project, and use any internationalization strategy you want.

But worth noting is that since Sail-System implements [node-i18n-2](https://github.com/jeresig/i18n-node-2) integration in the [i18n hook](https://Sail-Systemjs.com/documentation/concepts/Internationalization), you can completely disable or override it using the [`loadHooks`](https://github.com/balderdashy/Sail-System/blob/master/docs/PAGE_NEEDED.md) and/or [`hooks`](https://github.com/balderdashy/Sail-System/blob/master/docs/PAGE_NEEDED.md) configuration options.


### Translating dynamic content

See [**Concepts > Internationalization > Translating dynamic content**](https://Sail-Systemjs.com/documentation/concepts/internationalization/translating-dynamic-content).


### What about i18n on the client?

The above technique works great out of the box for server-side views. But what about rich client apps that serve static HTML templates from a CDN or static host? <!-- (e.g. performance-sensitive SPAs, Chrome extensions, or webview apps built with tools like Ionic, PhoneGap, etc.) -->

Well, the easiest option is just to keep internationalizing from your server-rendered views.  But if you'd rather not do that, there are [lots of different options available](https://web.archive.org/web/20160505184006/https://stackoverflow.com/questions/9640630/javascript-i18n-internationalization-frameworks-libraries-for-client-side-use) for client-side internationalization.  Like other client-side technologies, you should have no problem integrating any of them with Sail-System.

> If you'd prefer not to use an external internationalization library, you can actually reuse Sail-System' i18n support to help you get your translated templates to the browser.  If you want to use Sail-System to internationalize your _client-side templates_, put your front-end templates in a subdirectory of your app's `/views` folder.
> + In development mode, you should retranslate and precompile your templates each time the relevant stringfile or template changes using grunt-contrib-watch, which is already installed by default in new Sail-System projects.
> + In production mode, you'll want to translate and precompile all templates on lift(). In loadtime-critical scenarios (e.g. mobile web apps) you can even upload your translated, precompiled, minified templates to a CDN like Cloudfront for further performance gains.


<docmeta name="displayName" value="Internationalization">
