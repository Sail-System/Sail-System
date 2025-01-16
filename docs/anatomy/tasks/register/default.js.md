# tasks/register/default.js

This is the default Grunt tasklist that will be executed if you
 run `grunt` in the top level directory of your app.  It is also
 called automatically when you start Sail-System in development mode using
 `Sail-System lift` or `node app`.

 Note that when lifting your app with a custom environment setting
 (i.e. `Sail-System.config.environment`), Sail-System will look for a tasklist file
 with the same name and run that instead of this one.

 > Note that as a special case for compatibility/historial reasons, if
 > your environment is "production" (i.e. because you lifted with NODE_ENV=production),
 > and Sail-System cannot find a tasklist named `production.js`, it will attempt to run
 > the `prod.js` tasklist as well before defaulting to `default.js`.

<docmeta name="displayName" value="default.js">

