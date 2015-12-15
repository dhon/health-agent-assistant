var express = require('express');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

// Example post
router.post('/post', function(req, res) {console.log("posted");});

router.get('/', function(req, res) {
	console.log("routed");
	res.render('admin');
});

module.exports = router;
