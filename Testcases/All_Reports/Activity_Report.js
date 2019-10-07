describe('Hybrent Reports Module', function () {
  var EC = protractor.ExpectedConditions;

  it('Activity Report page should open', function () {
    browser.actions().mouseMove(element(by.css('a > span.reports'))).perform();
    element(by.css('a > span.reports')).click();
    expect(browser.getTitle()).toEqual('Activity Reports');
  });

  it('Activity Report - should display filters', function () {
    expect(element(by.model('$ctrl.searchFilters.date_range')).isPresent()).toBeTruthy();
    expect(element(by.model('$ctrl.searchFilters.department_id')).isPresent()).toBeTruthy();
    expect(element(by.buttonText('Search')).isPresent()).toBeTruthy();
  });

  it('Activity Report - should display Download button', function () {
    expect(element(by.xpath('//*[@id="btnAdd"]/i')).isPresent()).toBeTruthy();
  });

});