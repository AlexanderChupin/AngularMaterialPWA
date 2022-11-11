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
