
module.exports = function(casper, root, username, password, testname) {

  casper.start(root, function() {
    this.click("a[href='/auth/github']");
  })
  .then(function() {
    this.test.assertUrlMatch(
      /^https:\/\/github\.com\/login/,
      'We are on github oauth'
    );
  })
  .then(function() {
    this.fill("#login form", {
      login:username,
      password:password
    }, true);
  })
  .then(function() {
    this.wait(1000, function() {
      if (!/^https:\/\/github\.com/.test(this.getCurrentUrl())) { // reconnect?
        this.echo("reconnect");
      } else {
        this.test.assertUrlMatch(
          /^https:\/\/github\.com\/login\/oauth\/authorize/,
          'We are on github allow app'
        );
        this.wait(800, function() {
          this.click('.auth-form .auth-form-body .button.primary[type="submit"]');
        });
      }
    });
  })
  .then(function() {
    this.wait(1000, function() {
      this.test.assertSelectorHasText(
        "#connect-text", "You are "+testname+" on github"
      );
    });
  });

  return casper;

};
