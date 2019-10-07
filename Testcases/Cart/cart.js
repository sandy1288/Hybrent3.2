describe('Hybrent Cart Module', function () {
  var EC = protractor.ExpectedConditions;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var randNumber = browser.params.itemCatalog.randNumber;
  var PO_Num = browser.params.itemCatalog.PO_Number;

  it('Open cart page', function () {
    element(by.css('.fa-shopping-cart')).click();
    expect(browser.getTitle()).toEqual('My Cart');
  });

  it('add item to cart', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    element(by.model('searchParams.search')).sendKeys(General_mfrNumber + randNumber);
    expect(element(by.buttonText('+')).isPresent()).toBe(true);
    element(by.buttonText('+')).click();
    expect(element(by.css('.item-qty-editable-label')).getText()).toEqual('2');
  });

  it('Generate PO', function () {
    element(by.model('cartParams.vendorParams[key].is_receive_only')).click();
    browser.sleep(1000);
    element(by.model('cartParams.vendorParams[key].is_use_my_po_num')).click();
    browser.sleep(1000);
    element(by.model('cartParams.vendorParams[key].manual_po_num')).sendKeys(PO_Num + randNumber);
    browser.sleep(3000);
    expect(element(by.xpath('//span[@id="btnAdd"]')).isPresent()).toBeTruthy();
    element(by.xpath('//span[@id="btnAdd"]')).click();
    browser.sleep(1000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    expect(browser.getTitle()).toEqual('My Orders');
  });
});