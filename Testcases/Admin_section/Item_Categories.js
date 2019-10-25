describe('Item Categories', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var General_item_Name = browser.params.itemCatalog.General_item_Name;
  var General_sku = browser.params.itemCatalog.General_sku;
  var General_alias = browser.params.itemCatalog.General_alias;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var randNumber = browser.params.itemCatalog.randNumber;


  it('Open Item Categories module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    element(by.linkText('Item Categories')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 10000);
    expect(browser.getTitle()).toEqual('Categories');
  });

  it('verify that search and status filter appear on the page', function () {
    expect(element(by.model('searchParams.name')).isPresent()).toBeTruthy();
  });

  it('add new Category', function () {
    element(by.xpath('//a[@class="btn btn-primary pull-right"]')).click();
    browser.sleep(2000);
    element(by.model('category.name')).sendKeys('cat' + randNumber);
    element(by.buttonText('Save')).click();
    browser.sleep(1000);
    expect($('.toast-message').getText()).toEqual('Category successfully created.');
  });

  it('search newly created category', function () {
    element(by.model('searchParams.name')).clear().sendKeys('cat' + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.repeater('category in categories')).getText().then(function (text) {
      expect(text).toContain('cat' + randNumber);
    })
  });

  it('update newly created category', function () {
    element(by.model('searchParams.name')).clear().sendKeys('cat' + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Edit')).click();
    browser.sleep(2000);
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toEqual('Category successfully updated.');
  });

  it('verify that on clicking category name user get redirect to item master page', function () {
    element(by.model('searchParams.name')).clear().sendKeys('cat' + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.repeater('category in categories')).click();
    browser.sleep(3000);
    expect(browser.getTitle()).toEqual('Item Master : List');
  });

  it('delete newly create category', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    element(by.linkText('Item Categories')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 10000);
    element(by.model('searchParams.name')).clear().sendKeys('cat' + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Delete')).click();
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    expect($('.toast-message').getText()).toEqual('Category deleted successfully');
  });

});