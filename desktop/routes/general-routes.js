var express = require('express');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

// Example post
router.post('/post', function(req, res) {console.log("posted");});

// Example route
router.get('/', function(req, res) {
	res.render('welcome');
});

 // Route to searching UI by KWF
router.get('/user/search/', function(req, res) {
	res.render('search');
});

module.exports = router;
