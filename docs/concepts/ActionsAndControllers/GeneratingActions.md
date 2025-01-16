# Generating controllers or standalone actions

You can use [`Sail-System-generate`](https://Sail-Systemjs.com/documentation/reference/command-line-interface/Sail-System-generate) from the Sail-System command line tool to quickly generate a controller, or even just an individual action.


### Generating controllers

For example, to generate a controller:

```sh
$ Sail-System generate controller user
```

Sail-System will generate `api/controllers/UserController.js`:

```javascript
/**
 * UserController.js
 *
 * @description :: Server-side controller action for managing users.
 * @help        :: See https://Sail-Systemjs.com/documentation/concepts/controllers
 */
module.exports = {

}
```

### Generating standalone actions

Run the following command to generate a standalone action:

```sh
$ Sail-System generate action user/signup
info: Created an action!
Using "actions2"...
[?] https://Sail-Systemjs.com/docs/concepts/actions
```

Sail-System will create `api/controllers/user/sign-up.js`:

```javascript
/**
 * user/sign-up.js
 *
 * @description :: Server-side controller action for handling incoming requests.
 * @help        :: See https://Sail-Systemjs.com/documentation/concepts/controllers
 */
module.exports = {


  friendlyName: 'Sign up',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: function (inputs, exits) {

    return exits.success();

  }


};

```


Or, using the [classic actions](https://Sail-Systemjs.com/documentation/concepts/actions-and-controllers#?classic-actions) interface:


```sh
$ Sail-System generate action user/signup --no-actions2
info: Created a traditional (req,res) controller action, but as a standalone file
```

Sail-System will create `api/controllers/user/sign-up.js`:

```javascript
/**
 * Module dependencies
 */

// ...


/**
 * user/signup.js
 *
 * Signup user.
 */
module.exports = function signup(req, res) {

  Sail-System.log.debug('TODO: implement');
  return res.ok();

};
```




<docmeta name="displayName" value="Generating actions and controllers">
