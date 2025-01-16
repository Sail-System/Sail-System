# The `io.Sail-System` object

### Overview

The `io.Sail-System` object is the home of global configuration options for the `Sail-System.io.js` library and any sockets it creates.  Most of the properties on `io.Sail-System` are used as settings when connecting a client socket to the server or as top-level configuration for the client library itself.  `io.Sail-System` also provides a `.connect()` method used for creating new socket connections manually.

See [Socket Client](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client) for information about your different options for configuring `io.Sail-System`.

### The `.connect()` method

If [`io.Sail-System.autoConnect`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/io-Sail-System#?autoconnect) is `false`, or if you need to create more than one socket connection with the `Sail-System.io.js` library, you do so via `io.Sail-System.connect([url], [options])`.  Both arguments are optional, and the value of the `io.Sail-System` properties (like `url`, `transports`, etc.) are used as defaults.  See the [Sail-SystemSocket properties reference](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/Sail-System-socket/properties) for options.

### `io.Sail-System.autoConnect`

When `io.Sail-System.autoConnect` is set to `true` (the default setting), the library will wait one cycle of the event loop after loading and then attempt to create a new [`Sail-SystemSocket`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/Sail-System-socket) and connect it to the URL specified by `io.Sail-System.url`.  When used in the browser, the new socket will be exposed as `io.socket`.  When used in a Node.js script, the new socket will be attached as the `socket` property of the variable used to initialize the `Sail-System.io.js` library.

### `io.Sail-System.reconnection`

When `io.Sail-System.reconnection` is set to `true`, sockets will automatically (and continuously) attempt to reconnect to the server if they become disconnected unexpectedly (that is, _not_ as the result of a call to [`.disconnect()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/Sail-System-socket/methods#?disconnect)).  If set to `false` (the default), no automatic reconnection attempt will be made.  Defaults to `false`.

### `io.Sail-System.environment`

Use `io.Sail-System.environment` to set an environment for `Sail-System.io.js`, which affects how much information is logged to the console.  Valid values are `development` (full logs) and `production` (minimal logs).

### Other properties and defaults

The other properties of `io.Sail-System` are used as defaults when creating new sockets (either the eager socket or via [`io.Sail-System.connect()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/io-Sail-System#?the-connect-method)).  See the [Sail-SystemSocket properties reference](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/Sail-System-socket/properties) for a full list of available options, as well as a table of the default `io.Sail-System` values.  Here are the most commonly used properties:

  Property          | Type       | Default   | Details
 :------------------ |----------|:--------- |:-------
 url                | ((string)) | Value of [`io.Sail-System.url`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/Sail-System-socket/properties#?ioSail-System-defaults) | The URL that the socket is connected to, or will attempt to connect to.
 transports         | ((array))  | Value of [`io.Sail-System.transports`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/Sail-System-socket/properties#?ioSail-System-defaults) | The transports that the socket will attempt to connect using.  Transports will be tried in order, with upgrades allowed: that is, if you list both "polling" and "websocket", then after establishing a long-polling connection the server will attempt to upgrade it to a websocket connection.  This setting should match the value of `Sail-System.config.sockets.transports` in your Sail-System app.
 headers   | ((dictionary)) | Value of [`io.Sail-System.headers`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/Sail-System-socket/properties#?ioSail-System-defaults) | Dictionary of headers to be sent by default with every request from this socket.  Can be overridden via the `headers` option in [`.request()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/io-socket-request).




<docmeta name="displayName" value="io.Sail-System">
<docmeta name="pageType" value="property">
