var express = require('express');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}

router.get('/', isAuthenticated, function(req, res) {
	console.log("routed");
	res.render("map");
});

module.exports = router;
