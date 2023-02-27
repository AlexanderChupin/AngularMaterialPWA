import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor'

Given(/^User opens the root page$/, function () {
  cy.login_route(Cypress.env('e2e_mail'), Cypress.env('e2e_pass'),'/');
});

When(/^User opens the home page$/, function () {
  cy.visit('/')
  // return "pending";
});

Then(/^Server status is not disabled$/, function () {
  cy.get('[data-cy="Server state"]')
    .should('exist')
    .should('not.have.attr', 'disabled');
  // expect(1).to.equal(1);
  //return "pending";
});

Then(/^Server status is primary color$/, function () {
  cy.get('[data-cy="Server state"]')
    .should('have.attr', 'ng-reflect-color', 'primary');
  // expect(1).to.equal(1);
  //return "pending";
});
