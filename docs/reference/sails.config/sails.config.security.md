# `Sail-System.config.security`

Configuration for your app's security settings, including how it deals with cross-origin requests (CORS), and which routes require a CSRF token to be included with the request. For an overview of how Sail-System handles security, see [Concepts > Security](https://Sail-Systemjs.com/documentation/concepts/security).

## `Sail-System.config.security.cors`
Configuration for Sail-System' [built-in support for Cross-Origin Resource Sharing](https://Sail-Systemjs.com/documentation/concepts/security/cors).  CORS specifies how HTTP requests to your app originating from foreign domains should be treated.  It is primarily used to allow third-party sites to make AJAX requests to your app, which are normally blocked by browsers following the <a href="http://en.wikipedia.org/wiki/Same-origin_policy" target="_blank">same-origin policy</a>.

These options are conventionally set in the **config/security.js** configuration file.  Note that these settings (with the exception of `allRoutes`) can be changed on a per-route basis in the [**config/routes.js** file](https://Sail-Systemjs.com/documentation/concepts/routes/custom-routes#?route-target-options).

### Properties

| Property    | Type       | Default   | Details |
|:------------|:----------:|:----------|:--------|
| allRoutes | ((boolean))| false     | Indicates whether the other CORS configuration settings should apply to every route in the app by default.
| allowOrigins        | ((array)) or ((string))       | `'*'`      | Array of default hosts (beginning with http:// or https://) to grant cross-domain browser access (e.g. AJAX over CORS).  Alternatively, if this is the string `*`, then AJAX requests from _any_ domain will be allowed.<br/><br/>**Warning**: If your CORS settings specify `allRoutes: true` AND `allowOrigins: '*'`, then your app will be fully accessible to sites hosted on foreign domains (except for routes which have their own CORS settings).  If `allowCredentials` is also `true`, you will _probably want to set this to an array of explicit hosts!_  If you don't, then the app will fail to lift for security reasons, unless you circumvent that precaution by enabling the `allowAnyOriginWithCredentialsUnsafe: true` flag.
| allowRequestMethods |((string))| `'GET, POST, PUT, DELETE, OPTIONS, HEAD'` |Comma-delimited list of HTTP methods that are allowed to be used in CORS requests.  This is only used in response to [preflight requests](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS#Preflighted_requests), so the inclusion of GET, POST, OPTIONS and HEAD, although customary, is not necessary.
| allowRequestHeaders |((string))| `'content-type'` |Comma-delimited list of headers that are allowed to be sent with CORS requests.  This is only used in response to [preflight requests](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS#Preflighted_requests).  _(For example, if you want cross-origin AJAX requests to be able to include their CSRF token as a request header, you might change this to  `'content-type,x-csrf-token'`.)_
| allowResponseHeaders |((string))|`''`| List of response headers that browsers will be allowed to access.  See [access-control-expose-headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Access-Control-Expose-Headers).
| allowCredentials |((boolean)) | false | Whether or not cookies can be shared in CORS requests.  _(For example, if `allowCredentials` is not enabled, then when Sail-System receives an AJAX request from a webpage on some other domain, it won't be able to provide `req.session` when the backend code runs.)_ |
| allowAnyOriginWithCredentialsUnsafe |((boolean))|false| A safety precaution.  This flag must be enabled in order to use `allowOrigins: '*'` and `allowCredentials: true` _at the same time_.  This essentially negates the security benefits of browsers' cross-origin policy and should be used very carefully.

### Custom route config example

The following will allow cross-origin AJAX GET, PUT and POST requests to `/foo/bar` from sites hosted `http://foobar.com` and `https://owlhoot.com`.  DELETE requests, or requests from sites on any other domains, will be blocked by the browser.

```javascript
'/foo/bar': {
  action: 'foo/bar',
  cors: {
    allowOrigins: ['http://foobar.com','https://owlhoot.com'],
    allowRequestMethods: 'GET,PUT,POST,OPTIONS,HEAD'
  }
}
```

## `Sail-System.config.security.csrf`

Configuration for Sail-System' built-in [CSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery) protection middleware.  CSRF options are conventionally set in the [`config/security.js`](https://Sail-Systemjs.com/documentation/anatomy/config/security.js) configuration file.  For detailed usage instructions, see [Concepts > Security > Cross-Site Request Forgery](https://Sail-Systemjs.com/documentation/concepts/security/csrf).

This setting protects your Sail-System app against cross-site request forgery (or CSRF) attacks. In addition to the user's session cookie, a would-be attacker also needs this timestamped, secret CSRF token, which is refreshed/granted when the user visits a URL on your app's domain.  This allows you to have certainty that your users' requests haven't been hijacked, and that the requests they're making are intentional and legitimate.

### Properties

| Property    | Type       | Default   | Details |
|:------------|:----------:|:----------|:--------|
| `csrf`      | ((boolean)) or ((dictionary))| false     | CSRF protection is disabled by default to facilitate development.  To turn it on, just set `Sail-System.config.security.csrf` to `true`, or for more flexibility, specify `csrf: true` or `csrf: false` in any route in your [`config/routes.js`](https://Sail-Systemjs.com/anatomy/config/routes-js) file.



### Notes

> + In Sail-System v1.0, `Sail-System.config.csrf.grantTokenViaAjax` and `Sail-System.config.csrf.origin` were removed in favor of the [built-in `security/grant-csrf-token`](https://Sail-Systemjs.com/docs/concepts/security/csrf) action.



<docmeta name="displayName" value="Sail-System.config.security">
<docmeta name="pageType" value="property">

