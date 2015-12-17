var express = require('express');
var querystring = require('querystring');
var http = require('http');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}

router.post('/register', isAuthenticated, function(req, res){
	console.log("Creating new user");
	var userInfo = req.body;
	
	var xmlHttp = new XMLHttpRequest();
	
	var query = JSON.stringify({username:userInfo.username, passwordhash:userInfo.password});
	
	xmlHttp.open( "POST", 'http://localhost:3000/api/user/register', false ); // false for synchronous request
	xmlHttp.setRequestHeader('Content-Type', 'application/json');
		
	//console.log("Sending query:"+query);
	//console.log();
	xmlHttp.send( query );
	
	res.redirect('/admin');
});

router.get('/', isAuthenticated, function(req, res) {

	// Fake array for testing
	var userArray2 = [
    	{ ID: 1, USERNAME: 'jack', PASSWORDHASH: '5ebe2294ecd0e0f08eab7690d2a6ee69', savedsearches: '72', privileges: '5' },
  		{ ID: 2, USERNAME: 'jill', PASSWORDHASH: '51075igaf89fafh98d8ghav8gh8av89g', savedsearches: '22', privileges: '1' },
  	 	{ ID: 3, USERNAME: 'ben', PASSWORDHASH: '0u09hjdh09hdhadhubuicbuiahdphahd', savedsearches: '3', privileges: '41' }
	];

	

	var userArray = getAllUsers().data;

	res.render('admin', {
		users: userArray // replace with userArray2 to test local array
	});
});


// Originally from searching-routes.js and remade for users retrieval from DB
function getAllUsers()
{
	var userDBResults = {};
	var xmlHttp = new XMLHttpRequest();
	
	var query = JSON.stringify({location:["Sunderland", "Leverett"], type:"user"});
	
	xmlHttp.open( "POST", 'http://localhost:3000/api/get', false ); // false for synchronous request
	xmlHttp.setRequestHeader('Content-Type', 'application/json');
		
	//console.log("Sending query:"+query);
	//console.log();
	xmlHttp.send( query );
		
	if(xmlHttp.responseText)
	{
		var data = JSON.parse(xmlHttp.responseText);
		
		// console.log("Starting returned data");
		// console.log(data);
		// console.log("Ending Returned data");
		// console.log(data.success);
		// console.log();
		
		if(data.success){
			if(data.rows == undefined){
				data.rows = [];
			}
			userDBResults = data;
		}
		else{
			console.log("Error getting information from DB");
		}
		console.log();
		console.log();
	}
	return userDBResults;
}

module.exports = router;
