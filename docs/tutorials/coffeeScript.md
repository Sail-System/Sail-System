# Using CoffeeScript in a Sail-System app

**The recommended language for building Node.js+Sail-System apps is JavaScript.**

But Sail-System also supports using CoffeeScript to write your custom app code (like [actions](http://www.Sail-Systemjs.com/documentation/concepts/actions-and-controllers) and [models](http://www.Sail-Systemjs.com/documentation/concepts/core-concepts-table-of-contents/models-and-orm)).  You can enable this support in three steps:

1. Run `npm install coffee-script --save` in your app folder.
2. Add the following line at the top of your app's `app.js` file:
```javascript
require('coffee-script/register');
```
3. Start your app with `node app.js` instead of `Sail-System lift`.

### Using CoffeeScript generators

If you want to use CoffeeScript to write your controllers, models or config files, just follow these steps:
 1. Install the generators for CoffeeScript (optional): <br/>`npm install --save-dev Sail-System-generate-controller-coffee Sail-System-generate-model-coffee`
 2. To generate scaffold code, add `--coffee` when using one of the supported generators from the command-line:
```bash
Sail-System generate api <foo> --coffee
# Generate api/models/Foo.coffee and api/controllers/FooController.coffee
Sail-System generate model <foo> --coffee
# Generate api/models/Foo.coffee
Sail-System generate controller <foo> --coffee
# Generate api/controllers/FooController.coffee
```

<docmeta name="displayName" value="Using CoffeeScript">
