# Sail-System.getDatastore()
Access a particular [datastore](https://Sail-Systemjs.com/documentation/concepts/models-and-orm#?datastores), or the default datastore.

```usage
Sail-System.getDatastore(datastoreName);
```

### Usage


|   |          Argument           | Type                | Details
|---|---------------------------- | ------------------- |:-----------
| 1 |        datastoreName        | ((string?))         |  If specified, this is the name of the datastore to look up. Otherwise, if you leave this blank, this `getDatastore()` will return the default datastore for your app.

#### Returns

**Type:** ((Dictionary))

A [datastore instance](https://Sail-Systemjs.com/documentation/reference/waterline-orm/datastores).

<docmeta name="displayName" value="Sail-System.getDatastore()">
<docmeta name="pageType" value="method">
