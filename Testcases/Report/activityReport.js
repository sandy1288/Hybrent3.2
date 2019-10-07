describe('Hybrent Reports Module', function () {
  var EC = protractor.ExpectedConditions;
  var fromDate = browser.params.reports.fromDate;
  var toDate = browser.params.reports.toDate;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;

  it('Activity Report page should open', function () {
    browser.actions().mouseMove(element(by.css('a > span.reports'))).perform();
    element(by.css('a > span.reports')).click();
    expect(browser.getTitle()).toEqual('Activity Reports');
  });

  it('Activity Report - should display filters', function () {
    expect(element(by.id('from')).isPresent()).toBeTruthy();
    expect(element(by.id('to')).isPresent()).toBeTruthy();
    expect(element(by.model('search.facility')).isPresent()).toBeTruthy();
    expect(element(by.model('search.department')).isPresent()).toBeTruthy();
    expect(element(by.buttonText('Search')).isPresent()).toBeTruthy();
  });

  it('Activity Report - should display Download button', function () {
    element(by.id('from')).clear().sendKeys(fromDate);
    element(by.id('to')).clear().sendKeys(toDate);
    element(by.buttonText('Search')).click();
    expect(element(by.buttonText('Download')).isPresent()).toBeTruthy();
  });

  it('Activity Report - search by facility', function () {
    // element(by.model('search.facility')).$('[label="' + facility + '"]').click();
    element.all(by.repeater('facility in facilities')).each(function (element1, index) {
      element1.getText().then(function (text) {
        if (text == facility) {
          element1.click();
        }
      });
    });
    element(by.buttonText('Search')).click();
    element.all(by.repeater('activity in activities')).each(function (element1, index) {
      browser.wait(EC.elementToBeClickable(element1.$('ponum > a')), 5000);
      element1.$('ponum > a').click();
      element(by.binding('orderData.order.facility.name')).getText().then(function (text) {
        expect(text).toEqual("Facility: " + facility);
      });
      element(by.buttonText('Close')).click();
      browser.wait(EC.invisibilityOf($('.modal-dialog')), 5000);
    });
  });

  it('Activity Report - verify Print PO icon is displaying', function () {
    element.all(by.repeater('activity in activities')).each(function (element1, index) {
      browser.wait(EC.elementToBeClickable(element1.$('ponum > a')), 5000);
      element1.element(by.exactBinding('activity | statusDescUpdated')).getText().then(function (text) {
        if (text != "Rejected" && text != "Unapproved") {
          expect(element1.element(by.css('hyb-pdf-viewer')).isDisplayed()).toBe(true);
        }
      });
    });
  });
});