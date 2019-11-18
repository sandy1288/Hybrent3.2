describe('Hybrent ReplenishBin Module', function () {
  var EC = protractor.ExpectedConditions;
  var templateName = browser.params.Templates.templateName;
  var General_sku = browser.params.itemCatalog.General_sku;
  var userfacility = browser.params.userfacility.facility_xpath;
  var randNumber = browser.params.itemCatalog.randNumber;
  var General_item_Name = browser.params.itemCatalog.General_item_Name;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var randomnmbr = browser.params.Vendor_price_tier.randompricetier;
  var PO_Num = browser.params.itemCatalog.PO_Number;

  it('Open ReplenishBin module', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.css('a > span.menu-icon > i.fa-retweet')).getWebElement()).then(function () {
      element(by.xpath('//span[contains(text(),"Replenish Bin")]')).click();
    });
    expect(browser.getTitle()).toEqual('Replenish Bin');
    browser.sleep(1000);
  });

  it('Verify that drop down and search filter appear on the page', function () {
    expect(element(by.model('replenishBinParams.department')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
  });

  it('Add item to ReplenishBin cart by search filter', function () {
    element(by.model('searchParams.search')).sendKeys(General_sku + randNumber);
    var itemRow = element(by.repeater('suggestion in $ctrl.suggestions').row(0));
    browser.sleep(1000);
    itemRow.element(by.buttonText('Add')).click();
    browser.sleep(1000);
    element(by.xpath('//button[@class="button button-sm"]')).click();
    element(by.model('replenishBinParams.vendorParams[key].is_receive_only')).click();
    element(by.model('replenishBinParams.vendorParams[key].is_use_my_po_num')).click();
    element(by.model('replenishBinParams.vendorParams[key].manual_po_num')).sendKeys('RP' + randomnmbr);
    browser.sleep(1000);
    element(by.buttonText('Replenish')).click();
    browser.sleep(1000);
    element(by.buttonText('Yes')).click();
    browser.sleep(1000);
    element(by.buttonText('Yes')).click();
    expect($('.toast-message').getText()).toEqual("PO ' + 'RP' + randomnmbr + ' created successfully.");
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('My Orders');
  });


});