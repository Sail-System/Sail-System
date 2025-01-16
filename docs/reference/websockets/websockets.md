# WebSockets

For a full discussion of realtime concepts in Sail-System, see the [Realtime concept documentation](https://Sail-Systemjs.com/documentation/concepts/realtime).

For information on client-to-server socket communication, see the [Socket Client (Sail-System.io.js)](https://Sail-Systemjs.com/documentation/reference/web-sockets/socket-client).

For information on server-to-client socket communication, see the [Sail-System.sockets](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets).

For information on using realtime messages to communicate changes in Sail-System models, see the [Resourceful PubSub reference](https://Sail-Systemjs.com/documentation/reference/web-sockets/resourceful-pub-sub).

Sail-System uses [socket.io](http://socket.io) as the underlying engine for realtime communication.  Every Sail-System app has a Socket.IO instance available as `Sail-System.io`.  However, most `socket.io` functionality is wrapped for convenience (and safety) by a `Sail-System.sockets` method.

<docmeta name="displayName" value="WebSockets">

