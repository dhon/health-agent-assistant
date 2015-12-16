var express = require('express');
var querystring = require('querystring');
var http = require('http');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

router.get('/', function(req, res) {
	console.log("routed");

	// Fake array for testing
	var userArray2 = [
    	{ id: 1, username: 'jack', passwordhash: '5ebe2294ecd0e0f08eab7690d2a6ee69', savedsearches: '72', privileges: '5' },
  		{ id: 2, username: 'jill', passwordhash: '51075igaf89fafh98d8ghav8gh8av89g', savedsearches: '22', privileges: '1' },
  	 	{ id: 3, username: 'ben', passwordhash: '0u09hjdh09hdhadhubuicbuiahdphahd', savedsearches: '3', privileges: '41' }
	];

	var userArray = {user:[]};

	var user = {
		id:"",
		username:"",
		passwordhash:"",
		savedsearches:"",
		privileges:""
	};

	var userDBResults = getAllUsers(user);
	userArray = userDBResults;

	res.render('admin', {
		users: userArray // replace with userArray2 to test local array
	});
});


// Originally from searching-routes.js and remade for users retrieval from DB
function getAllUsers(query)
{
	var userDBResults = {};
	var xmlHttp = new XMLHttpRequest();
	
	var query = JSON.stringify({location:["Sunderland", "Leverett"], type:"user"});
	
	xmlHttp.open( "POST", 'http://localhost:3000/api/get', false ); // false for synchronous request
	xmlHttp.setRequestHeader('Content-Type', 'application/json');
		
	console.log("Sending query:"+query);
	console.log();
	xmlHttp.send( query );
		
	if(xmlHttp.responseText)
	{
		var data = JSON.parse(xmlHttp.responseText);
		
		console.log("Starting returned data");
		console.log(data);
		console.log("Ending Returned data");
		console.log(data.success);
		console.log();
		
		if(data.success){
			if(data.rows == undefined){
				data.rows = [];
			}
			userDBResults = data.rows;
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
