var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('Request service module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;

  it('Navigate to Request service module', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath('//span[contains(text(),"Request Service")]')).getWebElement()).then(function () {
      element(by.xpath('//span[contains(text(),"Request Service")]')).click();
    });
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Create Service PO');
  });

  it('verify that all search filter should appear on request service module', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('servicePOParams.department')).isPresent()).toBeTruthy();
    expect(element(by.model('$ctrl.selectedDate')).isPresent()).toBeTruthy();

  });

});