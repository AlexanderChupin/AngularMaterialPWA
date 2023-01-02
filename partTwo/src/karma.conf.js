// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const path = require('path');
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      // [\{random = false\} has unexpected behaviour · Issue \#226 · karma\-runner/karma\-jasmine](https://github.com/karma-runner/karma-jasmine/issues/226)
      jasmine: {
        random: false
      }
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    //logLevel:config.LOG_DEBUG,
    autoWatch: true,
    browsers: ['Chrome_default_profile'],//'Chrome' //'Chrome_default_profile',
    singleRun: false,
    captureTimeout: 210000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout : 210000,
    browserNoActivityTimeout : 210000,
    // [karma\-runner/karma\-chrome\-launcher: A Karma plugin\. Launcher for Chrome and Chrome Canary\.](https://github.com/karma-runner/karma-chrome-launcher)
    // you can define custom flags
    customLaunchers: {
      Chrome_default_profile: {
        base: 'Chrome',
        // flags: ['--disable-web-security', '--disable-site-isolation-trials']
        flags: ['--profile-directory=Karma'],
        //flags: ['--profile-directory="C:\\Users\\AChupin\\AppData\\Local\\JetBrains\\PhpStorm2020.3\\chrome-user-data-50738\\Default"']
        chromeDataDir: path.resolve(__dirname, './../.chrome')
        // ALC. [karma\-runner/karma\-chrome\-launcher: A Karma plugin\. Launcher for Chrome and Chrome Canary\.](https://github.com/karma-runner/karma-chrome-launcher)
        // chromeDataDir: 'C:\\Users\\AChupin\\AppData\\Local\\JetBrains\\PhpStorm2020.3\\chrome-user-data-50738'
      }
    }
  });
};
