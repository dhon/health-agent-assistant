var express = require('express');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

// Example post
router.post('/post', function(req, res) {console.log("posted");});

// fake data
	var restaurants = [	{"name":"WcDonalds", "id":"123", "address":"54 Maple Street"},
						{"name":"Dunkin Donuts", "id":"456", "address":"100 Main Street"}];

// Route via search results
router.get('/edit', function(req, res){

	var completed_form = "";

	//var key = req.body.key;
	completed_form = {"id":"19", "inspector":"Steve"}; // query db using key

	//we can compare the data from the query to determine the type of form it is
	//then set that to be the "current" one and make the other two just "tab-link"
	var healthtab = "tab-link current";
	var watertab = "tab-link";
	var septictab = "tab-link";

	if (completed_form === ""){
		console.log("no data to edit");
		res.redirect('/data');
	}

	else{
		console.log("routed for editing");
		var changes = "Submit changes";
		res.render("data_entry",{
			list:restaurants,
			formdata:completed_form,
			submit_string:changes,
			healthtabclass:healthtab,
			watertabclass:watertab,
			septictabclass:septictab
		});
	}
});

// Main route
router.get('/', function(req, res) {

	var healthtab = "tab-link current";
	var watertab = "tab-link";
	var septictab = "tab-link";
	var changes = "Submit";

	console.log("routed");
	res.render("data_entry",{
		list:restaurants,
		submit_string:changes,
		healthtabclass:healthtab,
		watertabclass:watertab,
		septictabclass:septictab
	});
});

module.exports = router;
