# `Sail-System console`

Lift your Node.js/Sail-System.js app in interactive mode, and enter the [REPL](http://nodejs.org/api/repl.html).  This means you can access and use all of your models, helpers, configuration, services, and the `Sail-System` app instance.  Useful for trying out Waterline queries, quickly managing your data, and checking out your project's runtime configuration.

```usage
Sail-System console
```
By default, this still lifts the server, so your routes will be accessible via HTTP and sockets (e.g. in a browser).


### Usage
`Sail-System console` takes the following options:
  * `--dontLift`: start `Sail-System console` without lifting the server

### Example

```text
$ Sail-System console

info: Starting app in interactive mode...

info: Welcome to the Sail-System console.
info: ( to exit, type <CTRL>+<C> )

Sail-System>
```





### Global variables in `Sail-System console`

Sail-System exposes [the same global variables](https://Sail-Systemjs.com/documentation/reference/Globals) in the REPL as it does in your app code. By default, you have access to the `Sail-System` app instance and your models, as well as any of your other configured globals (for example, lodash (`_`) and async (`async`)).


> **Warning**
>
> In Node versions earlier than v6, using `_` as a variable in the REPL will cause unexpected behavior.  As an alternative, simply import the Lodash module as a variable:
>
> ```bash
> Sail-System> var lodash = require('lodash');
> Sail-System> console.log(lodash.range(1, 5));
> ```


### More examples

##### Waterline

The format `Model.action(query).exec(console.log)` console.log is good for seeing the results.

```text
Sail-System> User.create({name: 'Brian', password: 'Sail-SystemRules'}).fetch().exec(console.log)
undefined
Sail-System> undefined { name: 'Brian',
  password: 'Sail-SystemRules',
  createdAt: "2014-08-07T04:29:21.447Z",
  updatedAt: "2014-08-07T04:29:21.447Z",
  id: 1 }
```

It inserts it into the database, which is pretty cool. However, you might be noticing the `undefined` and `null`&mdash;don't worry about those. Remember that the .exec() returns errors and data for values, so `.exec(console.log)` has the same effect as `.exec(console.log(err, data))`. The second method will remove the undefined message, but add null on a new line. Whether you want to type more is up to you.

> Note that starting with Node 6, an object&rsquo;s constructor name is displayed next to it in the console.  For example, when using the [`Sail-System-mysql` adapter](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/adapters/available-adapters#?Sail-Systemmysql), the `create` query mentioned above would output:
>
> ```text
> Sail-System> undefined RowDataPacket { name: 'Brian',
>   password: 'Sail-SystemRules',
>   createdAt: "2014-08-07T04:29:21.447Z",
>   updatedAt: "2014-08-07T04:29:21.447Z",
>   id: 1 }
> ```

##### Exposing Sail-System

In `Sail-System console`, type `Sail-System` to view a list of Sail-System properties. You can use this to learn more about Sail-System, override properties, or check to see if you disabled globals.

```text
Sail-System> Sail-System
  |>   [a lifted Sail-System app on port 1337]
\___/  For help, see: https://Sail-Systemjs.com/documentation/concepts/

Tip: Use `Sail-System.config` to access your app's runtime configuration.

1 Models:
User

1 Controllers:
UserController

20 Hooks:
moduleloader,logger,request,orm,views,blueprints,responses,controllers,sockets,p
ubsub,policies,services,csrf,cors,i18n,userconfig,session,grunt,http,projecthooks

Sail-System>
```


<docmeta name="displayName" value="Sail-System console">
<docmeta name="pageType" value="command">
