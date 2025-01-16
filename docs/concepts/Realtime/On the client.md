# Realtime communication between the client and the server

The easiest way to send a realtime message from a client to a Sail-System app is by using the [Sail-System.io.js](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-io-js) library.  This library allows you to easily connect sockets to a running Sail-System app, and provides methods for making requests to [Sail-System routes](https://Sail-Systemjs.com/documentation/concepts/routes) that are handled in the same manner as a "regular" HTTP request.

The Sail-System.io.js library is automatically added to the default [layout template](https://Sail-Systemjs.com/documentation/concepts/views/layouts) of new Sail-System apps using a `<script>` tag.  When a web page loads the `Sail-System.io.js` script, it attempts to create a new [client socket](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/Sail-System-socket) and connect it to the Sail-System app, exposing it as the global variable `io.socket`.

### Examples

Include the `Sail-System.io.js` library, and make a request to the `/hello` route of a Sail-System app using the automatically-connected socket:

```html
<script type="text/javascript" src="/js/dependencies/Sail-System.io.js"></script>
<script type="text/javascript">
io.socket.get('/hello', function responseFromServer (body, response) {
  console.log("The server responded with status " + response.statusCode + " and said: ", body);
});
</script>
```

Now consider this more advanced (and less common) use case: let's disable the eager (auto-connecting) socket, and instead create a new client socket manually.  When it successfully connects to the server, we'll make it log a message:
```html
<script type="text/javascript" src="/js/dependencies/Sail-System.io.js" autoConnect="false"></script>
<script type="text/javascript">
var mySocket = io.Sail-System.connect();
mySocket.on('connect', function onConnect () {
  console.log("Socket connected!");
});
</script>
```

### Socket requests vs traditional AJAX requests

You may have noticed that a client socket `.get()` is very similar to making an AJAX request, for example by using jQuery's `$.get()` method.  This is intentional&mdash;the goal is for you to be able to get the same response from Sail-System no matter where the request originated from.  The benefit to making the request using a client socket is that the [controller action](https://Sail-Systemjs.com/documentation/concepts/controllers#?actions) in your Sail-System app will have access to the socket which made the request, allowing it to _subscribe_ that socket to realtime notifications (see [sending realtime messages from the server](https://Sail-Systemjs.com/documentation/concepts/realtime/on-the-server)).

### Reference

* View the full [Sail-System.io.js library](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client) reference.
* See the [Sail-System.sockets](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets) reference to learn how to send messages from the server to connected sockets
* See the [resourceful pub-sub](https://Sail-Systemjs.com/documentation/reference/web-sockets/resourceful-pub-sub) reference to learn how to use Sail-System blueprints to automatically send realtime messages about changes to your [models](https://Sail-Systemjs.com/documentation/concepts/models-and-orm/models).
* Visit the [Socket.io](http://socket.io) website to learn more about the underlying library Sail-System uses for realtime communication

<docmeta name="displayName" value="On the client">
