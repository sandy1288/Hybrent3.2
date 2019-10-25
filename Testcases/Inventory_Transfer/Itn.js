var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('Inventory Transfer Module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var General_sku = browser.params.itemCatalog.General_sku;
  var randNumber = browser.params.itemCatalog.randNumber;
  it('Open Inventory Transfer', function () {

    browser.actions().mouseMove(element(by.xpath('//span[contains(text(),"Inventory Transfer")]'))).perform();
    browser.sleep(1000);
    element(by.xpath('//span[contains(text(),"Inventory Transfer")]')).click();
    expect(browser.getTitle()).toEqual('Inventory Transfer Notes: List');

  });
  xit('verify that user default facility appear selected on ITN listing page', function () {
    element(by.xpath('//*[@id="ng-view"]/div/div[1]/hyb-facility-select/a')).getText().then(function (facility) {
      expect(facility).toEqual(browser.params.user.fac_name);
    })
    element(by.xpath('//*[@id="ng-view"]/div/div[1]/hyb-facility-select/a')).click();
    browser.sleep(2000);
    element(by.model('search.searchKeyword')).sendKeys(browser.params.user.fac_name);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(2000);

  });
  it('List page should display all search and status filter', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.doc_number')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.status')).isPresent()).toBeTruthy();

  });

  it('search newly created ITN through manage inventory', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.xpath('//div[@id="reqListing_info"]')).getText().then(function (test) {
      expect(test).toBe('Showing 1 to 1 of 1 entries');
    })
  })
});