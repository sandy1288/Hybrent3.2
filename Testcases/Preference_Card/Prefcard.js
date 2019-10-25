var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('Prefcard module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;
  var Physician_first_name = browser.params.Physician.firstname;
  var prefcard_name = browser.params.Prefcard.Prefcard_name;
  var General_sku = browser.params.itemCatalog.General_sku;
  var Patient_fname = browser.params.Patients.Patient_fname;

  it('verify that preference card module get opened on clicking prefcard', function () {
    browser.actions().mouseMove(element(by.xpath('//span[contains(text(),"Preference Cards")]'))).perform();
    browser.sleep(1000);
    element(by.xpath('//span[contains(text(),"Preference Cards")]')).click();
    expect(browser.getTitle()).toEqual('Preference Cards');
  });

  it('verify that search filter and drop down options appear on pref card listing page', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.physician_id')).isPresent()).toBeTruthy();
  });

  it('verify that on clicking add Preference card button a new window to add procedure get opened', function () {
    element(by.linkText('Add Preference Card')).click();
    expect(browser.getTitle()).toEqual('Create Preference Card');

  });

  it('verify that user is able to create new pref card from the add pref card window', function () {
    element(by.model('preferenceCard.cardName')).sendKeys(prefcard_name + randNumber);
    element(by.model('preferenceCard.physician_id')).$('[label="' + Physician_first_name + " " + randNumber + '"]').click();
    browser.sleep(2000);
    element(by.xpath('//input[@value="Add Stage"]')).click();
    element(by.model('Ctrl.prefCardStage')).sendKeys('level1');
    element(by.buttonText('Add Stage')).click();
    browser.sleep(1000);
    element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    browser.sleep(1000);
    var itemRow = element(by.repeater('item in items').row(0));
    element(by.buttonText('Add')).click();
    element(by.model('searchParams.search')).clear();
    element(by.model('preferenceCard.cardName')).click();
    browser.executeScript("arguments[0].scrollIntoView(0,0);", element(by.className('pagehead')).getWebElement()).then(function () {
      browser.sleep(2000);
      browser.executeScript('window.scrollTo(0,0);').then(function () {
        console.log('++++++SCROLLED UP+++++');
        browser.sleep(2000);

      });
      element(by.buttonText('Save')).click();
    });





    //browser.executeScript('window.scrollTo(0,document.body.scrollHeight);').then(function () {
    // element(by.xpath('//input[@value="Add Stage"]')).click();
    // element(by.model('Ctrl.prefCardStage')).sendKeys('level2');
    // element(by.buttonText('Add Stage')).click();
    // browser.sleep(10000);
    // element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
    // browser.sleep(1000);
    // var itemRow = element(by.repeater('item in items').row(0));
    // element(by.buttonText('Add')).click();
    // browser.sleep(1000);
    //element(by.model('searchParams.search')).click();
    //element(by.xpath('//*[@id="ng-view"]/div/div/div[1]/div/div/button')).click();
    expect($('.toast-message').getText()).toEqual("Preference Card Successfully created.");
    expect(browser.getTitle()).toEqual('Preference Cards');
  });

  // it('search and add item to newly created prefcard', function () {

  //   element(by.model('searchParams.search')).sendKeys(prefcard_name + randNumber);
  //   browser.sleep(1000);
  //   // var cardlist = element(by.repeater('card in prefCards').row(1));
  //   // element(by.css('a > i.fa fa-edit')).click();
  //   element(by.xpath('//i[@class="fa fa-edit"]')).click();
  //   browser.sleep(2000);
  //   element(by.model('searchParams.search')).clear().sendKeys(General_sku + randNumber);
  //   browser.sleep(1000);
  //   var itemRow = element(by.repeater('item in items').row(0));
  //   element(by.buttonText('Add')).click();
  //   browser.sleep(1000);
  //   element(by.model('searchParams.search')).clear();
  //   browser.sleep(1000);
  //   element(by.xpath('//span[contains(text(),"Preference Cards")]')).click();
  //   element(by.xpath('//div[@class="modal-footer"]//button[@class="btn btn-primary"][contains(text(),"Save")]')).click();
  //   expect($('.toast-message').getText()).toEqual("Preference Card Successfully updated.");
  // })
});