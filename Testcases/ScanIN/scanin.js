describe('Hybrent Scan IN Module', function () {
  var EC = protractor.ExpectedConditions;
  var templateName = browser.params.Templates.templateName;
  var General_sku = browser.params.itemCatalog.General_sku;
  var userfacility = browser.params.userfacility.facility_xpath;
  var randNumber = browser.params.itemCatalog.randNumber;
  var General_item_Name = browser.params.itemCatalog.General_item_Name;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var Dme_sku = browser.params.itemCatalog.Dme_sku;
  var Dme_item_name = browser.params.itemCatalog.Dme_item_name;
  var Dme_Alias = browser.params.itemCatalog.Dme_Alias;
  var Dme_mfr = browser.params.itemCatalog.Dme_mfr;
  var randomnmbr = browser.params.Vendor_price_tier.randompricetier;


  it('Open scan in module', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.css('a > span.menu-icon > i.fa-sign-in')).getWebElement()).then(function () {
      element((by.linkText('Scan In'))).click();
    });
    var scanIn = element.all(by.className('menu-li')).first();
    browser.actions().mouseMove(scanIn).perform();
    browser.sleep(2000);
    scanIn.click();
    browser.sleep(5000);
    expect(browser.getTitle()).toEqual('Scan In');

  });
  it('List page should display Scan In filters and refresh button', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('search.search')).isPresent()).toBeTruthy();
    expect(element(by.buttonText('Search')).isPresent()).toBeTruthy();

  });

  it('Scan In - Search items by item Name, sku, mfr', function () {
    element(by.model('searchParams.search')).clear().sendKeys(General_item_Name + randNumber);
    browser.sleep(1000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      expect(element1.element(by.cssContainingText('hyb-highlight > span.highlight-context', General_item_Name + randNumber)).isPresent()).toBeTruthy();
    });
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    browser.sleep(1000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.sku')).getText().then(function (text) {
        expect(text).toEqual(General_sku + randNumber);
      });
    });

    element(by.model('searchParams.search')).clear().sendKeys(General_mfrNumber + randNumber);
    browser.sleep(1000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.sku')).getText().then(function (text) {
        expect(text).toEqual(General_sku + randNumber);
      });
    });
  });

  it('Scan In - Add items for scan In by click on scan In button', function () {
    browser.sleep(1000);
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    browser.sleep(1000);
    var itemRow = element(by.repeater('item in items').row(0));
    element(by.buttonText('Add')).click();
    browser.sleep(1000);
    element(by.buttonText('+')).click();
    browser.sleep(1000);
    element(by.buttonText('+')).click();
    browser.sleep(1000);
    element(by.buttonText('+')).click();
    browser.sleep(1000);
    expect(element(by.css('.item-qty-editable-label')).getText()).toEqual('4');
    element(by.buttonText('-')).click();
    expect(element(by.css('.item-qty-editable-label')).getText()).toEqual('3');
    element(by.xpath('//span[contains(text(),"Select Inventory")]')).click();
    element(by.buttonText('Select')).click();
    browser.sleep(1000);
    element(by.className('bootstrap-switch-handle-off bootstrap-switch-default')).click();
    element(by.buttonText('Add')).click();
    element(by.model('search.search')).clear().sendKeys(General_sku + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(1000);
    element.all(by.repeater('item in ScanInData.rows')).each(function (element1, index) {
      element1.element(by.binding('htmlVal')).getText().then(function (text) {
        expect(text).toEqual(General_item_Name + randNumber);
      });
    });

  });

  it('Scan In - Add DME items for scan In by click on scan In button', function () {
    browser.sleep(1000);
    element(by.model('searchParams.search')).clear().sendKeys(Dme_sku + randNumber);
    browser.sleep(1000);
    var itemRow = element(by.repeater('item in items').row(0));
    element(by.buttonText('Add')).click();
    browser.sleep(1000);
    element(by.buttonText('+')).click();
    browser.sleep(1000);
    element(by.buttonText('+')).click();
    browser.sleep(1000);
    element(by.buttonText('+')).click();
    browser.sleep(1000);
    expect(element(by.css('.item-qty-editable-label')).getText()).toEqual('4');
    element(by.buttonText('-')).click();
    expect(element(by.css('.item-qty-editable-label')).getText()).toEqual('3');
    element(by.xpath('//span[contains(text(),"Select Inventory")]')).click();
    element(by.buttonText('Select')).click();
    browser.sleep(1000);
    element(by.buttonText('Add')).click();
    element(by.model('search.search')).clear().sendKeys(Dme_sku + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(1000);
    element.all(by.repeater('item in ScanInData.rows')).each(function (element1, index) {
      element1.element(by.binding('htmlVal')).getText().then(function (text) {
        expect(text).toEqual(Dme_item_name + randNumber);
      });
    });

  });

  it('Scan In - Search added items by item Name, sku, mfr', function () {
    element(by.model('search.search')).clear().sendKeys(General_item_Name + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(1000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      expect(element1.element(by.cssContainingText('hyb-highlight > span.highlight-context', General_item_Name + randNumber)).isPresent()).toBeTruthy();
    });
    element(by.model('search.search')).clear().sendKeys(General_sku + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(1000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.sku')).getText().then(function (text) {
        expect(text).toEqual(General_sku + randNumber);
      });
    });
  });

  it('add stock status for vendor stock item', function () {
    element(by.model('search.search')).clear().sendKeys(General_sku + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(1000);
    element(by.xpath('//*[@id="ng-view"]/div/div[3]/div/div/table/tbody/tr/td[7]/div/a')).click();
    browser.sleep(2000);
    element(by.buttonText('Add')).click();
    element(by.model('stockDetail.lot_number')).sendKeys('lot' + randomnmbr);
    element(by.model('stockDetail.serial_number')).sendKeys('serial' + randomnmbr);
    browser.sleep(1000);
    element(by.xpath('//i[@class="glyphicon glyphicon-calendar"]')).click();
    browser.sleep(1000);
    element(by.buttonText('Today')).click();
    browser.sleep(1000);
    element(by.buttonText('Add')).click();
    browser.sleep(1000);
    element(by.xpath('//i[@class="fa fa-clone"]')).click();
    browser.sleep(1000);
    var secondlot = element.all(by.model('stockDetail.serial_number')).get(1);
    secondlot.sendKeys('serial' + randomnmbr);
    element(by.buttonText('Add')).click();
    browser.sleep(1000);
    element(by.xpath('//i[@class="fa fa-clone"]')).click();
    browser.sleep(1000);
    var thirdlot = element.all(by.model('stockDetail.serial_number')).get(2);
    thirdlot.sendKeys('serial' + randomnmbr);
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toEqual('Items stock info added successfully.');

  });

  it("Scan In items - Complete scan In and item should display on inventory transaction page", function () {
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Search'))), 5000);
    element(by.model('search.search')).clear();
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(1000);
    element(by.buttonText('Complete')).click();
    browser.sleep(1000);
    element(by.buttonText('Complete')).click();
    browser.sleep(2000);
    element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    element(by.buttonText('Add To Inventory')).click();
    expect($('.toast-message').getText()).toEqual('Scan In completed successfully.');

  });

});