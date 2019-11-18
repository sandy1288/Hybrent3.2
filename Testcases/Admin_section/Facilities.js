describe('Facilities', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;


  it('Open facilities module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.sleep(2000);
    element(by.linkText('Facilities')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    expect(browser.getTitle()).toEqual('Facility');
  });

  it('verify that search filter appear on the facility listing page', function () {
    expect(element(by.model('searchFilter')).isPresent()).toBeTruthy();
  });

  it('search facility by facility name', function () {
    element(by.model('searchFilter')).sendKeys(browser.params.user.fac_name);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('adminFacilitiesData in adminFacilitiesList')).getText()).toContain(browser.params.user.fac_name);

  });


});