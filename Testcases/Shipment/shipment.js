var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('Shipment Module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var General_sku = browser.params.itemCatalog.General_sku;
  var randNumber = browser.params.itemCatalog.randNumber;
  it('Open Shipment module', function () {

    browser.actions().mouseMove(element(by.xpath('//span[contains(text(),"Shipments")]'))).perform();
    browser.sleep(1000);
    element(by.xpath('//span[contains(text(),"Shipments")]')).click();
    expect(browser.getTitle()).toEqual('Shipment');

  });

  it('List page should display all search and status filter', function () {
    expect(element(by.model('searchForm.search')).isPresent()).toBeTruthy();
    expect(element(by.model('searchForm.status')).isPresent()).toBeTruthy();
    expect(element(by.model('searchForm.vendor_id')).isPresent()).toBeTruthy();

  });

});