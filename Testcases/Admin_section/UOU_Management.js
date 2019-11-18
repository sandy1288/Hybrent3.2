describe('UOU Management', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var General_item_Name = browser.params.itemCatalog.General_item_Name;
  var General_sku = browser.params.itemCatalog.General_sku;
  var General_alias = browser.params.itemCatalog.General_alias;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var randNumber = browser.params.itemCatalog.randNumber;


  it('Open UOU Management module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    element(by.linkText('UOU Management')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 10000);
    expect(browser.getTitle()).toEqual('UOU Management');
  });

  it('verify that search and status filter appear on the page', function () {
    expect(element(by.model('searchFilter')).isPresent()).toBeTruthy();
    expect(element(by.model('search.consumption_type')).isPresent()).toBeTruthy();
  });

  it('verify all consumption type appear under the consumption type dropdown', function () {
    element(by.model('search.consumption_type')).
    all(by.tagName('option')).getText().then(function (status) {
      console.log(status);
      var myoption = status;
      expect(myoption).toEqual(['All', 'Piece', 'Length', 'Weight', 'Liquid', 'Drops', 'Sprays']);
    });

  });

});