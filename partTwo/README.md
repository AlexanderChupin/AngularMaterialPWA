# Angular Material PWA Part Two

This is part two for [this blog post series](https://medium.com/@michaellabieniec/part-1-building-a-progressive-web-application-pwa-with-angular-material-and-aws-amplify-5c741c957259). Follow the instructions in the post to initialize the project.

# Build Your Own App

To use as a scaffold for your own PWA, you can copy `partTwo` as a starting point for your app.

```
$ cp -fR AngularMaterialPWA/partTwo ./my-app
$ cd my-app && npm i
$ amplify init
$ amplify add auth # Check the details on the blog post for selections
```

## Production server
To run a production server and test the service worker functionality run `npm start`. This will run a production build (after building the angular assets) on `http://localhost:8080` using the node `http-server` module.

## Development server

Run `npm run serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## ALC. Playing with e2e tests
- [protractor/timeouts\.md at master · angular/protractor](https://github.com/angular/protractor/blob/master/docs/timeouts.md#waiting-for-angular-on-page-load)
- [Protractor \- end\-to\-end testing for AngularJS](https://www.protractortest.org/#/locators)
- [Future of Angular E2E & Plans for Protractor · Issue \#5502 · angular/protractor](https://github.com/angular/protractor/issues/5502)
- [continuous integration \- What is the difference between "npm install" and "npm ci"? \- Stack Overflow](https://stackoverflow.com/questions/52499617/what-is-the-difference-between-npm-install-and-npm-ci)
- [Recovering from the Git detached HEAD state \| CircleCI](https://circleci.com/blog/git-detached-head-state/#:~:text=In%20Git%2C%20HEAD%20refers%20to,commit%20in%20the%20main%20branch.)

## ALC. Fixing Jasmin tests
- [Sidenav \| Angular Material](https://material.angular.io/components/sidenav/examples)
- [Angular Components \- Testing with MatSidenavHarness \- StackBlitz](https://stackblitz.com/run?file=src%2Fmaterial.module.ts,src%2Fapp%2Fapp.module.ts)
- [Debug JavaScript in Chrome \| IntelliJ IDEA](https://www.jetbrains.com/help/idea/debugging-javascript-in-chrome.html)
- [How to debug ES6 jasmine tests and set breakpoints from PhpStorm? – IDEs Support \(IntelliJ Platform\) \| JetBrains](https://intellij-support.jetbrains.com/hc/en-us/community/posts/115000478570-How-to-debug-ES6-jasmine-tests-and-set-breakpoints-from-PhpStorm-)
- [How to import Angular Material in project? \- Stack Overflow](https://stackoverflow.com/questions/45166844/how-to-import-angular-material-in-project)
- [Angular \- RouterTestingModule](https://angular.io/api/router/testing/RouterTestingModule)

## ALC. Debugging Angular application
- [Angular \| IntelliJ IDEA](https://www.jetbrains.com/help/idea/angular.html#angular_running_and_debugging)
- [Running and debugging TypeScript \| IntelliJ IDEA](https://www.jetbrains.com/help/idea/running-and-debugging-typescript.html)

## ALC. Upgrading Amplify 
- [Migration & Backwards Compatibility \- Migration to enabled override feature \- AWS Amplify Docs](https://docs.amplify.aws/cli/migration/override/)

## ALC. Learning Amplify
- [Quickstart. Amplify toolchain](https://kaustavghosh06.github.io/docs/cli-toolchain/quickstart)

## ALC. Resolving errors and IDE upgrade
- Warning: 'C:\Users\AChupin\PhpstormProjects\AngularMaterialPWA\partTwo\src\styles.scss' imports '~@angular/material/theming' with a tilde. Usage of '~' in imports is deprecated. [Sass @use / @import statements without tilde aren't being resolved correctly : WEB\-53120](https://youtrack.jetbrains.com/issue/WEB-53120/Sass-use-import-statements-without-tilde-arent-being-resolved-correctly)
- Go to PhpStorm account page and find fallback license [JetBrains Account](https://account.jetbrains.com/licenses)
- [Download PhpStorm 2020\.3\.3](https://www.jetbrains.com/shop/download/PS/2020300?_ga=2.126951499.776827484.1668343899-1519556294.1618289126&_gl=1*1oi8rcu*_ga*MTUxOTU1NjI5NC4xNjE4Mjg5MTI2*_ga_9J976DJZ68*MTY2ODQyNzQ4NS45LjEuMTY2ODQyODEzNS4wLjAuMA..)

## ALC. Expliring Angular life-cicle

- [javascript \- Does change detection in angular2 always start in root component? \- Stack Overflow](https://stackoverflow.com/questions/36489764/does-change-detection-in-angular2-always-start-in-root-component)
- Zone.js Github repo [angular/packages/zone\.js at main · angular/angular](https://github.com/angular/angular/tree/main/packages/zone.js)  
- Zone.js explained [Brian Ford \- Zones \- NG\-Conf 2014 \- YouTube](https://www.youtube.com/watch?v=3IqtmUscE_U&t=150s&ab_channel=ng-conf)
- [Zones in Angular \| Articles by thoughtram](https://blog.thoughtram.io/angular/2016/02/01/zones-in-angular-2.html)
- [Angular Change Detection Explained \| Articles by thoughtram](https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html)  
- [Angular Template Syntax Demystified \- Part 1 \| Articles by thoughtram](https://blog.thoughtram.io/angular/2015/08/11/angular-2-template-syntax-demystified-part-1.html)  
- [Angular File Upload \- Complete Guide](https://blog.angular-university.io/angular-file-upload/)
- [What the heck is the event loop anyway? \| Philip Roberts \| JSConf EU \- YouTube](https://www.youtube.com/watch?v=8aGhZQkoFbQ&ab_channel=JSConf)

## Implementing CyPress e2e testing as of protractor is depricated
- [The State of end\-to\-end testing with Angular \| by Mark Thompson \(@marktechson\) \| Angular Blog](https://blog.angular.io/the-state-of-end-to-end-testing-with-angular-d175f751cb9c)
- Rating of e2e testing frameworks [Top 5 Alternatives to Protractor \| BrowserStack](https://www.browserstack.com/guide/protractor-alternatives)
- [How to Create Readable End\-to\-end Tests with Cypress And Cucumber](https://www.sipios.com/blog-tech/how-to-create-readable-end-to-end-tests-with-cypress-and-cucumber)
- Working and tested cyrpess installation. [badeball/cypress\-cucumber\-preprocessor: Run cucumber/gherkin\-syntaxed specs with Cypress](https://github.com/badeball/cypress-cucumber-preprocessor)
- Working and tested installation instructions. [cypress\-cucumber\-preprocessor/quick\-start\.md at master · badeball/cypress\-cucumber\-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/quick-start.md)
- Working and tested cypress configuration [cypress\-cucumber\-preprocessor/cypress\.config\.ts at master · badeball/cypress\-cucumber\-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/examples/webpack-ts/cypress.config.ts)  
- cypress configuration [Configuration \| Cypress Documentation](https://docs.cypress.io/guides/references/configuration#Configuration-File)
- [cypress\-cucumber\-preprocessor/cucumber\-basics\.md at master · badeball/cypress\-cucumber\-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/cucumber-basics.md)
