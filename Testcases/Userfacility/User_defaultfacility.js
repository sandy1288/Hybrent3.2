describe('user default facility', function () {
  var EC = protractor.ExpectedConditions;
  var userdropdown = element(by.xpath('//*[@id="wrapper"]/div/div/div[2]/ul[1]/li/a'));
  var user_profile = element(by.xpath('//a[contains(text(),"Profile")]'));
  var userfacility = browser.params.userfacility.facility_xpath;
  var randNumber = browser.params.itemCatalog.randNumber;
  var fac_name = "";
  it('user default facility is', function () {
    userdropdown.click();
    user_profile.click();
    element(by.xpath(userfacility)).getText().then(function (facility_name) {
      console.log('user default facility is', facility_name);
      browser.params.user.fac_name = facility_name;
      console.log(browser.params.user.fac_name);
    })
  })
})