describe('Hybrent Shop Module', function () {
  var EC = protractor.ExpectedConditions;
  var mfr = browser.params.itemCatalog.random_mfr;
  var VENDOR = browser.params.itemCatalog.VENDOR;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var randNumber = browser.params.itemCatalog.randNumber;
  var userfacility = browser.params.userfacility.facility_xpath;
  var shop_facility = browser.params.shop.fac_xpath;
  var userdropdown = element(by.className('dropdown-toggle text-info header-menu-tab'));
  var user_profile = element(by.xpath('//a[@ng-href="#/user/update-profile"]'));
  var Billonly_mfr = browser.params.itemCatalog.Billonly_mfr;
  var General_sku = browser.params.itemCatalog.General_sku;
  var fac_name = browser.params.user.fac_name;


  it('Verify that user default facility appear selected in shop page', function () {
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    //navigate to shop page to check selected facility
    element(by.linkText('Shop')).click();
    expect(browser.getTitle()).toEqual('Shop');
    element(by.xpath(shop_facility)).getText().then(function (shopfacility) {
      console.log('facility selected on shop page appear is', shopfacility);
      expect(shopfacility).toBe(browser.params.user.fac_name);
    })
  })

  it('Verify that only General ACTIVE items are appearing on page and add them to cart', function () {
    expect(browser.getTitle()).toEqual('Shop');
    //$('[name="optionsRadios"][value="0"]').click();
    var items = element.all(by.repeater('item in items'));
    if (items.count() > 0) {
      expect(items.count()).toBeGreaterThan(0);
    }
    browser.sleep(1000);
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    element(by.model('searchParams.search')).clear();
    element(by.model('searchParams.search')).sendKeys(General_sku + randNumber);
    items = element.all(by.repeater('item in items'));
    if (items.count() > 0) {
      expect(items.count()).toBeGreaterThan(0);
    }
    element(by.buttonText('Add')).click();
    browser.sleep(1000);
    // element(by.partialButtonText('Checkout')).click();
    // expect(browser.getTitle()).toEqual('My Cart');

  });
  /*
    it('verify that bill_only and inactive item should not appear on page', function () {
      element(by.linkText('Shop')).click();
      expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
      element(by.model('searchParams.search')).clear();
      element(by.model('searchParams.search')).sendKeys(Billonly_mfr + randNumber);
      element(by.className('col-sm-18')).getText().then(function (text) {

        expect(text).toEqual('No Item Found');

      });

    }); */

  it('Shop: Shows recently ordered items appear on page on selecting Recently ordered radio button', function () {
    element(by.linkText('Shop')).click();
    expect(browser.getTitle()).toEqual('Shop');
    $('[name="optionsRadios"][value="1"]').click();
    var items = element.all(by.repeater('item in items'));
    if (items.count() > 0) {
      expect(items.count()).toBeGreaterThan(0);
    }
    expect(element(by.linkText('Last Ordered')).isPresent()).toBe(true);
  });

  it('Shop: Shows Most ordered items with Po count column sort descending if default layout is selected.', function () {
    $('[name="optionsRadios"][value="2"]').click();
    var items = element.all(by.repeater('item in items'));
    if (items.count() > 0) {
      expect(items.count()).toBeGreaterThan(0);
    }
    expect(element(by.linkText('PO Count')).isPresent()).toBe(true);
  });

  it('Shop: Shows all items that are marked as Favorite.', function () {
    $('[name="optionsRadios"][value="5"]').click();
    expect(element(by.css('.fa .fa-star-o')).isPresent()).toBe(false);
  });

  /*it('shop: backorder warning', function () {
    $('[name="optionsRadios"][value="0"]').click();
    var item_name = element.all(by.repeater('item in items track by item.facility_item_vendor_id'));
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    var backorder = element(by.className('text-with-tooltip text-danger'));
    var next_button = element(by.linkText('Next'));
    var next_disable = element(by.className('pagination-next disabled'));
    var paginationsize = element.all(by.repeater('page in pages track by $index'));
    var item_description = element.all(by.repeater('item in items track by item.facility_item_vendor_id'));
    var threedit_button = element(by.linkText('...'));
    var nextthreedot_button = element(by.xpath('//div[@class="col-sm-10"]//li[9]//a[1]'));
    paginationsize.getText().then(function (size) {
      for (i = 0; i < size.length; i++) {
        console.log('pagination count are', size[i]);
        if (next_button.isPresent()) {
          next_button.click();
          item_description.element(by.className('text-with-tooltip text-danger')).isPresent().getText().then(function (test) {
            console.log('item are', test);
          })
        }

      }

    })

  });*/
});