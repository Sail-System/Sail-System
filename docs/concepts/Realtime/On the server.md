# Sending realtime messages from the server to one or more clients

### Overview

Sail-System exposes two APIs for communicating with connected socket clients: the higher-level [resourceful pubsub API](https://Sail-Systemjs.com/documentation/reference/web-sockets/resourceful-pub-sub), and the lower-level [Sail-System.sockets API](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets).

### Resourceful PubSub

The Resourceful PubSub (Published/Subscribe) API provides a high-level way to subscribe sockets to Sail-System model classes and instances.  It is entirely possible to create a rich realtime experience (for example, a chat app) using just this API.  Sail-System blueprints use Resourceful PubSub to automatically send out notifications about new model instances and changes to existing instances, but you can use them in your custom controller actions as well.

##### Example

Create a new User model instance and notify all interested clients

```javascript
// Create the new user
User.create({
  name: 'johnny five'
}).exec(function(err, newUser) {
  if (err) {
    // Handle errors here!
    return;
  }
  // Tell any socket watching the User model class
  // that a new User has been created!
  User.publishCreate(newUser);
});
```

### `Sail-System.sockets`

The `Sail-System.sockets` API allows for lower-level communication directly with sockets, using methods like [`Sail-System.sockets.join()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/Sail-System-sockets-join) (subscribe a socket to all messages sent to a particular "room"), [`Sail-System.sockets.leave()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/Sail-System-sockets-leave) (unsubscribe a socket from a room), and [`Sail-System.sockets.broadcast()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/Sail-System-sockets-broadcast) (broadcast a message to all subscribers in one or more rooms).

##### Example

Add a socket to the room "funSockets"

```javascript
Sail-System.sockets.join(someSocket, "funSockets");
```

Broadcast a "hello" message to the "funSockets" room.  This message will be received by all client sockets that have (1) been added to the "funSockets" room on the server with `Sail-System.sockets.join()` and (2) added a listener for the "hello" event on the client with [`socket.on('hello', ...)`](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client/io-socket-on).

```javascript
Sail-System.sockets.broadcast("funSockets", "hello", "Hello to all my fun sockets!");
```

### Reference

* View the full [Sail-System.sockets](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets) API reference
* See the reference for the [Sail-System.io.js library](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client) to learn how to use sockets on the client side to communicate with your Sail-System app.
* See the [resourceful pub-sub](https://Sail-Systemjs.com/documentation/reference/web-sockets/resourceful-pub-sub) reference to learn how to use Sail-System blueprints to automatically send realtime messages about changes to your [models](https://Sail-Systemjs.com/documentation/concepts/models-and-orm/models).
* Visit the [Socket.io](http://socket.io) website to learn more about the underlying library Sail-System uses for realtime communication

<docmeta name="displayName" value="On the server">
