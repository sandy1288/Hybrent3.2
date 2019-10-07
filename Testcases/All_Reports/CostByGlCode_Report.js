describe('Hybrent Reports Module', function () {
  var EC = protractor.ExpectedConditions;
  var fromDate = browser.params.Reports.from_date;
  var toDate = browser.params.reports.To_date;
  var fac_name = browser.params.user.fac_name;
  var GL_Code = browser.params.GlCode.code;
  var randNumber = browser.params.itemCatalog.randNumber;


  it('Cost By GL Code Report page should open', function () {
    browser.actions().mouseMove(element(by.css('a > span.reports'))).perform();
    element(by.css('a > span.reports')).click();
    expect(browser.getTitle()).toEqual('Activity Reports');
    element(by.buttonText('View More Reports')).click();
    element(by.linkText('Cost By Gl')).click();
    expect(browser.getTitle()).toEqual('Cost by GL');
  });

  it('Cost By GL Code - should display filters', function () {
    expect(element(by.id('from')).isPresent()).toBeTruthy();
    expect(element(by.id('to')).isPresent()).toBeTruthy();
    expect(element(by.xpath('//a[contains(text(),"All Facilities")]')).isPresent()).toBeTruthy();
    expect(element(by.model('search.glcId')).isPresent()).toBeTruthy();
    expect(element(by.model('search.status')).isPresent()).toBeTruthy();
    expect(element(by.buttonText('Search')).isPresent()).toBeTruthy();

  });

  it('Cost By GL Code - should display Download button', function () {
    element(by.id('from')).clear().sendKeys(fromDate);
    element(by.id('to')).clear().sendKeys(toDate);
    element(by.buttonText('Search')).click();
    expect(element(by.buttonText('Download')).isPresent()).toBeTruthy();
  });

  it('Cost By GL Code - search by GL Code', function () {
    element(by.xpath('//a[contains(text(),"All Facilities")]')).click();
    browser.wait(EC.elementToBeClickable(element(by.model('search.searchKeyword'))), 5000);
    element(by.model('search.searchKeyword')).sendKeys(browser.params.user.fac_name);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.buttonText('Select')).click();
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    element(by.model('search.glcId')).click();
    element(by.cssContainingText('span.ui-select-choices-row-inner > span', GL_Code)).click();
    element(by.buttonText('Search')).click();
    element.all(by.repeater('cost in costs')).each(function (element1, index) {
      element1.element(by.binding('cost.glc_code')).getText().then(function (text) {
        expect(text).toEqual("+ " + GL_Code);
      });
    });
  });

  it('Cost By GL Code - search by Status', function () {
    element(by.model('search.glcId')).click();
    element(by.cssContainingText('span.ui-select-choices-row-inner > span', 'All')).click();
    statusInGLCode.forEach(function (status, index) {
      element.all(by.css('#sel1 > option')).each(function (element1, index) {
        element1.getText().then(function (text) {
          if (text == status) {
            element1.click();
          }
        });
      });
      element(by.buttonText('Search')).click();
      element.all(by.repeater('cost in costs')).each(function (element1, index) {
        element1.element(by.buttonText('+')).click();
        element.all(by.repeater('order in cost.PODetails.data')).each(function (element1, index) {
          element1.element(by.exactBinding('order | statusDescUpdated')).getText().then(function (text) {
            expect(text).toEqual(status);
          });
        });
      });
    });
  });

  it('Cost By GL Code - Item wise view', function () {
    browser.actions().mouseMove(element(by.buttonText('View More Reports'))).perform();
    element.all(by.model('reportView')).last().click();
    expect(element(by.linkText('Item Description')).isDisplayed()).toBeTruthy();
  });
});