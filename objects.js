exports.url = 'https://qa9.test.hybrent.com/b/#';

exports.user = {
  username: "sandy",
  password: "goouser",
  fac_name: " "
};


exports.shop = {
  sku: "252523-01",
  reorderWarningSKU: "21-2967-24",
  backOrderWarningSKU: "257074",
  discontinueWarningSKU: "21172",
  vendor: "PATTERSON DENTAL",
  contractPriceWarningSKU: "OFC333",
  GPOWarningSKU: "501635",
  fac_xpath: "//a[@ng-click='selectItem();']"
};

exports.userfacility = {
  defaultfacility: " ",
  facility_xpath: "//*[@id='ng-view']/div/form/div[2]/div/div/div/div[2]/div/div[1]/div/span",
  department_xpath: "//*[@id='ng-view']/div/form/div[2]/div/div/div/div[2]/div/div[2]/div/span",
  Inventory: "//*[@id='ng-view']/div/form/div[2]/div/div/div/div[2]/div/div[3]/div/span"
}

exports.itemCatalog = {
  General_item_Name: "General item test for test purpose ",
  Service_item_name: "Service item for test purpose",
  Billonly_item_name: "Bill only item for test purpose",
  Freehand_item_name: "Free hand item for test purpose",
  Dme_item_name: "Dme",
  Dme_Alias: "Dme_alias",
  Dme_sku: "DS",
  Dme_mfr: "DM",
  General_alias: "General alias",
  Service_alias: "Service alias",
  Billonly_alias: "Billonly alias",
  Service_sku: "SS",
  General_sku: "GS",
  Billonly_sku: "BS",
  General_mfrNumber: "General_mfr",
  Service_mfrNumber: "service mfr",
  Billonly_mfr: "Billonly mfr",
  vendor: "PATTERSON DENTAL",
  Generalcategory: "TESTING AUTOMATION",
  facility: "Life Care Surgery Clinic",
  itemForVendorUpdate: "ADAPTER,SOLID PADS",
  stockStatus: "In Stock (Local)",
  consumptionType: "Piece",
  PO_Number: "Test",
  randNumber: Math.floor(Date.now())

}

exports.Templates = {
  templateName: "template",
  scanout_tempate_name: "scanouttemp"
}
exports.Physician = {
  firstname: "robert",
  lastname: "mark",
  NPI: "NPI"
}

exports.OperatingRoom = {
  OR_Name: "OR"

}
exports.Patients = {
  Patientfac_xpath: "//a[@ng-click='selectItem();']",
  Patient_fname: "john",
  Status: 'Active'
}

exports.Procedure = {
  Procedure_name: "test"
}

exports.Prefcard = {
  Prefcard_name: "test"
}

exports.Reports = {
  from_date: "09/01/2019",
  To_date: "09/30/2019"
}

exports.GlCode = {
  code: "test",
  Name: "GL"
}

exports.department = {
  mnemonic: "Dep",
  Name: "Dpnm"
}

exports.Utilities = {
  import_facility: "Import Facility.",
  import_department: "Import Department.",
  import_inventories: "Import Inventories.",
  import_users: "Import Users.",
  syncmap_item: "Sync/Map items from one facility to other facilities.",
  templateutilities: "Template utilities.",
  copy_template: "Copy Template.",
  Change_temp_owner: "Change Template Owner.",
  Assign_remove_vendor_access: "Assign and remove vendor access.",
  Download_user_facilities_access: "Download users facilities access.",
  Download_user_approval_access: "Download user approval access.",
  Assign_user_facility_access: "Assign users facility access.",
  Remove_user_facility_access: "Remove users facility access."

}

exports.Identity_Provider = {
  PO: 'PO',
  Inventory_Management: 'Inventory Management',
  Inventory_Transfer: 'Inventory Transfer'
}

exports.Vendor_price_tier = {
  Pricetier_name: 'PT1',
  Price_Percentage: '25',
  newpricetier_name: 'PT2',
  newPrice_percentage: '3',
  randompricetier: Math.floor((Math.random() * 10000) + 1)
}

exports.AR_Code = {
  Description: 'TestAR',
  Code: 'ARC'
}

exports.Payer_Code = {
  Description: 'TestPR'
}