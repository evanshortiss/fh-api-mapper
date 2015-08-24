var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

module.exports = function() {
  var proxy = new express.Router();

  proxy.all('/',
    bodyParser.text(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false}),
    bodyParser.raw({ type: '*/*' }),
    errorHandler,

    function(req, resp) {

      var body = req.body;

      if (Buffer.isBuffer(req.body)) {
        body = req.body.toString('utf8');
      }

      var data = {
        headers: req.headers,
        body: body
      };
      resp.json( data );
    }
  );


  return proxy;
};

function errorHandler(err, req, resp, next) {
  resp.status(500).send(err.message);
}