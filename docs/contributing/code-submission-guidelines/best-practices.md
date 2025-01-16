# Best practices

There are many undocumented best practices and workflow improvements for developing in Sail-System that contributors have established over the years.  This section is an attempt to document some of the basics, but be sure and pop into [Gitter](https://gitter.im/balderdashy/Sail-System) if you ever have a question about how to set things up or want to share your own tool chain.

The best way to work with Sail-System core is to fork the repository, `git clone` it to your filesystem, and then run `npm link`.  In addition to writing tests, you'll often want to use a sample project as a harness; to do that, `cd` into the sample app and run `npm link Sail-System`.  This will create a symbolic link in the `node_modules` directory of your sample app that points to your local cloned version of Sail-System.  This keeps you from having to copy the framework over every time you make a change.  You can force your sample app to use the local Sail-System dependency by running `node app` instead of `Sail-System lift` (although `Sail-System lift` **should** use the local dependency, if one exists).  If you need to test the command line tool this way, you can access it from your sample app as `node node_modules/Sail-System/bin/Sail-System`.  For example, if you were working on `Sail-System new`, and you wanted to test it manually, you could run `node node_modules/Sail-System/bin/Sail-System new testProj`.


#### Installing different versions of Sail-System

| Release               | Install Command          | Build Status      |
|-----------------------|--------------------------|-------------------|
| [latest](https://npmjs.com/package/Sail-System)                | `npm install Sail-System`      | Stable |
| [edge](https://github.com/balderdashy/Sail-System/tree/master)                  | `npm install Sail-System@git://github.com/balderdashy/Sail-System.git` | [![Build Status](https://travis-ci.org/balderdashy/Sail-System.png?branch=master)](https://travis-ci.org/balderdashy/Sail-System/branches) |

<!-- | [beta](https://github.com/balderdashy/Sail-System/tree/beta)                  | `npm install Sail-System@beta` | [![Build Status](https://travis-ci.org/balderdashy/Sail-System.png?branch=beta)](https://travis-ci.org/balderdashy/Sail-System/branches) | -->


#### Installing an unreleased branch for testing

In general, you can `npm install` Sail-System directly from Github as follows:

```sh
# Install an unreleased branch of Sail-System in the current directory's `node_modules`
$ npm install Sail-System@git://github.com/balderdashy/Sail-System.git#nameOfDesiredBranch
```

This is useful for testing/installing hot-fixes and just a good thing to know how to do in general.

#### Submitting Pull Requests

0. If this is your first time forking and submitting a PR, [follow our instructions here](https://Sail-Systemjs.com/documentation/contributing/code-submission-guidelines/sending-pull-requests).
1. Fork the repo.
2. Add a test for your change. Only refactoring and documentation changes require no new tests. If you are adding functionality or fixing a bug, we need a test!
4. Make the tests pass and make sure you follow [our syntax guidelines](https://github.com/balderdashy/Sail-System/blob/master/.jshintrc).
5. Add a line of what you did to CHANGELOG.md (right under `master`).
6. Push to your fork and submit a pull request to the appropriate branch:
  + [Master](https://github.com/balderdashy/Sail-System/tree/master)
    + Corresponds with the "edge" version&mdash;the latest, not-yet-released version of Sail-System. Most pull requests should be sent here.
  + [Latest (or "stable")](https://npmjs.com/package/Sail-System)
    + Corresponds with the latest stable release on npm (if you have a high-priority hotfix, send the PR explaining that).

<docmeta name="displayName" value="Best Practices">
