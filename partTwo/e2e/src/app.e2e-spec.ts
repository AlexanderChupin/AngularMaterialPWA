import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  page = new AppPage();
  beforeEach(() => {
    page = new AppPage();
  });
  it('should load a page and verify the url', () => {
    //browser.get('/');
    page.navigateTo();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'auth/signin');
  });

  it('should display welcome message', () => {
    page.navigateTo();
    page.getParagraphText().then((data)=>{
      //console.log(data)
    })
    expect(page.getParagraphText()).toEqual('Material PWA\naccount_circle');
  });

  it('should display h2 title "Sign in to your account"', () => {
    page.navigateTo();
    page.getTitle().then((data)=>{
      //console.log(data)
    })
    expect(page.getTitle()).toEqual('Sign in to your account');
  });


});
