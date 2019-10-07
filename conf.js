var object = require('./objects');
//var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'jasmine2',
  // multiCapabilities: [
  //   { browserName: 'firefox' },
  //   { browserName: 'chrome' }
  // ],
  capabilities: {
    'directConnect': true,
    'browserName': 'chrome'
  },
  onPrepare: function () {
    browser.manage().window().maximize();
    jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
      savePath: './Reports/reports/',
      screenshotsFolder: 'images'
    }));
  },
  specs: [
    'Testcases/login/*.js',
    'Testcases/Userfacility/*.js',
    'Testcases/Admin_section/*.js',
    'Testcases/ItemCatalog/*.js',
    'Testcases/Dashboard/*.js',
    'Testcases/Shop/*.js',
    'Testcases/Cart/*js',
    'Testcases/Order/*js',
    'Testcases/Receive/*js',
    'Testcases/Template/*js',
    'Testcases/ScanIN/*.js',
    'Testcases/ScanOut/*.js',
    'Testcases/Bill_and_Replace/*.js',
    'Testcases/Replenish_Bin/*js',
    'Testcases/ApproveItem/*.js',
    'Testcases/Manage Inventory/*.js',
    'Testcases/Inventory_Transfer/*js',
    'Testcases/Physician/*.js',
    'Testcases/OperatingRoom/*.js',
    'Testcases/Patient/*.js',
    'Testcases/Procedure/*js',
    'Testcases/Preference_Card/*js',
    'Testcases/Planner/*js',
    'Testcases/Pick-List/*js',
    'Testcases/Executecase/*js',
    'Testcases/All_cases/*js',
    'Testcases/DME/*js',
    'Testcases/Out_Of_Stock/*js',
    // 'Testcases/All_Reports/*js'


  ],
  // increased time out for debugging
  allScriptsTimeout: 999999,
  jasmineNodeOpts: {
    defaultTimeoutInterval: 999999,
    showColors: true
  },
  params: object
};