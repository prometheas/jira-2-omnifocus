# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).


## [Unreleased]
### Added
- Initial automated tests
- ESLint, scss-lint, and EditorConfig configs to project
- Hound CI configs to automatically lint code contributed via pull requests
- Gulp-based build script
- Travis CI configs
### Changed
- Moved release notes from [README.md](./README.md) to this file
- Styles are now declared with scss
- Relocated files used to build the actual extension into the `source` directory, leaving only project config and metadata files at the root
- Zepto is now installed via bower during build
- JS files now conform to ESLint configs
- Replaced use of deprecated `chrome.extension` API with `chrome.runtime`
- Updated ESLint rules, changed files to conform to new rules

## v1.1.2
### Added
- Support for JIRA installations configured deeper within a host's document root. Fixes prometheas/jira-2-omnifocus#6.

## v1.1.1
### Fixed
- Clicking the "Send to OmniFocus" button no longer fails to create a task on JIRA installs that are accessed via HTTPS.

## v1.1
### Added
- [Mail Drop](http://www.omnigroup.com/blog/deliver-actions-to-your-omnifocus-inbox-with-mail-drop) support.

## v1.0
- Initial public release
