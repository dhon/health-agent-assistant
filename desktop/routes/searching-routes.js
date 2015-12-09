var express = require('express');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

// Example post
router.post('/', function(req, res) {
	var data = req.body; //Data takes type of json object
	for(var attribute in data){
		console.log(attribute+": "+data[attribute]);
	}
	console.log();
	
	//TODO: Validate attributes? May be someone else's job
	
	//TODO: Parse attributes into data types desired by DB
	
	//TODO: use attributes to query database and get relevant results
	
	//TODO: Parse DB results into desired format
	
	//TODO: Sort formated results
	
	
	var results = {
		restaurants: [
			{name: "Joe's Pizza", location:"123 Rd, Leverett MA", inspections:[
				{date:'11/19/2015', violations:[
					{code:"3.2.12", description:"Eggs above acceptable temperature."},
					{code:"6.3.1", description:"Residue build up on bottom of fryer."}
				]},
				{date:'11/28/2014'},
				{date:'11/12/2013'}
			]},
			{name: "Sal's Fish", location:"456 Rd, Leverett MA"},
			{name: "Ben's Burritos", location:"789 Rd, Leverett MA"}
		]
	};
	
	// Test 
	res.render('results', results);
});

// Example route
router.get('/', function(req, res) {
	res.render('search');
});

module.exports = router;
