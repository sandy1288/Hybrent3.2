var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('physician module', function () {
  var EC = protractor.ExpectedConditions;
  var Physician_first_name = browser.params.Physician.firstname;
  var Plastname = browser.params.Physician.lastname;
  var NPI_Number = browser.params.Physician.NPI;
  var userdropdown = element(by.className('dropdown-toggle text-info header-menu-tab'));
  var user_profile = element(by.xpath('//a[@ng-href="#/user/update-profile"]'));
  var userfacility = browser.params.userfacility.facility_xpath;
  var randNumber = browser.params.itemCatalog.randNumber;
  var fac_name = browser.params.user.fac_name;

  it('Add a physician', function () {

    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    element(by.linkText('Physicians')).click();
    browser.sleep(1000);
    expect(browser.getTitle()).toEqual('Physicians');
    element(by.buttonText('Add Physician')).click();
    element(by.model('physician.first_name')).clear().sendKeys(Physician_first_name);
    element(by.model('physician.last_name')).clear().sendKeys(randNumber);
    element(by.model('physician.npi_number')).clear().sendKeys(NPI_Number + randNumber);
    element(by.className('fa fa-ellipsis-v autocomplete-show')).click();
    element(by.model('data.items_selection')).sendKeys(browser.params.user.fac_name);
    element(by.className('glyphicon glyphicon-plus autocomplete-show')).click();
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toEqual('Physician successfully created.');

  });

  it('verify that physican and facilities filter appear on page', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
  });

  it('verify that searching with Physician name, NPI and Facility wise working properly', function () {

    element(by.model('searchParams.search')).sendKeys(Physician_first_name + randNumber);
    element(by.buttonText('Search')).click();
    console.log(Physician_first_name + randNumber);
    element.all(by.repeater('physician in physicians')).each(function (element1, index) {
      element1.element(by.binding('physician.NPI')).getText().then(function (text) {

        expect(text).toEqual(NPI_Number + randNumber);


      })
    })

  });
});