# `io.socket.put()`

Send a socket request (virtual PUT) to a Sail-System server using Socket.IO.

```js
io.socket.put(url, data, function (resData, jwres){
  // ...
});
```


### Usage


|   | Argument   | Type         | Details |
|---|------------|:------------:|---------|
| 1 | url        | ((string))   | The destination URL path, e.g. "/checkout".
| 2 | _data_     | ((json?))    | Optional request data. If provided, it will be JSON-encoded and included as the virtual HTTP body.
| 3 | _callback_ | ((function?)) | Optional callback. If provided, it will be called when the server responds.

##### Callback

|   | Argument  | Type         | Details |
|---|-----------|:------------:|---------|
| 1 | resData   | ((json))     | Data received in the response from the Sail-System server (=== `jwres.body`, equivalent to the HTTP response body).
| 2 | jwres     | ((dictionary))      | A JSON WebSocket Response object.  Has `headers`, a `body`, and a `statusCode`.


### Example

```html
<script>
io.socket.put('/users/9', { occupation: 'psychic' }, function (resData, jwr) {
  resData.statusCode; // => 200
});
</script>
```


### Notes
> + Remember that you can communicate with _any of your routes_ using socket requests.
> + Need to customize request headers?  Check out the slightly lower-level [`io.socket.request()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/io-socket-request) method. To set custom headers for _all_ outgoing requests, check out [`io.Sail-System.headers`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/io-Sail-System).



<docmeta name="displayName" value="io.socket.put()">
<docmeta name="pageType" value="method">