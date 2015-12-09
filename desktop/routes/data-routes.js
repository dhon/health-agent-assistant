var express = require('express');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

// Example post
router.post('/post', (req, res) => {console.log("posted");});

// fake data
	var restaurants = [	{"name":"WcDonalds", "id":"123", "address":"54 Maple Street"},
						{"name":"Dunkin Donuts", "id":"456", "address":"100 Main Street"}];

// Route via search results
router.get('/edit', function(req, res){

	//var key = req.body.key;
	var completed_form = {"id":"19", "inspector":"Steve"}; // query db using key

	console.log("routed for editing");
	res.render("data_entry",{
		list:restaurants,
		formdata:completed_form
	});

});

// Main route
router.get('/', function(req, res) {

	console.log("routed");
	res.render("data_entry",{
		list:restaurants
	});
});

module.exports = router;
