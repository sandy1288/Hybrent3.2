describe('Utilities', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;
  var import_facility = browser.params.Utilities.import_facility;
  var import_department = browser.params.Utilities.import_department;
  var import_inventories = browser.params.Utilities.import_inventories;
  var import_users = browser.params.Utilities.import_users;
  var syncmap_item = browser.params.Utilities.syncmap_item;
  var templateutilities = browser.params.Utilities.templateutilities;
  var copy_template = browser.params.Utilities.copy_template;
  var Change_temp_owner = browser.params.Utilities.Change_temp_owner;
  var Assign_remove_vendor_access = browser.params.Utilities.Assign_remove_vendor_access;
  var Download_user_facilities_access = browser.params.Utilities.Download_user_facilities_access;
  var Download_user_approval_access = browser.params.Utilities.Download_user_approval_access;
  var Assign_user_facility_access = browser.params.Utilities.Assign_user_facility_access;
  var Remove_user_facility_access = browser.params.Utilities.Remove_user_facility_access;



  it('Open Utilities module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    element(by.linkText('Utilities')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    expect(browser.getTitle()).toEqual('Utilities');
  });

  it('verify that search filter appear on the utilities page', function () {
    expect(element(by.model('searchFilter')).isPresent()).toBeTruthy();
    expect(element(by.buttonText('Search')).isPresent()).toBeTruthy();
  });

  it('search import facility utitilites by its name', function () {
    element(by.model('searchFilter')).clear().sendKeys(import_facility);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);

  });

  it('search import department utitilites by its name', function () {
    element(by.model('searchFilter')).clear().sendKeys(import_department);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('access in ReportsList')).getText()).toContain('Import Department.');
  });

  it('search import_inventories utitilites by its name', function () {
    element(by.model('searchFilter')).clear().sendKeys(import_inventories);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('access in ReportsList')).getText()).toContain('Import Inventories.');

  });

  it('search import_users utitilites by its name', function () {
    element(by.model('searchFilter')).clear().sendKeys(import_users);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('access in ReportsList')).getText()).toContain('Import Users.');

  });

  it('search syncmap_item utitilites by its name', function () {
    element(by.model('searchFilter')).clear().sendKeys(syncmap_item);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('access in ReportsList')).getText()).toContain('Sync/Map items from one facility to other facilities.');

  });

  it('search template utitilites by its name', function () {
    element(by.model('searchFilter')).clear().sendKeys(templateutilities);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('access in ReportsList')).getText()).toContain('Template utilities.');

  });

  it('search template utitilites by its name', function () {
    element(by.model('searchFilter')).clear().sendKeys(copy_template);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('access in ReportsList')).getText()).toContain('Copy Template.');

  });

  it('search Change_temp_owner utitilites by its name', function () {
    element(by.model('searchFilter')).clear().sendKeys(Change_temp_owner);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('access in ReportsList')).getText()).toContain('Change Template Owner.');

  });

  it('search Assign_remove_vendor_access utitilites by its name', function () {
    element(by.model('searchFilter')).clear().sendKeys(Assign_remove_vendor_access);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('access in ReportsList')).getText()).toContain('Assign and remove vendor access.');

  });

  it('search Download_user_facilities_access utitilites by its name', function () {
    element(by.model('searchFilter')).clear().sendKeys(Download_user_facilities_access);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('access in ReportsList')).getText()).toContain('Download users facilities access.');

  });

  it('search Download_user_approval_access utitilites by its name', function () {
    element(by.model('searchFilter')).clear().sendKeys(Download_user_approval_access);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('access in ReportsList')).getText()).toContain('Download user approval access.');

  });

  it('search Assign_user_facility_access utitilites by its name', function () {
    element(by.model('searchFilter')).clear().sendKeys(Assign_user_facility_access);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('access in ReportsList')).getText()).toContain('Assign users facility access.');

  });

  it('search Remove_user_facility_access utitilites by its name', function () {
    element(by.model('searchFilter')).clear().sendKeys(Remove_user_facility_access);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    expect(element(by.repeater('access in ReportsList')).getText()).toContain('Remove users facility access.');

  });

});