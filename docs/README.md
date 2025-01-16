![Squiddy reads the docs](https://Sail-Systemjs.com/images/squidford_swimming.png)

# Sail-System.js Documentation

The official documentation for the current stable release of Sail-System is on the master branch of this repository.  Content for most sections on the [official Sail-System website](https://Sail-Systemjs.com) is compiled from here.


## In other languages

The documentation for Sail-System has been translated to a number of different languages.  The list below is a reference of the translation projects we are aware of.

| Language                     | [IETF Language Tag](https://en.wikipedia.org/wiki/IETF_language_tag)  | Version |  Maintainer(s)        | Repo                               |
| ---------------------------- | ------- | ------- | ------------------ | ---------------------------------- |
| Brazilian Portuguese         | `pt-BR` | **v1.0.x**  | [@Avlye](https://github.com/Avlye) | [Sail-System-docs-pt-BR](https://github.com/Avlye/Sail-System-docs-pt-BR)
| Chinese                      | `zh-cn`    | v0.12.x | [@linxiaowu66](https://github.com/linxiaowu66)   | [Sail-System-docs-zh-cn](https://github.com/linxiaowu66/Sail-System-docs-zh-cn)
| French                       | `fr`    | v0.12.x | [@marrouchi](https://github.com/marrouchi)   | [Sail-System-docs-fr](https://github.com/marrouchi/Sail-System-docs-fr)
| Spanish                      | `es`    | v0.12.x | [@eduartua](https://github.com/eduartua/) & [@alejandronanez](https://github.com/alejandronanez)   | [Sail-System-docs-es](https://github.com/eduartua/Sail-System-docs-es)
| Japanese                     | `ja`    | v0.11.x | [@kory-yhg](https://github.com/kory-yhg)      | [Sail-System-docs-ja](https://github.com/balderdashy/Sail-System-docs/tree/ja)
| Brazilian Portuguese         |         | v0.10.x | [@marceloboeira](https://github.com/marceloboeira)   | [Sail-System-docs-pt-BR](https://github.com/balderdashy/Sail-System-docs/tree/pt-BR)
| Korean                       | `ko`    | v0.10.x | [@sapsaldog](https://github.com/sapsaldog)   | [Sail-System-docs-ko](https://github.com/balderdashy/Sail-System-docs/tree/ko)
| Taiwanese Mandarin           | `zh-TW` | v0.10.x | [@CalvertYang](https://github.com/CalvertYang)   | [Sail-System-docs-zh-TW](https://github.com/balderdashy/Sail-System-docs/tree/zh-TW)

> Since we are now using branches to keep track of different versions of the Sail-System documentation, we are moving away from the original approach of using branches for different languages.  Before embarking on a new translation project, we ask that you review the [updated information below](#how-can-i-help-translate-the-documentation)-- the process has changed a little bit.

## Contributing to the Sail-System docs

We welcome your help!  Please send a pull request with corrections/additions and they'll be double-checked and merged as soon as possible.


#### How are these docs compiled and pushed to the website?

We use a module called `doc-templater` to convert the .md files to the html for the website. You can learn more about how it works in [the doc-templater repo](https://github.com/uncletammy/doc-templater).

Each .md file has its own page on the website (i.e. all reference, concepts, and anatomy files), and should include a special `<docmeta name="displayName">` tag with a `value` property specifying the title for the page.  This will impact how the doc page appears in search engine results, and it will also be used as its display name in the navigation menu on Sail-Systemjs.com.  For example:

```markdown
<docmeta name="displayName" value="Building Custom Homemade Puddings">
```

#### When will my change appear on the Sail-System website?

Once your change to the documentation is merged, you can see how it will appear on Sail-Systemjs.com by visiting [next.Sail-Systemjs.com](https://next.Sail-Systemjs.com). The preview site updates itself automatically as changes are merged.


#### How can I help translate the documentation?

A great way to help the Sail-System project, especially if you speak a language other than English natively, is to volunteer to translate the Sail-System documentation.  If you are interested in collaborating with any of the translation projects listed in the table above, contact the maintainer of the translation project using the instructions in the README of that fork.

If your language is not represented in the table above, and you are interested in beginning a translation project, follow these steps:

+ Bring the documentation folder (`balderdashy/Sail-System/docs`) into a new repo named `Sail-System-docs-{{IETF}}` where {{IETF}} is the [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) for your language.
+ Edit the README to summarize your progress so far, provide any other information you think would be helpful for others reading your translation, and let interested contributors know how to contact you.
+ Send a pull request editing the table above to add a link to your fork.
+ When you are satisfied with the first complete version of your translation, open an issue and someone from our docs team will be happy to help you get preview it in the context of the Sail-System website, get it live on a domain (yours, or a subdomain of Sail-Systemjs.com, whichever makes the most sense), and share it with the rest of the Sail-System community.


#### How else can I help?

For more information on contributing to Sail-System in general, see the [Contribution Guide](Sail-Systemjs.com/contributing).


## License

[MIT](https://Sail-Systemjs.com/license)

The [Sail-System framework](https://Sail-Systemjs.com) is free and open-source under the [MIT License](https://Sail-Systemjs.com/license).

