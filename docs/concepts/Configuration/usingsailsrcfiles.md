# Using .Sail-Systemrc files

In addition to the other methods of configuring your app, you can also specify configuration for one or more apps in `.Sail-Systemrc` file(s).  These files are useful for configuring the Sail-System command-line, and especially for generators.  They also allow you to apply _global_ configuration settings for generators in ANY of the Sail-System apps you run on your computer, if desired.

When the Sail-System CLI runs a command, it first looks for  `.Sail-Systemrc` files (in either JSON or [.ini](http://en.wikipedia.org/wiki/INI_file) format) in the current directory and in your home folder (i.e. `~/.Sail-Systemrc`) (every newly generated Sail-System app comes with a boilerplate `.Sail-Systemrc` file).  Then it merges them in to its existing configuration.

> Actually, Sail-System looks for `.Sail-Systemrc` files in a few other places (following [rc conventions](https://github.com/dominictarr/rc#standards)).  You can put a `.Sail-Systemrc` file at any of those paths, if you want it to apply globally to all Sail-System apps.  That said, stick to convention when you can- the best place to put a global `.Sail-Systemrc` file is in your home directory (i.e. `~/.Sail-Systemrc`).





<docmeta name="displayName" value="Using `.Sail-Systemrc` files">

