describe('Hybrent Login Module', function () {
  //var loginLink = element(by.linkText('Login with Hybrent'));
  var errorElem = element(by.css('.showSweetAlert>p'));
  var EC = protractor.ExpectedConditions;
  beforeEach(function () {
    browser.get(browser.params.url + '/login');
  });

  it('Login: Try login without any credentials.', function () {
    // Waits for loading popup to be no longer visible on the dom.
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 10000);
    //loginLink.click();
    element(by.buttonText('Login')).click();
    browser.sleep(1000);
    expect(errorElem.getText()).toEqual('Invalid user name or password.');
  });

  it('Login: Try login with wrong credentials.', function () {
    // Waits for loading popup to be no longer visible on the dom.
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    //loginLink.click();
    element(by.model('model.userName')).sendKeys('test');
    element(by.model('model.password')).sendKeys('test');
    element(by.buttonText('Login')).click();
    expect(errorElem.getText()).toEqual('Invalid user name or password.');
  });


  it('Login: Try login with correct credentials.', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    // loginLink.click();
    element(by.model('model.userName')).sendKeys(browser.params.user.username);
    element(by.model('model.password')).sendKeys(browser.params.user.password);
    element(by.buttonText('Login')).click();
    expect(browser.getTitle()).toEqual('Dashboard');
  });



});