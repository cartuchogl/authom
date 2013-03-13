# phantomjs+casperjs test suite

This folder contains a serie of scripts that try to test authom.

The file *config.json* contains configuration of networks apps and
accounts to try. Also contains the url to test. You need edit this file.

The file *server.js* is a expressjs server equal to included on the example
folder except that it only use the networks configured on config.json.

The file *runner.js* runs the apps with accounts configured in
config.json. Need phantomjs and casperjs accesible in $PATH.

````shell
$ phantomjs -v
1.8.2
$ casperjs --version
1.0.2
````

Use *casper-runner.js* to execute the appropiate casperjs script in services
folder. Captures of process are put in caps folder with the pattern
[network]_[num].png.

Only support facebook, foursquare, github, instagram and twitter yet.

Whith the current version of authom runs fine on node 0.6.21, 0.8.22 and
0.10.0.
