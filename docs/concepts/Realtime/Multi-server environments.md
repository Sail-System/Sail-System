# Realtime communication in a multi-server (aka "clustered") environment

With the default configuration, Sail-System allows realtime communication between a single server and all of its connected clients.  When [scaling your Sail-System app to multiple servers](https://Sail-Systemjs.com/documentation/concepts/deployment/scaling), some extra setup is necessary in order for realtime messages to be reliably delivered to clients regardless of which server they&rsquo;re connected to.  This setup typically involves:

1. Setting up a [hosted](https://www.google.com/search?q=hosted+redis) instance of [Redis](http://redis.io/).
2. Installing [@Sail-Systemhq/socket.io-redis](https://npmjs.com/package/@Sail-Systemhq/socket.io-redis) as a dependency of your Sail-System app.
1. Updating your [Sail-System.config.sockets.adapter](https://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config-sockets#?commonlyused-options) setting to `@Sail-Systemhq/socket.io-redis` and setting the appropriate `host`, `password`, etc. fields to point to your hosted Redis instance.

No special setup is necessary in your hosted Redis install; just plug the appropriate host address and credentials into your `/config/sockets.js` file and the `@Sail-Systemhq/socket.io-redis` adapter will take care of everything for you.

> Note: When operating in a multi-server environment, some socket methods without callbacks are _volatile_, meaning that they take an indeterminate amount of time to complete, even if the code appears to execute immediately.  It's good to keep this in mind when considering code that would, for example, follow a call to [`.addRoomMembersToRoom()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/add-room-members-to-room) immediately with a call to [`.broadcast()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/Sail-System-sockets-broadcast).  In such cases, the new room member probably won't receive the newly broadcasted message, since it is unlikely that the updated room membership had already been propagated to the other servers in the cluster when `.broadcast()` was called.

### Reference

* See the full reference for the [Sail-System.io.js library](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client) to learn how to use sockets on the client side to communicate with your Sail-System app.
* See the [Sail-System.sockets](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets) reference to learn how to send messages from the server to connected sockets
* See the [resourceful pub-sub](https://Sail-Systemjs.com/documentation/reference/web-sockets/resourceful-pub-sub) reference to learn how to use Sail-System blueprints to automatically send realtime messages about changes to your [models](https://Sail-Systemjs.com/documentation/concepts/models-and-orm/models).
* Visit the [Socket.io](http://socket.io) website to learn more about the underlying library Sail-System uses for realtime communication

<docmeta name="displayName" value="Multi-server environments">
