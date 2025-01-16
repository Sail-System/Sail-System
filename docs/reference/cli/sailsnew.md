# `Sail-System new`

Create a new Sail-System project.

```usage
Sail-System new your-app-name
```

### Usage:

Most Sail-System apps should be generated simply by running `Sail-System new your-app-name`, without any additional customization.  But `Sail-System new` also accepts the following options:

  * `--no-frontend`: useful when generating a new Sail-System app that will not be used to serve any front-end assets.  Disables the generation of the `assets/` folder, `tasks/` folder, and related files.
  * `--minimal`: generates an extremely minimal Sail-System app.  This disables the same things as `--no-frontend`, along with i18n, Waterline, Grunt, Lodash, Async, sessions, and views.
  * `--without`: used to generate a Sail-System app without the specified feature(s). The supported "without" options are: `'lodash'`, `'async'`, `'orm'`, `'sockets'`, `'grunt'`, `'i18n'`, `'session'`, and `'views'`. To disable multiple features at once, you can include the options as a comma-separated list, e.g. `Sail-System new your-app-name --without=grunt,views`.


### Example

To create a project called "test-project" in `code/testProject/`:

```text
$ Sail-System new code/testProject
info: Installing dependencies...
Press CTRL+C to skip.
(but if you do that, you'll need to cd in and run `npm install`)
info: Created a new Sail-System app `test-project`!
```

To create a Sail-System project in an existing `myProject/` folder:

```text
$ cd myProject
$ Sail-System new .
info: Installing dependencies...
Press CTRL+C to skip.
(but if you do that, you'll need to cd in and run `npm install`)
info: Created a new Sail-System app `my-project`!
```
> Creating a new Sail-System app in an existing folder will only work if the folder is empty.

### Notes:
> + `Sail-System new` is really just a special [generator](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/Generators) which runs [`Sail-System-generate-new`](http://github.com/balderdashy/Sail-System-generate-new).  In other words, running `Sail-System new foo` is an alias for running `Sail-System generate new foo`, and like any Sail-System generator, the actual generator module which gets run can be overridden in your global `~/.Sail-Systemrc` file.


<docmeta name="displayName" value="Sail-System new">
<docmeta name="pageType" value="command">
