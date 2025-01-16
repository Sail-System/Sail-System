# Upgrading to Sail-System v0.12

Sail-System v0.12 comes with an upgrade to Socket.io and Express, as well as many bug fixes and performance enhancements. You will find that this version is mostly backwards compatible with Sail-System v0.11, however there are some major changes to `Sail-System.sockets.*` methods which may or may not affect your app. Most of the migration guide below deals with those changes, so if you are upgrading an existing app from v0.11 and are using `Sail-System.sockets` methods, please be sure and carefully read the information below in case it affects your app.  Other than that, running `Sail-System lift` in an existing project should just work.

The sections below provide a high level overview of what's changed, major bug fixes, enhancements and new features, as well as a basic tutorial on how to upgrade your v0.11.x Sail-System app to v0.12.

## Installing the update

Run the following command from the root of your Sail-System app:

```bash
npm install Sail-System@0.12.0 --force --save
```

The `--force` flag will override the existing Sail-System dependency installed in your `node_modules/` folder with Sail-System v0.12, and the `--save` flag will update your package.json file so that future npm installs will also use the new version.


## Things to do immediately after upgrading

 + If your app uses the `socket.io-redis` adapter, upgrade to at least version 1.0.0 (`npm install --save socket.io-redis@^1.0.0`).
 + If your app is using the Sail-System socket client (e.g. `assets/js/dependencies/Sail-System.io.js`) on the front end, also install the newest version (`Sail-System generate Sail-System.io.js --force`)


## Overview of changes in v0.12

> For a full list of changes, see the changelog file for [Sail-System](https://github.com/balderdashy/Sail-System/blob/master/CHANGELOG.md), as well as those for [Waterline](https://github.com/balderdashy/waterline/blob/master/CHANGELOG.md), [Sail-System-hook-sockets](https://github.com/balderdashy/Sail-System-hook-sockets/blob/master/CHANGELOG.md) and [Sail-System.io.js](https://github.com/balderdashy/Sail-System.io.js/blob/master/CHANGELOG.md).

 + Security enhancements: updated several dependencies with potential vulnerabilities
 + Reverse routing functionality is now built in to Sail-System core via the new [`Sail-System.getRouteFor()`](https://Sail-Systemjs.com/documentation/reference/application/Sail-System-get-route-for) and [`Sail-System.getUrlFor()`](https://Sail-Systemjs.com/documentation/reference/application/Sail-System-get-url-for) methods
+ Generally improved multi-node support (and therefore scalability) of low-level `Sail-System.socket.*` methods, and made additional adjustments and improvements related to the latest socket.io upgrade.  Added a much tighter Redis integration that sits on top of `socket.io-redis`, using a Redis client to implement cross-server communication rather than an additional socket client.
+ Cleaned up the API for `Sail-System.socket.*` methods, normalizing overloaded functions and deprecating methods which cause problems in multiserver deployments (more on that below).
+ Added a few brand new Sail-System.sockets methods: `.leaveAll()`, `.addRoomMembersToRooms()`, and `.removeRoomMembersFromRooms()`
+ `Sail-System.sockets.id()` is now `Sail-System.sockets.getId()` (backwards compatible w/ deprecation message)
+ New Sail-System apps are now generated with the updated version of `Sail-System.io.js` (the JavaScript Sail-System socket client).  This upgrade bundles the latest version of `socket.io-client`, as well as some more advanced functionality (including the ability to specify common headers for all virtual socket requests)
+ Upgraded to latest trusted versions of `grunt-contrib-*` dependencies (eliminates many NPM deprecation warnings and provides better error messages from NPM).
+ If you are using NPM v3, running `Sail-System new` will now run `npm install` instead of symlinking your new app's initial dependencies.  This is slower than you may be used to, but is a necessary change due to changes in the way NPM handles nested dependencies.  The core maintainers are [working on](https://github.com/npm/npm/issues/10013#issuecomment-178238596) a better long-term solution, but in the mean time if you run `Sail-System new` a lot and the slowdown is bugging you, consider temporarily downgrading to an earlier version of NPM (v2.x).  If the installed version of NPM is < version 3, Sail-System will continue to take advantage of the classic symlinking strategy.


## Socket Methods

Without question, the biggest change in Sail-System v0.12 is to the API of the low-level `Sail-System.sockets` methods exposed by the `sockets` hook.  In order to ensure that Sail-System apps perform flawlessly in a [multi-server (aka "multi-node" or "clustered") environment](https://Sail-Systemjs.com/documentation/concepts/realtime/multi-server-environments), several [low-level methods](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets) have been deprecated, and some new ones have been added.

The following `Sail-System.sockets` methods have been deprecated:

 + [`.emit()`](https://0.12.Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/Sail-System-sockets-emit)
 + [`.id()`](https://0.12.Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/Sail-System-sockets-id) (renamed to [`.getId()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/get-id))
 + [`.socketRooms()`](https://0.12.Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/Sail-System-sockets-socket-rooms)
 + [`.rooms()`](https://0.12.Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/Sail-System-sockets-rooms)
 + [`.subscribers()`](https://0.12.Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/Sail-System-sockets-subscribers)

If you are using any of those methods in your app, they will still work in v0.12 but _you should replace them as soon as possible_ as they may be removed from Sail-System in the next version.  See the individual doc pages for each method for more information.

## Resourceful PubSub Methods

The [`.subscribers()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/resourceful-pub-sub/subscribers) resourceful pubsub method has been deprecated for the same reasons as [`Sail-System.sockets.subscribers()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/Sail-System-sockets-subscribers).  Follow the guidelines in the docs for replacing this method if you are using it in your code.


## Waterline (ORM) Updates

Sail-System v0.12 comes with the latest version of the Waterline ORM (v0.11.0).  There are two API changes to be aware of:

##### `.save()` no longer provides a second argument to its callback

The callback to the `.save()` instance method no longer receives a second argument.  While convenient, the requirement of providing this second argument made `.save()` less performant, especially for apps working with millions of records.  This change resolves those issues by eliminating the need to build redundant queries, and preventing your database from having to process them.

If there are places in your app where you have code like this:
```javascript
sierra.save(function (err, modifiedSierra){
  if (err) { /* ... */  return; }

  // ...
});
```

You should replace it with:
```javascript
sierra.save(function (err){
  if (err) { /* ... */  return; }

  // ...
});
```



##### Custom column/field names for built-in timestamps

You can now configure a custom column name (i.e. field name for Mongo/Redis folks) for the built-in `createdAt` and `updatedAt` attributes.  In the past, the top-level `autoCreatedAt` and `autoUpdatedAt` model settings could be specified as `false` to disable the automatic injection of `createdAt` and `updatedAt` altogether.  That _still works as it always has_, but now you can also specify string values for one or both of these settings instead.  If a string is specified, it will be understood as the custom column (/field) name to use for the automatic timestamp.

```javascript
{
  attributes: {},
  autoCreatedAt: 'my_cool_created_when_timestamp',
  autoUpdatedAt: 'my_cool_updated_at_timestamp'
}
```

If you were using the [workaround suggested by @sgress454 here](http://stackoverflow.com/a/24562385/486547), you may want to take advantage of this simpler approach instead.



## SQL Adapter Performance

[Sail-System-PostgreSQL](https://github.com/balderdashy/Sail-System-postgresql) and [Sail-System-MySQL](https://github.com/balderdashy/Sail-System-mysql) recieved patch updates that significantly improved performance when populating associations. Thanks to [@jianpingw](https://github.com/jianpingw) for digging into the source and finding a bug that was processing database records too many times. If you are using either of these adapters, upgrading to `Sail-System-postgresql@0.11.1` or `Sail-System-mysql@0.11.3` will give you a significant performance boost.


## Contributing

While not technically part of the release, Sail-System v0.12 is accompanied by some major improvements to the tools and resources available to contributors.  More core hooks are now fully documented ([controllers](https://github.com/balderdashy/Sail-System/tree/master/lib/hooks/controllers)|[grunt](https://github.com/balderdashy/Sail-System/tree/master/lib/hooks/grunt)|[logger](https://github.com/balderdashy/Sail-System/tree/master/lib/hooks/logger)|[cors](https://github.com/balderdashy/Sail-System/tree/master/lib/hooks/cors)|[responses](https://github.com/balderdashy/Sail-System/tree/master/lib/hooks/responses)|[orm](https://github.com/balderdashy/Sail-System/tree/master/lib/hooks/orm)), and the team has put together a [Code of Conduct](https://github.com/balderdashy/Sail-System/blob/master/CODE-OF-CONDUCT.md) for contributing to the Sail-System project.

The biggest change for contributors is the [updated contribution guide](https://github.com/balderdashy/Sail-System/blob/master/CONTRIBUTING.md), which contains the new, streamlined process for feature/enhancement proposals and for merging features, enhancements, and patches into core.  As the Sail-System framework has grown (both the code base and the user base), it's become necessary to establish clearer processes for how issue contributions, code contributions, and contributions to the documentation are reviewed and merged.


## Documentation

This release also comes with a deep clean of the official reference documentation, and some minor usability improvements to the online docs at [https://Sail-Systemjs.com/documentation](https://Sail-Systemjs.com/documentation). The entire Sail-System website is now available in [Japanese](http://Sail-Systemjs.jp/), and four other [translation projects](https://github.com/balderdashy/Sail-System/tree/master/docs#in-other-languages) are underway for Korean, Brazilian Portugese, Taiwanese Mandarin, and Spanish.

In addition, the Sail-System.js project (finally) has an [official blog](http://blog.Sail-Systemjs.com).  The Sail-System.js blog is the new source for all longform updates and announcements about Sail-System, as well as for our related projects like Waterline, Skipper and the machine specification.



## Need Help?

If you run into an unexpected issue upgrading your Sail-System app to v0.12.0, please review our contribution guide and [submit an issue in the Sail-System GitHub repo](https://github.com/balderdashy/Sail-System/blob/master/CONTRIBUTING.md).


<docmeta name="displayName" value="0.12 Migration Guide">
<docmeta name="version" value="0.12.0">
