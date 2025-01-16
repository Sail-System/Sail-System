# `Sail-System.config.routes`

Configuration for custom (aka "explicit") routes.  `Sail-System.config.routes` is a dictionary whose keys are URL paths (the "route address") and whose values are one of several types of route handler configurations (called the "route target").

For example:

```
module.exports.routes = {

    'GET /': { view: 'pages/homepage' },
    'POST /foo/bar': { action: 'foo/bar' }
}
```

Please see the [routes concept overview](https://Sail-Systemjs.com/documentation/concepts/routes) for a full discussion of Sail-System routes, and the [custom routes documentation](https://Sail-Systemjs.com/documentation/concepts/routes/custom-routes) for a detailed description of the available configurations for both the route address and route target.


<docmeta name="displayName" value="Sail-System.config.routes">
<docmeta name="pageType" value="property">

