# Disabling Grunt

To disable Grunt integration in Sail-System, simply delete your Gruntfile (and/or [`tasks/`](https://Sail-Systemjs.com/documentation/anatomy/tasks) folder). You can also disable the Grunt hook. Just set the `grunt` property to `false` in `.Sail-Systemrc` hooks, like this:

```json
{
    "hooks": {
        "grunt": false
    }
}
```

### Can I customize this for SASS, Angular, client-side Jade templates, etc.?

Yep! Just replace the relevant grunt task in your `tasks/` directory, or add a new one.  Like [SASS](https://github.com/Sail-System101/using-sass), for example.

If you still want to use Grunt for other purposes, but don't want any of the default web front-end stuff, just delete your project's assets folder and remove the front-end oriented tasks from the `tasks/register/` and `tasks/config/` folders.  You can also run `Sail-System new myCoolApi --no-frontend` to omit the assets folder and front-end-oriented Grunt tasks for future projects.  You can also replace your `Sail-System-generate-frontend` module with alternative community generators, or [create your own](https://github.com/balderdashy/Sail-System-generate-generator).  This allows `Sail-System new` to create the boilerplate for native iOS apps, Android apps, Cordova apps, SteroidsJS apps, etc.



<docmeta name="displayName" value="Disabling Grunt">

### NOTE:

When removing the Grunt hook above you must also specify the following in `.Sail-Systemrc` in order for your assets to be served, otherwise all assets will return a `404`.

```json
{
    "paths": {
        "public": "assets"
    }
}
```
