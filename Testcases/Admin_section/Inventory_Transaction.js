describe('Inventory Transactions', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var General_item_Name = browser.params.itemCatalog.General_item_Name;
  var General_sku = browser.params.itemCatalog.General_sku;
  var General_alias = browser.params.itemCatalog.General_alias;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var randNumber = browser.params.itemCatalog.randNumber;


  it('Open Inventory Transactions module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    element(by.linkText('Inventory Transactions')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 10000);
    expect(browser.getTitle()).toEqual('Inventory Item Transaction');
  });

  it('verify that search and status filter appear on the page', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.stock_info')).isPresent()).toBeTruthy();
    expect(element(by.model('$ctrl.selectedValue.name')).isPresent()).toBeTruthy();
  });

  it('search item by description', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_item_Name + randNumber);
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.repeater('Transaction in itemTransactions')).getText().then(function (text) {
      expect(text).toContain(General_item_Name + randNumber);
    })
  });
  it('search item by alias', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_mfrNumber + randNumber);
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.repeater('Transaction in itemTransactions')).getText().then(function (text) {
      expect(text).toContain(General_item_Name + randNumber);
    })
  });

  it('search item by sku', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.repeater('Transaction in itemTransactions')).getText().then(function (text) {
      expect(text).toContain(General_item_Name + randNumber);
    })
  });




});