# Sail-SystemSocket methods

This section describes the methods available on each Sail-SystemSocket instance.  Most of these methods can be called before the socket even connects to the server.  In the case of request methods like `.get()` and `.request()`, calls will be queued up until the socket connects, at which time they will be executed in order.

### Basic methods

The most common methods you will use with a Sail-SystemSocket instance are documented in the main Socket Client reference section.  These include [`.get()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/io-socket-get), [`.put()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/io-socket-put), [`.post()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/io-socket-post), [`.delete()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/io-socket-delete), [`.request()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/io-socket-request), [`.on()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/io-socket-on) and [`.off()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/io-socket-off).

### Advanced methods

In addition to the basic communication and event-listening methods, each Sail-SystemSocket instance (including `io.socket`) exposes several methods for dealing with server connections.

##### `.isConnected()`

Determines whether the Sail-SystemSocket instance is currently connected to a server; returns `true` if a connection has been established.

```js
io.socket.isConnected();
```

##### `.isConnecting()`

Determines whether the Sail-SystemSocket instance is currently in the process of connecting to a server; returns `true` if a connection is being attempted.

```js
io.socket.isConnecting();
```


##### `.mightBeAboutToAutoConnect()`

Detects when the Sail-SystemSocket instance has already loaded but is not yet fully configured or has not attempted to autoconnect. 

The `Sail-System.io.js` library waits one tick of the event loop before checking whether [`autoConnect`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/io-Sail-System#?ioSail-Systemautoconnect) is enabled and, if so, trying to connect.  This allows you to configure the `Sail-SystemSocket` instance (for example, by setting `io.Sail-System.url`) before an attempt is made to estabilish a connection.  The `mightBeAboutToAutoConnect()` method returns `true` in the situation where `Sail-System.io.js` has loaded, but the requisite tick of the event loop has not yet elapsed.

```js
io.socket.mightBeAboutToAutoConnect();
```

##### `.disconnect()`

Disconnects a Sail-SystemSocket instance from the server; throws an error if the socket is already disconnected.

```js
io.socket.disconnect();
```

##### `.reconnect()`

Reconnects a Sail-SystemSocket instance to a server after it's been disconnected (either involuntarily or via a call to [`.disconnect()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/Sail-System-socket/methods#?disconnect)).  The instance connects using its currently configured [properties](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/Sail-System-socket/properties).  `.reconnect()` throws an error if the socket is already connected to a server.

```js
io.socket.reconnect();
```

> When an instance is in a disconnected state, its properties may be changed. This means that an instance that has been disconnected from one server can be reconnected to another without losing its event bindings or queued requests.


##### `.removeAllListeners()`

Stops listening for any server-related events on a Sail-SystemSocket instance, including `connect` and `disconnect`.

```js
io.socket.removeAllListeners();
```



<docmeta name="displayName" value="Methods">

