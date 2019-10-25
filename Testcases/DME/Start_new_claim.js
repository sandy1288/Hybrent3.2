var user_facility = require('../Userfacility/User_defaultfacility.js');
describe('Hybrent DME Module', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var Dme_sku = browser.params.itemCatalog.Dme_sku;
  var Dme_item_name = browser.params.itemCatalog.Dme_item_name;
  var Dme_Alias = browser.params.itemCatalog.Dme_Alias;
  var Dme_mfr = browser.params.itemCatalog.Dme_mfr;
  var Patient_fname = browser.params.Patients.Patient_fname;
  var randNumber = browser.params.itemCatalog.randNumber;

  it('navigate to start new claim page', function () {
    browser.executeScript("arguments[0].scrollIntoView();", element(by.xpath('//span[contains(text(),"Start New Claim")]')).getWebElement()).then(function () {
      element(by.xpath('//span[contains(text(),"Start New Claim")]')).click();
    });
    browser.sleep(2000);
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    expect(browser.getTitle()).toEqual('Manage Claim: Create Claim');
  });

  it('click on select button to select patient to generate a claim', function () {
    element(by.xpath('//a[@class="text-primary fa fa-wheelchair"]')).click();
    browser.sleep(1000);
    element(by.model('searchParams.search')).sendKeys(Patient_fname + " " + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(3000);
    element(by.buttonText('Select')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    element(by.buttonText('Add DME')).click();
    browser.sleep(2000);
    element(by.model('itemSearchParam.search')).sendKeys(Dme_sku + randNumber);
    browser.sleep(1000);
    element(by.model('itemSearchParam.rootInventoryId')).click();
    element(by.xpath('//*[@id="inventory"]/option[1]')).click();
    browser.sleep(2000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Add')).click();
    browser.sleep(1000);
    element(by.buttonText('Proceed')).click();
    browser.sleep(2000);
    element(by.buttonText('Generate claim')).click();
    browser.sleep(2000);
    element(by.buttonText('Yes')).click();

    element(by.xpath('//p[contains(text(),"Claim generated successfully. Claim Code : 0000000")]')).getText().then(function (claim) {
      console.log('Claim Code : ' + claim);
    })
  });
  browser.sleep(2000);
  element(by.buttonText('OK')).click();
});