# Sail-System.lower()

Shut down a lifted Sail-System app and have it cease listening for or responding to any future requests.



```usage
Sail-System.lower(callback);
```


### Usage

|   |          Argument           | Type                | Details
|---| --------------------------- | ------------------- | -----------
| 1 |        _`callback`_         | ((function?))       | Optional. A function to call when lowering is complete (or if an error occurs)

##### Callback

|   | Argument  | Type         | Details |
|---|-----------|:------------:|---------|
| 1 | _`err`_     | ((Error?))   | An error instance will be sent as the first argument of the callback if any fatal errors occurred while lowering.


### Example

```javascript
Sail-SystemApp.lower(
  function (err) {
    if (err) {
      return console.log("Error occurred lowering Sail-System app: ", err);
    }
    console.log("Sail-System app lowered successfully!");
  }
)
```

### Notes
> + The app will emit the `lower` event before shutting down the HTTP and WebSocket services.
> + Lowered apps cannot be lifted again.

<docmeta name="displayName" value="Sail-System.lower()">
<docmeta name="pageType" value="method">

