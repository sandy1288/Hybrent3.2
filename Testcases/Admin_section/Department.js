describe('Department', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;
  var mnemonic = browser.params.department.mnemonic;
  var name = browser.params.department.Name;

  it('Open Department module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    element(by.linkText('Departments')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    expect(browser.getTitle()).toEqual('Department');
  });

  it('verify that search and facility fiter with search and add button appear on the page', function () {
    expect(element(by.model('searchFilter')).isPresent()).toBeTruthy();
    expect(element(by.xpath('//a[contains(text(),"All Facilities")]')).isPresent()).toBeTruthy();
    expect(element(by.buttonText('Search')).isPresent()).toBeTruthy();
  });

  it('add new department', function () {
    element(by.buttonText('Add')).click();
    element(by.xpath('//a[contains(text(),"--Select facility--")]')).click();
    browser.wait(EC.elementToBeClickable(element(by.model('search.searchKeyword'))), 5000);
    element(by.model('search.searchKeyword')).sendKeys(browser.params.user.fac_name);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    element(by.model('departmentData.mnemonic')).sendKeys(mnemonic + randNumber);
    element(by.model('departmentData.name')).sendKeys(name + randNumber);
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toEqual('Department created successfully.');
  });

  it('search newly created department name by its name', function () {
    element(by.model('searchFilter')).clear().sendKeys(name + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('adminDepartmentData in adminDepartmentsDatas')).getText()).toContain(name + randNumber);
  });
  it('update the newly created department', function () {
    element(by.buttonText('Edit')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    element(by.model('departmentData.secondary_name')).clear().sendKeys('test');
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Save'))), 5000);
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toEqual('Department updated successfully.');
  });

  it('delete newly created department', function () {
    element(by.model('searchFilter')).clear().sendKeys(name + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Delete')).click();
    browser.sleep(1000);
    element(by.buttonText('Yes')).click();
    browser.sleep(1000);
    expect($('.toast-message').getText()).toEqual('Department deleted successfully.');
  });

});