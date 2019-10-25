var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('Patient module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var Patient_defaultfacility = browser.params.Patients.Patientfac_xpath;
  var Patient_fname = browser.params.Patients.Patient_fname;
  var Status = browser.params.Patients.Status;
  var randNumber = browser.params.itemCatalog.randNumber;

  it('Navigate to patient module', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath('//span[contains(text(),"Patients")]')).getWebElement()).then(function () {
      element(by.xpath('//span[contains(text(),"Patients")]')).click();
    });

    browser.sleep(2000);

    expect(browser.getTitle()).toEqual('Patients');
    element(by.xpath(Patient_defaultfacility)).getText().then(function (default_facility) {
      console.log('facility selected on patient page appear as', default_facility);
      expect(default_facility).toBe(browser.params.user.fac_name);
    })
  });

  it('Verify that search patient By filter appear on patient detail page', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('$select.search')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.building_id')).isPresent()).toBeTruthy();
    expect(element(by.model('$select.search')).isPresent()).toBeTruthy();
  });

  it('verify that user is able to add patient by clicking on add patient button', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    element(by.xpath('//span[@class="patient-add-icon"]')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    element(by.model('patient.first_name')).sendKeys(Patient_fname);
    element(by.xpath('//a[contains(text(),"--Select facility--")]')).click();
    browser.sleep(1000);
    element(by.model('search.searchKeyword')).sendKeys(browser.params.user.fac_name);
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(1000);
    element(by.buttonText('Select')).click();
    browser.sleep(1000);
    element(by.model('patient.last_name')).sendKeys(randNumber);
    element(by.model('patient.mrn_number')).sendKeys(randNumber);
    element(by.model('patient.account_number')).sendKeys(randNumber);
    element(by.model('patient.resident_id')).sendKeys(randNumber);
    element(by.id('dob')).clear().sendKeys("01/01/2018");
    browser.sleep(2000);
    element(by.xpath('//select[@id="status"]//option[3]')).click();
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toEqual('Patient successfully created.');



  });

  xit('Patient: Update Patient.', function () {
    // element(by.css('div.pagehead > hyb-select > a')).click();
    // element(by.model('search.searchKeyword')).sendKeys(browser.params.user.fac_name);
    // element(by.buttonText('Select')).click();

    element(by.model('searchParams.search')).clear().sendKeys(Patient_fname + " " + randNumber);
    element(by.buttonText('Search')).click();
    element.all(by.repeater('patient in patients')).each(function (element1, index) {
      element1.element(by.binding('patient.full_name')).getText().then(function (text) {
        expect(text.trim()).toContain(Patient_fname + " " + randNumber);
      });
    });
    let patient = element(by.repeater('patient in patients'));
    browser.wait(EC.elementToBeClickable(patient.element(by.css('.dropdown-toggle'))), 5000);
    patient.element(by.css('.dropdown-toggle')).click();
    element(by.xpath('//div[@class="pull-right dropdown open"]//a[contains(text(),"Edit Patient")]')).click();
    expect(element(by.css('.modal-header > div.headtext > span')).getText()).toContain('Edit Patient');
    element(by.model('patient.address1')).sendKeys("test");
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toEqual("Patient successfully updated.");
  });


});