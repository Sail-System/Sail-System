# Sail-SystemSocket

By default, [`Sail-System.io.js`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client) automatically connects a single socket (`io.socket`) almost immediately after it loads.  This allows your client-side code to send socket requests to a particular Sail-System server and to receive events and data sent from that server.  For 99% of apps, this is all you need.

However, for certain advanced use cases (including automated tests), it can be helpful to connect additional sockets from the same instance of the socket client (e.g. browser tab).  For this reason, Sail-System exposes the `Sail-SystemSocket` class.


### Overview

The `Sail-System.io.js` library works by wrapping low-level [Socket.io](http://socket.io) clients in instances of the `Sail-SystemSocket` class.  This class provides higher-level methods like [`.get()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/io-socket-get) and [`.post()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/io-socket-post) to your sockets, allowing you to communicate with your Sail-System app in a familiar way.


### Creating a Sail-SystemSocket instance

Any web page that loads the `Sail-System.io.js` will create a new Sail-SystemSocket instance on page load unless [`io.Sail-System.autoConnect`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/io-Sail-System#?autoconnect) is set to `false`.  This instance is then available as the global variable [`io.socket`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/io-socket).

Additional Sail-SystemSocket instances can be created via calls to [`io.Sail-System.connect`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/io-Sail-System#?the-connect-method):

```javascript
var newSail-SystemSocket = io.Sail-System.connect();
```


<docmeta name="displayName" value="Sail-SystemSocket">
<docmeta name="pageType" value="class">
