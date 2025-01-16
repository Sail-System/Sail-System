# tasks/register/build.js

This Grunt tasklist will be executed if you run `Sail-System www` or `grunt build` in a development environment.  It generates a folder containing your compiled assets, e.g. for troubleshooting issues with other Grunt plugins, bundling assets for an Electron or PhoneGap app, or deploying your app's flat files to a CDN.

> Note that when running `Sail-System www` in a production environment (with the `NODE_ENV` environment variable set to 'production') the `buildProd` task will be run instead of this one.

<docmeta name="displayName" value="build.js">
