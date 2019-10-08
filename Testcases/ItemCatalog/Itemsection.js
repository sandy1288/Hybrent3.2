describe('Hybrent Item Catalog Module', function () {

  var EC = protractor.ExpectedConditions;
  var General_item_Name = browser.params.itemCatalog.General_item_Name;
  var Service_item_name = browser.params.itemCatalog.Service_item_name;
  var Billonly_item_name = browser.params.itemCatalog.Billonly_item_name;
  var Freehand_item_name = browser.params.itemCatalog.Freehand_item_name;
  var General_alias = browser.params.itemCatalog.General_alias;
  var Service_alias = browser.params.itemCatalog.Service_alias;
  var Billonly_alias = browser.params.itemCatalog.Billonly_alias;
  var Service_sku = browser.params.itemCatalog.Service_sku;
  var General_sku = browser.params.itemCatalog.General_sku;
  var Billonly_sku = browser.params.itemCatalog.Billonly_sku;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var Service_mfrNumber = browser.params.itemCatalog.Service_mfrNumber;
  var Billonly_mfr = browser.params.itemCatalog.Billonly_mfr;
  var vendor = browser.params.itemCatalog.vendor;
  var Generalcategory = browser.params.itemCatalog.Generalcategory;
  var facility = browser.params.itemCatalog.facility;
  var itemForVendorUpdate = browser.params.itemCatalog.General_sku;
  var stockStatus = browser.params.itemCatalog.General_sku;
  var consumptionType = browser.params.itemCatalog.consumptionType;
  var randNumber = browser.params.itemCatalog.randNumber;
  var userdropdown = element(by.className('dropdown-toggle text-info header-menu-tab'));
  var user_profile = element(by.xpath('//a[@ng-href="#/user/update-profile"]'));
  var userfacility = browser.params.userfacility.facility_xpath;
  var fac_name = browser.params.user.fac_name;
  var Dme_sku = browser.params.itemCatalog.Dme_sku;
  var Dme_item_name = browser.params.itemCatalog.Dme_item_name;
  var Dme_Alias = browser.params.itemCatalog.Dme_Alias;
  var Dme_mfr = browser.params.itemCatalog.Dme_mfr;
  var ARC = browser.params.AR_Code.Code;
  var randomnumber = browser.params.Vendor_price_tier.randompricetier;


  it('Item Catalog page should open', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    element(by.linkText('Items Catalog')).click();
    expect(browser.getTitle()).toEqual('Items Catalog : List');
  });

  it('List page should display list of items and IC filters', function () {
    expect(element.all(by.repeater('item in items')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.vendor_id')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.is_active')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.type')).isPresent()).toBeTruthy();
    expect(element(by.model('searchParams.category_id')).isPresent()).toBeTruthy();
  });

  it('Add Dme Item', function () {
    element(by.xpath('//span[@class="fa fa-caret-down"]')).click();
    element(by.xpath('//a[contains(text(),"Add Item")]')).click();
    element(by.model('item.description')).sendKeys(Dme_item_name + randNumber);
    element(by.model('item.mfr_number')).sendKeys(Dme_mfr + randNumber);
    element(by.css('button > i.fa-ellipsis-h')).click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Select'))), 10000);
    element(by.buttonText('Select')).click();
    element(by.model('item.ordering_type')).element(by.xpath('//*[@id="ordering_type"]/option[6]')).click();
    element(by.model('item.consumption_type')).$('[label="' + consumptionType + '"]').click();
    element(by.linkText('Vendors')).click();
    element(by.css('.btn-success')).click();
    element(by.model('v.vselected')).click();
    element(by.cssContainingText('span.ui-select-choices-row-inner > span', vendor)).click();
    element(by.model('v.sku')).sendKeys(Dme_sku + randNumber);
    element(by.buttonText('Save')).click();
    browser.sleep(1000);
    expect($('.toast-message').getText()).toEqual('Item added successfully.');
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Yes'))), 5000);
    browser.sleep(1000);
    element(by.css('.sa-button-container')).element(by.buttonText('No')).click();
    element(by.model('searchParams.search')).clear().sendKeys(Dme_mfr + randNumber);
    element(by.buttonText('Search')).click();
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.mfr_number')).getText().then(function (text) {

        expect(text).toEqual(Dme_mfr + randNumber);

      });

    });

    browser.wait(EC.elementToBeClickable(element(by.buttonText('Map Facility/Update Price'))), 5000);
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    element(by.linkText('Items Catalog')).click();
    expect(browser.getTitle()).toEqual('Items Catalog : List');
    browser.sleep(1000);
    element(by.model('searchParams.search')).clear().sendKeys(Dme_mfr + randNumber);
    element(by.buttonText('Search')).click();
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.mfr_number')).getText().then(function (text) {

        expect(text).toEqual(Dme_mfr + randNumber);

      })
      browser.wait(EC.elementToBeClickable(element(by.buttonText('Map Facility/Update Price'))), 5000);
      element(by.buttonText('Map Facility/Update Price')).click();
      expect(element(by.css('.headtext > div.row > div.col-sm-17', 'Map Facility for')).isPresent()).toBeTruthy();
      element(by.model('searchForm.search')).clear().sendKeys(browser.params.user.fac_name);
      element(by.buttonText('Search')).click();
      browser.sleep(2000);
      element(by.binding('itemVendorFacility.name')).getText().then(function (text) {
        expect(text).toEqual(browser.params.user.fac_name);
      })
      expect(element(by.buttonText('Add to facility')).isPresent()).toBeTruthy();
      element(by.buttonText('Add to facility')).click();
      element(by.name('purchase_price')).sendKeys('01.21');
      element(by.buttonText('Save')).click();
      expect($('.toast-message').getText()).toEqual('Item added successfully.');
      expect(element(by.buttonText('Edit')).isPresent()).toBeTruthy();
      element(by.model('itemVendorFacility.purchase_price')).getAttribute('value').then(function (text) {
        expect(text).toEqual('01.21');
      });
      element(by.xpath('//i[@class="fa fa-2x fa-times"]')).click();
    });
  });



  it('Add General Item', function () {
    element(by.xpath('//span[@class="fa fa-caret-down"]')).click();
    element(by.xpath('//a[contains(text(),"Add Item")]')).click();
    element(by.model('item.description')).sendKeys(General_item_Name + randNumber);
    element(by.model('item.mfr_number')).sendKeys(General_mfrNumber + randNumber);
    browser.sleep(1000);
    element(by.css('button > i.fa-ellipsis-h')).click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Select'))), 5000);
    element(by.buttonText('Select')).click();
    browser.sleep(2000);
    var lot = element.all(by.className('bootstrap-switch-handle-off bootstrap-switch-default')).get(0);
    lot.click();
    browser.sleep(1000);
    var serial = element.all(by.className('bootstrap-switch-handle-off bootstrap-switch-default')).get(1);
    serial.click();
    browser.sleep(1000);
    var expiration_date = element.all(by.className('bootstrap-switch-handle-off bootstrap-switch-default')).get(2);
    expiration_date.click();
    browser.sleep(1000);
    element(by.model('item.consumption_type')).$('[label="' + consumptionType + '"]').click();
    element(by.linkText('Vendors')).click();
    element(by.css('.btn-success')).click();
    element(by.model('v.vselected')).click();
    element(by.cssContainingText('span.ui-select-choices-row-inner > span', vendor)).click();
    element(by.model('v.sku')).sendKeys(General_sku + randNumber);
    element(by.buttonText('Save')).click();
    browser.sleep(1000);
    expect($('.toast-message').getText()).toEqual('Item added successfully.');
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Yes'))), 5000);
    browser.sleep(1000);
    element(by.css('.sa-button-container')).element(by.buttonText('No')).click();


  });

  it('Verify that "Map Facility for item Sku --- pop up appears on the screen.', function () {
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    element(by.linkText('Items Catalog')).click();
    expect(browser.getTitle()).toEqual('Items Catalog : List');
    browser.sleep(1000);
    element(by.model('searchParams.search')).clear().sendKeys(General_mfrNumber + randNumber);
    element(by.buttonText('Search')).click();
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.mfr_number')).getText().then(function (text) {

        expect(text).toEqual(General_mfrNumber + randNumber);

      })
      browser.wait(EC.elementToBeClickable(element(by.buttonText('Map Facility/Update Price'))), 5000);
      element(by.buttonText('Map Facility/Update Price')).click();
      expect(element(by.css('.headtext > div.row > div.col-sm-17', 'Map Facility for')).isPresent()).toBeTruthy();
      element(by.model('searchForm.search')).clear().sendKeys(browser.params.user.fac_name);
      element(by.buttonText('Search')).click();
      browser.sleep(2000);
      element(by.binding('itemVendorFacility.name')).getText().then(function (text) {
        expect(text).toEqual(browser.params.user.fac_name);
      })
      expect(element(by.buttonText('Add to facility')).isPresent()).toBeTruthy();
      element(by.buttonText('Add to facility')).click();
      element(by.name('purchase_price')).sendKeys('12.52');
      element(by.buttonText('Save')).click();
      expect($('.toast-message').getText()).toEqual('Item added successfully.');
      expect(element(by.buttonText('Edit')).isPresent()).toBeTruthy();
      element(by.model('itemVendorFacility.purchase_price')).getAttribute('value').then(function (text) {
        expect(text).toEqual('12.52');
      });
      element(by.xpath('//i[@class="fa fa-2x fa-times"]')).click();
    });
  });


  it('Add Bill only Item', function () {
    element(by.xpath('//span[@class="fa fa-caret-down"]')).click();
    element(by.xpath('//a[contains(text(),"Add Item")]')).click();
    element(by.model('item.description')).sendKeys(Billonly_item_name + randNumber);
    element(by.model('item.mfr_number')).sendKeys(Billonly_mfr + randNumber);
    element(by.css('button > i.fa-ellipsis-h')).click();
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Select'))), 5000);
    element(by.buttonText('Select')).click();
    element(by.model('item.ordering_type')).element(by.xpath('//*[@id="ordering_type"]/option[5]')).click();
    element(by.model('item.consumption_type')).$('[label="' + consumptionType + '"]').click();
    element(by.linkText('Vendors')).click();
    element(by.css('.btn-success')).click();
    element(by.model('v.vselected')).click();
    element(by.cssContainingText('span.ui-select-choices-row-inner > span', vendor)).click();
    element(by.model('v.sku')).sendKeys(Billonly_sku + randNumber);
    element(by.buttonText('Save')).click();
    browser.sleep(1000);
    expect($('.toast-message').getText()).toEqual('Item added successfully.');
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Yes'))), 5000);
    browser.sleep(1000);
    element(by.css('.sa-button-container')).element(by.buttonText('No')).click();
    element(by.model('searchParams.search')).clear().sendKeys(Billonly_mfr + randNumber);
    element(by.buttonText('Search')).click();
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.mfr_number')).getText().then(function (text) {

        expect(text).toEqual(Billonly_mfr + randNumber);

      });

    });

    browser.wait(EC.elementToBeClickable(element(by.buttonText('Map Facility/Update Price'))), 5000);
    element(by.cssContainingText('a.hybrent-blue', 'Admin')).click();
    element(by.linkText('Items Catalog')).click();
    expect(browser.getTitle()).toEqual('Items Catalog : List');
    browser.sleep(1000);
    element(by.model('searchParams.search')).clear().sendKeys(Billonly_mfr + randNumber);
    element(by.buttonText('Search')).click();
    element.all(by.repeater('item in items')).each(function (element1, index) {
      element1.element(by.binding('item.mfr_number')).getText().then(function (text) {

        expect(text).toEqual(Billonly_mfr + randNumber);

      })
      browser.wait(EC.elementToBeClickable(element(by.buttonText('Map Facility/Update Price'))), 5000);
      element(by.buttonText('Map Facility/Update Price')).click();
      expect(element(by.css('.headtext > div.row > div.col-sm-17', 'Map Facility for')).isPresent()).toBeTruthy();
      element(by.model('searchForm.search')).clear().sendKeys(browser.params.user.fac_name);
      element(by.buttonText('Search')).click();
      browser.sleep(2000);
      element(by.binding('itemVendorFacility.name')).getText().then(function (text) {
        expect(text).toEqual(browser.params.user.fac_name);
      })
      expect(element(by.buttonText('Add to facility')).isPresent()).toBeTruthy();
      element(by.buttonText('Add to facility')).click();
      element(by.name('purchase_price')).sendKeys('12.52');
      element(by.buttonText('Save')).click();
      expect($('.toast-message').getText()).toEqual('Item added successfully.');
      expect(element(by.buttonText('Edit')).isPresent()).toBeTruthy();
      element(by.model('itemVendorFacility.purchase_price')).getAttribute('value').then(function (text) {
        expect(text).toEqual('12.52');
      });
      element(by.xpath('//i[@class="fa fa-2x fa-times"]')).click();
    });
  });

  it('Add Amenity item', function () {
    element(by.xpath('//span[@class="fa fa-caret-down"]')).click();
    element(by.xpath('//a[contains(text(),"Add Amenity")]')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 5000);
    element(by.model('amenity.description')).sendKeys('testAM' + randNumber);
    element(by.model('amenity.alias')).sendKeys('amenityalias' + randNumber);
    element(by.model('amenity.service_duration')).$('[label="' + 'For One Time' + '"]').click();
    element(by.model('amenity.ar_code_id')).sendKeys(ARC + randomnumber);
    browser.sleep(1000);
    element(by.buttonText('Save')).click();
    expect($('.toast-message').getText()).toEqual('Amenity saved successfully.');
  });







  /* it('Edit Item', function () {
       element(by.buttonText('Edit Item')).click();
       var randNumber = Math.floor((Math.random() * 10) + 2);
       element(by.model('item.description')).sendKeys(randNumber);
       var itemName = element(by.model('item.description')).getAttribute('value');
       element(by.buttonText('Save')).click();
       element(by.model('searchParams.search')).clear().sendKeys(itemName);
       element(by.buttonText('Search')).click();
       element.all(by.repeater('item in items')).each(function (element1, index) {
           element1.element(by.binding('item.description')).getText().then(function (text) {
               expect(text).toEqual(itemName);
           });
       });
   }); */
});