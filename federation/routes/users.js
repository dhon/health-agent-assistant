var express = require('express');
var router = express.Router();
var userController = require('../controller/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

function isValidObject(user){
	var result = {};
	var username = user.username;
	var password = user.password;
	console.log(username + " " + password);
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
	console.log(req.body);
	console.log(user);
	if(!isValidObject(user).success){
		res.json(isValidObject(user));
	}
	else{
	userController.registerNewUser(user, function(result){
		res.json(result);
	});
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
	var checkUserResult = isValidObject(user);
	if(!checkUserResult.success){
		res.json(checkUserResult);
	}
	else{
		userController.loginUser(user, function(result){
			res.json(result);
		});
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
