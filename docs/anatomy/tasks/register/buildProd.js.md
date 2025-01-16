# tasks/register/buildProd.js

This Grunt tasklist will be executed instead of `build` if you run `Sail-System www` in a production environment, e.g.:

```bash
NODE_ENV=production Sail-System www
```

This generates a folder containing your compiled (and usually minified)
assets.  The most common use case for this is bundling up files to
deploy to a CDN.

> This is also useful for building standalone applications with tools like PhoneGap or Electron.

<docmeta name="displayName" value="buildProd.js">
