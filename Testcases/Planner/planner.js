var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('Planner module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;
  var Physician_first_name = browser.params.Physician.firstname;
  var prefcard_name = browser.params.Prefcard.Prefcard_name;
  var General_sku = browser.params.itemCatalog.General_sku;
  var Patient_defaultfacility = browser.params.Patients.Patientfac_xpath;
  var Procedure_name = browser.params.Procedure.Procedure_name;
  var OR_Name = browser.params.OperatingRoom.OR_Name;
  var Patient_fname = browser.params.Patients.Patient_fname;


  it('Navigate to planner module', function () {
    browser.actions().mouseMove(element(by.xpath('//span[contains(text(),"Planner")]'))).perform();
    browser.sleep(1000);
    element(by.xpath('//span[contains(text(),"Planner")]')).click();
    expect(browser.getTitle()).toEqual('Planner');
    element(by.xpath(Patient_defaultfacility)).getText().then(function (default_facility) {
      console.log('facility selected on patient page appear as', default_facility);
      expect(default_facility).toBe(browser.params.user.fac_name);
    })
  });

  it('Planner: add Cases.', function () {
    browser.sleep(2000);
    browser.executeScript("arguments[0].scrollIntoView(0,0);", element(by.className('pagehead')).getWebElement()).then(function () {
      browser.sleep(2000);
      browser.executeScript('window.scrollTo(0,0);').then(function () {
        console.log('++++++SCROLLED UP+++++');
        browser.sleep(2000);

      });
      element(by.buttonText('Month')).click();
    });
    browser.sleep(2000);
    element.all(by.className('fc-day-number fc-fri fc-future')).last().click();
    browser.sleep(5000);
    element(by.css('[ng-click*=selectItem]')).click();
    browser.sleep(2000);
    element(by.model('search.search')).sendKeys(Patient_fname + " " + randNumber);
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(1000);
    element(by.model('vm.planForm.physician_id')).click();
    browser.sleep(2000);
    //     element.all(by.options("physician.id as physician.first_name + ' ' + physician.last_name for physician in vm.physicians")).get(1).click();
    element(by.cssContainingText('option', Physician_first_name + " " + randNumber)).click();
    browser.sleep(2000);
    element(by.model('vm.planForm.procedure_id')).click();
    browser.sleep(2000);
    // element.all(by.options('procedure.id as procedure.name+procedure.cptCode for procedure in vm.procedures')).get(1).click();
    element(by.xpath('//*[@id="procedure_id"]/option[2]')).click();
    browser.sleep(2000);
    element(by.className('glyphicon glyphicon-chevron-down')).click();
    browser.sleep(5000);
    element(by.id('pref_card_id')).click();
    browser.sleep(2000);
    element(by.cssContainingText('option', prefcard_name + randNumber)).click();
    browser.sleep(2000);
    element(by.id('operating_room_id')).click();
    browser.sleep(2000);
    element(by.cssContainingText('option', OR_Name + randNumber)).click();
    // element.all(by.options('operatingRoom.id as operatingRoom.name for operatingRoom in vm.operatingRooms')).get(1).click();
    browser.sleep(2000);
    element(by.buttonText('Schedule Case')).click();
    browser.sleep(2000);
    element(by.cssContainingText('.fc-title', Physician_first_name + randNumber)).click();
    // element.all(by.css('')).last().click();
    expect(browser.getTitle()).toEqual('Case Detail');
    browser.sleep(7000);
  });

  // it('Planner-will check for case detail', function () {
  //   expect(element(by.className('col-sm-12 padding-top-7 text-capitalize')).getText()).toEqual(Patient_fname + " " + randNumber);
  //   expect(element.all(by.className('col-sm-12 padding-top-7')).first().getText()).toEqual(Patient_fname + " " + randNumber);
  //   // expect(element.all(by.className('col-sm-12 padding-top-7')).get(1).getText()).toBe(randomNumber);
  //   expect(element.all(by.className('col-sm-12 padding-top-7')).get(2).getText()).toEqual(browser.params.user.fac_name);
  //   expect(element.all(by.className('col-sm-11 padding-top-7')).first().getText()).toBe(prefcard_name);
  //   browser.sleep(2000);
  // });

});