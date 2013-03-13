var express = require("express")
  , authom = require("../lib/authom")
  , app = express.createServer()
  , port = process.env.PORT || 80
  , config = require('./config')
  , services = Object.keys(config.services)
  , services_links = ''

services.forEach(function(item) {
  var service = config.services[item].app
  service.service = item
  authom.createServer(service)

  services_links += "<div><a href='/auth/"+item+"'>Who am I on "+item+"?</a></div>"
})

app.get("/auth/:service", authom.app)

app.get("/", function(req, res) {
  res.send(
    "<html>" +
      "<body style='font: 300% sans-serif;background-color:white'>" +
        services_links +
      "</body>" +
    "</html>"
  )
})

authom.on("auth", function(req, res, data) {
  res.send(
    "<html>" +
      "<body style='background-color:white'>" +
        "<div id='connect-text' style='font: 300% sans-serif'>You are " + data.id + " on " + data.service + ".</div>" +
        "<pre><code>" + JSON.stringify(data, null, 2) + "</code></pre>" +
      "</body>" +
    "</html>"
  )
})

authom.on("error", function(req, res, data){
  res.send("An error occurred: " + JSON.stringify(data))
})

app.listen(port, function() {
  console.log("listening at "+config.test_url)
})
