var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('operating room module', function () {
  var randNumber = browser.params.itemCatalog.randNumber;
  var OR_Name = browser.params.OperatingRoom.OR_Name;
  var fac_name = browser.params.user.fac_name;

  it('Navigate to operating room', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.css('a > span.menu-icon > i.fa-bed')).getWebElement()).then(function () {
      element((by.linkText('Operating Rooms'))).click();
    });
    // browser.actions().mouseMove(element(by.xpath('//span[contains(text(),"Operating Rooms")]'))).perform();
    browser.sleep(1000);
    // element(by.xpath('//span[contains(text(),"Operating Rooms")]')).click();
    expect(browser.getTitle()).toEqual('Operating Rooms');
  });

  it('List page should display list of items and IC filters', function () {
    expect(element(by.model('searchParams.name')).isPresent()).toBeTruthy();

  });

  it('add new operating room', function () {

    element(by.buttonText('Add Operating Room')).click();
    browser.sleep(1000);
    element(by.model('operatingRoom.name')).sendKeys(OR_Name + randNumber);
    browser.sleep(2000);
    element(by.xpath('//a[contains(text(),"--Select facility--")]')).click();
    browser.sleep(2000);
    element(by.model('search.searchKeyword')).sendKeys(browser.params.user.fac_name);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(2000);
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toEqual('Operating room created successfully');

  })
});