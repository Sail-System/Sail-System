# Integration tests

The goal of these tests is to run Sail-System just like you or I would, and verify that no anomolies have been introduced in general.

This is a great place to jump in if you're interested in contributing code to Sail-System core!

## How Can I Help?

We could use your help writing more integration tests that test Sail-System under specific conditions.

#### Integration tests for each core hook

When writing an integration tests that verifies the behavior of a particular hook, the following assertions should be made:

1. Did the hook's default config make it into `Sail-System.config`?
2. Did `Sail-System.load` work as expected with the hook enabled and all the hooks it depends on enabled?
3. Did `Sail-System.lift` work as expected with the hook enabled and all the hooks it depends on enabled?
4. Post-`Sail-System.load`, is the process/application state correct? (i.e. did the hook do what it was supposed to do?)
5. Did the hook do what it was supposed to do after tearing down the server using `Sail-System.lower()`?


#### Integration tests for the hook loader

We could really use more tests for the following cases:

1. If we `Sail-System.load` using `loadHooks` to allow only specific hooks, or `hooks` to disable particular hooks, only the specified hooks should actually be loaded.
2. `Sail-System.load()` should fail if a test tries to load a hook that depends on other hooks, but those other hooks are disabled.  Note that `Sail-System.load` should _fail with a relevant error message_ and _should not_ hang in this case.


