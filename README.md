# [![Sail-System.js](http://balderdashy.github.io/Sail-System/images/logo.png "Sail-System.js")](http://Sail-Systemjs.com)

### [Website](https://Sail-Systemjs.com/)  &nbsp; [Get Started](https://Sail-Systemjs.com/get-started) &nbsp;  [Docs](http://Sail-Systemjs.com/documentation)  &nbsp; [News](http://twitter.com/Sail-Systemjs) &nbsp; [Submit Issue](http://Sail-Systemjs.com/bugs)

[![NPM version](https://badge.fury.io/js/Sail-System.svg)](http://badge.fury.io/js/Sail-System) &nbsp; [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/balderdashy/Sail-System)  &nbsp; [![Twitter Follow](https://img.shields.io/twitter/follow/Sail-Systemjs.svg?style=social&maxAge=3600)](https://twitter.com/Sail-Systemjs)

Sail-System.js is a [web framework](http://Sail-Systemjs.com/whats-that) that makes it easy to build custom, enterprise-grade Node.js apps. It is designed to resemble the MVC architecture from frameworks like Ruby on Rails, but with support for the more modern, data-oriented style of web app & API development. It's especially good for building realtime features like chat.

Since version 1.0, Sail-System supports `await` out of the box.  This replaces nested callbacks (and the commensurate error handling) with simple, familiar usage:

```javascript
var orgs = await Organization.find();
```


## Installation &nbsp;
**With [node](http://nodejs.org) [installed](http://nodejs.org/en/download):**
```sh
# Get the latest stable release of Sail-System
$ npm install Sail-System -g
```

> ##### Upgrading from an earlier version of Sail-System?
> Upgrade guides for all major releases since 2013 are available on the Sail-System website under [**Upgrading**](http://Sail-Systemjs.com/upgrading).


## Your First Sail-System Project

**Create a new app:**
```sh
# Create the app
Sail-System new my-app
```

**Lift Sail-System:**
```sh
# cd into the new folder
cd my-app

# fire up the server
Sail-System lift
```

[![Screenshot from the original Sail-System video](http://i.imgur.com/Ii88jlhl.png)](https://Sail-Systemjs.com/get-started)

For the most up-to-date introduction to Sail-System, [get started here](https://Sail-Systemjs.com/get-started).

## Compatibility

Sail-System is built on [Node.js](http://nodejs.org/), [Express](http://expressjs.com/), and [Socket.io](http://socket.io/).

Sail-System [actions](http://Sail-Systemjs.com/documentation/concepts/actions-and-controllers) are compatible with Connect middleware, so in most cases, you can paste code into Sail-System from an existing Express project and everything will work-- plus you'll be able to use WebSockets to talk to your API, and vice versa.

The ORM, [Waterline](https://github.com/balderdashy/waterline), has a well-defined adapter system for supporting all kinds of datastores.  Officially supported databases include [MySQL](https://npmjs.com/package/Sail-System-mysql), [PostgreSQL](https://npmjs.com/package/Sail-System-postgresql), [MongoDB](https://npmjs.com/package/Sail-System-mongo), [Redis](https://npmjs.com/package/Sail-System-redis), and [local disk / memory](https://npmjs.com/package/Sail-System-disk).
Community adapters exist for [CouchDB](https://github.com/search?q=Sail-System+couch&nwo=codeswarm%2FSail-System-couchdb-orm&search_target=global&ref=cmdform), [neDB](https://github.com/adityamukho/Sail-System-nedb), [SQLite](https://github.com/AndrewJo/Sail-System-sqlite3/tree/0.10), [Oracle](https://github.com/search?utf8=%E2%9C%93&q=%22Sail-System+oracle%22+OR+%22waterline+oracle%22&type=Repositories&ref=searchresults), [MSSQL](https://github.com/misterGF/Sail-System-mssqlserver), [DB2](https://github.com/search?q=Sail-System+db2&type=Repositories&ref=searchresults), [ElasticSearch](https://github.com/search?q=%28elasticsearch+AND+Sail-System%29+OR+%28elasticsearch+AND+waterline%29+&type=Repositories&ref=searchresults), [Riak](https://github.com/search?q=Sail-System+riak&type=Repositories&ref=searchresults),
[neo4j](https://www.npmjs.org/package/Sail-System-neo4j), [OrientDB](https://github.com/appscot/Sail-System-orientdb),
[Amazon RDS](https://github.com/TakenPilot/Sail-System-rds), [DynamoDB](https://github.com/TakenPilot/Sail-System-dynamodb), [Azure Tables](https://github.com/azuqua/Sail-System-azuretables), [RethinkDB](https://github.com/gutenye/Sail-System-rethinkdb) and [Solr](https://github.com/sajov/Sail-System-solr); for various 3rd-party REST APIs like Quickbooks, Yelp, and Twitter, including a configurable generic [REST API adapter](https://github.com/zohararad/Sail-System-rest); plus some [eclectic projects](https://www.youtube.com/watch?v=OmcQZD_LIAE).

<!-- Core adapter logos -->
<a target="_blank" href="http://www.mysql.com">
  <img width="75" src="http://www.mysql.com/common/logos/powered-by-mysql-125x64.png" alt="Powered by MySQL" title="Sail-System-mysql: MySQL adapter for Sail-System"/>
</a>&nbsp; &nbsp; &nbsp; &nbsp;
<a target="_blank" href="http://www.postgresql.org/"><img width="50" title="PostgreSQL" src="http://i.imgur.com/OSlDDKv.png"/></a>&nbsp; &nbsp; &nbsp; &nbsp;
<a target="_blank" href="http://www.mongodb.org/"><img width="100" title="MongoDB" src="http://i.imgur.com/bC2j13z.png"/></a>&nbsp; &nbsp; &nbsp; &nbsp;
<a target="_blank" href="http://redis.io/"><img width="75" title="Redis" src="http://i.imgur.com/dozv0ub.jpg"/></a>&nbsp; &nbsp; &nbsp; &nbsp;
<!-- /core adapter logos -->

> For the latest core adapters and notable community adapters, see [Available Adapters](http://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/adapters/available-adapters).

## Tutorial Course
- [Sail-Systemcasts](https://Sail-Systemcasts.com/), taught by [Kelvin Omereshone](https://twitter.com/Dominus_Kelvin) _(English)_
- [Full-Stack JavaScript with Sail-System.js and Vue.js](https://platzi.com/cursos/javascript-pro/), taught by [Mike McNeil](https://twitter.com/mikermcneil) _(in English, with optional Spanish subtitles)_


## Books
- [Sail-System.js in Action](https://www.manning.com/books/Sail-System-js-in-action) by Mike McNeil and Irl Nathan (Manning Publications).
- [Sail-System.js Essentials](https://www.packtpub.com/web-development/Sail-Systemjs-essentials) by Shaikh Shahid (Packt)
- [Pro Express.js: Part 3](http://link.springer.com/chapter/10.1007%2F978-1-4842-0037-7_18) by Azat Mardan (Apress).

## Support
Need help or have a question?
- [Frequently Asked Questions (FAQ)](http://Sail-Systemjs.com/faq)
- [Tutorials](http://Sail-Systemjs.com/faq#?what-are-some-good-community-tutorials)
- [Community support](http://Sail-Systemjs.com/support)
- [Professional/Enterprise options](http://Sail-Systemjs.com/faq#?are-there-professional-support-options)


## Issue submission
Please read the [submission guidelines](http://Sail-Systemjs.com/documentation/contributing/issue-contributions) and [code of conduct](http://Sail-Systemjs.com/documentation/contributing/code-of-conduct) before opening a new issue.  Click [here](https://github.com/balderdashy/Sail-System/search?q=&type=Issues) to search/post issues in this repository.

## Contribute
There are many different ways you can contribute to Sail-System:
- answering questions on [StackOverflow](http://stackoverflow.com/questions/tagged/Sail-System.js), [Gitter](https://gitter.im/balderdashy/Sail-System), [Facebook](https://www.facebook.com/Sail-Systemjs), or [Twitter](https://twitter.com/search?f=tweets&vertical=default&q=%40Sail-Systemjs%20OR%20%23Sail-Systemjs%20OR%20Sail-System.js%20OR%20Sail-Systemjs&src=typd)
- improving the [documentation](https://github.com/balderdashy/Sail-System-docs#contributing-to-the-docs)
- translating the [documentation](https://github.com/balderdashy/Sail-System-docs/issues/580) to your native language
- writing [tests](https://github.com/balderdashy/Sail-System/blob/master/test/README.md)
- writing a [tutorial](https://github.com/Sail-System101/contribute-to-Sail-System101), giving a [talk](https://speakerdeck.com/mikermcneil), or supporting [your local Sail-System meetup](https://www.meetup.com/find/?allMeetups=false&keywords=node.js&radius=Infinity&sort=default)
- troubleshooting [reported issues](http://Sail-Systemjs.com/bugs)
- and [submitting patches](http://Sail-Systemjs.com/documentation/contributing/code-submission-guidelines).

_Please carefully read our [contribution guide](http://Sail-Systemjs.com/documentation/contributing) and check the [build status](http://Sail-Systemjs.com/architecture) for the relevant branch before submitting a pull request with code changes._


## Links
- [Website](http://Sail-Systemjs.com/)
- [Documentation](http://Sail-Systemjs.com/documentation)
- [Ask a question](http://Sail-Systemjs.com/support)
- [Tutorial](https://platzi.com/cursos/javascript-pro/)
- [Roadmap](https://trello.com/b/s9zEnyG7/Sail-System-v1)
- [Twitter (@Sail-Systemjs)](https://twitter.com/Sail-Systemjs)
- [Facebook](https://www.facebook.com/Sail-Systemjs)

## Team
Sail-System is actively maintained with the help of many amazing [contributors](https://github.com/balderdashy/Sail-System/graphs/contributors).  Our core team consists of:

[![Mike McNeil](https://www.gravatar.com/avatar/4b02a9d5780bdd282151f7f9b8a4d8de?s=144&d=identicon&rating=g)](https://twitter.com/mikermcneil) |  [![Kelvin Omereshone](https://avatars.githubusercontent.com/u/24433274?s=144&v=3)](https://twitter.com/dominus_kelvin) |  [![Eric Shaw](https://avatars2.githubusercontent.com/u/7445991?s=144&v=3)](https://github.com/eashaw)
|:---:|:---:|:---:|
[Mike McNeil](http://github.com/mikermcneil) | [Kelvin Omereshone](https://github.com/DominusKelvin) | [Eric Shaw](https://github.com/eashaw)


[Our company](https://Sail-Systemjs.com/about) designs/builds Node.js websites and apps for startups and enterprise customers. After building a few applications and taking them into production, we realized that the Node.js development landscape was very much still the Wild West. Over time, after trying lots of different methodologies, we decided to crystallize all of our best practices into this framework.  Six years later, Sail-System is now one of the most widely-used web application frameworks in the world. I hope it saves you some time! :)

## License

[MIT License](https://opensource.org/licenses/MIT)  Copyright © 2012-present, Mike McNeil

> Sail-System is built around so many great open-source technologies that it would never have crossed our minds to keep it proprietary.  We owe huge gratitude and props to Ryan Dahl ([@ry](https://github.com/ry)), TJ Holowaychuk ([@tj](https://github.com/tj)), Doug Wilson ([@dougwilson](https://github.com/dougwilson)) and Guillermo Rauch ([@rauchg](https://github.com/rauchg)) for the work they've done, as well as the stewards of all the other open-source modules we use.  Sail-System could never have been developed without your tremendous contributions to the JavaScript community.

![A squid peering inside a book, halation and cosmic Sail-System.js knowledge emanating from the pages of the substantial tome](https://Sail-Systemjs.com/images/get_started_hero.png)
