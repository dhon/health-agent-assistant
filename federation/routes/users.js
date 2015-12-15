var express = require('express');
var router = express.Router();
var userController = require('../controller/user');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var flash = require('flash');
//var es = require('./node_modules/connect-ensure-login/lib/ensureLoggedIn')
var crypto = require('crypto');

var app = express();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

passport.use(new Strategy(
  function(username, password, cb) {

    var hashed = crypto.createHash('md5').update(password).digest('hex');

    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      //if (!user) { return cb(null, false, { message: 'Invalid username ' + username }); }
      //if (user.password != password) { return cb(null, false, { message: 'Invalid password' }); }
      if (!user || user.password != hashed) { return cb(null, false, { message: "Invalid username, password combination"})}
      return cb(null, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
	cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
	db.users.findById(id, function (err, user) {
		if (err) { return cb(err); }
		cb(null, user);
	});
});

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(require('connect-flash')());




function isValidObject(user){
	var result = {};
	var username = user.username;
	var password = user.passwordhash;
	if(username && username.length > 0){
		if(password && password.length > 0) {
			result.success = true;
			result.desc = "OK";
			return result;
		}
		else {
			result.success = false;
			result.desc = "Password is not valid.";
		}
	}
	else{
		result.success = false;
		result.desc = "Username is not valid.";
		return result;
	}
}

router.post('/register', function(req, res, next) {
	var user = req.body;
	var b = req.body.passwordhash;
  var hashed = crypto.createHash('md5').update(b).digest('hex');
  user.passwordhash = hashed;
  //console.log(user.passwordhash);
	
	var checkUserResult = isValidObject(user);
	if(checkUserResult.success){
		userController.registerNewUser(user, function(result){
			res.json(result);
			console.log(result, "result result result");
		});
	} else {
		res.json(checkUserResult);
	}
});

router.post('/editpassword', function(req, res, next) {
	var user = req.body;
	if(!isValidObject(user).success){
		res.json(isValidObject(user));
	}
	else{
	userController.editPassword(user, function(result){
		res.json(result);
	});
 }
});
//returns a password hash, logs in the user
router.post('/login', function(req, res, next) {
	var user = req.body;
	var b = req.body.passwordhash;
  var hashed = crypto.createHash('md5').update(b).digest('hex');
  user.passwordhash = hashed;

	var checkUserResult = isValidObject(user);
	if(checkUserResult.success){
		userController.loginUser(user, function(result){
			res.json(result);
		});
	} else {
		res.json(checkUserResult);
	}
});

//returns the id of the search in the table, adds a new saved search string
router.post('/addsearch', function(req, res, next) {
	var user = req.body;
	userController.addSearch(user, function(result){
		res.json(result);
	});
});

//removes a saved search by id
router.post('/removesearch', function(req, res, next) {
	var user = req.body;
	userController.removeSearch(user, function(result){
		res.json(result);
	});
});

//returns a list of all user's saved searches as [{"id": 12, "search" : ""}, ]
router.get('/getsearches', function(req, res, next) {
	var user = req.body;
	userController.getSearches(user, function(result){
		res.json(result);
	});
});


module.exports = router;
