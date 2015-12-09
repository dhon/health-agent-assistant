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

	var restaurants = [{"test":"WcDonalds", "id":"123"}, {"test":"Dunkin Donuts", "id":"456"}];
	var tanks;
	var wells;

	console.log("routed");
	res.render("data_entry",{
		list:restaurants
	});
});

module.exports = router;
