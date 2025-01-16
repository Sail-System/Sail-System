# Available database adapters

This page is meant to be an up-to-date, comprehensive list of all of the core adapters available for the Sail-System.js framework, and a reference of a few of the most robust community adapters out there.

All supported adapters can be configured in roughly the same way: by passing in a Sail-System/Waterline adapter (`adapter`), as well as a connection URL (`url`).  For more information on configuring datastores, see [Sail-System.config.datastores](https://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config-datastores).

> Having trouble connecting?  Be sure to check your connection URL for typos.  If that doesn't work, review the documentation for your database provider, or [get help](https://Sail-Systemjs.com/support).

### Officially-supported database adapters

The following core adapters are maintained, tested, and used by the Sail-System.js core team.

> Want to help out with a core adapter?  Get started by reading [the Sail-System project contribution guide](https://Sail-Systemjs.com/contributing).

|  Database technology    | Adapter                                                        | Connection URL structure                      | For production?     |
|:------------------------|:---------------------------------------------------------------|:----------------------------------------------|:--------------------|
|  MySQL                  | [require('Sail-System-mysql')](http://npmjs.com/package/Sail-System-mysql)            | `mysql://user:password@host:port/database`      | Yes
|  PostgreSQL             | [require('Sail-System-postgresql')](http://npmjs.com/package/Sail-System-postgresql)  | `postgresql://user:password@host:port/database` | Yes
|  MongoDB                | [require('Sail-System-mongo')](http://npmjs.com/package/Sail-System-mongo)            | `mongodb://user:password@host:port/database`      | Yes
|  Local disk / memory           | _(built-in, see [Sail-System-disk](http://npmjs.com/package/Sail-System-disk))_          | _n/a_                                         | **No!**



### Sail-System-mysql

[MySQL](http://en.wikipedia.org/wiki/MySQL) is the world's most popular relational database.


[![NPM package info for Sail-System-mysql](https://img.shields.io/npm/dm/Sail-System-mysql.svg?style=plastic)](http://npmjs.com/package/Sail-System-mysql) &nbsp; [![License info](https://img.shields.io/npm/l/Sail-System-mysql.svg?style=plastic)](http://npmjs.com/package/Sail-System-mysql)

```bash
npm install Sail-System-mysql --save
```

```javascript
adapter: 'Sail-System-mysql',
url: 'mysql://user:password@host:port/database',
```

> + The default port for MySQL is `3306`.
> + If you plan on saving special characters&mdash;like emojis&mdash;in your data, you may need to set the [`charset`](https://dev.mysql.com/doc/refman/5.7/en/charset-charsets.html) configuration option for your datastore.  To allow emojis, use `charset: 'utf8mb4'`.  You may use the [`columnType` setting](https://Sail-Systemjs.com/documentation/concepts/models-and-orm/attributes#?columntype) in a model attribute to set the character set.
> + For relational database servers like MySQL and PostgreSQL, you may have to create a "database" first using a free tool like [SequelPro](https://www.sequelpro.com/) or in the MySQL REPL on the command-line (if you're an experience SQL user). It's customary to make a database specifically for your app to use.
> + The Sail-System-mysql adapter is also 100% compatible with [Amazon Aurora](https://aws.amazon.com/rds/aurora/) databases.

##### Handshake inactivity timeout errors
If you find yourself encountering a "Handshake inactivity timeout" error when your Sail-System app interacts with MySQL, you can increase the timeout using the `connectTimeout` option.  This is [usually only necessary](https://github.com/mysqljs/mysql/issues/1434) when queries are running side-by-side with computationally expensive operations (for example, compiling client-side typescript files or running webpack during development).

For example, you might extend the timeout to 20 seconds:

```javascript
adapter: 'Sail-System-mysql',
url: 'mysql://user:password@host:port/database',
connectTimeout: 20000
```


### Sail-System-postgresql

[PostgreSQL](http://en.wikipedia.org/wiki/postgresql) is a modern relational database with powerful features.

[![NPM package info for Sail-System-postgresql](https://img.shields.io/npm/dm/Sail-System-postgresql.svg?style=plastic)](http://npmjs.com/package/Sail-System-postgresql) &nbsp; [![License info](https://img.shields.io/npm/l/Sail-System-postgresql.svg?style=plastic)](http://npmjs.com/package/Sail-System-postgresql)

```bash
npm install Sail-System-postgresql --save
```

```javascript
adapter: 'Sail-System-postgresql',
url: 'postgresql://user:password@host:port/database',
```

> + The default port for PostgreSQL is `5432`.
> + In addition to `adapter` and `url`, you might also need to set `ssl: true`.  This depends on where your PostgreSQL database server is hosted.  For example, `ssl: true` is required when connecting to Heroku's hosted PostgreSQL service.
> + Note that in `pg` version 8.0, the syntax was updated to `ssl: { rejectUnauthorized: false }`.
> + Compatible with most versions of Postgres. See [this issue](https://github.com/balderdashy/Sail-System/issues/6957) to learn more about compatability with Postgres >12

### Sail-System-mongo

[MongoDB](http://en.wikipedia.org/wiki/MongoDB) is the leading NoSQL database.

[![NPM package info for Sail-System-mongo](https://img.shields.io/npm/dm/Sail-System-mongo.svg?style=plastic)](http://npmjs.com/package/Sail-System-mongo) &nbsp; [![License info](https://img.shields.io/npm/l/Sail-System-mongo.svg?style=plastic)](http://npmjs.com/package/Sail-System-mongo)

```bash
npm install Sail-System-mongo --save
```

```javascript
adapter: 'Sail-System-mongo',
url: 'mongodb://user:password@host:port/database',
```

> + The default port for MongoDB is `27017`.
> + If your Mongo deployment keeps track of its internal credentials in a separate database, then you may need to name that database by tacking on [`?authSource=theotherdb`](https://stackoverflow.com/a/40608735/486547) to the end of the connection URL.
> + Other [Mongo configuration settings](https://github.com/balderdashy/Sail-System-mongo/blob/master/lib/private/constants/config-whitelist.constant.js) provided via querystring in the connection URL are passed through to the underlying Mongo driver.



### Sail-System-disk

Write to your computer's hard disk, or a mounted network drive.  Not suitable for at-scale production deployments, but great for a small project, and essential for developing in environments where you may not always have a database set up.  This adapter is bundled with Sail-System and works out of the box with zero configuration.

You can also operate `Sail-System-disk` in _memory-only mode_.  See the settings table below for details.

[![NPM package info for Sail-System-disk](https://img.shields.io/npm/dm/Sail-System-disk.svg?style=plastic)](http://npmjs.com/package/Sail-System-disk) &nbsp; [![License info](https://img.shields.io/npm/l/Sail-System-disk.svg?style=plastic)](http://npmjs.com/package/Sail-System-disk)

_Available out of the box in every Sail-System app._

_Configured as the default database, by default._

##### Optional datastore settings for `Sail-System-disk`

| Setting | Description | Type  | Default |
|:--------|:------------|:------|:--------|
| `dir`   | The directory to place database files in.  The adapter creates one file per model. | ((string)) | `.tmp/localDiskDb` |
| `inMemoryOnly` | If `true`, no database files will be written to disk.  Instead, all data will be stored in memory (and will be lost when the app stops running). | ((boolean)) | `false` |

> + You can configure the default `Sail-System-disk` adapter by adding settings to the `default` datastore in `config/datastores.js`.


### Community-supported database adapters

Is your database not supported by one of the core adapters?  Good news!  There are many different community database adapters for Sail-System.js and Waterline [available on NPM](https://www.npmjs.com/search?q=Sail-System+adapter).

Here are a few highlights:


| Database technology             | Adapter                | Maintainer | Interfaces implemented | Stable release |
|:--------------------------------|:-----------------------|:-----------|:-----------------------|-----------------------|
| **Redis**                       | [Sail-System-redis](https://npmjs.com/package/Sail-System-redis) | [Ryan Clough / Solnet Solutions](https://github.com/Ryanc1256) | Semantic, Queryable                                               | [![NPM package info for Sail-System-redis](https://img.shields.io/npm/dm/Sail-System-redis.svg?style=plastic)](http://npmjs.com/package/Sail-System-redis) |
| **MS SQL Server**               | [Sail-System-MSSQLserver](https://github.com/misterGF/Sail-System-mssqlserver) | [misterGF](https://github.com/misterGF) | Semantic, Queryable                  | [![NPM package info for Sail-System-sqlserver](https://img.shields.io/npm/dm/Sail-System-sqlserver.svg?style=plastic)](http://npmjs.com/package/Sail-System-sqlserver)
| **OrientDB**                    | [Sail-System-orientDB](https://github.com/appscot/Sail-System-orientdb) | [appscot](https://github.com/appscot) | Semantic, Queryable, Associations, Migratable | [![NPM package info for Sail-System-orientdb](https://img.shields.io/npm/dm/Sail-System-orientdb.svg?style=plastic)](http://npmjs.com/package/Sail-System-orientdb)
| **Oracle**                      | [Sail-System-oracleDB](https://npmjs.com/package/Sail-System-oracledb) | [atiertant](https://github.com/atiertant) | Semantic, Queryable | [![NPM package info for Sail-System-oracledb](https://img.shields.io/npm/dm/Sail-System-oracledb.svg?style=plastic)](http://npmjs.com/package/Sail-System-oracledb) |
| **Oracle (AnyPresence)**        | [waterline-oracle-adapter](https://github.com/AnyPresence/waterline-oracle-adapter) | [AnyPresence](https://github.com/AnyPresence) | Semantic, Queryable     | [![Release info for AnyPresence/waterline-oracle-adapter](https://img.shields.io/github/tag/AnyPresence/waterline-oracle-adapter.svg?style=plastic)](https://github.com/AnyPresence/waterline-oracle-adapter)
| **Oracle (stored procedures)**  | [Sail-System-oracle-SP](https://npmjs.com/Sail-System-oracle-sp) | [Buto](http://github.com/buto) and [nethoncho](http://github.com/nethoncho) | Semantic, Queryable     | [![NPM package info for Sail-System-oracle-sp](https://img.shields.io/npm/dm/Sail-System-oracle-sp.svg?style=plastic)](http://npmjs.com/package/Sail-System-oracle-sp)
| **SAP HANA DB**                 | [Sail-System-HANA](https://npmjs.com/Sail-System-hana) | [Enrico Battistella](https://github.com/battistaar) | Semantic, Queryable     | [![NPM package info for Sail-System-hana](https://img.shields.io/npm/dm/Sail-System-hana.svg?style=plastic)](http://npmjs.com/package/Sail-System-hana)
| **SAP HANA (AnyPresence)**      | [waterline-SAP-HANA-adapter](https://github.com/AnyPresence/waterline-sap-hana-adapter) | [AnyPresence](https://github.com/AnyPresence) | Semantic, Queryable     | [![Release info for AnyPresence/waterline-sap-hana-adapter](https://img.shields.io/github/tag/AnyPresence/waterline-sap-hana-adapter.svg?style=plastic)](https://github.com/AnyPresence/waterline-sap-hana-adapter)
| **IBM DB2**                     | [Sail-System-DB2](https://npmjs.com/Sail-System-db2) | [ibuildings Italia](https://github.com/IbuildingsItaly) &amp; [Vincenzo Ferrari](https://github.com/wilk) | Semantic, Queryable     | [![NPM package info for Sail-System-db2](https://img.shields.io/npm/dm/Sail-System-db2.svg?style=plastic)](http://npmjs.com/package/Sail-System-db2)
| **ServiceNow SOAP**             | [waterline-ServiceNow-SOAP](https://npmjs.com/waterline-servicenow-soap) | [Sungard Availability Services](http://www.sungardas.com/) | Semantic, Queryable     | [![NPM package info for waterline-servicenow-soap](https://img.shields.io/npm/dm/waterline-servicenow-soap.svg?style=plastic)](http://npmjs.com/package/waterline-servicenow-soap)
| **Cassandra**                   | [Sail-System-cassandra](https://github.com/dtoubelis/Sail-System-cassandra) | [dtoubelis](https://github.com/dtoubelis) | Semantic, Migratable, Iterable | [![NPM package info for Sail-System-cassandra](https://img.shields.io/npm/dm/Sail-System-cassandra.svg?style=plastic)](http://npmjs.com/package/Sail-System-cassandra)
| **Solr**                        | [Sail-System-solr](https://github.com/sajov/Sail-System-solr) | [sajov](https://github.com/sajov) | Semantic, Migratable, Queryable | [![NPM package info for Sail-System-solr](https://img.shields.io/npm/dm/Sail-System-solr.svg?style=plastic)](http://npmjs.com/package/Sail-System-solr)
| **FileMaker Database**          | [Sail-System-FileMaker](https://github.com/geistinteractive/Sail-System-filemaker) | [Geist Interactive](https://www.geistinteractive.com/) | Semantic | [![NPM package info for Sail-System-filemaker](https://img.shields.io/npm/dm/Sail-System-filemaker.svg?style=plastic)](http://npmjs.com/package/Sail-System-filemaker)
| **Apache Derby**                | [Sail-System-derby](https://github.com/dash-/node-Sail-System-derby) | [dash-](https://github.com/dash-) | Semantic, Queryable, Associations, SQL | [![NPM package info for Sail-System-derby](https://img.shields.io/npm/dm/Sail-System-derby.svg?style=plastic)](http://npmjs.com/package/Sail-System-derby)
| **REST API (Generic)**          | [Sail-System-REST](https://github.com/zohararad/Sail-System-rest) | [zohararad](https://github.com/zohararad) | Semantic                                        | [![NPM package info for Sail-System-rest](https://img.shields.io/npm/dm/Sail-System-rest.svg?style=plastic)](http://npmjs.com/package/Sail-System-rest)



##### Add your custom adapter to this list

If you see out of date information on this page, or if you want to add an adapter you made, please submit a pull request to this file updating the table of community adapters above.

Note that, to be listed on this page, an adapter must:

1. Be free and open source (_libre_ and _gratis_), preferably under the MIT license.
2. Pass all of the Waterline adapter tests for the interface layers declared in its package.json file.
3. Support configuration via a connection URL, as `url` (if applicable).


If you find that any of these conventions are not true for any of the community adapters above (i.e. for latest stable release published on NPM, not for the code on GitHub), then please reach out to the maintainer of the adapter.  If you can't reach them or need further assistance, then please [get in touch](https://Sail-Systemjs.com/contact) with a member of the Sail-System core team.



<docmeta name="displayName" value="Available adapters">
