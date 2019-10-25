describe('Price Tier Setup module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;
  var vendor_name = browser.params.shop.vendor;
  var price_tier_name = browser.params.Vendor_price_tier.Pricetier_name;
  var price_tier_percentage = browser.params.Vendor_price_tier.Price_Percentage;
  var newpricetier_name = browser.params.Vendor_price_tier.newpricetier_name;
  var newPrice_percentage = browser.params.Vendor_price_tier.newPrice_percentage;
  var randompricetier = browser.params.Vendor_price_tier.randompricetier;


  it('Open Price Tier Setup module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    element(by.linkText('Price Tier Setup')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    expect(browser.getTitle()).toEqual('Price Tier Setup');
  });

  it('verify that search filter appear on price tier setup listing page', function () {
    expect(element(by.model('searchFilter')).isPresent()).toBeTruthy();
  });

  it('Verify that user is able to add new price tier', function () {
    browser.sleep(2000);
    element(by.buttonText('Add')).click();
    browser.sleep(2000);
    element(by.model('tierData.name')).clear().sendKeys(price_tier_name + randompricetier);
    element(by.model('tierData.price_percentage')).clear().sendKeys(price_tier_percentage);
    browser.sleep(1000);
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toEqual('Price tier created successfully.');
  });

  it('Search newly created price tier by name', function () {
    element(by.model('searchFilter')).clear().sendKeys(price_tier_name + randompricetier);
    expect(element(by.repeater('priceTier in priceTierList | orderBy:predicate:reverse | offset: (search.currentPage - 1) * search.iPerPage | limitTo: search.iPerPage')).getText()).toContain(price_tier_name + randompricetier);
  });

  it('set newly created price tier with vendor', function () {
    element(by.buttonText('Vendor Price Tier Setup')).click();
    browser.sleep(2000);
    element(by.xpath('//a[contains(text(),"All Vendors")]')).click();
    browser.sleep(2000);
    element(by.model('search.searchKeyword')).clear().sendKeys(vendor_name);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(3000);
    element(by.model('search.name')).clear().sendKeys(browser.params.user.fac_name);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.model('facilityWisePriceTier[facility.id]')).$('[label="' + price_tier_name + randompricetier + '"]').click();
    element(by.buttonText('Close')).click();

  });

  it('verify that user is not able to delete mapped price tier', function () {
    element(by.model('searchFilter')).clear().sendKeys(price_tier_name + randompricetier);
    element(by.xpath('//i[@class="fa fa-trash"]')).click();
    browser.sleep(1000);
    element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Price Tier is assigned to facility vendor.');
  });

  it('add a new price tier to check edit and delete functionality', function () {
    element(by.buttonText('Add')).click();
    browser.sleep(2000);
    element(by.model('tierData.name')).clear().sendKeys(newpricetier_name + randompricetier);
    element(by.model('tierData.price_percentage')).clear().sendKeys(newPrice_percentage);
    browser.sleep(1000);
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toEqual('Price tier created successfully.');
  })


  it("verify that user is able to edit and update newly edit price tier", function () {
    element(by.model('searchFilter')).clear().sendKeys(newpricetier_name + randompricetier);
    element(by.xpath('//i[@class="fa fa-edit"]')).click();
    browser.sleep(1000);
    element(by.id('btnAdd')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Price tier updated successfully.');
  });

  it("verify that user is able to delete newly created price tier", function () {
    element(by.model('searchFilter')).clear().sendKeys(newpricetier_name + randompricetier);
    element(by.xpath('//i[@class="fa fa-trash"]')).click();
    browser.sleep(1000);
    element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('Price Tier deleted successfully.');
  });


});