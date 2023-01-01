
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
// [cypress\-realworld\-app/global\.d\.ts at develop · cypress\-io/cypress\-realworld\-app](https://github.com/cypress-io/cypress-realworld-app/blob/develop/cypress/global.d.ts)
/*declare namespace Cypress {
  interface Chainable {
    login (email: string, password: string): Chainable<any>;
  }
}*/


//-- This is a parent command --
// @ts-check
///<reference path="../global.d.ts" />
Cypress.Commands.add(`login_route`, (email, pass, route) => {
  // cy.visit('auth/signin') /*get('a').contains(email + password).click()*/
  cy.visit(route)
    .get('input[formcontrolname=\"email\"]')
    .type(email)
    .get('input[formcontrolname="password"]')
    .type(pass)
    .get('button')
    .contains('Sign In')
    .click()
})
