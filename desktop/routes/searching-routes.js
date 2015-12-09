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
	
	var fakeDBResults = {//TODO: Make this contain all fields given by DB
		restaurants:[{ID:"0", Name:"Test0", Address:"Leverit", OwnerID:"", PersonInCharge:"", RestaurantInspectionID:"?"},
			{ID:"1", Name:"Test1", Address:"Leverit", OwnerID:"", PersonInCharge:"", RestaurantInspectionID:"?"},
			{ID:"2", Name:"Test2", Address:"Leverit", OwnerID:"", PersonInCharge:"", RestaurantInspectionID:"?"}],
		inspections:[{ID:"1", RestaurantID:"0", ViolationsID:""},
			{ID:"2", RestaurantID:"0", ViolationsID:""},
			{ID:"3", RestaurantID:"1", ViolationsID:""},
			{ID:"4", RestaurantID:"0", ViolationsID:""},
			{ID:"5", RestaurantID:"1", ViolationsID:""},
			{ID:"6", RestaurantID:"0", ViolationsID:""},
			{ID:"7", RestaurantID:"2", ViolationsID:""}],
		violations:[{ID:"0", RestaurantInspectionID:"1", CodeReference:"0"},
			{ID:"1", RestaurantInspectionID:"1", CodeReference:"1"},
			{ID:"2", RestaurantInspectionID:"2", CodeReference:"2"},
			{ID:"3", RestaurantInspectionID:"2", CodeReference:"3"},
			{ID:"4", RestaurantInspectionID:"2", CodeReference:"4"},
			{ID:"5", RestaurantInspectionID:"3", CodeReference:"5"},
			{ID:"6", RestaurantInspectionID:"4", CodeReference:"6"},
			{ID:"7", RestaurantInspectionID:"5", CodeReference:"7"},
			{ID:"8", RestaurantInspectionID:"6", CodeReference:"8"}]
	};
	var DBResults = fakeDBResults;
	//TODO: Parse DB results into desired format
	
	
	var results = {restaurants:[]};
	for(i = 0; i<DBResults.restaurants.length; i++)
	{
		var restaurant = {name:"", location:"", inspections:[]};
		restaurant.name = DBResults.restaurants[i].Name;
		restaurant.location = DBResults.restaurants[i].Address;
		//TODO: Populate all of desired fields
		for(j = 0; j<DBResults.inspections.length; j++)
		{
			if(DBResults.inspections[j].RestaurantID != DBResults.restaurants[i].ID)
				continue;
			
			var inspection = {date:"REPLACE", violations:[]};
			//TODO: Populate all of desired fields
			for(k = 0; k<DBResults.violations.length; k++)
			{
				if(DBResults.violations[k].RestaurantInspectionID != DBResults.inspections[j].ID)
					continue;
				
				var violation = {code:"", description:"REPLACE"};
				//TODO: Populate all of desired fields
				violation.code = DBResults.violations[k].CodeReference;
				inspection.violations.push(violation);
			}
			restaurant.inspections.push(inspection);
		}
		
		results.restaurants.push(restaurant);
	}
	
	
	//TODO: Sort formated results
	
	
	// var results = {
		// restaurants: [
			// {name: "Joe's Pizza", location:"123 Rd, Leverett MA", inspections:[
				// {date:'11/19/2015', violations:[
					// {code:"3.2.12", description:"Eggs above acceptable temperature."},
					// {code:"6.3.1", description:"Residue build up on bottom of fryer."}
				// ]},
				// {date:'11/28/2014'},
				// {date:'11/12/2013'}
			// ]},
			// {name: "Sal's Fish", location:"456 Rd, Leverett MA"},
			// {name: "Ben's Burritos", location:"789 Rd, Leverett MA"}
		// ]
	// };
	
	// Test 
	res.render('results', results);
});

// Example route
router.get('/', function(req, res) {
	res.render('search');
});

module.exports = router;
