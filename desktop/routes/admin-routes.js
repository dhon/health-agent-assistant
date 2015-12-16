var express = require('express');
var querystring = require('querystring');
var http = require('http');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

router.get('/', function(req, res) {
	console.log("routed");
	res.render('admin');
});

module.exports = router;
