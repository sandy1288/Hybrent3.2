describe('Link item', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var General_sku = browser.params.itemCatalog.General_sku;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var randNumber = browser.params.itemCatalog.randNumber;


  it('Open link item module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    element(by.linkText('Link Items')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 10000);
    expect(browser.getTitle()).toEqual('Link Items : List');
  });

  it('verify that search and status filter appear on the page', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.is_active')).isPresent()).toBeTruthy();
  });

  it('verify that user is able to create new link item', function () {
    element(by.buttonText('Add Link Item')).click();
    browser.sleep(2000);
    element(by.model('linkItem.description')).sendKeys('desc' + randNumber);
    browser.sleep(1000);
    element(by.model('linkItem.alias')).sendKeys('alias' + randNumber);
    browser.sleep(1000);
    element(by.model('searchParams.search')).sendKeys(General_mfrNumber + randNumber);
    browser.sleep(1000);
    var itemRow = element(by.repeater('item in items').row(0));
    element(by.buttonText('Add')).click();
    browser.sleep(1000);
    element(by.model('linkItem.link_item_key')).sendKeys(randNumber);
    browser.sleep(1000);
    element(by.buttonText('Create')).click();
    expect($('.toast-message').getText()).toEqual('Item added successfully.');
  });

  it('search newly created link item by description', function () {
    element(by.model('searchParams.search')).clear().sendKeys('desc' + randNumber);
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.repeater('item in linkItems')).getText().then(function (text) {
      expect(text).toContain('desc' + randNumber);
    })
  });

  it('search newly created link item by linkitem key', function () {
    element(by.model('searchParams.search')).clear().sendKeys(randNumber);
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.repeater('item in linkItems')).getText().then(function (text) {
      expect(text).toContain(randNumber);
    })
  });

  it('search newly created link item by alias', function () {
    element(by.model('searchParams.search')).clear().sendKeys('alias' + randNumber);
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.repeater('item in linkItems')).getText().then(function (text) {
      expect(text).toContain(randNumber);
    })
  });

  it('update link item', function () {
    element(by.model('searchParams.search')).clear().sendKeys('desc' + randNumber);
    browser.sleep(2000);
    var update = element(by.repeater('item in linkItems'));
    update.element(by.xpath('i.fa-edit')).click();
    browser.sleep(2000);
    element(by.buttonText('Create')).click();
    expect($('.toast-message').getText()).toEqual('Item updated successfully.');
  });

  it('delete link item', function () {
    element(by.model('searchParams.search')).clear().sendKeys('desc' + randNumber);
    browser.sleep(2000);
    var update = element(by.repeater('item in linkItems'));
    update.element(by.xpath('i.glyphicon glyphicon-trash text-danger action-button')).click();
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    browser.sleep(1000);
    expect($('.toast-message').getText()).toEqual('Link Item deleted successfully.');
  });

});