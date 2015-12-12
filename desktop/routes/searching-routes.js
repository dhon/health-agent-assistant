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
	
	
	//the parser makes it so the owner and the inspections are fields in the 
	//restaurant, the violations are in the inspections, and the numbers that 
	//refer to strings in other tables have been replaced with the strings.
	//It also adds a date object to the inspections which is calculated from timein
	var fakeDBResults = {
		restaurants:[
			{	ID:"0", 
				name:"Test0", 
				Location:"Leverit", //This should be changed to a pointer to a property
				OwnerID:"0", 
				PersonInCharge:"", 
				RestaurantInspectionID:"0"},
			],
		inspections:[{ID:"0",
			RESTAURANTID:"0",
			INSPECTOR:"",
			RISKLEVEL:"",
			HACCP:"",
			TIMEIN:"",
			TIMEOUT:"",
			TYPEOFOPERATION:"0",
			TYPEOFINSPECTION:"0",
			PREVIOUSINSPECTIONDATE:"",
			REASONING:"0",
			OTHERREASONING:"",
			MANAGEMENTANDPERSONNEL:"",
			FOODANDFOODPROTECTION:"",
			EQUIPMENTANDUTENSILS:"",
			WATERPLUMBINGANDWASTE:"",
			PHYSICALFACILITY:"",
			POISONOUSORTOXICMATERIALS:"",
			SPECIALREQUIREMENTS:"",
			OTHER0:"",
			DISCUSSIONWITHPERSONINCHARGE:"",
			CORRECTIVEACTIONREQUIRED:"",
			VOLUNTARYCOMPLIANCE:"",
			REINSPECTIONSCHEDULED:"",
			VOLUNTARYDISPOSAL:"",
			EMPLOYEERESTRICTIONEXCLUSION:"",
			EMERGENCYSUSPENSION:"",
			EMERGENCYCLOSURE:"",
			OTHER1:"",
			ADDITIONALNOTES:""}
			],
		violations:[{ID:"0", RESTRAUNTINSPETIONID:"0", CODEREFERENCE:"", CRITICALORREDITEM:"", DESCRIPTIONOFVIOLATIONCORRECTIONPLAN:"", DATEVERIFIED:""}
			],
		owners:[{ID:"0", OWNERNAME:"", TELEPHONENUMBER:""}],
		property:[{ID:"", GPSCOORDINATES:"", ADDRESS:"", TOWN:"", STATE:"", ZIPCODE:"", PLOTNUMBER:""}],
		typeOfOperations:[{ID:"0", OPERATIONTYPE:""}],
		typeOfInspection:[{ID:"0", INSPECTIONTYPE:""}],
		reasonings:[{ID:"0", REASONING:"Because"}]
	};
	var DBResults = fakeDBResults;
	//TODO: Parse DB results into desired format
	
	
	var results = {restaurants:[]};
	for(i = 0; i<DBResults.restaurants.length; i++)
	{
		var restaurant = DBResults.restaurants[i];
		
		for(j = 0; j<DBResults.owners.length; j++)
		{
			if(DBResults.owners[j].ID == restaurant.OwnerID)
			{
				restaurant.Owner = DBResults.owners[j];
				break;
			}
		}
		
		restaurant.inspections = [];
		
		//TODO: Add link to property information
		for(j = 0; j<DBResults.inspections.length; j++)
		{
			if(DBResults.inspections[j].RestaurantID != DBResults.restaurants[i].ID)
				continue;
			
			var inspection = DBResults.inspections[j];
			inspection.date = new Date(inspection.TIMEIN);
			//Replaces numbers that refer to tables with the corresponding strings
			for(k = 0; k<DBResults.typeOfOperations.length; k++)
			{
				if(DBResults.typeOfOperations[k].ID == inspection.TYPEOFOPERATION)
				{
					inspection.TYPEOFOPERATION = DBResults.typeOfOperations[k].OPERATIONTYPE;
				}
			}
			
			for(k = 0; k<DBResults.typeOfInspections.length; k++)
			{
				if(DBResults.typeOfInspections[k].ID == inspection.TYPEOFINSPECTION)
				{
					inspection.TYPEOFINSPECTION = DBResults.typeOfInspections[k].INSPECTIONTYPE;
				}
			}
			
			for(k = 0; k<DBResults.reasonings.length; k++)
			{
				if(DBResults.reasonings[k].ID == inspection.REASONING)
				{
					inspection.REASONING = DBResults.reasonings[k].REASONING;
				}
			}
			
			inspection.violations = [];
			
			for(k = 0; k<DBResults.violations.length; k++)
			{
				if(DBResults.violations[k].RestaurantInspectionID != DBResults.inspections[j].ID)
					continue;
				
				var violation = DBResults.violations[k];
				
				
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