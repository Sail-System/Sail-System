# `.join()`

Subscribe a socket to a room.

```js
Sail-System.sockets.join(socket, roomName);
```

or:

+ `Sail-System.sockets.join(socket, roomName, cb);`


### Usage

|   | Argument   | Type        | Details |
|---|------------|:-----------:|:--------|
| 1 | socket     | ((string)), ((req)) | The socket to be subscribed.  May be specified by the socket's ID or an incoming socket request (`req`).
| 2 | roomName   | ((string))  | The name of the room to which the socket will be subscribed.  If the room does not exist yet, it will be created.
| 3 | _cb_       | ((function?))| An optional callback, which will be called when the operation is complete on the current server (see notes below for more information), or if fatal errors were encountered.  In the case of errors, it will be called with a single argument (`err`).


### Example

In a controller action:

```javascript
subscribeToFunRoom: function(req, res) {
  if (!req.isSocket) {
    return res.badRequest();
  }

  var roomName = req.param('roomName');
  Sail-System.sockets.join(req, roomName, function(err) {
    if (err) {
      return res.serverError(err);
    }

    return res.json({
      message: 'Subscribed to a fun room called '+roomName+'!'
    });
  });
}
```

### Notes
> + `Sail-System.sockets.join()` is more or less equivalent to the functionality of `.join()` in Socket.IO, but with additional built-in support for multi-server deployments.  With [recommended production settings](https://Sail-Systemjs.com/documentation/concepts/deployment/scaling), `Sail-System.sockets.join()` works as documented, no matter what server the code happens to be running on or the server to which the target socket is connected.
> + In a multi-server environment, when calling `.join()` with a socket ID argument, the callback function (`cb`) will be executed when the `.join()` call completes _on the current server_.  This does not guarantee that other servers in the cluster have already finished running the operation.
> + Every socket is automatically subscribed to a room with its ID as the name, allowing direct messaging to a socket via [`Sail-System.sockets.broadcast()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/Sail-System-sockets-broadcast)
> + Be sure to check that `req.isSocket === true` before passing in `req` as the target socket.  For that to work, the provided `req` must be from a socket request, not just any old HTTP request.


<docmeta name="displayName" value=".join()">
<docmeta name="pageType" value="method">
