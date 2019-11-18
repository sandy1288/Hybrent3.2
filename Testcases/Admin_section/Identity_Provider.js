describe('Identity Provider moudle', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;
  var PO = browser.params.Identity_Provider.PO;
  var Inventory_Management = browser.params.Identity_Provider.Inventory_Management;
  var Inventory_Transfer = browser.params.Identity_Provider.Inventory_Transfer;


  it('Open Identity Provider module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    browser.sleep(2000);
    element(by.linkText('Identity Provider')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    expect(browser.getTitle()).toEqual('Identity Provider');
  });

  it('verify that search filter appear on the Identity Provider page', function () {
    expect(element(by.model('search.searchProcess')).isPresent()).toBeTruthy();
    expect(element(by.model('search.searchPattern')).isPresent()).toBeTruthy();
  });

  it('search Identity Provider by PO name', function () {
    element(by.model('search.searchProcess')).clear().sendKeys(PO);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.xpath('//td[contains(text(),"PO")]')).getText().then(function (test) {
      expect(test).toEqual('PO');
    })
  });

  it('search Identity Provider by Inventory_Management name', function () {
    element(by.model('search.searchProcess')).clear().sendKeys(Inventory_Management);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.xpath('//td[contains(text(),"Inventory Management")]')).getText().then(function (test) {
      expect(test).toEqual('Inventory Management');
    })
  });

  it('search Identity Provider by Inventory Transfer name', function () {
    element(by.model('search.searchProcess')).clear().sendKeys(Inventory_Transfer);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.xpath('//td[contains(text(),"Inventory Transfer")]')).getText().then(function (test) {
      expect(test).toEqual('Inventory Transfer');
    })
  });

  it('verify that user get redirect to manage pattern on clicking correponding link appear in drop down', function () {
    element(by.xpath('//button[@class="btn btn-default dropdown-toggle no-margin"]')).click();
    browser.sleep(2000);
    element(by.linkText('Patterns')).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Manage Patterns');
  });

  it('verify that user get redirect to Dashboard on clicking close button appear in drop down', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    element(by.linkText('Identity Provider')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    element(by.className('btn btn-default dropdown-toggle no-margin')).click();
    browser.sleep(2000);
    element(by.linkText('Close')).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Dashboard');
  });

});