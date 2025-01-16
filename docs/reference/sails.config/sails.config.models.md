# `Sail-System.config.models`

Your default, project-wide **model settings**, conventionally specified in the [config/models.js](https://Sail-Systemjs.com/documentation/anatomy/config/models-js) configuration file.

Most of the settings below can also be overridden on a per-model basis&mdash;just edit the appropriate model definition file.  There are some additional model settings, too, which are not listed below; these can _only_ be specified on a per-model basis.  For more details, see [Concepts > Model Settings](https://Sail-Systemjs.com/documentation/concepts/orm/model-settings).

### Properties


  Property             | Type            | Default                         | Details
 :---------------------|:---------------:|:------------------------------- |:--------
  `attributes`         | ((dictionary))  | _see [Attributes](https://Sail-Systemjs.com/documentation/concepts/models-and-orm/attributes)_ | Default [attributes](https://Sail-Systemjs.com/documentation/concepts/models-and-orm/attributes) to implicitly include in all of your app's model definitions.  (Can be overridden on an attribute-by-attribute basis.)
 `migrate`             | ((string))   | _see [Model Settings](https://Sail-Systemjs.com/documentation/concepts/orm/model-settings)_        | The [auto-migration strategy](https://Sail-Systemjs.com/documentation/concepts/models-and-orm/model-settings#?migrate) for your Sail-System app.  How & whether Sail-System will attempt to automatically rebuild the tables/collections/etc. in your schema every time it lifts.
 `schema`              | ((boolean))     | `false`                      | Only relevant for models hooked up to a schemaless database like MongoDB.  If set to `true`, then the ORM will switch into "schemaful" mode.  For example, if properties passed in to `.create()`, `.createEach()`, or `.update()` do not correspond to recognized attributes, then they will be stripped out before saving.
 `datastore`           | ((string))   | `'default'`                     | The default [datastore configuration](https://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config-datastores) any given model will use without a configured override.  Avoid changing this.
 `primaryKey`          | ((string))   | `'id'`             | The name of the attribute that every model in your app should use as its primary key by default.  Can be overridden here or on a per-model basis, but there's [usually a better way](https://Sail-Systemjs.com/documentation/concepts/models-and-orm/model-settings#?primarykey).
  `archiveModelIdentity` | ((string)) _or_ ((boolean))   | `'archive'`             | The identity of the model to use when calling [`.archive()`](https://Sail-Systemjs.com/documentation/reference/waterline-orm/models/archive).  By default this is the Archive model, an implicit model automatically defined by Sail-System/Waterline.  Set to `false` to disable built-in support for soft-deletes.

<docmeta name="displayName" value="Sail-System.config.models">
<docmeta name="pageType" value="property">
