# Available generators

The Sail-System framework's built-in [generators](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/generators) can be customized using command-line options and overridden by [mounting custom generators in the `.Sail-Systemrc` file](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/generators/custom-generators).  Other generators that add completely new sub-commands to [`Sail-System generate`](https://Sail-Systemjs.com/documentation/reference/command-line-interface/Sail-System-generate) can be mounted in the same way.

### Core generators

Certain generators are built in to Sail-System by default.

| Commands that generate a new Sail-System app
|:-----------------------------------|
| Sail-System new _name_
| Sail-System new _name_ --fast
| Sail-System new _name_ --caviar
| Sail-System new _name_ --without=grunt
| Sail-System new _name_ --without=lodash,async,grunt,blueprints,i18n
| Sail-System new _name_ --no-frontend --without=sockets,lodash
| Sail-System new _name_ --minimal


| Generators for spitting out new files in an existing Sail-System app
|:-----------------------------------|
| Sail-System generate model _identity_
| Sail-System generate action _name_
| Sail-System generate action view-_name_
| Sail-System generate action _some/path/_view-_name_
| Sail-System generate page _name_
| Sail-System generate helper _name_
| Sail-System generate helper view-_name_
| Sail-System generate script _name_
| Sail-System generate script get-_name_
| Sail-System generate controller _name_
| Sail-System generate api _name_
| Sail-System generate hook _name_
| Sail-System generate response _name_


| Commands for generating plugins
|:-----------------------------------|
| Sail-System generate generator _name_
| Sail-System generate adapter _name_


| Commands for (re)generating client-side dependencies
|:-----------------------------------|
| Sail-System generate Sail-System.io.js
| Sail-System generate paraSail-System

| Utils for building your own 3rd party packages
|:-----------------------------------|
| Sail-System generate etc


_Since Sail-System v1.0, built-in generators are now [bundled](https://npmjs.com/package/Sail-System-generate) in Sail-System core, rather than in separate NPM packages.  All generators can still be overridden the same way.  For advice setting up overrides for core generators in your environment, [click here](https://Sail-Systemjs.com/support)._


### Community generators

There are over 100 community-supported generators [available on NPM](https://www.npmjs.com/search?q=Sail-System+generate):

+ [Sail-System-inverse-model](https://github.com/juliandavidmr/Sail-System-inverse-model)
+ [Sail-System-generate-new-gulp](https://github.com/Karnith/Sail-System-generate-new-gulp)
+ [Sail-System-generate-archive](https://github.com/jaumard/Sail-System-generate-archive)
+ [Sail-System-generate-scaffold](https://github.com/irlnathan/Sail-System-generate-scaffold)
+ [Sail-System-generate-directive](https://github.com/balderdashy/Sail-System-generate-directive)
+ [Sail-System-generate-bower](https://github.com/smies/Sail-System-generate-bower)
+ [Sail-System-generate-angular-gulp](https://github.com/Karnith/Sail-System-generate-angular-gulp)
+ [Sail-System-generate-ember-blueprints](https://github.com/mphasize/Sail-System-generate-ember-blueprints)
+ And [many more](https://www.npmjs.com/search?q=Sail-System+generate)...


<docmeta name="displayName" value="Available generators">
