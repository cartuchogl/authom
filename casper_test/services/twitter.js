
module.exports = function(casper, root, username, password, testname) {

  casper.start(root, function(){
    this.click("a[href='/auth/twitter']");
  })
  .then(function(){
    this.test.assertUrlMatch(
      /^https:\/\/twitter\.com\/oauth\/authorize\?oauth_token/,
      'We are on twitter oauth'
    );
  })
  .then(function() {
    this.fill("form#oauth_form", {
      "session[username_or_email]": username,
      "session[password]": password
    }, true);
  })
  .then(function() {
    this.wait(2000, function() {
      this.test.assertSelectorHasText(
        "#connect-text", "You are "+testname+" on twitter"
      );
    });
  });

  return casper;

};