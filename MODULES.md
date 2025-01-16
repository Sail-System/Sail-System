# Modules

Sail-System is a large project, with many modular components.  Each module is located in its own repository, and in most cases is tested individually.

Below, you'll find an overview of the modules maintained by the core team and community members.


## Sail-System core

The modules comprising the Sail-System framework, as well as the other plugins maintained by our core team, are spread across a number of different code repositories.  Some modules can be used outside of the context of Sail-System, while others are not intended for external use.

#### Framework and ORM

> For more information on the available releases of the Sail-System framework as a whole, check out the [contribution guide](https://github.com/balderdashy/Sail-System/blob/master/CONTRIBUTING.md).

| Package          |  Latest Stable Release   |  Build Status (edge)                  |
|------------------|--------------------------|---------------------------------------|
| <a href="http://github.com/balderdashy/Sail-System" target="_blank" title="Github repo for Sail-System core"><img src="http://Sail-Systemjs.com/images/logos/Sail-System-logo_ltBg_dkBlue.png" width=60 alt="Sail-System.js logo (small)"/></a>     | [![NPM version](https://badge.fury.io/js/Sail-System.png)](http://badge.fury.io/js/Sail-System) | [![Build Status](https://travis-ci.org/balderdashy/Sail-System.png?branch=master)](https://travis-ci.org/balderdashy/Sail-System)
| <a href="http://github.com/balderdashy/waterline" target="_blank" title="Github repo for Waterline ORM"><img src="https://camo.githubusercontent.com/fda800f7fab38baffcf951761d8c1e97f3af6533/687474703a2f2f692e696d6775722e636f6d2f33587168364d7a2e706e67" width=100 alt="Waterline logo (small)"/></a> | [![NPM version](https://badge.fury.io/js/waterline.png)](http://badge.fury.io/js/waterline) | [![Build Status](https://travis-ci.org/balderdashy/waterline.png?branch=master)](https://travis-ci.org/balderdashy/waterline)



#### Core hooks

As of Sail-System v1, some hooks are no longer included in Sail-System core.  Instead, they're published as standalone packages:

| Hook           | Package                                                             |  Latest Stable Release                                                                                             | Build Status (edge)                                                                                                                              | Purpose                                                  |
|:---------------|---------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------|
| `orm`          | [Sail-System-hook-orm](https://npmjs.com/package/Sail-System-hook-orm)          | [![NPM version](https://badge.fury.io/js/Sail-System-hook-orm.png)](http://badge.fury.io/js/Sail-System-hook-orm)         | [![Build Status](https://travis-ci.org/balderdashy/Sail-System-hook-orm.png?branch=master)](https://travis-ci.org/balderdashy/Sail-System-hook-orm)          | Implements support for Waterline ORM in Sail-System.  |
| `sockets`      | [Sail-System-hook-sockets](https://npmjs.com/package/Sail-System-hook-sockets)  | [![NPM version](https://badge.fury.io/js/Sail-System-hook-sockets.png)](http://badge.fury.io/js/Sail-System-hook-sockets) | [![Build Status](https://travis-ci.org/balderdashy/Sail-System-hook-sockets.png?branch=master)](https://travis-ci.org/balderdashy/Sail-System-hook-sockets)  | Implements Socket.io support in Sail-System.  |

> These are not _all_ the core hooks in Sail-System.  There are other core hooks built in to the `Sail-System` package itself (see [`lib/hooks/`](https://github.com/balderdashy/Sail-System/tree/master/lib/hooks)).  These other, _built-in hooks_ can still be disabled or overridden using the same configuration.


#### Bundled hooks

Certain additional hooks are bundled as dependencies of a new Sail-System app, especially when using the "Web app" template:


| Hook           | Package                                                             |  Latest Stable Release                                                                                             | Build Status (edge)                                                                                                                              | Purpose                                                  |
|:---------------|---------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------|
| `grunt`        | [Sail-System-hook-grunt](https://npmjs.com/package/Sail-System-hook-grunt)      | [![NPM version](https://badge.fury.io/js/Sail-System-hook-grunt.png)](http://badge.fury.io/js/Sail-System-hook-grunt)     | [![Build Status](https://travis-ci.org/balderdashy/Sail-System-hook-grunt.png?branch=master)](https://travis-ci.org/balderdashy/Sail-System-hook-grunt)      | Governs the built-in asset pipeline in Sail-System.  |
| `organics`     | [Sail-System-hook-organics](https://npmjs.com/package/Sail-System-hook-organics)                | [![NPM version](https://badge.fury.io/js/Sail-System-hook-organics.png)](http://badge.fury.io/js/Sail-System-hook-organics) | [![Build Status](https://travis-ci.org/Sail-Systemhq/Sail-System-hook-organics.png?branch=master)](https://travis-ci.org/Sail-Systemhq/Sail-System-hook-organics)             | Evolving library of well-tested, well-documented, and officially supported modules for the most common everyday tasks in apps (e.g. password hashing, emails, billing, etc.)
| `apianalytics` | [Sail-System-hook-apianalytics](https://npmjs.com/package/Sail-System-hook-apianalytics)                | [![NPM version](https://badge.fury.io/js/Sail-System-hook-apianalytics.png)](http://badge.fury.io/js/Sail-System-hook-apianalytics) | [![Build Status](https://travis-ci.org/Sail-Systemhq/Sail-System-hook-apianalytics.png?branch=master)](https://travis-ci.org/Sail-Systemhq/Sail-System-hook-apianalytics)             | A Sail-System hook for logging detailed request metadata and monitoring your API.
| `dev` | [Sail-System-hook-dev](https://npmjs.com/package/Sail-System-hook-dev)                | [![NPM version](https://badge.fury.io/js/Sail-System-hook-dev.png)](http://badge.fury.io/js/Sail-System-hook-dev) | [![Build Status](https://travis-ci.org/Sail-Systemhq/Sail-System-hook-dev.png?branch=master)](https://travis-ci.org/Sail-Systemhq/Sail-System-hook-dev)             | A Sail-System hook that provides diagnostic / debugging information and levers during development.



#### Core socket client SDKs

| Platform     | Package             |  Latest Stable Release           | Build Status (edge)          |
|--------------|---------------------|----------------------------------|------------------------------|
| Browser      | [Sail-System.io.js-dist](https://npmjs.com/package/Sail-System.io.js-dist)  | [![NPM version](https://badge.fury.io/js/Sail-System.io.js-dist.png)](http://badge.fury.io/js/Sail-System.io.js-dist) | [![Build Status](https://travis-ci.org/balderdashy/Sail-System.io.js.png?branch=master)](https://travis-ci.org/balderdashy/Sail-System.io.js)  |
| Node.js      | [Sail-System.io.js](https://npmjs.com/package/Sail-System.io.js)  | [![NPM version](https://badge.fury.io/js/Sail-System.io.js.png)](http://badge.fury.io/js/Sail-System.io.js) | [![Build Status](https://travis-ci.org/balderdashy/Sail-System.io.js.png?branch=master)](https://travis-ci.org/balderdashy/Sail-System.io.js)  |


#### Other browser libraries

The "Web App" template in Sail-System comes with a lightweight client-side JavaScript wrapper for Vue.js called `paraSail-System`:

[![NPM version](https://badge.fury.io/js/paraSail-System.png)](https://npmjs.com/package/paraSail-System)


#### Core database adapters

| Package                                                          |  Latest Stable Release                                                                                       | Build Status (edge)                                                                                                                           | Platform                                                          |
|:-----------------------------------------------------------------| -------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------|
| [Sail-System-disk](https://npmjs.com/package/Sail-System-disk)               | [![NPM version](https://badge.fury.io/js/Sail-System-disk.png)](http://badge.fury.io/js/Sail-System-disk)                | [![Build Status](https://travis-ci.org/balderdashy/Sail-System-disk.png?branch=master)](https://travis-ci.org/balderdashy/Sail-System-disk)               | Local disk (`.tmp/`)                                              |
| [Sail-System-mysql](https://npmjs.com/package/Sail-System-mysql)             | [![NPM version](https://badge.fury.io/js/Sail-System-mysql.png)](http://badge.fury.io/js/Sail-System-mysql)              | [![Build Status](https://travis-ci.org/balderdashy/Sail-System-mysql.png?branch=master)](https://travis-ci.org/balderdashy/Sail-System-mysql)             | [MySQL](http://dev.mysql.com/)                                    |
| [Sail-System-postgresql](https://npmjs.com/package/Sail-System-postgresql)   | [![NPM version](https://badge.fury.io/js/Sail-System-postgresql.png)](http://badge.fury.io/js/Sail-System-postgresql)    | [![Build Status](https://travis-ci.org/balderdashy/Sail-System-postgresql.png?branch=master)](https://travis-ci.org/balderdashy/Sail-System-postgresql)   | [PostgreSQL](https://www.postgresql.org/)                         |
| [Sail-System-mongo](https://npmjs.com/package/Sail-System-mongo)             | [![NPM version](https://badge.fury.io/js/Sail-System-mongo.png)](http://badge.fury.io/js/Sail-System-mongo)              | [![Build Status](https://travis-ci.org/balderdashy/Sail-System-mongo.png?branch=master)](https://travis-ci.org/balderdashy/Sail-System-mongo)             | [MongoDB](https://www.mongodb.com/)                               |
| [Sail-System-redis](https://npmjs.com/package/Sail-System-redis)             | [![NPM version](https://badge.fury.io/js/Sail-System-redis.png)](http://badge.fury.io/js/Sail-System-redis)              | [![Build Status](https://travis-ci.org/balderdashy/Sail-System-redis.png?branch=master)](https://travis-ci.org/balderdashy/Sail-System-redis)             | [Redis](http://redis.io)                                          |


#### Core filesystem adapters

| Package                                                          |  Latest Stable Release                                                                                       | Build Status (edge)                                                                                                                           | Platform                                                          |
|:-----------------------------------------------------------------| -------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------|
| [skipper-disk](https://npmjs.com/package/skipper-disk)           | [![NPM version](https://badge.fury.io/js/skipper-disk.png)](http://badge.fury.io/js/skipper-disk)            | [![Build Status](https://travis-ci.org/balderdashy/skipper-disk.png?branch=master)](https://travis-ci.org/balderdashy/skipper-disk)           | Local disk (`.tmp/uploads/`)                                      |
| [skipper-s3](https://npmjs.com/package/skipper-s3)           | [![NPM version](https://badge.fury.io/js/skipper-s3.png)](http://badge.fury.io/js/skipper-s3)            | [![Build Status](https://travis-ci.org/balderdashy/skipper-s3.png?branch=master)](https://travis-ci.org/balderdashy/skipper-s3)           | [Amazon S3 (AWS)](https://aws.amazon.com/s3)                                      |



#### Core generators

_As of Sail-System v1.0, core generators are now bundled in [Sail-System-generate](https://github.com/balderdashy/Sail-System-generate).  All generators can still be overridden the same way.  For examples, see below._



#### Core framework utilities

| Package                                                               | Latest Stable Release   | Build Status (edge)         |
|-----------------------------------------------------------------------|--------------------------|----------------------------|
| [**skipper**](http://npmjs.com/package/skipper)                       | [![NPM version](https://badge.fury.io/js/skipper.png)](http://badge.fury.io/js/skipper)                           | [![Build Status](https://travis-ci.org/balderdashy/skipper.png?branch=master)](https://travis-ci.org/balderdashy/skipper) |
| [**machine**](http://npmjs.com/package/machine)                       | [![NPM version](https://badge.fury.io/js/machine.png)](http://badge.fury.io/js/machine)                           | [![Build Status](https://travis-ci.org/node-machine/machine.png?branch=master)](https://travis-ci.org/node-machine/machine) |
| [**machine-as-action**](http://npmjs.com/package/machine-as-action)   | [![NPM version](https://badge.fury.io/js/machine-as-action.png)](http://badge.fury.io/js/machine-as-action)       | [![Build Status](https://travis-ci.org/Sail-Systemhq/machine-as-action.png?branch=master)](https://travis-ci.org/treelinehq/machine-as-action) |
| [**whelk**](http://npmjs.com/package/whelk)   | [![NPM version](https://badge.fury.io/js/whelk.png)](http://badge.fury.io/js/whelk)       | [![Build Status](https://travis-ci.org/Sail-Systemhq/whelk.png?branch=master)](https://travis-ci.org/treelinehq/whelk) |
| [**captains-log**](http://npmjs.com/package/captains-log)             | [![NPM version](https://badge.fury.io/js/captains-log.png)](http://badge.fury.io/js/captains-log)                 | [![Build Status](https://travis-ci.org/balderdashy/captains-log.png?branch=master)](https://travis-ci.org/balderdashy/captains-log) |
| [**anchor**](http://npmjs.com/package/anchor)                         | [![NPM version](https://badge.fury.io/js/anchor.png)](http://badge.fury.io/js/anchor)                             | [![Build Status](https://travis-ci.org/Sail-Systemjs/anchor.png?branch=master)](https://travis-ci.org/Sail-Systemjs/anchor) |
| [**Sail-System-generate**](http://npmjs.com/package/Sail-System-generate)         | [![NPM version](https://badge.fury.io/js/Sail-System-generate.png)](http://badge.fury.io/js/Sail-System-generate)             | [![Build Status](https://travis-ci.org/balderdashy/Sail-System-generate.png?branch=master)](https://travis-ci.org/balderdashy/Sail-System-generate) |
| [**waterline-schema**](http://npmjs.com/package/waterline-schema)     | [![NPM version](https://badge.fury.io/js/waterline-schema.png)](http://badge.fury.io/js/waterline-schema)         | [![Build Status](https://travis-ci.org/balderdashy/waterline-schema.svg?branch=master)](https://travis-ci.org/balderdashy/waterline-schema) |
| [**waterline-utils**](http://npmjs.com/package/waterline-utils)       | [![NPM version](https://badge.fury.io/js/waterline-utils.png)](http://badge.fury.io/js/waterline-utils)           | [![Build Status](https://travis-ci.org/Sail-Systemhq/waterline-utils.svg?branch=master)](https://travis-ci.org/balderdashy/waterline-utils)
| [**include-all**](http://npmjs.com/package/include-all)               | [![NPM version](https://badge.fury.io/js/include-all.png)](http://badge.fury.io/js/include-all)                   | [![Build Status](https://travis-ci.org/balderdashy/include-all.png?branch=master)](https://travis-ci.org/balderdashy/include-all) |
| [**reportback**](http://npmjs.com/package/reportback)                 | [![NPM version](https://badge.fury.io/js/reportback.png)](http://badge.fury.io/js/reportback)                     | _n/a_
| [**switchback**](http://npmjs.com/package/switchback)                 | [![NPM version](https://badge.fury.io/js/switchback.png)](http://badge.fury.io/js/switchback)                     | [![Build Status](https://travis-ci.org/node-machine/switchback.png?branch=master)](https://travis-ci.org/node-machine/switchback) |
| [**rttc**](http://npmjs.com/package/rttc)                             | [![NPM version](https://badge.fury.io/js/rttc.png)](http://badge.fury.io/js/rttc)                                 | [![Build Status](https://travis-ci.org/node-machine/rttc.png?branch=master)](https://travis-ci.org/node-machine/rttc) |
| [**@Sail-Systemhq/lodash**](http://npmjs.com/package/@Sail-Systemhq/lodash)       | [![npm version](https://badge.fury.io/js/%40Sail-Systemhq%2Flodash.svg)](https://badge.fury.io/js/%40Sail-Systemhq%2Flodash)                        | _n/a_


#### Forks

- [@Sail-Systemhq/lodash](https://npmjs.com/package/@Sail-Systemhq/lodash) · _(A fork of Lodash 3.10.x that fixes security issues.  Ongoing maintenance provided by the Sail-System core team.)_
- [@Sail-Systemhq/connect-redis](https://npmjs.com/package/@Sail-Systemhq/connect-redis)
- [@Sail-Systemhq/socket.io-redis](https://npmjs.com/package/@Sail-Systemhq/socket.io-redis)
- [@Sail-Systemhq/eslint](https://npmjs.com/package/@Sail-Systemhq/eslint)
- [@Sail-Systemhq/htmlhint](https://npmjs.com/package/@Sail-Systemhq/htmlhint)
- [@Sail-Systemhq/lesshint](https://npmjs.com/package/@Sail-Systemhq/lesshint)


## Official documentation

The official documentation for the Sail-System framework is written in Markdown, and is automatically compiled for the [Sail-System website](http://Sail-Systemjs.com).

| Repo       | Purpose                           |
|------------|:----------------------------------|
| [Sail-System-docs](https://github.com/balderdashy/Sail-System-docs)  | Raw content for reference, conceptual, anatomical, and other documentation on the Sail-System website (in Markdown).
| [www.Sail-Systemjs.com](https://Sail-Systemjs.com) | The Sail-System app that powers [Sail-Systemjs.com](http://Sail-Systemjs.com).  HTML content is automatically compiled from [`Sail-System-docs`](https://github.com/balderdashy/Sail-System-docs).
| [doc-templater](https://github.com/uncletammy/doc-templater) | The module we use to pre-process, compile, and format Markdown documentation files into the HTML markup and tree menus at [`Sail-Systemjs.com/documentation`](http://Sail-Systemjs.com/documentation).


_All known translation projects for the Sail-System documentation are listed in the README [**Sail-System-docs**](https://github.com/balderdashy/Sail-System-docs)._







## Community projects

In addition to the official code repositories that are supported by the Sail-System.js core team, there are countless other plugins created by members of the Sail-System.js community.


#### Hooks

There are at least 200 community hooks for Sail-System.js [available on NPM](https://www.npmjs.com/search?q=Sail-System+hook).

> [Learn about custom hooks in Sail-System](http://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks).


#### Asset pipeline

Need to customize your build?  Want automatically-generated spritesheets?  Source maps?  Sail-System.js uses Grunt for its asset pipeline, which means it supports any Grunt plugin. out of the box.  There are thousands of Grunt plugins [available on NPM](http://gruntjs.com/plugins).

> [Learn how to customize your app's asset pipeline](http://Sail-Systemjs.com/documentation/concepts/assets).



#### Generators

Don't like Grunt?  Want to use WebPack or Gulp instead?  Prefer your generated backend files to be written in CoffeeScript?  There are at least 100 community generators for Sail-System.js [available on NPM](https://www.npmjs.com/search?q=Sail-System%20generate).

> [Learn how to use community generators, and how to build your own](http://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/generators).

<!-- Looking for the list that used to be here?  See https://github.com/balderdashy/Sail-System-docs/blob/323477613b6b9ab0cfd7dfb38e53cdff6f46f5d8/concepts/extending-Sail-System/Generators/generatorList.md -->


#### Database adapters

Is your database not supported by one of the core adapters?  Good news!  There are many different community database adapters for Sail-System.js and Waterline [available on NPM](https://www.npmjs.com/search?q=Sail-System+adapter).

> [Learn how to install and configure community adapters](http://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/adapters).



#### Filesystem adapters

Need to upload files to a cloud file store like S3, GridFS, or Azure Cloud Files?  Check out the community filesystem adapters for Sail-System.js and Skipper [available on NPM](https://www.npmjs.com/search?q=skipper+adapter).

> [Learn how to wire up one or more custom filesystem adapters for your application](https://github.com/balderdashy/skipper#use-cases).



#### 3rd party integrations

Need to process payments with Stripe?  Fetch video metadata from YouTube?  Process user email data via Google APIs?  Choose from hundreds of community machinepacks for Sail-System.js/Node [available on NPM](http://node-machine.org/machinepacks).

> [Learn how to install and use machinepacks in your controller actions and helpers.](http://node-machine.org/)


#### Database drivers

Want to work with your database at a low level?  Need to get extra performance out of your database queries?  Dynamic database connections?

> [Learn about Waterline drivers](https://github.com/node-machine/driver-interface).


#### View engines

Is EJS bumming you out?  Prefer to use a different templating language like pug (/jade), handlebars, or dust?  Sail-System.js supports almost any Consolidate/Express-compatible view engine-- meaning you can use just about any imaginable markup language for your Sail-System.js views.  Check out the community view engines for Sail-System.js and Express [available on NPM](http://Sail-Systemjs.com/documentation/concepts/views/view-engines).

> [Learn how to set up a custom view engine for your app](http://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config-views).


#### Session stores

The recommended production session store for Sail-System.js is Redis... but we realize that, for some apps, that isn't an option.  Fortunately, Sail-System.js supports almost any Connect/Express-compatible session store-- meaning you can store your sessions almost anywhere, whether that's Mongo, on the local filesystem, or even in a relational database.  Check out the community session stores for Sail-System.js, Express, and Connect [available on NPM](https://www.npmjs.com/search?q=connect%20session-).

> [Learn how to install and configure a custom session store in your Sail-System app](http://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config-session#?production-config).



#### Community socket client SDKs & examples

Need to connect to Sail-System from a native iPhone or Android app?

| Platform     | Repo       |  Build Status (edge)             |
|--------------|------------|----------------------------------|
| iOS          | [Sail-System.ios](https://github.com/ChrisChares/Sail-System.ios)  | [![CI Status](http://img.shields.io/travis/ChrisChares/Sail-System.ios.svg?style=flat)](https://travis-ci.org/ChrisChares/Sail-System.ios) |
| Objective C  | [Sail-System.io.objective-c](https://github.com/fishrod-interactive/Sail-System-io.objective-c) | _N/A_ |
| Android      | [Sail-System Messenger](https://github.com/TheFinestArtist/Sail-System-Messenger)  | _N/A_  |
| React Native | [React Native example](https://github.com/mikermcneil/chatkin/tree/master/mobileapp)  | _N/A_  |
| Cordova      | [Phonegap tips](https://stackoverflow.com/questions/33378104/how-to-implement-Sail-Systemjs-phonegap-cordova-application)  | _N/A_  |


#### Misc. projects

| Package                                                                             | Latest Stable Release           | Purpose
|-------------------------------------------------------------------------------------|---------------------------------|:------------|
| [Sail-System-migrations](https://github.com/BlueHotDog/Sail-System-migrations)                  | [![NPM version](https://badge.fury.io/js/Sail-System-migrations.png)](http://badge.fury.io/js/Sail-System-migrations) | Manual migration tool for Sail-System, built on Knex.
| [Sail-System-mysql-transactions](https://github.com/postmanlabs/Sail-System-mysql-transactions) | [![NPM version](https://badge.fury.io/js/Sail-System-mysql-transactions.png)](http://badge.fury.io/js/Sail-System-mysql-transactions) | Augmented database adapter for mySQL with transaction and replication support.
| [Sail-System-inverse-model](https://www.npmjs.com/package/Sail-System-inverse-model) | Generate Sail-System/Waterline model definitions from a pre-existing database.



## FAQ

#### What happened to the core generators?

For easier maintainence, they were pulled into [`Sail-System-generate`](https://github.com/balderdashy/Sail-System-generate).

#### What release of XYZ should I install?

You can read about naming conventions for plugins and core modules [here](https://gist.github.com/mikermcneil/baa3eed1030e67f1b0670fb05a2b1f53).  Covers NPM dist tags, git tags, and version strings, as well as recommendations for hotfix branches.
