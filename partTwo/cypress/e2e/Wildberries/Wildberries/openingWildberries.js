import {Given, Then} from '@badeball/cypress-cucumber-preprocessor';

const url = "https://wildberries.ru";

Given(`I open Wildberries page`, () => {
  cy.visit(url);

});

// This is the same step that we have in socialNetworks/Facebook/different.js, but you don't have to worry about collisions!
Then(`I see "Wildberries" in the title`, () => {
  cy.title().should("include", "Wildberries");
});
