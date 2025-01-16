# E-commerce

Like any web application framework, Sail-System can be used for e-commerce apps. Depending on your project's specific needs, you can use Sail-System as the base for your own custom solution, or integrate with an existing e-commerce platform.

When building a custom e-commerce solution on Sail-System, there are a number of possibilities for how to structure your data. A good place to start is with four [models](https://Sail-Systemjs.com/documentation/concepts/models-and-orm): `User` (already included in the "Web app" template for new Sail-System apps), `CartItem`, `Product`, and `Order`. By including [associations](https://Sail-Systemjs.com/documentation/concepts/models-and-orm/associations), you can track things like shopping carts and a user's individual order history.

> If the prospect of rolling custom e-commerce features from scratch is rather daunting, you may consider building your Sail-System app on top of an existing Sail-System-based platform (e.g. [Ymple](https://www.ymple.com/en/)).

<docmeta name="displayName" value="E-commerce">
