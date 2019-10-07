describe('Hybrent Out Of stcok Module', function () {
  var EC = protractor.ExpectedConditions;
  var General_item_Name = browser.params.itemCatalog.General_item_Name;
  var General_alias = browser.params.itemCatalog.General_alias;
  var General_sku = browser.params.itemCatalog.General_sku;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var vendor = browser.params.itemCatalog.vendor;
  var Generalcategory = browser.params.itemCatalog.Generalcategory;
  var randNumber = browser.params.itemCatalog.randNumber;

  it('Out Of stock page should open', function () {
    browser.actions().mouseMove(element(by.xpath('//span[contains(text(),"Out Of Stock")]'))).perform();
    browser.sleep(2000);
    element(by.linkText('Out Of Stock')).click();
    expect(browser.getTitle()).toEqual('Out Of Stock Items');
  });


});