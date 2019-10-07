describe('News moudle', function () {
  var EC = protractor.ExpectedConditions;
  var fac_name = browser.params.user.fac_name;
  var randNumber = browser.params.itemCatalog.randNumber;
  var news_title = "Test";


  it('Open News module', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    element(by.linkText('News')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    expect(browser.getTitle()).toEqual('Manage News');
  });

  it('verify that search filter appear on the News detail page', function () {
    expect(element(by.model('searchFilter')).isPresent()).toBeTruthy();
    expect(element(by.model('search.is_active')).isPresent()).toBeTruthy();
    expect(element(by.buttonText('Search')).isPresent()).toBeTruthy();
  });

  it('Add new News', function () {
    element(by.buttonText('Add')).click();
    element(by.model('newsData.title')).sendKeys(news_title + randNumber);
    browser.sleep(1000);
    element(by.buttonText('Save')).click();
    browser.sleep(1000);
    expect($('.toast-message').getText()).toEqual('Missing news description');
    element(by.model('html')).sendKeys('test news description');
    browser.sleep(2000);
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toEqual('News created successfully.');

  });

  it('verify that user is able to search news by title', function () {
    element(by.model('searchFilter')).clear().sendKeys(news_title + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(1000);
    expect(element(by.repeater('NewsData in NewsDatas')).getText()).toContain(news_title + randNumber);
  });

  it('verify that user is able to edit the newly created news', function () {
    element(by.model('searchFilter')).clear().sendKeys(news_title + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(1000);
    element(by.buttonText('Edit')).click();
    browser.sleep(2000);
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toEqual('News updated successfully.');
  });

  it('verify that user can delete newly created news', function () {
    element(by.model('searchFilter')).clear().sendKeys(news_title + randNumber);
    element(by.buttonText('Search')).click();
    browser.sleep(1000);
    element(by.buttonText('Delete')).click();
    browser.sleep(2000);
    element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    expect($('.toast-message').getText()).toEqual('News deleted successfully.');

  });


});