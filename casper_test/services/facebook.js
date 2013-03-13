
module.exports = function(casper, root, username, password, testname) {

  casper.start(root, function() {
    this.click("a[href='/auth/facebook']");
  })
  .then(function() {
    this.test.assertUrlMatch(
      /^https:\/\/www\.facebook\.com\/login.php\?skip_api_login/,
      'We are on facebook oauth'
    );
  })
  .then(function() {
    this.fill("form#login_form", {
      email:username,
      pass:password
    }, true);
  })
  .then(function() {
    this.wait(1000, function() {
      if (!/^https:\/\/www\.facebook\.com/.test(this.getCurrentUrl())) { // reconnect?
        this.echo("reconnect");
      } else {
        this.click("#grant_clicked input");
      }
    });
  })
  .then(function() {
    this.wait(2000, function() {
      this.test.assertSelectorHasText(
        "#connect-text", "You are "+testname+" on facebook"
      );
    });
  });

  return casper;

};
