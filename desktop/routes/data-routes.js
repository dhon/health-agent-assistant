var express = require('express');
var app = express();

//var engines = require('consolidate');

//app.engine('handlebars', engines.handlebars);

app.set('view engine', 'handlebars');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

// Example post
router.post('/post', function(req, res) {console.log("posted");});

// Example route
router.get('/', function(req, res) {
	console.log("routed");
	res.render("data_entry");
});

module.exports = router;
