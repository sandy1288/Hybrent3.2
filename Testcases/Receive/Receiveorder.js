describe('Hybrent Receive order', function () {
  var EC = protractor.ExpectedConditions;
  var PO_Num = browser.params.itemCatalog.PO_Number;
  var randNumber = browser.params.itemCatalog.randNumber;

  it('Open order detail page', function () {
    element(by.linkText(PO_Num + randNumber)).click();
    expect(browser.getTitle()).toEqual('Purchase Order');
    browser.sleep(2000);
  });
  it('verify that all option appear in order drop down', function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath('//button[@class="btn btn-default dropdown-toggle"]'))), 5000);
    element(by.xpath('//button[@class="btn btn-default dropdown-toggle"]')).click();
    expect(element(by.linkText('Print PO')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Download PO')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Print Items')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Invoices')).isPresent()).toBeTruthy();
    expect(element(by.linkText('PO Log')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Notes')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Documents')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Add Items to Cart')).isPresent()).toBeTruthy();

    browser.sleep(1000);
  });

  it('open order detail page to receive corresponding order', function () {
    var selectInventory = element(by.linkText('Apply inventory location for all items'));
    if (selectInventory.isPresent()) {
      selectInventory.click();
      browser.wait(EC.elementToBeClickable($('.close')), 5000);
      element.all(by.buttonText('Select')).each(function (element1, index) {
        if (element1.isEnabled()) {
          element1.click();
          // browser.wait(EC.elementToBeClickable(element(by.model('allCheck.itemSelectAll'))), 5000);
        }
        browser.sleep(1000);
        element(by.model('allCheck.itemSelectAll')).click();
        browser.sleep(1000);
        element(by.buttonText('Complete')).click();
        browser.sleep(5000);
        var yesBtn = element(by.buttonText('Yes'));
        if (yesBtn.isPresent()) {
          browser.wait(EC.elementToBeClickable(element(by.buttonText('Yes'))), 5000);
          element(by.css('.sa-confirm-button-container')).element(by.buttonText('Yes')).click();
          browser.wait(EC.elementToBeClickable(element(by.buttonText('Add To Inventory'))), 5000);
          element(by.model('inventoryItem.min')).clear().sendKeys('2');
          element(by.model('inventoryItem.max')).clear().sendKeys('5');
          element(by.model('inventoryItem.par_level')).clear().sendKeys('3');
          element(by.buttonText('Add To Inventory')).click();
          browser.wait(EC.elementToBeClickable(element(by.buttonText('Yes'))), 5000);
          element(by.buttonText('Yes')).click();
          browser.wait(EC.elementToBeClickable(element(by.buttonText('No'))), 5000);
          element(by.buttonText('No')).click();
          browser.sleep(2000);
          expect($('.toast-message').getText()).toEqual('Order completed successfully.');
          browser.sleep(2000);
        }
        element(by.buttonText('Search')).click();
        expect(element(by.cssContainingText('.table-content-valign-center tr td', 'No Order Found')).isPresent()).toBeTruthy();

      });
    }
  })
});