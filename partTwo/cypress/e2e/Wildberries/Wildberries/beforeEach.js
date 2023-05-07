beforeEach(() => {
  //ALC. [Launch Cypress with Chrome "Incognito" using \-\-incognito flag · Issue \#4037 · cypress\-io/cypress](https://github.com/cypress-io/cypress/issues/4037)
  cy.clearLocalStorage();
  cy.clearCookies();
  cy.log(
    "This will run before every scenario of Google.feature test, but NEVER for Facebook/Google feature files"
  );
});
