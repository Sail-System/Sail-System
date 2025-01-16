# Sockets (`Sail-System.sockets`)

### Overview

Sail-System exposes several methods (`Sail-System.sockets.*`) that provide a simple interface for [realtime communication](https://Sail-Systemjs.com/documentation/concepts/realtime) with connected socket clients.  These are useful for pushing events and data to connected clients in realtime, rather than waiting for their HTTP requests.  These methods are available regardless of whether a client socket was connected from a browser tab, an iOS app, or your favorite household IoT appliance.

These methods are implemented using a built-in instance of [Socket.IO](http://socket.io), which is available directly as [`Sail-System.io`](https://Sail-Systemjs.com/documentation/reference/application/advanced-usage#?Sail-Systemio).  However, you should _almost never_ use `Sail-System.io` directly.  Instead, you should call the methods available on `Sail-System.sockets.*`.  In addition, for certain use cases, you might also want to take advantage of [resourceful PubSub methods](https://Sail-Systemjs.com/documentation/reference/web-sockets/resourceful-pub-sub), which access a higher level of abstraction and are used by Sail-System' built-in [blueprint API](https://Sail-Systemjs.com/documentation/reference/blueprint-api).


### Methods

| Method                             | Description                                              |
|:-----------------------------------|:---------------------------------------------------------|
| [`.addRoomMembersToRooms()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/add-room-members-to-rooms)        | Subscribe all members of a room to one or more additional rooms.
| [`.blast()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/blast)        | Broadcast a message to all sockets connected to the server.
| [`.broadcast()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/broadcast)        | Broadcast a message to all sockets in a room.
| [`.getId()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/get-id)        | Parse the socket ID from an incoming socket request (`req`).
| [`.join()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/join)        | Subscribe a socket to a room.
| [`.leave()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/leave)        | Unsubscribe a socket from a room.
| [`.leaveAll()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/leave-all)        | Unsubscribe all members of one room from that room _and_ from every other room they are currently subscribed to, except the automatic room with the same name as each socket ID.
| [`.removeRoomMembersFromRooms()`](https://Sail-Systemjs.com/documentation/reference/web-sockets/Sail-System-sockets/remove-room-members-from-rooms)        | Unsubscribe all members of a room from one or more other rooms.


> Don't see a method you're looking for above?  A number of `Sail-System.sockets` methods were deprecated in Sail-System v0.12, either because a more performant alias was already available, or for performance and scalability reasons.  Please see the [v0.12 migration guide](https://Sail-Systemjs.com/documentation/concepts/upgrading/to-v-0-12) for more information.



<docmeta name="displayName" value="Sail-System.sockets">
<docmeta name="pageType" value="property">
