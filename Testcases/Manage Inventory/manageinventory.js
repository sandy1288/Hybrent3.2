describe('Hybrent Manage Inventory Module', function () {
  var EC = protractor.ExpectedConditions;
  var General_item_Name = browser.params.itemCatalog.General_item_Name;
  var General_alias = browser.params.itemCatalog.General_alias;
  var General_sku = browser.params.itemCatalog.General_sku;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var vendor = browser.params.itemCatalog.vendor;
  var Generalcategory = browser.params.itemCatalog.Generalcategory;
  var randNumber = browser.params.itemCatalog.randNumber;


  it('Manage Inventory page should open', function () {
    browser.actions().mouseMove(element(by.xpath('//span[contains(text(),"Manage Inventory")]'))).perform();
    browser.sleep(2000);
    element(by.linkText('Manage Inventory')).click();
    expect(browser.getTitle()).toEqual('Manage Inventory : List');
  });

  it('List page should display list of items and manage inventory filters', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.show_vendor_stock')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.vendor_id')).isPresent()).toBeTruthy();


  });

  it('Search items by Name', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_item_Name + randNumber);
    element(by.buttonText('Search')).click();
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.description')).getText().then(function (text) {
        expect(text).toEqual(General_item_Name + randNumber);
      });
    });
  });

  it('Search items by alise', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_alias + randNumber);
    element(by.buttonText('Search')).click();
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.description')).getText().then(function (text) {
        expect(text).toEqual(General_item_Name + randNumber);
      });
    });

  });

  it('Search items by sku', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    element(by.buttonText('Search')).click();
    element.all(by.repeater('vendor in ::item.itemVendors')).each(function (element1, index) {
      element1.element(by.binding('vendor.sku')).getText().then(function (text) {
        browser.sleep(2000);
        expect(text).toEqual(General_sku + randNumber);
      });
    });
  });

  it('Search items by mfr number', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_mfrNumber + randNumber);
    element(by.buttonText('Search')).click();
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('vendor.sku')).getText().then(function (text) {
        browser.sleep(2000);
        expect(text).toEqual(General_sku + randNumber);
      });
    });
  });

  it('Vendor filter should display items for selected vendor only.', function () {
    element(by.model('searchParams.search')).clear();
    element(by.model('searchParams.vendor_id')).$('[label="' + vendor + '"]').click();
    element(by.buttonText('Search')).click();
    element.all(by.repeater('vendor in ::item.itemVendors')).each(function (element1, index) {
      element1.element(by.css('vendor-info > span.text-with-tooltip')).getText().then(function (text) {
        expect(text).toEqual(vendor);
      });
    });
  });

  it('Transfer Item', function () {
    element(by.model('searchParams.vendor_id')).$('[label="' + 'All Vendors' + '"]').click();
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    element(by.buttonText('Search')).click();
    let itemtray = element(by.repeater('item in items'));
    browser.wait(EC.elementToBeClickable(itemtray.element(by.css('.dropdown-toggle'))), 5000);
    itemtray.element(by.css('.dropdown-toggle')).click();
    element(by.linkText('Transfer')).click();
    browser.sleep(1000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    element(by.model('item.transferQuantity')).sendKeys('1');
    // browser.wait(EC.visibilityOf(element(by.xpath('//span[contains(text(),"Select Inventory")]'))), 5000);
    browser.sleep(1000);
    element(by.buttonText('Create')).click();
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    expect($('.toast-message').getText()).toContain('Stock transfer request created');


  });

});