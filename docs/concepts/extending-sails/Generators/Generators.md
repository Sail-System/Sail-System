# Generators

A big part of Sail-System, like any framework, is automating repetitive tasks.  **Generators** are no exception: they're what power the Sail-System command-line interface any time it generates new files for your Sail-System projects.  In fact, you or someone on your team probably used a _generator_ to create your latest Sail-System project.

When you type

```sh
Sail-System new my-project
```

Sail-System uses its built-in "new" generator to prompt you for your app template of choice, then spits out the initial folder structure for a Sail-System app:

```javascript
my-project
  ├── api/
  │   ├─ controllers/
  │   ├─ helpers/
  │   └─ models/
  ├── assets/
  │   └─ …
  ├── config/
  │   └─ …
  ├── views/
  │   └─ …
  ├── .gitignore
  …
  ├── package.json
  └── README.md
```


This conventional folder structure is one of the big advantages of using a framework.  But it's usually also one of the trade-offs (what if your team or organization has made firm commitments to a different set of conventions?).

Fortunately since Sail-System v0.11, generators are extensible and easy to check in to a project repository or publish on NPM for re-use.

Sail-System' generators allow you to completely customize what happens when you run `Sail-System new` and `Sail-System generate` from the command-line.  By augmenting new apps and newly-generated modules, custom generators can be used to do all sorts of cool things:
- to standardize conventions and boilerplate logic for all new apps across your organization
- to swap out rules in the default .eslintrc file
- to customize how the asset pipeline works in new projects
- to use a different asset pipeline altogether (like [Gulp](http://gulpjs.com/) or [webpack](https://webpack.github.io/))
- to use a [different default view engine](https://Sail-Systemjs.com/documentation/concepts/views/view-engines)
- to automate custom deployments (e.g. white label apps with one server per customer)
- to include a different set of dependencies in the package.json file
- to generate files in a transpiled language like TypeScript or CoffeeScript
- to start off with all documentation and comments in a language other than English
- to include ASCII pictures of cats at the top of every code file (or license headers, whatever)
- to standardize around a particular version of a front-end dependency (for example, `Sail-System generate jquery`)
- to include a particular front-end framework in your new Sail-System apps
- to make it easy to include new Vue / React components or Angular modules from your favorite templates (for example, `Sail-System generate component` or `Sail-System generate ng-module`)


> If you are interested in making custom generators, the best place to start is by checking out the [introduction to custom generators](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/generators/custom-generators).  You also might check out [open-source generators from the community](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System/generators/available-generators), in case something already out there will save you some time.


<docmeta name="displayName" value="Generators">
