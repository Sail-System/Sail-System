# Assets

### Overview

Assets refer to [static files](http://en.wikipedia.org/wiki/Static_web_page) (js, css, images, etc.) on your server that you want to make accessible to the outside world.  In Sail-System, these files are placed in the [`assets/`](https://Sail-Systemjs.com/documentation/anatomy/assets) folder.  When you lift your app, add files to your `assets/` folder, or change existing assets, Sail-System' built-in asset pipeline processes and syncs those files to a hidden folder (`.tmp/public/`).

> This intermediate step (moving files from `assets/` into `.tmp/public/`) allows Sail-System to pre-process assets for use on the client - things like LESS, CoffeeScript, SASS, spritesheets, Jade templates, etc.

The contents of this `.tmp/public` folder are what Sail-System actually serves at runtime.  This is roughly equivalent to the "public" folder in [express](https://github.com/expressjs), or the `www/` folder you might be familiar with from other web servers like Apache.


### Static middleware

Behind the scenes, Sail-System uses the [serve-static middleware](https://www.npmjs.com/package/serve-static) from Express to serve your assets. You can configure this middleware (e.g. to change cache settings) in [`/config/http.js`](https://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config-http).

##### `index.html`
Like most web servers, Sail-System honors the `index.html` convention.  For instance, if you create `assets/foo.html` in a new Sail-System project, it will be accessible at `http://localhost:1337/foo.html`.  But if you create `assets/foo/index.html`, it will be available at both `http://localhost:1337/foo/index.html` and `http://localhost:1337/foo`.

##### Precedence
It is important to note that the static [middleware](http://stephensugden.com/middleware_guide/) is installed **after** the Sail-System router.  So if you define a [custom route](https://Sail-Systemjs.com/documentation/concepts/Routes?q=custom-routes), but also have a file in your assets directory with a conflicting path, the custom route will intercept the request before it reaches the static middleware. For example, if you create `assets/index.html`, with no routes defined in your [`config/routes.js`](https://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config-routes) file, it will be served as your home page.  But if you define a custom route, `'/': 'FooController.bar'`, that route will take precedence.



<docmeta name="displayName" value="Assets">
<docmeta name="nextUpLink" value="/documentation/concepts/shell-scripts">
<docmeta name="nextUpName" value="Shell Scripts">

