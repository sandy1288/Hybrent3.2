describe('Hybrent Templates Module for scan out', function () {
  var EC = protractor.ExpectedConditions;
  var templateName = browser.params.Templates.scanout_tempate_name;
  var General_sku = browser.params.itemCatalog.General_sku;
  var userfacility = browser.params.userfacility.facility_xpath;
  var randNumber = browser.params.itemCatalog.randNumber;

  it('Templates scanout List page should open', function () {
    element((by.linkText('Scan out'))).click();
    expect(browser.getTitle()).toEqual('Manage Templates');
  });

  it('scan out List page should display templates search filter', function () {
    expect(element(by.model('searchForm.searchFilter')).isPresent()).toBeTruthy();

  });
  it('Add scanout Template', function () {
    element(by.buttonText('Add Template')).click();
    element(by.model('tempData.template_name')).sendKeys(scanout_tempate_name + randNumber);
    element(by.buttonText('Create Template')).click();
    expect($('.toast-message').getText()).toEqual('Template created successfully.');
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))), 5000);
  });

  it('Add item to newly created template', function () {
    element(by.model('searchParams.search')).sendKeys(General_sku + randNumber);
    browser.sleep(1000);
    element(by.buttonText('Add')).click();
    element(by.buttonText('Save')).click();
    browser.sleep(1000);
    element.all(by.repeater('item in vendor.items')).each(function (element1, index) {
      element1.element(by.binding('item.sku')).getText().then(function (text) {
        browser.sleep(2000);
        expect(text).toEqual(General_sku + randNumber);
      });
    });
    element(by.buttonText('Close')).click();
  });

  it('Search template by name', function () {
    element(by.model('searchForm.searchFilter')).sendKeys(templateName + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element.all(by.repeater('template in templates')).getText().then(function (text) {
      expect(text).toContain(templateName + randNumber);
    });

  });

});