var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('Procedure module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var Physician_first_name = browser.params.Physician.firstname;
  var randNumber = browser.params.itemCatalog.randNumber;
  var Procedure_name = browser.params.Procedure.Procedure_name;

  it('verify that user get redirect to Procedure module on clicking procedure', function () {
    browser.actions().mouseMove(element(by.xpath('//span[contains(text(),"Procedures")]'))).perform();
    browser.sleep(1000);
    element(by.xpath('//span[contains(text(),"Procedures")]')).click();
    expect(browser.getTitle()).toEqual('Procedures');

  });

  it('verify that search filter appear on on procedure detail page', function () {
    browser.sleep(1000);
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
  });

  it('verify that on clicking add procedure button a new window to add procedure get opened', function () {
    element(by.linkText('Add Procedure')).click();
    expect(browser.getTitle()).toEqual('Procedure');

  });

  it('Create New Procedure after opening add procedure window', function () {
    element(by.model('procedure.name')).clear().sendKeys(Procedure_name + randNumber);
    browser.sleep("1000");
    console.log(Physician_first_name + randNumber);
    element(by.model('suggestPhysicians')).sendKeys(Physician_first_name + " " + randNumber);
    browser.sleep(1000);
    element.all(by.model('physician.isSelected')).click();
    browser.sleep("1000");
    element(by.model('procedure.cpt_code')).clear().sendKeys(randNumber);
    browser.sleep("1000");
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toEqual("Procedure successfully created.");
    expect(browser.getTitle()).toEqual('Procedures');
  });

  it('verify that user is able to Update created Procedure.', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    element(by.model('searchParams.search')).clear().sendKeys(Procedure_name + randNumber);
    browser.sleep("1000");
    element.all(by.repeater('procedure in procedures')).each(function (element1, index) {
      element1.element(by.binding('procedure.name')).getText().then(function (text) {
        expect(text.trim()).toContain(Procedure_name);
      });
    });
    browser.sleep(1000);
    element(by.css("a > i.fa-edit")).click();
    expect(browser.getTitle()).toEqual('Procedure');
    browser.sleep(2000);
    element(by.xpath('//span[@class="bootstrap-switch-handle-off bootstrap-switch-default"]')).click();
    element(by.model('procedure.procedure_cost')).sendKeys("800");
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toEqual("Procedure successfully updated.");
    expect(browser.getTitle()).toEqual('Procedures');
  });
});