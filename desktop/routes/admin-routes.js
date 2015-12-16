var express = require('express');
var querystring = require('querystring');
var http = require('http');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

router.get('/', function(req, res) {
	console.log("routed");

	// Fake array for testing
	var userArray2 = [
    	{ id: 1, username: 'jack', passwordhash: '5ebe2294ecd0e0f08eab7690d2a6ee69', savedsearches: '72', privileges: '5' },
  		{ id: 2, username: 'jill', passwordhash: '51075igaf89fafh98d8ghav8gh8av89g', savedsearches: '22', privileges: '1' },
  	 	{ id: 3, username: 'ben', passwordhash: '0u09hjdh09hdhadhubuicbuiahdphahd', savedsearches: '3', privileges: '41' }
	];

	res.render('admin', {
		users: userArray2
	});
});

module.exports = router;
