import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

  When('I visit the landing page', function () {
    cy.visit('http://localhost:4200/auth/signin')
  });
  Then('I should see "Toolbar"', function (expectedText) {
    // cy.contains(expectedText).should('be.visible')
    cy
      //<mat-toolbar _ngcontent-sql-c69="" color="primary" class="mat-toolbar toolbar mat-primary mat-toolbar-single-row"><!----> Material PWA <div _ngcontent-sql-c69="" class="fill-space"></div><a _ngcontent-sql-c69="" mat-icon-button="" routerlink="auth/signup" class="mat-focus-indicator mat-icon-button mat-button-base" aria-disabled="false" href="/auth/signup"><span class="mat-button-wrapper"><mat-icon _ngcontent-sql-c69="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color ng-star-inserted" aria-hidden="true" data-mat-icon-type="font">account_circle</mat-icon><!----><!----></span><span matripple="" class="mat-ripple mat-button-ripple mat-button-ripple-round"></span><span class="mat-button-focus-overlay"></span></a></mat-toolbar>
      .get('mat-toolbar.mat-toolbar')
      .should('be.visible')
      .should(
      'have.text',
      ' Material PWA account_circle')
  });
