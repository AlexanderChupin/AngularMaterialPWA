import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

  When('I visit the Manage SQL page', function () {
    cy.login_route(Cypress.env('e2e_mail'), Cypress.env('e2e_pass'),'/manage/sql');
      /*cy.visit('/manage/sql')
      .get('input[formcontrolname=\"email\"]')
      .type('Smarten.Pump@gmail.com')
      .get('input[formcontrolname="password"]')
      .type('bqz3ztu_ZVQ-zpz-uje')
      .get('button')
      .contains('Sign In')
      .click()*/
      //.softVisit('/manage/sql')
      //.get('[href=\"/manage/sql\"]:contains(/^Manage SQL$/)')//, [mat-button=\"\"]',{ timeout: 10000 })//:contains('Manage SQL')
      //.get('span.mat-button-wrapper',{ timeout: 10000 }) // '[href=\"/manage/sql\"], [mat-button=\"\"]')//:contains('Manage SQL')
      // <a _ngcontent-gxu-c310="" mat-button="" routerlinkactive="active" class="mat-focus-indicator mat-button mat-button-base" aria-disabled="false" href="/manage/sql"><span class="mat-button-wrapper">Manage SQL</span><span matripple="" class="mat-ripple mat-button-ripple"></span><span class="mat-button-focus-overlay"></span></a>
      //.get('.mat-button',{ timeout: 10000 })
      //.contains(new RegExp('^Manage SQL$')) //'\/^Manage SQL$\/'
      //.click();
  });
  Then('I should see "SQL state" control', function (expectedText) {
    // cy.contains(expectedText).should('be.visible')
    cy
      //<mat-toolbar _ngcontent-sql-c69="" color="primary" class="mat-toolbar toolbar mat-primary mat-toolbar-single-row"><!----> Material PWA <div _ngcontent-sql-c69="" class="fill-space"></div><a _ngcontent-sql-c69="" mat-icon-button="" routerlink="auth/signup" class="mat-focus-indicator mat-icon-button mat-button-base" aria-disabled="false" href="/auth/signup"><span class="mat-button-wrapper"><mat-icon _ngcontent-sql-c69="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color ng-star-inserted" aria-hidden="true" data-mat-icon-type="font">account_circle</mat-icon><!----><!----></span><span matripple="" class="mat-ripple mat-button-ripple mat-button-ripple-round"></span><span class="mat-button-focus-overlay"></span></a></mat-toolbar>
      .get('mat-slide-toggle.mat-slide-toggle')
      .should('be.visible')
      .should(
      'contain.text',
      ' retry connection ')
      .request({method:'GET',url:'https://alexcloud.myqnapcloud.com:8081/alcwol.php'})
  });
