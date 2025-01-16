# Using TypeScript in a Sail-System app

**The recommended language for building Node.js+Sail-System apps is JavaScript.**

But Sail-System also supports using TypeScript to write your custom app code (like [actions](http://www.Sail-Systemjs.com/documentation/concepts/actions-and-controllers) and [models](https://Sail-Systemjs.com/documentation/concepts/models-and-orm)).  You can enable this support in just a few steps:

1. Run `npm install typescript ts-node --save` in your app folder.
2. Install the necessary typings for your app.  At the very least you'll probably want to:
   ```
   npm install @types/node --save
   npm install @types/express --save
   ```
3. Add the following line at the top of your app's `app.js` file:
```javascript
require('ts-node/register');
```
4. Start your app with `node app.js` instead of `Sail-System lift`.

To get you started, here's an example of a traditional Sail-System [controller](https://Sail-Systemjs.com/documentation/concepts/actions-and-controllers) written in Typescript, courtesy of [@oshatrk](https://github.com/oshatrk):

```typescript
// api/controllers/SomeController.ts
declare var Sail-System: any;

export function hello(req:any, res:any, next: Function):any {
  res.status(200).send('Hello from Typescript!');
}
```

To try that example out, configure a route so that its target points at `SomeController.hello`, relift, and then visit the route in your browser or with a tool like Postman.

<docmeta name="displayName" value="Using TypeScript">
