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
- ALC. custom configuration for Karma [karma\-runner/karma\-chrome\-launcher: A Karma plugin\. Launcher for Chrome and Chrome Canary\.](https://github.com/karma-runner/karma-chrome-launcher#configuration)
- ALC. set custom [How to Disable Software Reporter Tool in Chrome Causing High CPU Usage](https://www.makeuseof.com/disable-chrome-software-reporter-tool/)

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## ALC. Running Cypress end-to-end tests
1. Deploy development server, see above [Development server](#Development server)
2. Set runtime node.js environment variables E2E_MAIL=****.com;E2E_PASS=****. See the description in /cypress/global.d.ts
3. Execute Cypress GUI by `npm run cypressGUI --scripts-prepend-node-path=auto`
   - or execute Cypress automated tests by `npm run e2ecypress --scripts-prepend-node-path=auto`

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
- using of createSpyObj [Angular \- Testing services](https://angular.io/guide/testing-services)
- !!! Angular unit testing of observables. asynchronous RxJS code synchronously [RxJS \- Testing RxJS Code with Marble Diagrams](https://rxjs.dev/guide/testing/marble-testing)
  - testing observables explained. [How to test Observables\. The ultimate guide — never again be… \| by Kevin Kreuzer \| Angular In Depth \| Medium](https://medium.com/angular-in-depth/how-to-test-observables-a00038c7faad)
  - !!! using of marbleAssert to visualize actual vs expected marbles [kwonoj/rx\-sandbox: Marble diagram DSL based test suite for RxJS](https://github.com/kwonoj/rx-sandbox#anatomy-of-test-interface)  
  - testing HTTP services [Angular \- Testing services](https://angular.io/guide/testing-services#testing-http-services)

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

## ALC. Exploring Angular life-cicle

- [javascript \- Does change detection in angular2 always start in root component? \- Stack Overflow](https://stackoverflow.com/questions/36489764/does-change-detection-in-angular2-always-start-in-root-component)
- Zone.js Github repo [angular/packages/zone\.js at main · angular/angular](https://github.com/angular/angular/tree/main/packages/zone.js)  
- Zone.js explained [Brian Ford \- Zones \- NG\-Conf 2014 \- YouTube](https://www.youtube.com/watch?v=3IqtmUscE_U&t=150s&ab_channel=ng-conf)
- [Zones in Angular \| Articles by thoughtram](https://blog.thoughtram.io/angular/2016/02/01/zones-in-angular-2.html)
- [Angular Change Detection Explained \| Articles by thoughtram](https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html)  
- [Angular Template Syntax Demystified \- Part 1 \| Articles by thoughtram](https://blog.thoughtram.io/angular/2015/08/11/angular-2-template-syntax-demystified-part-1.html)  
- [Angular File Upload \- Complete Guide](https://blog.angular-university.io/angular-file-upload/)
- [What the heck is the event loop anyway? \| Philip Roberts \| JSConf EU \- YouTube](https://www.youtube.com/watch?v=8aGhZQkoFbQ&ab_channel=JSConf)
- learning change detection [Angular \- NG0100: Expression has changed after it was checked](https://angular.io/errors/NG0100)
  - sample testing app [Angular \(forked\) \- StackBlitz](https://stackblitz.com/edit/angular-q3hvsl?file=src%2Fapp%2Fapp.component.ts)
  - explanation used in the sample testing app [Angular Debugging "Expression has changed": Explanation \(and Fix\)](https://blog.angular-university.io/angular-debugging/)
  - !!! usefull deep explanation [Angular lifecycle hooks explained \- LogRocket Blog](https://blog.logrocket.com/angular-lifecycle-hooks/#:~:text=Lifecycle%20hooks%20are%20a%20special,updates%20them%2C%20or%20destroys%20them.)
  - !!! usefull CD cycle diagram at the bottom [Complete Guide: Angular lifecycle hooks \- Angular inDepth](https://indepth.dev/posts/1494/complete-guide-angular-lifecycle-hooks)
  - not tested but useful diagram for DOM redering [Simplified Angular Change Detection \| by Pankaj Parkar \| ngconf \| Medium](https://medium.com/ngconf/simplified-angular-change-detection-e74809ff804d)
## Implementing CyPress e2e testing as of protractor is depricated
- [The State of end\-to\-end testing with Angular \| by Mark Thompson \(@marktechson\) \| Angular Blog](https://blog.angular.io/the-state-of-end-to-end-testing-with-angular-d175f751cb9c)
- Rating of e2e testing frameworks [Top 5 Alternatives to Protractor \| BrowserStack](https://www.browserstack.com/guide/protractor-alternatives)
- [How to Create Readable End\-to\-end Tests with Cypress And Cucumber](https://www.sipios.com/blog-tech/how-to-create-readable-end-to-end-tests-with-cypress-and-cucumber)
- Working and tested cyrpess installation. [badeball/cypress\-cucumber\-preprocessor: Run cucumber/gherkin\-syntaxed specs with Cypress](https://github.com/badeball/cypress-cucumber-preprocessor) 
- Working and tested installation instructions. [cypress\-cucumber\-preprocessor/quick\-start\.md at master · badeball/cypress\-cucumber\-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/quick-start.md)
- Working and tested cypress configuration [cypress\-cucumber\-preprocessor/cypress\.config\.ts at master · badeball/cypress\-cucumber\-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/examples/webpack-ts/cypress.config.ts)  
- cypress configuration [Configuration \| Cypress Documentation](https://docs.cypress.io/guides/references/configuration#Configuration-File)
- [cypress\-cucumber\-preprocessor/cucumber\-basics\.md at master · badeball/cypress\-cucumber\-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/cucumber-basics.md)
- run all e2e test from console. `npx cypress run --browser chrome --e2e --headed`
- testing theory mutants. [Hunt The Bugs With Mutation Testing](https://www.sipios.com/blog-tech/hunt-the-bugs-with-mutation-testing)
- not tested. types library cyrpess [@types/cypress\-cucumber\-preprocessor \- npm](https://www.npmjs.com/package/@types/cypress-cucumber-preprocessor)
- !!! cypress clear authorization data on .visit(), so need authorization again. Instead use redirect parameter when authService.SignIn called, so after the authorization the page is redirected to the target route back. 
  - [Angular \- Router tutorial: tour of heroes](https://angular.io/guide/router-tutorial-toh#milestone-5-route-guards)
  - [How to Get Query Parameters from URL route in Angular](https://www.angularjswiki.com/angular/get-query-parameters-in-angular/)
  - [Query Parameters in Angular with examples](https://www.angularjswiki.com/angular/query-parameters-in-angular/)
  - not tested. using pipe() to process authorization requests. [angular\-aws\-amplify/auth\.guard\.ts at master · daikiojm/angular\-aws\-amplify](https://github.com/daikiojm/angular-aws-amplify/blob/master/src/app/auth/auth.guard.ts)
  - not tested. Official guide to customize authorization forms [Customization \| Amplify UI for Angular](https://ui.docs.amplify.aws/angular/connected-components/authenticator/customization)
  - descriptoin of redirect options in Angular [Better Redirects in Angular Route Guards \| juri\.dev](https://juristr.com/blog/2018/11/better-route-guard-redirects/)
  - ALC. interesting idea of cy.softVisit page, but did not succeed with testing [Time for a Quick\(er\) Cypress Visit in Angular \| by Netanel Basal \| Netanel Basal](https://netbasal.com/time-for-a-quick-er-cypress-visit-in-angular-d7d0faebfabc)
  - setting the test environment [Environment Variables \| Cypress Documentation](https://docs.cypress.io/guides/guides/environment-variables#Setting)
  - Sample app for learning cypress e2e testing, including AWS Cognito authentication [cypress\-io/cypress\-realworld\-app: A payment application to demonstrate real\-world usage of Cypress testing methods, patterns, and workflows\.](https://github.com/cypress-io/cypress-realworld-app)
  - ALC tested. cypress custom commands [https://docs.cypress.io/api/cypress-api/custom-commands#Parent-Commands Custom Commands | Cypress Documentation]
  - !!! Cypress best practices [Best Practices \| Cypress Documentation](https://docs.cypress.io/guides/references/best-practices#Organizing-Tests-Logging-In-Controlling-State)
  - !!! Solving Clashing-types-with-Jest [TypeScript \| Cypress Documentation](https://docs.cypress.io/guides/tooling/typescript-support#Clashing-types-with-Jest)

## How to check if docker container is running remotely
- [Docker Engine API v1\.41 Reference](https://docs.docker.com/engine/api/v1.41/#tag/Container)
- top 10 processes in windows [Fetch top 10 processes utilizing high CPU as shown in task manager \- Microsoft Community Hub](https://techcommunity.microsoft.com/t5/windows-powershell/fetch-top-10-processes-utilizing-high-cpu-as-shown-in-task/m-p/1239627)

## Debugging websockets
- used this article to play with cloudqueue project in 2021 [Real\-Time in Angular: A journey into Websocket and RxJS \- International JavaScript Conference](https://javascript-conference.com/blog/real-time-in-angular-a-journey-into-websocket-and-rxjs/)
  - the corresponding github [lamisChebbi/ng\-realtime\-dashboard](https://github.com/lamisChebbi/ng-realtime-dashboard)
- tested good example of websocket in Angular [How to implement WebSockets in Angular Project \| indepth\.dev](https://indepth.dev/tutorials/angular/how-to-implement-websockets-in-angular-project)
- detailed explanation websocket in Angular [Использование WebSockets в Angular c RxJs WebSocketSubject \| by Alex Dukhnovskiy \| Angular Soviet \| Medium](https://medium.com/ngx/%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-websockets-%D0%B2-angular-c-rxjs-websocketsubject-5018ecc20ee5)
- default location of chromium profile used by PHP debugging `C:\Users\AChupin\AppData\Roaming\JetBrains\PhpStorm2020.3\chrome-user-data`. See [Chromium Docs \- User Data Directory](https://chromium.googlesource.com/chromium/src/+/main/docs/user_data_dir.md)
- full guid for typescript debugging [Debug JavaScript in Chrome \| PhpStorm Documentation](https://www.jetbrains.com/help/phpstorm/debugging-javascript-in-chrome.html)
- very simple example for debugging [WebSocketSubject \| Subject Variants \| RxJS Course](https://rxjs-course.dev/course/subject-variants/websocket-subject/)
- Understanding DI (dependency injection)
    - [@Injectable\(\)](https://angular.io/guide/dependency-injection)
    - [Angular \- Singleton services](https://angular.io/guide/singleton-services)
    - [Angular \- Providing dependencies in modules](https://angular.io/guide/providers)

## Introducing InstanceIdService
- Base article, but reworked on my own manner. [angular \- Is it possible to obtain an instance Id for a service? \- Stack Overflow](https://stackoverflow.com/questions/51602094/is-it-possible-to-obtain-an-instance-id-for-a-service)
- !!! ALC. quick introduction to the static classes. It is just a function without any instances or dependency injections [Angular: Dependency Injection vs\. Static methods](https://plainenglish.io/blog/angular-dependency-injection-vs-static-methods-2191fc08e078)

## Learning catching Errors with RXJS
- base article [switchMap\(\_ => fakeRequest$\.pipe\(catchError\(\_ => of\('keep on clicking\!\!\!'\)\)\)](https://www.learnrxjs.io/learn-rxjs/operators/error_handling/catch)
- about high order observables [RxJS \- RxJS Operators](https://rxjs.dev/guide/operators#higher-order-observables)
- !!! ALC. very useful article about high order observables [What Is a Higher\-Order Observable? \-Deborah's Developer MindScape](https://blogs.msmvps.com/deborahk/higher-order-observable/)  
- alternative to guzzle [RxJS \- ajax](https://rxjs.dev/api/ajax/ajax)
- !!! ALC. Very good explanation of keeping high order observables alive after an error [How to keep an Observable alive after Error in Angular? \| by Vikash Singh \| Medium](https://medium.com/@erVikas1/how-to-keep-an-observable-returned-by-httpclient-alive-after-error-da6c5e601e9c)
- ALC. Very useful article on how to unsubscribe from subscriptions [6 Ways to Unsubscribe from Observables in Angular \| by Chidume Nnamdi 🔥💻🎵🎮 \| Bits and Pieces](https://blog.bitsrc.io/6-ways-to-unsubscribe-from-observables-in-angular-ab912819a78f)
- ALC. RXJS docs with animations [⦵ fromEvent \- RxJS Tutorial](https://rxjstutorial.com/docs/creation-operators/fromEvent/)

## ALC. Playing with 404 page not found
- press any key... [keypress \- execute function on any key press angular \- Stack Overflow](https://stackoverflow.com/questions/54876160/execute-function-on-any-key-press-angular)
- ALC. selected template for the page design [\#8 Bluescreen \- 404 Page](https://dev.to/webdeasy/25-creative-404-error-pages-with-cool-animations-16jn)
- forwarding unknown routes to the 404 page. [Angular \- Common Routing Tasks](https://angular.io/guide/router#setting-up-wildcard-routes)
