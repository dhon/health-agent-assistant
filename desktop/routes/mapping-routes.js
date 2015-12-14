var express = require('express');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

router.get('/', function(req, res) {
	console.log("routed");
	res.render("map");
});

module.exports = router;
