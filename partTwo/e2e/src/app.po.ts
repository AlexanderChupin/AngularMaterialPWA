import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    //console.log("browser.getPageTimeout="+browser.getPageTimeout);
    return browser.get('/',30000);
  }

  getParagraphText() {
    return element(by.css('mat-toolbar')).getText(); //.getText()
  }

  getTitle() {
    return element(by.css('h2')).getText();
  }
}
