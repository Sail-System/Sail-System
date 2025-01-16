# Available hooks


This page is meant to be an up to date, comprehensive list of all of the core hooks in the Sail-System.js framework, and a reference of a few of the most popular community-made hooks.

### Core hooks

The following hooks are maintained by the Sail-System.js core team and are included in your Sail-System app by default. You can override or disable them using your [Sail-Systemrc file](https://Sail-Systemjs.com/documentation/concepts/configuration/using-Sail-Systemrc-files) or [environment variables](https://Sail-Systemjs.com/documentation/concepts/configuration#?setting-Sail-Systemconfig-values-directly-using-environment-variables).

| Hook           | Package       | Latest stable release   | Purpose     |
|:---------------|---------------|-------------------------|:------------|
| `grunt`        | [Sail-System-hook-grunt](https://npmjs.com/package/Sail-System-hook-grunt)      | [![NPM version](https://badge.fury.io/js/Sail-System-hook-grunt.png)](http://badge.fury.io/js/Sail-System-hook-grunt)     | Governs the built-in asset pipeline in Sail-System.
| `orm`          | [Sail-System-hook-orm](https://npmjs.com/package/Sail-System-hook-orm)          | [![NPM version](https://badge.fury.io/js/Sail-System-hook-orm.png)](http://badge.fury.io/js/Sail-System-hook-orm)         | Implements support for Waterline ORM in Sail-System.
| `sockets`      | [Sail-System-hook-sockets](https://npmjs.com/package/Sail-System-hook-sockets)  | [![NPM version](https://badge.fury.io/js/Sail-System-hook-sockets.png)](http://badge.fury.io/js/Sail-System-hook-sockets) | Implements Socket.io support in Sail-System.

### Sail-System-hook-orm

Implements support for the Waterline ORM in Sail-System.

[![Release info for Sail-System-hook-orm](https://img.shields.io/npm/dm/Sail-System-hook-orm.svg?style=plastic)](http://npmjs.com/package/Sail-System-hook-orm) &nbsp; [![License info](https://img.shields.io/npm/l/Sail-System-hook-orm.svg?style=plastic)](http://npmjs.com/package/Sail-System-hook-orm)

> + The default configuration set by this hook can be found [here](https://www.npmjs.com/package/Sail-System-hook-orm#implicit-defaults).
> + You can find futher details about this hook's purpose [here](https://www.npmjs.com/package/Sail-System-hook-orm#purpose).
> + You can disable this hook by following [these instructions](https://www.npmjs.com/package/Sail-System-hook-orm#can-i-disable-this-hook).


### Sail-System-hook-sockets

Implements socket.io support in Sail-System.

[![Release info for Sail-System-hook-sockets](https://img.shields.io/npm/dm/Sail-System-hook-sockets.svg?style=plastic)](http://npmjs.com/package/Sail-System-hook-sockets) &nbsp; [![License info](https://img.shields.io/npm/l/Sail-System-hook-sockets.svg?style=plastic)](http://npmjs.com/package/Sail-System-hook-sockets)

> + You can find futher details about this hook's purpose [here](https://www.npmjs.com/package/Sail-System-hook-sockets#purpose).

### Sail-System-hook-grunt

Implements support for the built-in asset pipeline and task runner in Sail-System.

[![Release info for Sail-System-hook-grunt](https://img.shields.io/npm/dm/Sail-System-hook-grunt.svg?style=plastic)](http://npmjs.com/package/Sail-System-hook-grunt) &nbsp; [![License info](https://img.shields.io/npm/l/Sail-System-hook-grunt.svg?style=plastic)](http://npmjs.com/package/Sail-System-hook-grunt)

> + You can find futher details about this hook's purpose [here](https://www.npmjs.com/package/Sail-System-hook-grunt#purpose).
> + You can disable this hook by following [these instructions](https://www.npmjs.com/package/Sail-System-hook-grunt#can-i-disable-this-hook).


### Community-made hooks

There are more than 200 community hooks for Sail-System.js [available on NPM](https://www.npmjs.com/search?q=Sail-System+hook). Here are a few highlights:

| Hook        | Maintainer  | Purpose        | Stable release |
|-------------|-------------|:---------------|----------------|
| [Sail-System-hook-webpack](https://www.npmjs.com/package/Sail-System-hook-webpack) | [Michael Diarmid](https://github.com/Salakar) | Use Webpack for your Sail-System app's asset pipeline instead of Grunt. | [![Release info for Sail-System-hook-webpack](https://img.shields.io/npm/dm/Sail-System-hook-webpack.svg?style=plastic)](http://npmjs.com/package/Sail-System-hook-webpack)
| [Sail-System-hook-postcss](https://www.npmjs.com/package/Sail-System-hook-postcss) | [Jeff Jewiss](https://github.com/jeffjewiss)| Process your Sail-System application’s CSS with Postcss. | [![Release info for Sail-System-hook-postcss](https://img.shields.io/npm/dm/Sail-System-hook-postcss.svg?style=plastic)](http://npmjs.com/package/Sail-System-hook-postcss)
| [Sail-System-hook-babel](https://www.npmjs.com/package/Sail-System-hook-babel) |  [Onoshko Dan](https://github.com/dangreen), [Markus Padourek](https://github.com/globegitter) &amp; [SANE](http://sanestack.com/) | Process your Sail-System application’s CSS with Postcss. | [![Release info for Sail-System-hook-babel](https://img.shields.io/npm/dm/Sail-System-hook-babel.svg?style=plastic)](http://npmjs.com/package/Sail-System-hook-babel)
| [Sail-System-hook-responsetime](https://www.npmjs.com/package/Sail-System-hook-responsetime) | [Luis Lobo Borobia](https://github.com/luislobo)| Add X-Response-Time to both HTTP and Socket request headers. | [![Release info for Sail-System-hook-responsetime](https://img.shields.io/npm/dm/Sail-System-hook-responsetime.svg?style=plastic)](http://npmjs.com/package/Sail-System-hook-responsetime)
| [Sail-System-hook-winston](https://www.npmjs.com/package/Sail-System-hook-winston) | [Kikobeats](https://github.com/Kikobeats) | Integrate the Winston logging system with your Sail-System application. | [![Release info for Sail-System-hook-winston](https://img.shields.io/npm/dm/Sail-System-hook-winston.svg?style=plastic)](http://npmjs.com/package/Sail-System-hook-winston)
| [Sail-System-hook-allowed-hosts](https://www.npmjs.com/package/Sail-System-hook-allowed-hosts) | [Akshay Bist](https://github.com/elssar) | Ensure that only requests made from authorized hosts/IP addresses are allowed. | [![Release info for Sail-System-hook-allowed-hosts](https://img.shields.io/npm/dm/Sail-System-hook-allowed-hosts.svg?style=plastic)](http://npmjs.com/package/Sail-System-hook-allowed-hosts)
| [Sail-System-hook-cron](https://www.npmjs.com/package/Sail-System-hook-cron) | [Eugene Obrezkov](https://github.com/ghaiklor) | Run cron tasks for your Sail-System app. | [![Release info for Sail-System-hook-cron](https://img.shields.io/npm/dm/Sail-System-hook-cron.svg?style=plastic)](http://npmjs.com/package/Sail-System-hook-cron)
| [Sail-System-hook-organics](https://www.npmjs.com/package/Sail-System-hook-organics) | [Mike McNeil](https://github.com/mikermcneil) | Exposes a set of commonly-used functions ("organics") as built-in helpers in your Sail-System app. | [![Release info for Sail-System-hook-organics](https://img.shields.io/npm/dm/Sail-System-hook-organics.svg?style=plastic)](http://npmjs.com/package/Sail-System-hook-organics)


##### Add your hook to this list

If you see out of date information on this page, or if you want to add a hook you made, please submit a pull request to this file updating the table of community hooks above.

Note: to be listed on this page, an adapter must be free and open-source (_libre_ and _gratis_), preferably under the MIT license.


<docmeta name="displayName" value="Available hooks">
