var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('Picklist module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var Patient_fname = browser.params.Patients.Patient_fname;
  var randNumber = browser.params.itemCatalog.randNumber;
  var Procedure_name = browser.params.Procedure.Procedure_name;
  var OR_Name = browser.params.OperatingRoom.OR_Name;
  var Physician_first_name = browser.params.Physician.firstname;

  it('Navigate to Execute case module', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath('//span[contains(text(),"Execute Cases")]')).getWebElement()).then(function () {
      element(by.xpath('//span[contains(text(),"Execute Cases")]')).click();
    });
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Execute cases');
  });

  it('Verify that all search and drop down filter appear on the execute case page', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.procedure_id')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.physician_id')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.operating_room_id')).isPresent()).toBeTruthy();
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
    element(by.model('searchParams.date_range')).sendKeys('-- All Dates --');
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);

    element(by.className('col-sm-12')).getText().then(function (text) {
      expect(text).toEqual(Procedure_name + randNumber);
    });

  });

  it('increase item hold qty and move case to complete case', function () {
    element(by.partialLinkText('00000001')).click();
    browser.sleep(2000);
    element.all(by.className('item-qty-editable-label')).click();
    element(by.model('$parent.$data')).clear().sendKeys('1.000');
    browser.sleep(2000);
    element(by.xpath('//button[@class="btn btn-primary"]//span[@class="glyphicon glyphicon-ok"]')).click();
    browser.executeScript("arguments[0].scrollIntoView(0,0);", element(by.className('pagehead')).getWebElement()).then(function () {
      browser.sleep(2000);
      element(by.buttonText('Save')).click();
      expect($('.toast-message').getText()).toEqual('Case updated successfully.');
    })
    browser.wait(function () {
      return $('.toast-message').isPresent().then(function (toastPresent) {
        return !toastPresent;
      });
    }, 10000);

    browser.sleep(3000);
    element(by.buttonText('Complete Case')).click();
    expect($('.toast-message').getText()).toEqual('Case completed successfully.');
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Execute cases');
  });

});