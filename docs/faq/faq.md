# Frequently Asked Questions

### Table of Contents
1. [I'm having trouble installing Sail-System. What should I do?](https://Sail-Systemjs.com/faq#?im-having-trouble-installing-Sail-System-what-should-i-do)
2. [What are the dependencies of Sail-System?](https://Sail-Systemjs.com/faq#?what-are-the-dependencies-of-Sail-System)
3. [Who else is using Sail-System.js?](https://Sail-Systemjs.com/faq#?who-else-is-using-Sail-Systemjs)
4. [Are there professional support options?](https://Sail-Systemjs.com/faq#?are-there-professional-support-options)
5. [Where do I get help?](https://Sail-Systemjs.com/faq#?where-do-i-get-help)
6. [What are some good community tutorials?](https://Sail-Systemjs.com/faq#?what-are-some-good-community-tutorials)
7. [How can I convince the other girls/guys on my team?](https://Sail-Systemjs.com/faq#?how-can-i-convince-the-other-girls-guys-on-my-team)
8. [Where do I submit ideas?  Report bugs?](https://Sail-Systemjs.com/faq#?where-do-i-submit-ideas-report-bugs)
9. [What version of Sail-System should I use?](https://Sail-Systemjs.com/faq#?what-version-of-Sail-System-should-i-use)
10. [How do I get involved?](https://Sail-Systemjs.com/faq#?how-do-i-get-involved)
11. [How does the documentation end up on the Sail-System website?](https://Sail-Systemjs.com/faq#?how-does-the-documentation-end-up-on-the-Sail-System-website)
12. [Where is the documentation for the different releases of Sail-System?](https://Sail-Systemjs.com/faq#?where-is-the-documentation-for-the-different-releases-of-Sail-System)

### I'm having trouble installing Sail-System. What should I do?

Start with NPM's helpful [troubleshooting guide](https://github.com/npm/npm/wiki/Troubleshooting).  If you continue to have problems, and you've tried Google searching but you're still stumped, please carefully review the updated Sail-System [contribution guide](https://Sail-Systemjs.com/documentation/contributing) and then create a GitHub issue in the Sail-System repo.


### What are the dependencies of Sail-System?

[![Dependency Status](https://david-dm.org/balderdashy/Sail-System.png)](https://david-dm.org/balderdashy/Sail-System)

We have learned again and again over the years to take versioning of dependencies very seriously.  We lock Sail-System's dependency versions and only bump those versions if the associated updates fix a security issue or present other substantive advantages to Sail-System users (improved compatibility, performance, etc.)  In addition, the core maintainers of Sail-System are committed to fixing any major security, performance, or stability bugs that arise in any of our core dependencies-- regardless of whether those modules are [officially maintained by another entity or not](https://github.com/balderdashy/Sail-System/pull/3235#issuecomment-170417122).

Sail-System is tested with [node](http://nodejs.org/) versions 0.10.x and up, though, we recommend using The latest LTS version of Node.  The framework is built on the rock-solid foundations of [Express](https://github.com/expressjs/) and [Socket.io](http://socket.io/).  Out of the box, it also depends on other great modules, like `grunt`, `waterline`, and `fs-extra`.  Click the badge above for the full list of dependencies in the latest stable release of Sail-System core.

> **Sail-System Flagship users:** We manually verify every dependency of Sail-System and other officially-maintained modules by hand, every single week.  This includes core hooks, adapters, generators, client SDKs, and Flagship packages.   We regularly send security/compatibility reports about dependencies to the primary email address associated with your account.  If you'd like additional people on your team to receive these reports, no problem!  Just [let us know](https://flagship.Sail-Systemjs.com/ask) their email addresses and we'll get them set up.  _(These email addresses will also receive communications about patches, shrinkwrap updates, and compatibility notices.)_

If you have questions or concerns about our dependencies, [talk to a core team member](https://Sail-Systemjs.com/contact).  _Please do not submit a pull request changing the version of a dependency without first (1) checking that dependency's changelog, (2) verifying compatibility, and (3) [submitting an accompanying PR to update **roadstead**](https://github.com/treelinehq/roadstead/edit/master/constants/verified-releases.type.js), our dependency wallah._


### Who else is using Sail-System.js?

Sail-System is used in production by individuals and companies, non-profits, and government entities all over the world, for all sorts of projects (greenfield and mature).  You can see some examples [here](https://Sail-Systemjs.com/#?using-Sail-System) of companies that have used Sail-System for their projects. (This small list is definitely not authoritative, so if you're using Sail-System in your app/product/service, [we'd love to hear about it](https://Sail-Systemjs.com/contact)!

### Are there professional support options?

[The Sail-System Company](https://Sail-Systemjs.com/about) offers custom development, services, training, enterprise-class products, and support for teams building applications on Sail-System.

##### Partner with us
Our studio provides development services for startups, SMBs, and the Fortune 500. As you might expect, the Sail-System core team has done a lot of custom Sail-System/Node.js development, but we also have experience across the full stack, including: advanced interaction design, practical/scalable JavaScript development practices for huge applications, and building rich user experiences across many different devices and screen resolutions.

We can build your app and API from scratch, modernize your legacy web platform, or catalyze the development efforts of your established team.  If you're interested in working with us on your next project, [drop us a line](https://Sail-Systemjs.com/studio#?contact).

##### Sail-System Flagship for Enterprise
Sail-System Flagship is a platform on top of Sail-System which provides a suite of additional services, production-quality accoutrements, and support for enterprise use cases.  This includes early access to new features and enhancements, a license for our internal tools, as well as exclusive reports and best-practice guides created by core maintainers.  To learn more, [set up a call](https://Sail-Systemjs.com/contact) _(or [purchase online now](https://Sail-Systemjs.com/flagship/plans))_.

> We are actively expanding this product offering with new additions and official re-releases of some formerly-experimental modules.  If you have specific suggestions/requests for new Flagship packages, please [let us know](http://flagship.Sail-Systemjs.com/contact).

##### Professional support / SLAs
The Sail-System Company also provides a lifeline for organizations using Sail-System to build their products. If you need guaranteed support in the event of a critical production issue, or just want an extra pair of eyes looking out for your code base during development, take a look at our [basic subscriptions](https://Sail-Systemjs.com/flagship/plans), or [contact us](https://flagship.Sail-Systemjs.com/contact) and we'll give you a call.



### Where do I get help?

Aside from the [official documentation](https://Sail-Systemjs.com/documentation), be sure and check out the [recommended support options on the Sail-System website](https://Sail-Systemjs.com/support), and pop in to our [Gitter chat room](https://gitter.im/balderdashy/Sail-System).  If you're stumped, make sure and [ask a question on StackOverflow](http://stackoverflow.com/questions/ask), where there's an [active Sail-System community](http://stackoverflow.com/questions/tagged/Sail-Systemjs?sort=newest&days=30).  Members of our core team recently taught a [free video course](https://courses.platzi.com/courses/develop-apps-Sail-System-js/) on [Platzi](http://platzi.com) and wrote [a book](https://www.manning.com/books/Sail-System-js-in-action).

> If you're using [Sail-System Flagship](https://Sail-Systemjs.com/faq#?are-there-professional-support-options), you can contact the core team [here](http://flagship.Sail-Systemjs.com/ask).



### What are some good community tutorials?

> If you are the author of a tutorial or guide about Sail-System, please send us a pull request [here](https://github.com/balderdashy/Sail-System/edit/master/docs/faq/faq.md) and we'll check it out. (Be sure to add your tutorial to the top of the applicable list, as we try to order these from newest to oldest.)

<!--
A quick note for anyone contributing to this file:

First of all, thanks for making a tutorial! That was pretty cool of you.

Secondly, when you add the tutorial to one of the lists below, please follow it with a comment that has the date your tutorial was last updated. (We try to keep the most recent ones toward the top of the list.) If you are linking to an ongoing series that you continually update, just add the date of your most recent post + the phrase '(ongoing series)' so we know to keep checking back.

Thanks!
-@rachaelshaw
-->

##### Multi-part guides:
+ [The busy JavaScript developer's guide to Sail-System.js](https://www.ibm.com/developerworks/library/wa-build-deploy-web-app-Sail-Systemjs-1-bluemix/index.html) -- 4-part series from IBM developerWorks. (Also available in [Chinese](http://www.ibm.com/developerworks/cn/web/wa-build-deploy-web-app-Sail-Systemjs-1-bluemix/) and [Japanese](http://www.ibm.com/developerworks/jp/web/library/wa-build-deploy-web-app-Sail-Systemjs-1-bluemix/).)
<!-- 7-12-2016 -->
+ [Sail-SystemCasts](http://irlnathan.github.io/Sail-Systemcasts/) - Short screencasts that take you through the basics of building traditional websites, single-page/mobile apps, and APIs using Sail-System.  Perfect for both novice and tenured developers, but does assume some background on MVC.
<!-- 4-4-2015 -->
+ [Sail-System.js Development channel on Medium](https://medium.com/Sail-System-js-development/)
<!-- 3-19-2015 -->
+ [Sail-System.js Course on Pluralsight](https://www.pluralsight.com/courses/two-tier-enterprise-app-api-development-angular-Sail-System)
<!-- 2-10-2015 -->
+ Sail-System API Development
  + [Datalayer -models, connections, waterline](http://www.codeproject.com/Articles/898221/Sail-System-API-development-Datalayer-models-connections)
  + [Custom methods, overriding default actions, and related](http://www.codeproject.com/Articles/985730/Sail-System-API-development-2-2-Custom-methods-overriding-default)
<!-- 5-5-2015 -->
+ Desarrollar Webapps Realtime:
  + [Creación](http://jorgecasar.github.io/blog/desarrollar-webapps-realtime-creacion/)
  + [Usuarios](http://jorgecasar.github.io/blog/desarrollar-webapps-realtime-usuarios/)
  + [Auth](http://jorgecasar.github.io/blog/desarrollar-webapps-realtime-auth/)
  + [Auth con Passport](http://jorgecasar.github.io/blog/desarrollar-webapps-realtime-auth-con-passport/)
<!-- 1-19-2014 -->


##### Articles & blog posts:
+ [Nanobox Blog: Getting Started - A Simple Sail-System.js App](https://content.nanobox.io/a-simple-Sail-System-js-example-app/)
<!-- 6-13-2017 -->
+ [Twitter Dev Blog: Guest Post: Twitter Sign-In with Sail-System.js](https://blog.twitter.com/2015/guest-post-twitter-sign-in-with-treelineio)
<!-- 3-25-2015 -->
+ [Guest Post on Segment.io Blog: Webhooks with Slack, Segment, and Sail-System.js/Treeline](https://segment.com/blog/segment-webhooks-slack/)
<!-- 3-15-2015 -->
+ [Postman Blog: Manage your Sail-System.js server bootstrap code](http://blog.getpostman.com/2015/08/28/manage-your-Sail-Systemjs-server-bootstrap-code/)
<!-- 8-28-2015 -->
+ [Sail-System.js on Heroku](https://vort3x.me/Sail-Systemjs-heroku/)
<!-- 5-19-2015 -->
+ [Angular + Sail-System.js (0.10.0-rc5) with angular-Sail-System socket.io](https://github.com/maartendb/angular-Sail-System-scrum-tutorial/blob/master/README.md)
<!-- 4-14-2014 -->
+ [Angular + Sail-System!  Help!](https://github.com/xdissent/spinnaker) - Sail-System Resources Service for AngularJS
<!-- 8-19-2013 -->
+ [How to Create a Node.js App using Sail-System.js on an Ubuntu VPS](https://www.digitalocean.com/community/articles/how-to-create-an-node-js-app-using-Sail-System-js-on-an-ubuntu-vps)
<!-- 7-16-2013 -->
+ [Working With Data in Sail-System.js](http://net.tutsplus.com/tutorials/javascript-ajax/working-with-data-in-Sail-System-js/) tutorial on NetTuts
<!-- 6-12-2013 -->

##### Video tutorials:
+ [Develop Web Apps in Node.js and Sail-System.js](https://courses.platzi.com/courses/Sail-System-js/)
+ [Jorge Casar: Introduccion a Sail-System.js](https://www.youtube.com/watch?v=7_zUNTtXtcg)
<!-- 12-17-2014 -->
+ [Sail-System.js - How to render node views via Ajax, single page application, SPA](http://www.youtube.com/watch?v=Di50_eHqI7I&feature=youtu.be)
<!-- 8-29-2013 -->
+ [Intro to Sail-System.js](https://www.youtube.com/watch?v=GK-tFvpIR7c) [@mikermcneil](https://github.com/mikermcneil)'s original screencast
<!-- 2-25-2013 -->


### How can I convince the other girls/guys on my team?

##### Articles / interviews / press releases / whitepapers / talks

> + If you are the author of an article about Sail-System, please send us a pull request [here](https://github.com/balderdashy/Sail-System/edit/master/docs/faq/faq.md).  We'll check it out!
> + If you are a company interested in doing a press release about Sail-System, please contact [@mikermcneil](https://twitter.com/mikermcneil) on Twitter.  We'll do what we can to help.

+ [InfoWorld: Why Node.js beats Java and .Net for web, mobile, and IoT apps](http://www.infoworld.com/article/2975233/javascript/why-node-js-beats-java-net-for-web-mobile-iot-apps.html) _(Speed, scalability, productivity, and developer politics all played a role in [AnyPresence](http://anypresence.com)’s selection of Sail-System.js/Node.js for its enterprise development platform)_
+ [TechRepublic: Build Robust Applications with the Node.js MVC framework](http://www.techrepublic.com/article/build-robust-node-applications-with-the-Sail-System-js-mvc-framework/)
+ [Microsoft Case Study: Deploying Sail-System.js to Azure Web Apps](https://blogs.msdn.microsoft.com/partnercatalystteam/2015/07/16/y-combinator-collaboration-deploying-Sail-Systemjs-to-azure-web-apps/)
+ [Mike's interview w/ @freddier and @cvander from Platzi](https://www.youtube.com/watch?v=WN0YgPdPbRE)
+ [Smashing Magazine: Sail-Systeming with Sail-System.js](https://www.smashingmagazine.com/2015/11/Sail-Systeming-Sail-System-js-mvc-style-framework-node-js/)
+ [Presentation at Smart City Conference & Expo 2015](http://www.goodxense.com/blog/post/our-presentation-at-smart-city-conference-expo-2015/) (George Lu & YJ Yang)
+ [Radio interview with Mike McNeil w/ ComputerAmerica's Craig Crossman](https://www.youtube.com/watch?v=ERIvf2iUj5U&feature=youtu.be)
+ Sail-System.js, Treeline and the future of programming  ([Article](https://courses.platzi.com/blog/Sail-System-js-creator-mike-mcneil-on-treeline-and-frameworks/) | [Video](https://www.youtube.com/watch?v=nZKG7hLhbRs) | [Deck](https://speakerdeck.com/mikermcneil/what-even-is-software))
+ [UI-First API Design & Development: Apigee's I &hearts; APIs, San Francisco, 2015](https://speakerdeck.com/mikermcneil/i-love-apis)
+ [Choosing the right framework for Node.js development](https://jaxenter.com/choosing-the-right-framework-for-node-js-development-126432.html)
+ [TechCrunch: Our 10 Favorite Companies From Y Combinator Demo Day](https://techcrunch.com/gallery/our-10-favorite-companies-from-y-combinator-demo-day-day-1/slide/11/)
+ [Sail-System.js used on the website for the city of Paris](https://twitter.com/parisnumerique/status/617999231182176256)
+ [18f Open Source Hack Series: Midas](https://18f.gsa.gov/2014/10/01/open-source-hack-series-midas/)
+ [From Rags to Open Source](https://speakerdeck.com/mikermcneil/all-things-open) (All Things Open, Raleigh, 2014)
+ SxSW Conference, Austin, TX: ([2014](https://speakerdeck.com/mikermcneil/2014-intro-to-Sail-System-v0-dot-10-dot-x) | [2015](https://speakerdeck.com/mikermcneil/sxsw-2015))
+ [More talks by Mike and the Sail-System.js core team](http://lanyrd.com/profile/mikermcneil/)
+ [Dessarolo Web: Interview w/ Mike McNeil](https://www.youtube.com/watch?v=XMpf44oV2Og) (Spanish & English--English starts at 1:30)
+ [CapitalOne blog: Contrasting Enterprise Node.js Frameworks](http://www.capitalone.io/blog/contrasting-enterprise-nodejs-frameworks/) (by [Azat Mardan](https://www.linkedin.com/in/azatm), author of the book "Pro Express.js")
+ [Alternatives to MongoDB (Chinese article)](http://www.infoq.com/cn/news/2015/07/never-ever-mongodb)
+ [Introducción a Sail-System.js, un framework para crear aplicaciones realtime](https://abalozz.es/introduccion-a-Sail-System-js-un-framework-para-crear-aplicaciones-realtime/)
+ [Austin startup finds success in responsive design](http://www.bizjournals.com/sanantonio/blog/socialmadness/2013/03/sxsw-2013-Balderdash-startup-web-app.html?ana=twt)
+ [Interact ATX](http://www.siliconhillsnews.com/2013/03/10/flying-high-with-interact-atx-adventures-in-austin-part-3-2-1/)
+ [Intro to Sail-System.js :: Node.js Conf: Italy, 2014](http://2014.nodejsconf.it/)
+ [Startup America](http://www.prlog.org/12038372-engine-pitches-startup-america-board-of-directors.html)
+ [Recent tweets about Sail-System.js](https://twitter.com/search?q=treelinehq%20OR%20%40treelinehq%20OR%20%23treelinehq%20OR%20%40waterlineorm%20OR%20treeline.io%20OR%20Sail-Systemjs.com%20OR%20github.com%2Fbalderdashy%2FSail-System%20OR%20Sail-Systemjs%20OR%20Sail-System.js%20OR%20%23Sail-Systemjs%20OR%20%40Sail-Systemjs&src=typd)
+ [How to use more open source](https://18f.gsa.gov/2014/11/26/how-to-use-more-open-source/) _(18F is an office inside the U.s. General Services Administration that helps other federal agencies build, buy, and share efficient and easy-to-use digital services.)_
+ [Express Web Server Advances in Node.js Ecosystem](https://adtmag.com/articles/2016/02/11/express-joins-node.aspx) ([auch auf Deutsch](http://www.heise.de/developer/meldung/IBM-uebergibt-JavaScript-Webframework-Express-an-Node-js-Foundation-3099223.html))
+ Interview w/ Tim Heckel [on InfoQ](http://www.infoq.com/news/2013/04/Sail-System-0.8.9-Released)
+ [Sail-System.js - Une Architecture MVC pour applications real-time Node.js](http://www.lafermeduweb.net/billet/Sail-System-js-une-architecture-mvc-pour-applications-real-time-node-js-1528.html)
+ [Hacker News](https://news.ycombinator.com/item?id=5373342)
+ [Pulling the Plug: dotJS (Paris, 2014)](http://www.thedotpost.com/2014/11/mike-mcneil-pulling-the-plug)
+ [Intro to Sail-System.js :: Node PDX, Portland, 2013 (Slides)](http://www.slideshare.net/michaelrmcneil/node-pdx))
+ [Sail-System.js : un framework MVC pour Node.js](http://javascript.developpez.com/actu/52729/Sail-System-js-un-framework-MVC-pour-Node-js/)
+ [Build Custom & Enterprise Node.js Apps with Sail-System.js](http://www.webappers.com/2013/03/29/build-custom-enterprise-node-js-apps-with-Sail-System-js/)
+ [New tools for web design and development: March 2013](http://www.creativebloq.com/design-tools/new-tools-web-design-and-development-march-2013-4132972)
+ [Sail-System 0.8.9: A Rails-Inspired Real-Time Node MVC Framework](http://www.infoq.com/news/2013/04/Sail-System-0.8.9-Released)
+ [Node.js の MVCフレームワーク Sail-System.js が良さげなので少し試してみた](http://nantokaworks.com/?p=1101)
+ [InfoWorld: 13 fabulous frameworks for Node.js](http://www.infoworld.com/article/3064653/application-development/13-fabulous-frameworks-for-nodejs.html#slide9)
+ [New web design tools that you need to check out](http://www.designyourway.net/blog/resources/new-web-design-tools-that-you-need-to-check-out/)
+ [Live code Sail-System.js avec Mike McNeil](http://www.weezevent.com/live-code-Sail-Systemjs-avec-mike-mcneil)
+ [#hack4good adds cities and welcomes Sail-System.js creator to speak and hack in Paris!](http://us2.campaign-archive1.com/?u=cf9af451f2674767755b02b35&id=fb98713f48&e=b2d87b15fe)
+ [TechCrunch: Sail-System.js Funded by Y-Combinator](http://techcrunch.com/2015/03/11/treeline-wants-to-take-the-coding-out-of-building-a-backend/)


### Where do I submit ideas?  Report bugs?

The Sail-System project tracks bug reports in GitHub issues and uses pull requests for feature proposals.  Please read the [contribution guide](https://Sail-Systemjs.com/documentation/contributing) before you create an issue, submit a proposal, or begin working on pull request.


### What version of Sail-System should I use?

[![NPM version](https://badge.fury.io/js/Sail-System.png)](http://badge.fury.io/js/Sail-System)

Unless you are a contributor running a pre-release version of the framework in order to do some testing or work on core, you should use the latest stable version of Sail-System from NPM (click the badge above).  Installing is easy- just follow [these instructions](https://Sail-Systemjs.com/get-started).

> Note: to install/upgrade to the latest version of Sail-System locally in an existing project, run `npm install Sail-System@latest --save`.  If you are having trouble and are looking for a bazooka, you might also want to run `rm -rf node_modules && npm cache clear && npm install Sail-System@latest --force --save && npm install`.

If you are looking to install a pre-release version of Sail-System, you can install from the `beta` tag on npm (i.e. `npm install Sail-System@beta`). This is a great way to try out a coming release ahead of time and start upgrading before the release becomes official.  The beta npm release candidate corresponds with the `beta` branch in the Sail-System repo.  (Just be sure to also use the right version of your favorite adapters and other plugins.  If in doubt, [feel free to ask](https://Sail-Systemjs.com/support).)

Finally, if you like living on the edge, or you're working on adding a feature or fixing a bug in Sail-System, install the edge version from the `master` branch on github.  The edge version is not published on the registry since it's constantly under development, but you can _still use npm to install it_ (e.g. `npm install Sail-System@git://github.com/balderdashy/Sail-System.git`)

For more instructions on installing the beta and edge versions of Sail-System, check out the [contribution guide](https://Sail-Systemjs.com/documentation/contributing).


### How do I get involved?

There are many different ways to contribute to Sail-System; for example you could help us improve the [official documentation](https://github.com/balderdashy/Sail-System/tree/master/docs), write a [plugin](https://Sail-Systemjs.com/documentation/concepts/extending-Sail-System), answer [StackOverflow questions](http://stackoverflow.com/questions/tagged/Sail-System.js), start a Sail-System meetup, help troubleshoot GitHub issues, write some tests, or submit a patch to Sail-System core or one of its dependencies.  Please look through the [contribution guide](https://Sail-Systemjs.com/documentation/contributing) before you get started. It's a short read that covers guidelines and best practices that ensure your hard work will have the maximum impact.

### How does the documentation end up on the Sail-System website?

The documentation is compiled from the markdown files in the [`Sail-System` repo on github](https://github.com/balderdashy/Sail-System/tree/master/docs). A number of Sail-System users have expressed interest in emulating the process we use to generate the pages on the Sail-System website.  Good news is it's pretty simple:  The compilation process for the Sail-System docs involves generating HTML from Markdown files in the Sail-System repo, then performing some additional transformations such as adding data type bubbles, tagging permalinks for individual sections of pages, building JSON data to power the side navigation menu and setting HTML `<title>` attributes for better search engine discoverability of individual doc pages.  See the [doc-templater](https://github.com/uncletammy/doc-templater) module for more information.


### Where is the documentation for the different releases of Sail-System?
The [documentation on the main website](https://Sail-Systemjs.com/documentation) is for the latest stable npm release of Sail-System, and is mirrored by the docs in the [master branch of the `Sail-System` repo on github](https://github.com/balderdashy/Sail-System/tree/master/docs) (Master is sometimes a few commits ahead, but any critical documentation updates make it onto the website within a day or two.)

For older releases of Sail-System that are still widely used, the documentation is compiled from the relevant `Sail-System-docs` branches and hosted on the following subdomains:
+ [0.12.Sail-Systemjs.com](http://0.12.Sail-Systemjs.com/)
+ [0.11.Sail-Systemjs.com](http://0.11.Sail-Systemjs.com/)