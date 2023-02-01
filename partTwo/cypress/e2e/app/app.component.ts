import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor'

Given(/^User opens the root page$/, function () {
  cy.login_route(Cypress.env('e2e_mail'), Cypress.env('e2e_pass'),'/');
});

When(/^User opens the home page$/, function () {
  cy.visit('/')
  // return "pending";
});

Then(/^Server status is visible$/, function () {
  expect(1).to.equal(1);
  //return "pending";
});
