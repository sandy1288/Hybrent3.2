describe('Print Barcodes/QRCodes', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var General_item_Name = browser.params.itemCatalog.General_item_Name;
  var General_sku = browser.params.itemCatalog.General_sku;
  var General_alias = browser.params.itemCatalog.General_alias;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var randNumber = browser.params.itemCatalog.randNumber;


  it('Open Print Barcodes/QRCodes module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    element(by.linkText('Print Barcodes/QRCodes')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 10000);
    expect(browser.getTitle()).toEqual('Print Barcodes/QRCodes');
  });

  it('verify that search and status filter appear on the page', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.vendorId')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.addSubInvItems')).isPresent()).toBeTruthy();
  });

  it('search item by description', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_item_Name + randNumber);
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.repeater('item in items')).getText().then(function (text) {
      expect(text).toContain(General_item_Name + randNumber);
    })
  });
  it('search item by alias', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_alias + randNumber);
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.repeater('item in items')).getText().then(function (text) {
      expect(text).toContain(General_item_Name + randNumber);
    })
  });

  it('search item by sku', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.repeater('item in items')).getText().then(function (text) {
      expect(text).toContain(General_item_Name + randNumber);
    })
  });

  it('verify that all option to print item are availbale under print code button', function () {
    element(by.xpath('//button[@class="btn btn-default no-margin"]')).click();
    browser.sleep(2000);
    expect(element(by.model('printType.printType')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.barCodeType')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.vendor')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.uom')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.price')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.min')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.max')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.parlevel')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.mfr_number')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.quick_code')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.cross_walk_id')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.categories')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printWith.inventory_path')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.averyTemplate')).isPresent()).toBeTruthy();
    expect(element(by.model('printType.printPages')).isPresent()).toBeTruthy();

  });


});