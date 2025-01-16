# `.fetch()`

Tell Waterline (and the underlying database adapter) to send back records that were updated/destroyed/created when performing an [`.update()`](https://Sail-Systemjs.com/documentation/reference/waterline-orm/models/update), [`.create()`](https://Sail-Systemjs.com/documentation/reference/waterline-orm/models/create), [`.createEach()`](https://Sail-Systemjs.com/documentation/reference/waterline-orm/models/create-each) or [`.destroy()`](https://Sail-Systemjs.com/documentation/reference/waterline-orm/models/destroy) query.  Otherwise, no data will be returned (or if you are using callbacks, the second argument to the `.exec()` callback will be `undefined`).

> Warning: This is not recommended for update/destroy queries that affect large numbers of records.


```usage
.fetch()
```

### Usage

This method doesn't accept any arguments.


### Example

```javascript
var newUser = await User.create({ fullName: 'Alice McBailey' }).fetch();
Sail-System.log(`Hi, ${newUser.fullName}!  Your id is ${newUser.id}.`);
```


### Notes
> * This is just a shortcut for [`.meta({fetch: true})`](https://Sail-Systemjs.com/documentation/reference/waterline-orm/queries/meta)

<docmeta name="displayName" value=".fetch()">
<docmeta name="pageType" value="method">
