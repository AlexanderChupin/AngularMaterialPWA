/// <reference types="cypress" />

// ALC. refer to [cypress\-realworld\-app/global\.d\.ts at 76909e6d39f773ddb73bd75c7a898199f0db5608 · cypress\-io/cypress\-realworld\-app](https://github.com/cypress-io/cypress-realworld-app/blob/76909e6d39f773ddb73bd75c7a898199f0db5608/cypress/global.d.ts)
declare namespace Cypress {

  interface Chainable {
    /**
     * Proceed with login account
     * @email: e2e test user email account
     * @pass: e2e test user password
     * @route: target root to redirect after login, i.e. /auth/signout
     */
    login_route (email: string, pass: string, route:string): Chainable<any>;
  }
}
