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
	res.render("profile", { user: req.user,id:req.user.id, username:req.user.username,displayName:req.user.displayName,emails:req.user.emails });
});

module.exports = router;
