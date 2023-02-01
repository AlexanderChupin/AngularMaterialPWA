import { defineConfig } from "cypress";
import * as webpack from '@cypress/webpack-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { environment } from 'src/environments/environment';

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    webpack({
      webpackOptions: {
        resolve: {
          extensions: [".ts", ".js"],
        },
        module: {
          rules: [
            /*{
              test: /\.ts$/,
              exclude: [/node_modules/],
              use: [
                {
                  loader: "ts-loader",
                },
              ],
            },*/
            {
              test: /\.feature$/,
              use: [
                {
                  loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                  options: config
                },
              ],
            },
          ],
        },
      },
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  // config["target"] = ["defaults and supports es6-module"]
  return config;
}

// ALC. [Configuration \| Cypress Documentation](https://docs.cypress.io/guides/references/configuration#modifyObstructiveCode)
export default defineConfig({

  e2e: {
    env: {
      "e2e_mail": process.env.E2E_MAIL,
      "e2e_pass": process.env.E2E_PASS,
      "gwEndpoint_failing": "http://alexcloud.myqnapcloud.com:8081/alcwol.php", //ALC. HTTP must fail on HTTPS server
      "gwEndpoint": environment.gwEndpoint,
      "intAttempts_gateway":environment.intAttempts_gateway,
      "intRetries_gateway": environment.intRetries_gateway,
      "msecDelay_gateway": environment.msecDelay_gateway},
    baseUrl: "http://localhost:4200",
    specPattern: "**/*.feature",
    //supportFile: "./cypress/support/index.ts",
    // supportFile: false,
    video: false,
    setupNodeEvents
  },
});
