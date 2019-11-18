describe('Payor Code', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;
  var AR_desc = browser.params.AR_Code.Description;
  var randomnumber = browser.params.Vendor_price_tier.randompricetier;
  var Payer_Code = browser.params.Payer_Code.Description;


  it('Open Payor Code module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    element(by.linkText('Payor Code')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 10000);
    expect(browser.getTitle()).toEqual('Payor Code');
  });

  it('verify that search filter with facility list and search button appear on the Payor Code page', function () {
    expect(element(by.model('searchFilter')).isPresent()).toBeTruthy();
    expect(element(by.model('searchActive')).isPresent()).toBeTruthy();
    expect(element(by.buttonText('Search')).isPresent()).toBeTruthy();
    browser.sleep(2000);
  });

  it('add new Payor Code', function () {
    element(by.buttonText('Add')).click();
    browser.sleep(3000);
    element(by.model('payorCodeData.description')).sendKeys(Payer_Code);
    element(by.model('payorCodeData.code')).sendKeys(randomnumber);
    element(by.xpath('//a[contains(text(),"AR Code")]')).click();
    // browser.sleep(2000);
    // element(by.xpath('//i[@class="fa fa-ellipsis-v autocomplete-show"]')).click();
    // browser.sleep(1000);
    // element(by.model('data.items_selection')).sendKeys(randomnumber);
    // browser.sleep(2000);
    // element(by.xpath('//i[@class="glyphicon glyphicon-plus autocomplete-show"]')).click();
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toEqual('Code created successfully.');

  });

  it('search newly created Payor Code by given name and code', function () {
    element(by.model('searchFilter')).clear().sendKeys(Payer_Code);
    element(by.buttonText('Search')).click();
    expect(element(by.repeater('Data in prCodesData')).getText()).toContain(Payer_Code);
    browser.sleep(2000);
    //search AR code by code number
    element(by.model('searchFilter')).clear().sendKeys(randomnumber);
    element(by.buttonText('Search')).click();
    expect(element(by.repeater('Data in prCodesData')).getText()).toContain(Payer_Code);
  });

  xit('delete newly created Payor Code', function () {
    element(by.buttonText('Delete')).click();
    browser.sleep(1000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    expect($('.toast-message').getText()).toEqual('Code deleted successfully.');

  });




});