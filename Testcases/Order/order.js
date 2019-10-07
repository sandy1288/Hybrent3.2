describe('Hybrent Order Module', function () {
  var EC = protractor.ExpectedConditions;
  var PO_Num = browser.params.itemCatalog.PO_Number;
  var randNumber = browser.params.itemCatalog.randNumber;
  it('Open order module', function () {
    element(by.linkText('Orders')).click();
    expect(browser.getTitle()).toEqual('My Orders');
    browser.sleep(1000);
  });
  it('List page should display list of filters', function () {
    expect(element(by.model('searchForm.search')).isPresent()).toBeTruthy();
    expect(element(by.model('searchForm.vendorFilter')).isPresent()).toBeTruthy();
    expect(element(by.model('searchForm.statusFilter')).isPresent()).toBeTruthy();
    expect(element(by.model('searchForm.typeFilter')).isPresent()).toBeTruthy();
    expect(element(by.model('searchForm.project')).isPresent()).toBeTruthy();
    expect(element(by.model('searchForm.facilityId')).isPresent()).toBeTruthy();
    expect(element(by.model('searchForm.departmentId')).isPresent()).toBeTruthy();
    expect(element(by.model('$ctrl.selectedValue.name')).isPresent()).toBeTruthy();
    expect(element(by.buttonText('Search')).isPresent()).toBeTruthy();
  });

  it('Order list page search with PO# Found', function () {
    element(by.model('searchForm.statusFilter')).click();
    element(by.model('searchForm.search')).sendKeys(PO_Num + randNumber);
    element(by.repeater('status in $select.items')).click();

    element(by.buttonText('Search')).click();
    browser.sleep(5000);
    expect(element(by.linkText(PO_Num + randNumber)).isPresent()).toBeTruthy();
  });

  it('verify that all option appears in Order drop down', function () {
    let order = element(by.repeater('order in ordersData.purchaseOrders'));
    browser.wait(EC.elementToBeClickable(order.element(by.css('.dropdown-toggle'))), 5000);
    order.element(by.css('.dropdown-toggle')).click();
    // browser.actions().mouseMove(order.element(by.css('li.po-print'))).perform();
    // browser.wait(EC.elementToBeClickable(order.element(by.css('li.po-print'))), 5000);
    expect(element(by.css('li.po-print')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Download PO')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Print Items')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Invoices')).isPresent()).toBeTruthy();
    expect(element(by.linkText('PO Log')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Notes')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Documents')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Add Items to Cart')).isPresent()).toBeTruthy();
    expect(element(by.linkText('Delete PO')).isPresent()).toBeTruthy();
  });

  it('add invoice for newly created order', function () {
    element(by.buttonText('Search')).click();
    let order = element(by.repeater('order in ordersData.purchaseOrders'));
    browser.wait(EC.elementToBeClickable(order.element(by.css('.dropdown-toggle'))), 5000);
    order.element(by.css('.dropdown-toggle')).click();
    // let order = element(by.repeater('order in ordersData.purchaseOrders'));
    // browser.wait(EC.elementToBeClickable(order.element(by.css('.dropdown-toggle'))), 5000);
    // order.element(by.css('.dropdown-toggle')).click();
    browser.actions().mouseMove(order.element(by.linkText('Invoices'))).perform();
    browser.wait(EC.elementToBeClickable(order.element(by.linkText('Add Invoice'))), 5000);
    element(by.linkText('Add Invoice')).click();
    expect(browser.getTitle()).toEqual('Invoice Detail');
    element(by.model('vm.InvNo')).sendKeys(PO_Num + randNumber);
    element(by.model('vm.InvoicePaymentTerm')).$('[label="' + 'Other' + '"]').click();
    browser.sleep(1000);
    element(by.model('vm.SelectedItem')).click();
    element(by.xpath('//option[contains(text(),"All")]')).click();
    element(by.buttonText('Add Item')).click();
    element(by.buttonText('Save')).click();
    browser.sleep(1000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    expect($('.toast-message').getText()).toEqual('Invoice saved successfully.');
    browser.sleep(1000);
    expect(browser.getTitle()).toEqual('PO Invoice');
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    element(by.xpath('//span[contains(text(),"Receive")]')).click();
    expect(browser.getTitle()).toEqual('Receive PO');
  })
});