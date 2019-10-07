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
    expect(element.all(by.repeater('item in items')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.vendor_id')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.show_vendor_stock')).isPresent()).toBeTruthy();
    expect(element(by.buttonText('Refresh')).isPresent()).toBeTruthy();
    expect(element(by.xpath('//button[@class="btn btn-default dropdown-toggle no-float"]')).isPresent()).toBeTruthy();
    expect(element(by.buttonText('Search')).isPresent()).toBeTruthy();
  });

  /*it('Search items by Name', function () {
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
    expect(element(by.model('item.alias')).getAttribute('value')).toEqual(General_alias + randNumber);

  });

  it('Search items by sku', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    element(by.buttonText('Search')).click();
    element.all(by.repeater('vendor in ::item.itemVendors')).each(function (element1, index) {
      element1.element(by.binding('vendor.sku')).getText().then(function (text) {
        expect(text).toEqual(General_sku + randNumber);
      });
    });
  });

  it('Search items by mfr number', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_mfrNumber + randNumber);
    element(by.buttonText('Search')).click();
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('vendor.sku')).getText().then(function (text) {
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
  });*/

  it('Transfer Item', function () {
    element(by.model('searchParams.search')).clear().sendKeys('GS1567603088683');
    element(by.buttonText('Search')).click();
    let itemtray = element(by.repeater('item in items'));
    browser.wait(EC.elementToBeClickable(itemtray.element(by.css('.dropdown-toggle'))), 5000);
    itemtray.element(by.css('.dropdown-toggle')).click();
    element(by.linkText('Transfer')).click();
    browser.sleep(1000);
    element(by.css('.sa-button-container')).element(by.buttonText('No')).click();
    browser.sleep(2000);
    // browser.wait(EC.visibilityOf(element(by.xpath('//span[contains(text(),"Select Inventory")]'))), 5000);
    element(by.xpath('//span[contains(text(),"Select Inventory")]')).click();
    element(by.buttonText('Select')).click();
    browser.sleep(2000);
    element(by.model('transferInventory.transferQuantity')).sendKeys('1');
    element(by.buttonText('Transfer')).click();
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    expect($('.toast-message').getText()).toEqual('Inventory transferred successfully.');


  });

});