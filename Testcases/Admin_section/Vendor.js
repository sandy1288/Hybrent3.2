describe('Vendor module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;
  var vendor_name = browser.params.shop.vendor;


  it('Open vendor module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    element(by.linkText('Vendors')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    expect(browser.getTitle()).toEqual('Vendor');
  });

  it('verify that search filter appear on the vendor listing page', function () {
    expect(element(by.model('searchFilter')).isPresent()).toBeTruthy();
    expect(element(by.model('searchActive')).isPresent()).toBeTruthy();
  });

  it('search vendor by vendor name', function () {
    element(by.model('searchFilter')).clear().sendKeys(vendor_name);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('VendorData in VendorDatas')).getText()).toContain(vendor_name);

  });


});