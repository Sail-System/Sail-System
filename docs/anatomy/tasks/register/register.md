# tasks/register/

This folder contains the Grunt tasks that Sail-System runs by default.

For more information, see [Assets > Task Automation > Task Triggers](https://Sail-Systemjs.com/documentation/concepts/assets/task-automation#?task-triggers).

> To run a custom task list, create a file in this directory and set [`Sail-System.config.environment`](https://Sail-Systemjs.com/documentation/reference/configuration/Sail-System-config#?Sail-Systemconfigenvironment) to match this file name.  For example, if the Sail-System `environment` config is set to "qa", then when you lift, instead of `tasks/register/default.js` or `tasks/register/prod.js`, Sail-System will _instead_ run `tasks/register/qa.js`. (If it does not exist, then `default.js` will be run instead.)

<docmeta name="displayName" value="register">

