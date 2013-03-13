var async = require('async');
var spawn = require('child_process').spawn;

var config = require('./config');

async.eachSeries(Object.keys(config.services),
  function(item, next) {
    var cfg = config.services[item].account;
    var test = spawn('casperjs', [
      "casper-runner.js",
      config.test_url,
      item,
      cfg.username, cfg.password, cfg.testname
    ]);

    test.stdout.on ('data', function(data) {
      process.stdout.write(data);
    });
    test.stderr.on ('data', function(data) {
      process.stderr.write(data);
    });
    test.on('exit', function(code) {
      next(code!=0?"error":null);
    });
  },
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("All ok!");
    }
  }
);
