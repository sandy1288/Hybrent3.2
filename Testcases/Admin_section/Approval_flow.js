describe('Approval flow', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;


  it('Open Approval flow module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    element(by.linkText('Approval Flow')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 10000);
    expect(browser.getTitle()).toEqual('Approval Template List');
  });

  it('verify that search filter with facility list and search button appear on the approval template page', function () {
    expect(element(by.model('searchForm.name')).isPresent()).toBeTruthy();
    expect(element(by.xpath('//a[contains(text(),"All Facilities")]')).isPresent()).toBeTruthy();
    expect(element(by.buttonText('Search')).isPresent()).toBeTruthy();
  });

  it('add new approval flow template', function () {
    element(by.buttonText('Add')).click();
    browser.sleep(3000);
    element(by.model('templateData.template_name')).sendKeys(randNumber);
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toEqual('Approval flow added successfully.');

  });

  it('search newly created approval flow', function () {
    element(by.model('searchForm.name')).clear().sendKeys(randNumber);
    element(by.buttonText('Search')).click();
    expect(element(by.repeater('template in templates')).getText()).toContain(randNumber);
  });

  it('delete newly created approval flow', function () {
    element(by.xpath('//i[contains(@class,"fa fa-trash")]')).click();
    browser.sleep(1000);
    element(by.buttonText('Yes')).click();
    expect($('.toast-message').getText()).toEqual('Approval flow deleted successfully.');

  });




});