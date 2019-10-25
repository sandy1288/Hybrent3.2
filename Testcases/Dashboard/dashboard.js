var dashbrd = require('./dash.js');
describe('Dashboard test cases', function () {

  var EC = protractor.ExpectedConditions;
  var DashBoard_Report_PartialReviews_txt = element.all(by.css('[ng-click="goToOrders()"]'));
  var userfacility = browser.params.userfacility.facility_xpath;

  it('Verify that System gets redirected to Profile page when user clicks on Profile link', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    browser.sleep(2000);
    element(by.className('dropdown-toggle text-info header-menu-tab cursor-pointer')).click();
    element(by.xpath('//a[contains(text(),"Profile")]')).click();
    element(by.xpath(userfacility)).getText().then(function (facility_name) {
      console.log('user default facility is', facility_name);
    })
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('User Profile');
  }, 20000);

  it('Verify that system gets redirected to NOTIFICATION SETTINGS page when user clicks on Notification settings button', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    element(by.className('dropdown-toggle text-info header-menu-tab cursor-pointer')).click();
    element(by.linkText('Notification Settings')).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Notifications Settings');
  });

  it('Verify that System gets redirected to Alerts page when user clicks on Alerts link', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    element(by.className('dropdown-toggle text-info header-menu-tab cursor-pointer')).click();
    element(by.linkText('Alerts')).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('User Alert');

  });

  it('Verify that System gets redirected to "Survey" page when user clicks on "Survey" link.', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    element(by.className('dropdown-toggle text-info header-menu-tab cursor-pointer')).click();
    element(by.xpath('//a[@ng-click="openSurvey()"]')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);

    var Surveybutton = element(by.xpath('//button[@class="survey-btn btn btn-primary"]'));
    Surveybutton.isPresent().then(function (present) {
      if (present) {
        console.log('Survey exist on page');
        element(by.xpath('//i[@class="fa fa-2x fa-times"]')).click();
      } else {
        console.log('survey does not exist on page');
        element(by.xpath('//i[@class="fa fa-2x fa-times"]')).click();
      }

    });

  });

  it('Verify that System gets redirected to "Change Password" page when user clicks on " Change Password" link', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    element(by.className('dropdown-toggle text-info header-menu-tab cursor-pointer')).click();
    element(by.css('[ng-click="changePassword()"]')).click();
    expect(element(by.xpath(dashbrd.dash.chngpwd_xpath)).getText()).toEqual('Change Password');
    // browser.wait(EC.elementToBeClickable(by.buttonText('Cancel')),5000);
    browser.sleep(2000);
    element(by.buttonText('Cancel')).click();
  });

  it('Verify that Notification icon  appears on top of page.', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    element(by.css('#notification-count')).isDisplayed().then(function (present) {
      if (present) {
        console.log('Notification bell appear on screen');
      } else {
        console.log('Notification bell does not appear on screen');
      }
    })

  });

  it('Verify that Notification icon  appears on top of page.', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    element(by.xpath('//sup[@ng-if="unread"]')).isPresent().then(function (present) {
      if (present) {
        element(by.xpath('//sup[@ng-if="unread"]')).getText().then(function (count) {
          console.log('Notification count appears on bell are :', count);
        });
      } else {
        console.log('No Notification count appear on bell');
      }
    })

  });

  it('Verify that user gets redirected to “My Notifications” page, on clicking “View All” button', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    var bellicon = element(by.xpath('//*[@id="notification-count"]'));
    bellicon.click();
    //browser.wait(EC.elementToBeClickable(element(by.linkText('viewall'))),20000);
    element(by.linkText('View All')).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Notifications');
  });

  it('Verify that user gets redirected to corresponding Report on clicking View More Reports button', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    element(by.linkText('Dashboard')).click();
    expect(browser.getTitle()).toEqual('Dashboard');
    var viewmorereport = element(by.buttonText('View More Reports'), 20000);
    viewmorereport.click();
    var allreports = element(by.xpath('//li[@tooltip-trigger="focus"]/a[@role="menuitem"]'), 20000);
    element.all(by.xpath('//li[@tooltip-trigger="focus"]/a[@role="menuitem"]')).getText().then(function (reports) {
      for (var i = 0; i < reports.length; i++) {

        console.log('selected report title is', reports[i]);

      }
    })

  });
  it('Verify that relevant data appears under Monthly Purchase Order Value, Number of Backorders and Vendor Performance sections', function () {
    element(by.linkText('Dashboard')).click();

    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);

    element(by.xpath("//*[@id='toptable']/tbody/tr/td[1]/div/table/tbody/tr[1]/td/div")).isPresent().then(function (present) {
      if (present) {
        element(by.xpath("//*[@id='toptable']/tbody/tr/td[1]/div/table/tbody/tr[1]/td/div")).getText().then(function (month) {
          console.log("Monthly Purchase Order Value month is", month);
        })
        element(by.xpath("//*[@id='toptable']/tbody/tr/td[1]/div/table/tbody/tr[2]/td/p")).getText().then(function (count) {
          console.log('Monthly Purchase Order Value', count);
        })
      } else
        console.log('Monthly Purchase Order Value not found on the page');
    })
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    element(by.xpath("//*[@class='current-day-date']//span[contains(text(),'Number of Partial Receives')]")).isPresent().then(function (present) {
      if (present) {
        element(by.xpath("//*[@id='toptable']/tbody/tr/td[2]/table/tbody/tr[2]/td/p")).getText().then(function (count1) {
          console.log('Number of Partial Receives on dashboard are', count1);
          element(by.xpath("//span[contains(text(),'Number of Partial Receives')]")).click();
          browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
          element(by.xpath("//div[@id='reqListing_info']")).getText().then(function (partialorders) {
            console.log('partial order on order page are', partialorders);
            browser.sleep(2000);
            expect(count1).toContain(partialorders);
          })

        })
      }

    })


  });


  it('Verify that “Recent Orders” and “News & Events” sections appear on Page.', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    element(by.linkText('Dashboard')).click();
    element(by.xpath("//span[contains(text(),'Recent Orders')]")).isPresent().then(function (present) {
      if (present) {
        console.log('Recent order section appear on page');
        var items = element.all(by.repeater('ordersData in dashboardData.recentPOs.rows'));
        if (items.count() > 0) {
          expect(items.count()).toBe(5);
        }
        var rows = element.all(by.repeater("ordersData in dashboardData.recentPOs.rows"));
        rows.first().element(by.tagName("a")).click();
        browser.sleep(2000);
        expect(browser.getTitle()).toEqual('Purchase Order');


      } else {
        console.log('Recent order section does not appear on page')
      }
    })
    element(by.linkText('Dashboard')).click();
    element(by.xpath(dashbrd.dash.News_event_section_xpath)).isPresent().then(function (present) {
      if (present) {
        console.log('News & Event section appear on page');
        var items = element.all(by.repeater('recentNewsDetails in dashboardData.recentNews'));
        if (items.count() > 0) {
          expect(items.count()).toBe(3);
        }
        var rows = element.all(by.repeater("recentNewsDetails in dashboardData.recentNews"));
        rows.first().element(by.tagName("a")).click();
        expect(browser.getTitle()).toEqual('News');
        element(by.linkText('Dashboard')).click();
        browser.sleep(2000);

      } else {
        console.log('News & Event does not appear on page');
      }
    })

  });


});