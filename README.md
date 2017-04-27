# jira-2-omnifocus

Chrome extension for sending JIRA tickets to [OmniFocus](https://www.omnigroup.com/omnifocus).

[![Travis CI status](https://travis-ci.org/prometheas/svn-wc-attendant.svg)](https://travis-ci.org/prometheas/svn-wc-attendant)
<br />
[![bitHound Overall Score](https://www.bithound.io/github/prometheas/jira-2-omnifocus/badges/score.svg)](https://www.bithound.io/github/prometheas/jira-2-omnifocus)
[![bitHound Dependencies](https://www.bithound.io/github/prometheas/jira-2-omnifocus/badges/dependencies.svg)](https://www.bithound.io/github/prometheas/jira-2-omnifocus/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/prometheas/jira-2-omnifocus/badges/devDependencies.svg)](https://www.bithound.io/github/prometheas/jira-2-omnifocus/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/prometheas/jira-2-omnifocus/badges/code.svg)](https://www.bithound.io/github/prometheas/jira-2-omnifocus)
<br />
[![Scrutinizer status](https://scrutinizer-ci.com/g/prometheas/svn-wc-attendant/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/prometheas/svn-wc-attendant/?branch=master)

This extension adds a big, lovely "Send to OmniFocus" button atop the right column of the JIRA ticket page.  Click that button to quickly send a JIRA ticket into OmniFocus.  The extension also supports [Mail Drop](http://www.omnigroup.com/blog/deliver-actions-to-your-omnifocus-inbox-with-mail-drop), so you can send items to your OmniFocus Inbox _even if you haven't got OmniFocus installed on this computer_. (Yes, even from Linux or Windows.)

Use it allocate today's work.  Use it to remember to follow up on some ticket, even one that's not yours (let's face it: merely being a watcher isn't all that useful when you've got a mountain of things you're responsible for).

Most importantly, use it to Get Things Done.

*NOTE*: I am not _in any way_ affiliated with Omnigroup (the folks who make OmniFocus), or with Atlassian (the folks that make JIRA).  Neither the Omnigroup nor Atlassian endorse this extension in any way, express nor implied.  They don't even know who I am.


## Getting Started

After cloning this project to your computer, you'll need to build the extension.

```sh
$ npm install
$ npm run build
```

## Known Limitations

At this time, this extension only works its magic from the ticket detail page.  That is to say that it doesn't work from any quick-edit / AJAX-overlay views of ticket information (ie, from the Kanban board, etc).


## Contributing

I enjoy maintaining this extension, and am happy that there are folks out there using it.  I'm always thrilled to receive feedback, feature requests, and even PRs.  If you've got a feature to request or a bug to report, please [file an issue on Github](https://github.com/prometheas/jira-2-omnifocus/issues).

If you're a little more technically inclined, and would like to submit a pull request, please note that I have implemented [ESLint](http://eslint.org) configs (based on the [Airbnb JS Styleguide](https://github.com/airbnb/javascript)) for the project that code submitted in PRs must honor (I've configured [Hound CI](https://houndci.com/) to automatically decline any PRs that fail to validate according to the project's configured linting rules).  You can minimize the chances of encountering an auto decline by ensuring that you've run `npm run lint` on your changes before submitting the pull request.  I can also recommend installing the appropriate modules for both [ESLint](http://eslint.org/docs/user-guide/integrations) and [EditorConfig](http://editorconfig.org/#download) for whatever editor / IDE you like to use for development.
