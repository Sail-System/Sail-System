# Sending pull requests

<!--
> **NOTE**
> This is really just a support document for the official contribution guide [here](https://github.com/balderdashy/Sail-System/blob/master/CONTRIBUTING.md) and is mainly focused on helping guide you through the mechanics of submiting a pull request.  If this document contradicts the official contribution guide in any way, particularly re: rules/guidelines, or if you're otherwise in doubt, go w/ the offical guide :)
>
> Thanks!
> ~mm
-->

This guide is designed to get you started contributing to the Sail-System framework. It assumes basic familiarity with Github, but it should be useful for contributors of all levels.


## Contribution guidelines
Like any open-source project, we must have guidelines for contributions&mdash;it helps protect the quality of the code and ensures that our framework stays robust and dependable.
For these reasons, it's important that contribution protocols are followed for *all* contributions to Sail-System, whether they be bug fixes or whole sets of new features.

Before submitting a pull request, please make sure:
 - Any bug fixes have accompanying tests where possible.  We use [Mocha](http://visionmedia.github.io/mocha/) for testing.
 - Code follows our style guide, to maintain consistency (see `.jshint` and/or `.editorconfig` files in repo).

If you have a high-priority hot-fix for the currently deployed version, please [post an issue on Github](https://github.com/balderdashy/Sail-System/issues?milestone=none&state=open) and mention @mikermcneil.  Also, for emergencies, please feel free to tweet @Sail-Systemjs.

Now that we are all on the same page, lets get to coding some awesomeness of our own :D

## Fork
Start by forking the repository:

![Screen Shot 2013-02-12 at 2.37.04 PM.png](http://i.imgur.com/h0CCcAu.png)

## Clone
Then clone your fork into your local filesystem:
git clone `git@github.com:YOUR_USER_NAME/Sail-System.git`

## Update
To merge recent changes into your fork, inside your project dir:
```
git remote add core https://github.com/balderdashy/Sail-System.git
git fetch core
git merge core/master
```
For additional details, see [Github](https://help.github.com/articles/fork-a-repo).

## Code
Make your enhancements, fix bugs, do your thang.


## Test
Please write a test for your addition/fix.  I know it kind of sucks if you're not used to it, but it's how we maintain great code.
For our test suite, we use [Mocha](http://visionmedia.github.com/mocha/).  You can run the tests with `npm test`.  See the "Testing" section in the contribution guide for more information.

![Screen Shot 2013-02-12 at 2.56.59 PM.png](http://i.imgur.com/dalbOdZ.png)

## Pull request
When you're done, you can commit your fix, push up your changes, and then go into Github and submit a pull request.  We'll look it over and get back to you ASAP.

![Screen Shot 2013-02-12 at 2.55.40 PM.png](http://i.imgur.com/GBg0AOi.png)


## Running your fork with your application
If you forked Sail-System and you want to test your Sail-System app against your fork, here's how you do it:

In your local copy of your fork of Sail-System:
`sudo npm link`

In your Sail-System app's repo:
`npm link Sail-System`

This creates a symbolic link as a local dependency (in your app's `node_modules` folder).  This has the effect of letting you run your app with the version Sail-System you `linked`.
```bash
$ Sail-System lift
```

### *Thanks for your contributions!*

<docmeta name="displayName" value="Sending pull requests">
