var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('Picklist module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var Patient_fname = browser.params.Patients.Patient_fname;
  var randNumber = browser.params.itemCatalog.randNumber;
  var Procedure_name = browser.params.Procedure.Procedure_name;
  var OR_Name = browser.params.OperatingRoom.OR_Name;
  var Physician_first_name = browser.params.Physician.firstname;

  it('Navigate to picklist module', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath('//span[contains(text(),"Pick list")]')).getWebElement()).then(function () {
      element(by.xpath('//span[contains(text(),"Pick list")]')).click();
    });
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Pick list');
  });

  it('Verify that all search and drop down filter appear on the pick list page', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.procedure_id')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.physician_id')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.operating_room_id')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.date_range')).isPresent()).toBeTruthy();
  });

  it('Search newly created case', function () {
    element(by.model('searchParams.search')).clear().sendKeys(Patient_fname + " " + randNumber);
    browser.sleep(2000);
    element(by.model('searchParams.procedure_id')).$('[label="' + Procedure_name + randNumber + '"]').click();
    browser.sleep(2000);
    element(by.model('searchParams.physician_id')).$('[label="' + Physician_first_name + " " + randNumber + '"]').click();
    browser.sleep(2000);
    element(by.model('searchParams.operating_room_id')).$('[label="' + OR_Name + randNumber + '"]').click();
    browser.sleep(2000);
    element(by.model('searchParams.date_range')).sendKeys('-- All Dates --');
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.className('col-sm-12')).getText().then(function (text) {
      expect(text).toEqual(Procedure_name + randNumber);
    });

  });



  it('open and add normal notes in newly created case', function () {

    element(by.partialLinkText('00000000')).click();
    browser.sleep(2000);
    element(by.model('CaseDetail.gloves_size')).clear().sendKeys('glove' + randNumber);
    element(by.model('CaseDetail.surgeon_notes')).clear().sendKeys('surgeon' + randNumber);
    element(by.model('CaseDetail.interruptions')).clear().sendKeys('intrer' + randNumber);
    element(by.model('CaseDetail.preparation_notes')).clear().sendKeys('notes' + randNumber);
    element(by.model('CaseDetail.music')).clear().sendKeys('music' + randNumber);
    element(by.model('CaseDetail.position')).clear().sendKeys('position' + randNumber);
    element(by.model('CaseDetail.instructions')).clear().sendKeys('instruction' + randNumber);
    browser.sleep(1000);
  });

  it('increase item qty ', function () {
    element.all(by.className('item-qty-editable-label')).first().click();
    element(by.model('$parent.$data')).clear().sendKeys('1.000');
    browser.sleep(2000);
    element(by.xpath('//button[@class="btn btn-primary"]//span[@class="glyphicon glyphicon-ok"]')).click();
    browser.executeScript("arguments[0].scrollIntoView(0,0);", element(by.className('pagehead')).getWebElement()).then(function () {
      browser.sleep(2000);
      element(by.buttonText('Save')).click();
      browser.sleep(3000);
    })
  });

  it('move case to execute case', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath('//span[contains(text(),"Auto Attach Stock")]')).getWebElement()).then(function () {
      element(by.xpath('//span[contains(text(),"Auto Attach Stock")]')).click();
    });
    expect($('.toast-message').getText()).toEqual('All Items stock attached successfully.');
    browser.sleep(3000);
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    element(by.xpath('//button[contains(text(),"Move to Execute")]')).click();
    expect($('.toast-message').getText()).toEqual('Case moved to execute successfully.');
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Pick list');
  });

});