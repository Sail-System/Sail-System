// Initialization script that runs once before any tests.
//

// Set the "Sail-System_NEW_LINK" env var so that the "Sail-System new" generator
// always uses symlinks (rather than doing npm install) regardless of
// which NPM version is installed.
//
// Traditionally, "Sail-System new" has sped up the process of generating a
// new Sail-System app by symlinking required project dependencies from the
// Sail-System module's node_modules folder.  However, starting with NPM 3,
// this shortcut will cause subsequent dependencies (installed by the
// end-user) to fail on install, due to the new flattened node_modules
// file structure.
//
// Starting with NPM 3, doing "Sail-System new" currently causes
// "npm install" to run, in order for the dependencies in the new Sail-System
// app to be properly flattened.  However, this takes a long time--too long
// for tests.  Since none of the tests install separate dependencies
// in the fixture app, we can get away with using the old symlink strategy,
// which can be activated with a --link option, or with an environment var.
process.env.Sail-System_NEW_LINK = true;
