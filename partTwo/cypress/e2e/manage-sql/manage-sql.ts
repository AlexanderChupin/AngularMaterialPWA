import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import {environment} from "../../../src/environments/environment";

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
  cy.get('mat-drawer-content').scrollTo("top")
  cy
    //<mat-toolbar _ngcontent-sql-c69="" color="primary" class="mat-toolbar toolbar mat-primary mat-toolbar-single-row"><!----> Material PWA <div _ngcontent-sql-c69="" class="fill-space"></div><a _ngcontent-sql-c69="" mat-icon-button="" routerlink="auth/signup" class="mat-focus-indicator mat-icon-button mat-button-base" aria-disabled="false" href="/auth/signup"><span class="mat-button-wrapper"><mat-icon _ngcontent-sql-c69="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color ng-star-inserted" aria-hidden="true" data-mat-icon-type="font">account_circle</mat-icon><!----><!----></span><span matripple="" class="mat-ripple mat-button-ripple mat-button-ripple-round"></span><span class="mat-button-focus-overlay"></span></a></mat-toolbar>
    //.get('mat-slide-toggle.mat-slide-toggle')
    .get('[data-cy="GwToggle"]')
    .should('be.visible')
    .should(
      'contain.text',
      ' retry connection ')
  //.request({method:'GET',url:'https://alexcloud.myqnapcloud.com:8081/alcwol.php'})
});

Then('gwEndpoint should be called with the correct response', function (expectedText) {
  // ALC. see [Network Requests \| Cypress Documentation](https://docs.cypress.io/guides/guides/network-requests#Waiting)
  cy
    .intercept(Cypress.env("gwEndpoint")).as('gwEndpointRequest')
    .wait('@gwEndpointRequest').then((interception) => {
    cy.log(interception.response.body);
  })
  // and we can place multiple assertions in a
  // single "should" callback
  // @ts-ignore
  cy.get('@gwEndpointRequest').should(({ request, response }) => {
    expect(request.method).to.equal('GET')
    expect(JSON.parse(response.body)).to.deep.equal({"response": "ALC. Success. WOL is sent to mac address"})
    // it is a good practice to add assertion messages
    // as the 2nd argument to expect()
    /*expect(response.headers, 'response headers').to.include({
      'cache-control': 'no-cache',
      expires: '-1',
      'content-type': 'application/json; charset=utf-8',
      location: '<domain>/users/101',
    })*/
  })
});

Then('I should see connection success', function (expectedText) {
  cy.get('mat-drawer-content').scrollTo("top")
  // ALC. see [Network Requests \| Cypress Documentation](https://docs.cypress.io/guides/guides/network-requests#Waiting)
  cy
    //<mat-toolbar _ngcontent-sql-c69="" color="primary" class="mat-toolbar toolbar mat-primary mat-toolbar-single-row"><!----> Material PWA <div _ngcontent-sql-c69="" class="fill-space"></div><a _ngcontent-sql-c69="" mat-icon-button="" routerlink="auth/signup" class="mat-focus-indicator mat-icon-button mat-button-base" aria-disabled="false" href="/auth/signup"><span class="mat-button-wrapper"><mat-icon _ngcontent-sql-c69="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color ng-star-inserted" aria-hidden="true" data-mat-icon-type="font">account_circle</mat-icon><!----><!----></span><span matripple="" class="mat-ripple mat-button-ripple mat-button-ripple-round"></span><span class="mat-button-focus-overlay"></span></a></mat-toolbar>
    // .get('mat-slide-toggle.mat-slide-toggle')
    .get('[data-cy="GwToggle"]')
    .should('be.visible')
    .should(
      'contain.text',
      'complete success')
});

When('GW is not responding', function () {
  cy.login_route(Cypress.env('e2e_mail'), Cypress.env('e2e_pass'), '/manage/sql');
  cy.window().its('Cypress').should('be.an', 'object')
});

Then('gwEndpoint should be called with the error response', function (expectedText) {
  cy.get('mat-drawer-content').scrollTo("top")
  // ToDo. Try using fake url to real server by setting wrong GWendpoint. See [Accessing angular components methods from within Cypress \- DEV Community 👩‍💻👨‍💻](https://dev.to/julianobrasil/accessing-angular-components-methods-from-within-cypress-4imf)
  // ALC. see [Network Requests \| Cypress Documentation](https://docs.cypress.io/guides/guides/network-requests#Waiting)
  const staticResponse = {
    statusCode: 404,
    body: {message:"stubbed error 404"},
  }
  cy
    .intercept(Cypress.env("gwEndpoint"),
      staticResponse).as('gwEndpointRequest')
  // ALC. Create array wrapper for error attempts
  const retries = new Array();
  for (let i = 0; i < Cypress.env("intAttempts_gateway")*Cypress.env("intRetries_gateway")-1; i++) {
    retries.push(i);
  }
  cy.wrap(retries).each((num, i, array) => {
    cy.wait('@gwEndpointRequest',  { timeout: Cypress.env("reconnectInterval")*2 })
      //.get('mat-slide-toggle.mat-slide-toggle')
      .get('[data-cy="GwToggle"]')
      .should('be.visible')
      .should(
        'contain.text',
        'ERROR caught')
  })

  cy.wait('@gwEndpointRequest',  { timeout: Cypress.env("msecDelay_gateway")*2})
    .get('mat-slide-toggle.mat-slide-toggle')
    // .get('[data-cy="GwToggle"]')
    .should('be.visible')
    .should(
      'contain.text',
      'Error! All retries are used.')

});


