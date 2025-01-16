# `io.socket`

### Overview

When used in the browser, `Sail-System.io.js` creates a global instance of the [Sail-SystemSocket](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/Sail-System-socket) class as soon as it loads and attempts to connect it to the server after waiting one event loop cycle (to allow for configuration options to be changed).  As with any [Sail-SystemSocket](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/Sail-System-socket), you can start using its properties and methods even before it connects to the server. Any requests or event bindings will be queued up and replayed once the connection is established.

### Configuration Options

Like any [Sail-SystemSocket](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/Sail-System-socket) instance, `io.socket` is affected by the global [`io.Sail-System`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/io-Sail-System) settings.  The `Sail-System.io.js` library waits for one event loop cycle before attempting to connect `io.socket` to the server, giving you a chance to change any settings first.

##### Example

Changing the server that `io.socket` connects to

```html
<script type="text/javascript" src="/js/dependencies/Sail-System.io.js"></script>
<script type="text/javascript">
io.Sail-System.url = "http://someSail-Systemapp.com";
</script>
```

### Properties

See the [Sail-SystemSocket properties reference](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/Sail-System-socket/properties) for a full list of properties available on `io.socket`.

### Methods

For basic server communication and event listening methods, see the other `io.socket.*` pages in this section.  For advanced methods involving server connection, see the [Sail-SystemSocket advanced methods reference](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/Sail-System-socket/methods).

<docmeta name="displayName" value="io.socket">
<docmeta name="pageType" value="property">
