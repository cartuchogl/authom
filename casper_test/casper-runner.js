var casper   = null;
var count    = 0;
var filename = '';

var cap = function() {
  casper.capture("./caps/"+filename+"_"+(count++)+".png");
}

var casper = require('casper').create({
  verbose: false,
  timeout: 150*1000,
  onStepComplete: cap,
  pageSettings:{
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/536.11 "+
      "(KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11"
  },
  viewportSize:{
    width: 1024,
    height: 1280
  }
});

var root = casper.cli.get(0);
var service = casper.cli.get(1);
var username = casper.cli.get(2);
var password = casper.cli.get(3);
var testname = casper.cli.get(4);

filename = service;
  
require("./services/"+service)(
  casper,
  root,
  username,
  password,
  testname
).run(function() {
  this.test.renderResults(true);
});
