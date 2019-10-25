describe('Items Change Log', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var General_item_Name = browser.params.itemCatalog.General_item_Name;
  var General_sku = browser.params.itemCatalog.General_sku;
  var General_alias = browser.params.itemCatalog.General_alias;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var randNumber = browser.params.itemCatalog.randNumber;


  it('Open Items Change Log module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    element(by.linkText('Items Change Log')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 10000);
    expect(browser.getTitle()).toEqual('Item Change Log');
  });

  it('verify that search and status filter appear on the page', function () {
    expect(element(by.model('searchFilter')).isPresent()).toBeTruthy();
    expect(element(by.model('$ctrl.selectedDate')).isPresent()).toBeTruthy();
  });

  it('search item by description', function () {
    element(by.model('searchFilter')).clear().sendKeys(General_item_Name + randNumber);
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.repeater('itemLog in itemChangeLogData.rows')).getText().then(function (test) {
      expect(text).toContain(General_item_Name + randNumber);
    })
  });
  it('search item by alias', function () {
    element(by.model('searchFilter')).clear().sendKeys(General_mfrNumber + randNumber);
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.repeater('itemLog in itemChangeLogData.rows')).getText().then(function (test) {
      expect(text).toContain(General_item_Name + randNumber);
    })
  });

  it('search item by sku', function () {
    element(by.model('searchFilter')).clear().sendKeys(General_sku + randNumber);
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.repeater('itemLog in itemChangeLogData.rows')).getText().then(function (test) {
      expect(text).toContain(General_item_Name + randNumber);
    })
  });




});