var express = require('express');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

// Example post
router.post('/post', (req, res) => {console.log("posted");});

// Route via search results
router.post('/edit', function(req, res){
	var primarykey = req.body.key;
	var form; // = query db

});

// Main route
router.get('/', function(req, res) {

	//replace with a databse query
	var restaurants = [	{"name":"WcDonalds", "id":"123", "address":"54 Maple Street"},
						{"name":"Dunkin Donuts", "id":"456", "address":"100 Main Street"}];
	var tanks;
	var wells;

	console.log("routed");
	res.render("data_entry",{
		list:restaurants
	});
});

module.exports = router;
