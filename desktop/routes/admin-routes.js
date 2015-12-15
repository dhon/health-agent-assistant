var express = require('express');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

// Example route
router.get('/', function(req, res) {
	console.log("routed");
	res.render('admin');
});

module.exports = router;
