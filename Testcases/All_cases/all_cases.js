var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('All Cases module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var Patient_fname = browser.params.Patients.Patient_fname;
  var randNumber = browser.params.itemCatalog.randNumber;
  var Procedure_name = browser.params.Procedure.Procedure_name;
  var OR_Name = browser.params.OperatingRoom.OR_Name;
  var Physician_first_name = browser.params.Physician.firstname;

  it('Navigate to All cases module', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath('//span[contains(text(),"All Cases")]')).getWebElement()).then(function () {
      element(by.xpath('//span[contains(text(),"All Cases")]')).click();
    });
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('All Cases');
  });

  it('Verify that all search and drop down filter appear on the All case page', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.procedure_id')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.physician_id')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.operating_room_id')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.status')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.date_range')).isPresent()).toBeTruthy();

  });

  it('Search and open newly created case', function () {
    element(by.model('searchParams.search')).clear().sendKeys(Patient_fname + " " + randNumber);
    browser.sleep(2000);
    element(by.model('searchParams.procedure_id')).$('[label="' + Procedure_name + randNumber + '"]').click();
    browser.sleep(2000);
    element(by.model('searchParams.physician_id')).$('[label="' + Physician_first_name + " " + randNumber + '"]').click();
    browser.sleep(2000);
    element(by.model('searchParams.operating_room_id')).$('[label="' + OR_Name + randNumber + '"]').click();
    browser.sleep(2000);
    element(by.model('searchParams.status')).click();
    browser.sleep(1000);
    element(by.xpath('//option[contains(text(),"Completed")]'));
    browser.sleep(2000);
    element(by.model('searchParams.date_range')).sendKeys('-- All Dates --');
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);

    element(by.xpath('//tr[1]//td[10]//span[1]')).getText().then(function (text) {
      expect(text).toEqual('Completed');
    });

  });

});