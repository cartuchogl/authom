
module.exports = function(casper, root, username, password, testname) {

  casper.start(root, function() {
    this.click("a[href='/auth/instagram']");
  })
  .then(function() {
    this.test.assertUrlMatch(
      /^https:\/\/instagram\.com\/accounts\/login\/\?next/, 
      'We are on instagram oauth'
    );
  })
  .then(function() {
    this.fill("form#login-form", {
      username: username,
      password: password
    }, true);
  })
  .then(function() {
    this.wait(1000, function() {
      if (!/^https:\/\/instagram\.com\//.test(this.getCurrentUrl())) { // reconnect?
        this.echo("reconnect");
      } else {
        this.wait(800, function() {
          this.click(".form-actions input.confirm");
        });
      }
    });
  })
  .then(function() {
    this.wait(1000, function() {
      this.test.assertSelectorHasText(
        "#connect-text", "You are "+testname+" on instagram"
      );
    });
  });

  return casper;

};
