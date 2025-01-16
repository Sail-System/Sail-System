# Application Events

### Overview

Sail-System app instances inherit Node's [`EventEmitter` interface](https://nodejs.org/api/events.html#events_class_eventemitter), meaning that they can both emit and listen for custom events.  While it is not recommended that you utilize Sail-System events directly in app code (since your apps should strive to be as stateless as possible to facilitate scalability), events can be very useful when extending Sail-System (via [hooks](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/hooks) or [adapters](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/adapters)) and in a testing environment.

### Should I use events?

Most Sail-System developers never have a use case for working with application events. Events emitted by the Sail-System app instance are designed to be used when building your own custom hooks, and while you _could_ technically use them anywhere, in most cases you _should not_.  Never use events in your controllers, models, services, configuration, or anywhere else in the userland code in your Sail-System app (unless you are building a custom app-level hook in `api/hooks/`).

### Events emitted by Sail-System

The following are the most commonly used built-in events emitted by Sail-System instances.  Like any EventEmitter in Node, you can listen for these events with `Sail-System.on()`:

```javascript
Sail-System.on(eventName, eventHandlerFn);
```

None of the events are emitted with extra information, so your `eventHandlerFn` should not have any arguments.

| Event name | Emitted when... |
|:-----------|:----------------|
| `ready`    | The app has been loaded and the bootstrap has run, but it is not yet listening for requests |
| `lifted`   | The app has been lifted and is listening for requests. |
| `lower`  | The app has is lowering and will stop listening for requests. |
| `hook:<hook identity>:loaded` | The hook with the specified identity loaded and ran its `initialize()` method successfully.  |


> In addition to `.on()`, Sail-System also exposes a useful utility function called `Sail-System.after()`.  See the [inline documentation](https://github.com/balderdashy/Sail-System/blob/fd2f9b6866637143eda8e908775365ca52fab27c/lib/EVENTS.md#usage) in Sail-System core for more information.

<docmeta name="displayName" value="Events">
