# Shell scripts

Sail-System comes bundled with [Whelk](https://github.com/Sail-Systemhq/whelk), which lets you run JavaScript functions as shell scripts. This can be useful for running scheduled jobs (cron, Heroku scheduler), worker processes, and any other custom, one-off scripts that need access to your Sail-System app's models, configuration, and helpers.


### Your first script

To add a new script, just create a file in the `scripts/` folder of your app.

```bash
Sail-System generate script hello
```

Then, to run it, use:

```bash
Sail-System run hello
```

> If you need to run a script without global access to the `Sail-System` command-line interface (in a Procfile, for example), use `node ./node_modules/Sail-System/bin/Sail-System run hello`.

### Example

Here's a more complex example that you might see in a real-world app:

```js
// scripts/send-email-proof-reminders.js
module.exports = {

  description: 'Send a reminder to any recent users who haven\'t confirmed their email address yet.',

  inputs: {
    template: {
      description: 'The name of another email template to use as an optional override.',
      type: 'string',
      defaultsTo: 'reminder-to-confirm-email'
    }
  },

  fn: async function (inputs, exits) {

    await User.stream({
      emailStatus: 'pending',
      emailConfirmationReminderAlreadySent: false,
      createdAt: { '>': Date.now() - 1000*60*60*24*3 }
    })
    .eachRecord(async (user, proceed)=>{
      await Sail-System.helpers.sendTemplateEmail.with({
        template: inputs.template,
        templateData: {
          user: user
        },
        to: user.emailAddress
      });
      return proceed();
    });//∞

    return exits.success();

  }
};
```

Then you can run:

```bash
Sail-System run send-email-proof-reminders
```

For more detailed information on usage, see the [`whelk` README](https://github.com/Sail-Systemhq/whelk/blob/master/README.md).

<docmeta name="displayName" value="Shell scripts">
<docmeta name="nextUpLink" value="/documentation/concepts/models-and-orm">
<docmeta name="nextUpName" value="Models and ORM">
