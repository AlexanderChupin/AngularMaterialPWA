import { Given, Then, Before } from '@badeball/cypress-cucumber-preprocessor';

const url = "https://www.wildberries.ru/catalog/0/search.aspx?search=%D0%BF%D0%B5%D1%80%D0%B5%D1%85%D0%BE%D0%B4%D0%BD%D0%B8%D0%BA%20type-c%20usb"; // переходник type-c usb / частотность 30000
//const url = "https://www.wildberries.ru/catalog/0/search.aspx?search=%D0%BF%D0%B5%D1%80%D0%B5%D1%85%D0%BE%D0%B4%D0%BD%D0%B8%D0%BA%20hdmi%20usb";// переходник hdmi usb
const alcBrand = 'EVOKE';
const pagesLimit = 9; //ALC. first page = 0

let myBeforeCount = 0;

// This verifies that the hooks work with bundling feature
// https://github.com/TheBrainFamily/cypress-cucumber-preprocessor/pull/234
Before(() => {
  expect(myBeforeCount).to.be.lessThan(4);
  myBeforeCount += 1;
});

Given(`I kinda open Wildberries page`, () => {
  cy.visit(url);
});

Given(`I open search for adapter`, () => {
  cy.intercept(Cypress.env("wbEndpoint")).as('wbEndpointRequest');

  cy.visit(url)/*.
    get('#catalogNavbarLink'/!*'.nav-element__search'*!/).
    should('be.visible').
    wait('@wbEndpointRequest').then((interception) => {
    cy.log(JSON.stringify(interception.response.body));
  }).
    click({ force: true }).
    wait(20000)
  cy.get(/!*'#searchInput'*!/'#mobileSearchInput', {timeout: 6000}).should('be.visible')*/
  //get('#searchInput').type('переходник type-c usb')
});


// This is the same step that we have in socialNetworks/Facebook/different.js, but you don't have to worry about collisions!
Then(`I am very happy`, () => {
  cy.title().should("include", "Wildberries");
});

Then(`I have a search results`, () => {
  cy.get('.product-card__main', { timeout: 10000 }).
  contains('EVOKE').
  should("contain", "EVOKE").click();
});

Given(`I open N searches for adapter`, function () {
  let found = false;
  let currentPage = 0;
  function alcNextPage (){
    cy.
      // this only works if there's 100% guarantee
      // body has fully rendered without any pending changes
      // to its state
      get('body').then(($body) => {
      // synchronously ask for the body's text
      // and do something based on whether it includes
      // another string
      debugger
      if ($body.text().includes(alcBrand)) {
        // yup found it
        cy.get('.product-card__main', { timeout: 5000 }).
        contains(alcBrand, { timeout: 5000 }).
        //log('alcClicked on page ', currentPage).
        then (function (el) {
          found = true;
          debugger
          //cy.wrap(found).as('alc')
          //cy.log('alcClicked on page ', currentPage)
        }).
        click();
        cy.
        scrollTo('0%', '50%').wait(3000).
        scrollTo('0%', '75%').wait(3000);
      } else {
        if ($body.find('.pagination-next')) {
          // yup found it
          cy.
          scrollTo('0%', '50%').wait(3000).
          scrollTo('0%', '75%').wait(3000).
            scrollTo('0%', '77%').wait(3000).
            scrollTo('0%', '79%').wait(3000).
            scrollTo('0%', '81%').wait(3000).
            scrollTo('0%', '83%').wait(3000).
            scrollTo('0%', '85%').wait(3000).
            scrollTo('0%', '87%').wait(3000).
            scrollTo('0%', '89%').wait(3000).
            scrollTo('0%', '91%').wait(3000).
            scrollTo('0%', '93%').wait(3000).
            scrollTo('0%', '95%').wait(3000).
            scrollTo('0%', '97%').wait(3000).
            scrollTo('0%', '99%').wait(3000).
          scrollTo('0%', '100%').wait(3000);
          cy.get('body').then(($body) => {
            if ($body.find('.pagination-next')){
              cy.get('.pagination-next', { timeout: 5000 }).
              then(function (el){
                debugger
              }).
              click();
            }
          })
        } else {
          // nope not here
          //cy.get(...).should(...)
        }
        //ALC exit or increment current page.
        if (currentPage > pagesLimit-1){
          return
        }
        currentPage++;
        alcNextPage ();
      }
    })
  }
  Cypress._.times(100, function (k) {
    found = false;
    currentPage = 0
    cy.visit(url).
    scrollTo('0%', '50%').wait(3000).
    scrollTo('0%', '75%').wait(3000).
    scrollTo('0%', '77%').wait(3000).
    scrollTo('0%', '79%').wait(3000).
    scrollTo('0%', '81%').wait(3000).
    scrollTo('0%', '83%').wait(3000).
    scrollTo('0%', '85%').wait(3000).
    scrollTo('0%', '87%').wait(3000).
    scrollTo('0%', '89%').wait(3000).
    scrollTo('0%', '91%').wait(3000).
    scrollTo('0%', '93%').wait(3000).
    scrollTo('0%', '95%').wait(3000).
    scrollTo('0%', '97%').wait(3000).
    scrollTo('0%', '99%').wait(3000).
    scrollTo('0%', '100%').wait(3000).
      /*get('.product-card__main', { timeout: 5000 }).
        then(($products)=>{
          if (cy.get($products).contains('EVOKE1', { timeout: 5000 }).
            then(($prod)=>{
            //cy.wrap($prod).parent().click();
            //$products.find('.product-card__main').click();
            cy.get('.product-card__main', { timeout: 5000 }).
              contains('EVOKE', { timeout: 5000 }).click();
          })){
            cy.log('$prod=', JSON.stringify($products))
          }
        //cy.wrap($product).
        //should("contain", "EVOKE", { timeout: 5000 }).
        //click()
      }).*/
      // this only works if there's 100% guarantee
      // body has fully rendered without any pending changes
      // to its state
      get('body').then(function ($body) {
      // synchronously ask for the body's text
      // and do something based on whether it includes
      // another string
        alcNextPage();
    })


    cy.wait(20000*Math.random()).then(function (){
      //debugger
      cy.log("k=",k, 'found=', found, "current page=", currentPage);
    })
    //get('#searchInput').type('переходник type-c usb')
  })
});


Then(`I have a search results N times`, () => {

});
