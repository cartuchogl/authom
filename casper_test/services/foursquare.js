
module.exports = function(casper, root, username, password, testname) {

  casper.start(root, function() {
    this.click("a[href='/auth/foursquare']");
  })
  .then(function() {
    this.test.assertUrlMatch(
      /^https:\/\/\w\w\.foursquare\.com\/oauth2\/authenticate\?client_id/,
      'We are on foursquare oauth'
    );
    this.click("#oAuthLeft a.newGreenButton");
  })
  .then(function() {
    this.wait(1000, function() {
      this.evaluate(function(username, password){
        document.querySelector('input#username').value = username
        document.querySelector('input#password').value = password
      }, {
        username: username,
        password: password
      })
      this.wait(800, function() {
        this.click(".loginOrSignup input[type='submit']");
      })
    })
  })
  .then(function() {
    this.wait(1000, function() {
      if (!/^https:\/\/\w\w\.foursquare\.com/.test(this.getCurrentUrl())) { // reconnect?
        this.echo("reconnect");
      } else {
        this.click("#oAuthRight input.greenButton");
      }
    });
  })
  .then(function() {
    this.wait(2000, function() {
      this.test.assertSelectorHasText(
        "#connect-text", "You are "+testname+" on foursquare"
      );
    });
  });

  return casper;

};
