describe('Hybrent Scan IN Module', function () {
  var EC = protractor.ExpectedConditions;
  var templateName = browser.params.Templates.templateName;
  var General_sku = browser.params.itemCatalog.General_sku;
  var userfacility = browser.params.userfacility.facility_xpath;
  var randNumber = browser.params.itemCatalog.randNumber;
  var General_item_Name = browser.params.itemCatalog.General_item_Name;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var randomnmbr = browser.params.Vendor_price_tier.randompricetier;
  var PO_Num = browser.params.itemCatalog.PO_Number;

  it('Open Bill and Replace module', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.css('a > span.menu-icon > i.fa-retweet')).getWebElement()).then(function () {

      element(by.xpath('//span[contains(text(),"Bill & Replace")]')).click();
    });

    expect(browser.getTitle()).toEqual('Bill And Replace');
    browser.sleep(1000);
  });

  it('Verify that add item search filter appear on top of the page', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
  });

  it('Search item by SKU, MFR and Name ', function () {
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

  it('add item for Bill and replace by searching serial number', function () {
    element(by.model('searchParams.search')).clear().sendKeys('serial' + randomnmbr);
    browser.sleep(1000);
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.sku')).getText().then(function (text) {
        expect(text).toEqual(General_sku + randNumber);
      });
    });

    browser.sleep(1000);
    var itemRow = element(by.repeater('item in items').row(0));
    element(by.buttonText('Add')).click();
    browser.sleep(2000);
    element(by.model('billParams.vendorParams[key].is_use_my_po_num')).click();
    browser.sleep(1000);
    element(by.model('billParams.vendorParams[key].manual_po_num')).sendKeys(PO_Num + randomnmbr);
    browser.sleep(3000);
    element(by.buttonText('Generate PO')).click();
    browser.sleep(1000);
    element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('PO(' + PO_Num + randomnmbr + ') created successfully.');

  });

});