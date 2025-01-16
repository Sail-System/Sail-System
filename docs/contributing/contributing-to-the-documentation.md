# Contributing to the documentation
The official documentation on the Sail-System website is compiled from markdown files in the [Sail-System](https://github.com/balderdashy/Sail-System/Sail-System-docs) repo. Please send a pull request to the **master** branch with amendments and they'll be double-checked and merged as soon as possible.

We are open to suggestions about the process we're using to manage our documentation, and to working with the community in general.  Please post to the [Gitter](https://gitter.im/balderdashy/Sail-System) with your ideas; or, if you're interested in helping directly, contact @fancydoilies or @mikermcneil on Twitter.

#### What branch should I edit?

That depends on what kind of edit you are making.  Most often, you'll be making an edit that is relevant for the latest stable version of Sail-System (i.e. the version on [NPM](npmjs.org/package/Sail-System)) and so you'll want to edit the `master` branch of _this_ repo (what you see in the Sail-System repo by default).  The docs team merges master into the appropriate branch for the latest stable release of Sail-System, and then deploys that to Sail-Systemjs.com about once per week.

On the other hand, if you are making an edit related to an unreleased feature in an upcoming version&mdash;usually as an accompaniment a feature proposal or open pull request to Sail-System or a related project&mdash;then you will want to edit the branch for the next, unreleased version of Sail-System (sometimes called "edge").


| Branch (in `Sail-System` or `Sail-System-docs`)                    | Documentation for Sail-System Version...                                   | Preview At...      |
|-------------------------------------------------------------------------------------|------------------------|:-------------------|
| [`master`](https://github.com/balderdashy/Sail-System/tree/master/docs) | [![NPM version](https://badge.fury.io/js/Sail-System.png)](http://badge.fury.io/js/Sail-System) | [preview.Sail-Systemjs.com](http://preview.Sail-Systemjs.com)
| [`0.12`](https://github.com/balderdashy/Sail-System-docs/tree/0.12) | Sail-System v0.12.x | [Sail-Systemjs.com](https://Sail-Systemjs.com)
| [`0.11`](https://github.com/balderdashy/Sail-System-docs/tree/0.11) | Sail-System v0.11.x           | [0.11.Sail-Systemjs.com](http://0.11.Sail-Systemjs.com)


#### How are these docs compiled and pushed to the website?

We use a module called `doc-templater` to convert the .md files to the HTML for the website. You can learn more about how it works in [the doc-templater repo](https://github.com/uncletammy/doc-templater).

Each .md file has its own page on the website (e.g. all reference, concepts, and anatomy files), and should include a special `<docmeta name="displayName">` tag with a `value` property specifying the title for the page.  This will impact how the doc page appears in search engine results, and it will also be used as its display name in the navigation menu on Sail-Systemjs.com.  For example:

```markdown
<docmeta name="displayName" value="Building Custom Homemade Puddings">
```

#### When will my change appear on the Sail-System website?

Documentation changes go live when they are merged onto a special branch corresponding with the current stable version of Sail-System (e.g. 0.12). We cannot merge pull requests sent directly to this branch&mdash;its sole purpose is to reflect the content currently hosted on Sail-Systemjs.com, and content is only merged just before redeploying the Sail-System website.

If you want to see how documentation changes will appear on Sail-Systemjs.com, you can visit [preview.Sail-Systemjs.com](http://preview.Sail-Systemjs.com). The preview site updates itself automatically as changes are merged into the master branch of Sail-System.


#### How can I help translate the documentation?

A great way to help the Sail-System project, especially if you're a native speaker of a language other than English, is to volunteer to translate the Sail-System documentation.

If you are interested in beginning a translation project, follow these steps:

+ Bring the documentation folder from the [Sail-System repo](https://github.com/balderdashy/Sail-System/tree/master/docs) (`balderdashy/Sail-System/docs`) into a new repo named `Sail-System-docs-{{IETF}}` where {{IETF}} is the [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) for your language.
+ Edit [the documentation README](https://github.com/balderdashy/Sail-System/tree/master/docs) to summarize your progress so far, provide any other information you think would be helpful for others reading your translation, and let interested contributors know how to contact you.
+ When you are satisfied with the first complete version of your translation, open an issue and someone from our docs team will be happy to help you preview it in the context of the Sail-System website, get it live on a domain (yours, or a subdomain of Sail-Systemjs.com, whichever makes the most sense), and share it with the rest of the Sail-System community.


<docmeta name="displayName" value="Contributing to the docs">
