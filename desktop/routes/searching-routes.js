var express = require('express');
var querystring = require('querystring');

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
	
	var searchTypes = {restaurant:0, septic:1, well:2};
	var searchType = -1;
	if(data.restName != undefined){
		searchType = searchTypes.restaurant;
	}
	else if(data.tankLocation != undefined)
	{
		searchType = searchTypes.septic;
	}
	else if(data.clientName != undefined)
	{
		searchType = searchTypes.well;
	}
	else
	{
		console.log("Invalid type of search");
	}
	
	for(var attribute in data){
		if(data[attribute] == "")
		{
			delete data[attribute];
		}
	}
	
	for(var attribute in data){
		console.log(attribute+": "+data[attribute]);
	}
	console.log();
	var results;
	//TODO: Validate attributes? May be someone else's job
	
	//searched for restaurants
	if(searchType == searchTypes.restaurant)
	{
		//TODO: Parse attributes into data types desired by DB
		
		//breaks up all of the searchable terms into queries to the DB tables they refer to
		
		//TODO: need to handle restDateBefore, restDateAfter, numViolations, and restKeyword
		
		var queryBy = {
			restaurant:false, 
			property:false, 
			owner:false, 
			inspection:false, 
			violation:false
		};
		
		var restaurantInfo = {};
		if(data.restName!=undefined){
			restaurantInfo.name = data.restName;
		}
		
		var restaurantQuery = querystring.stringify(restaurantInfo);
		
		if(restaurantQuery != ""){
			queryBy.restaurant = true;
		}
		
		
		var propertyInfo = {};
		if(data.restLocation != undefined){
			propertyInfo.address = data.restLocation;
		}
		if(data.restLocation != undefined){
			propertyInfo.town = data.restaurantTown;
		}
		var propertyQuery = querystring.stringify(propertyInfo);
		if(propertyQuery != ""){
			queryBy.property = true;
		}
		
		
		var ownerInfo = {};
		if(data.ownerName!= undefined){
			ownerInfo.ownername = data.ownerName;
		}
		if(data.ownerNumber != undefined){
			ownerInfo.telephonenumber = data.ownerNumber
		}
		var ownerQuery = querystring.stringify(ownerInfo);
		if(ownerQuery != ""){
			queryBy.owner = true;
		}
		
		var inspectionInfo = {};
		if(data.inspectorname != undefined){
			inspectionInfo.inspector = data.inspectorname;
		}
		if(data.time_in != undefined){
			inspectionInfo.timein=data.time_in;
		}
		if(data.time_out != undefined){
			inspectionInfo.timeout=data.time_out;
		}
		if(data.HACCP != undefined){
			inspectionInfo.haccp=data.HACCP;
		}
		if(data.operation != undefined){
			inspectionInfo.typeofoperation= data.operation;
		}
		if(data.inspection != undefined){
			inspectionInfo.typeofinspection = data.inspection;
		}
		if(data.correctiveAcction != undefined){
			inspectionInfo.correctiveactionrequired = data.correctiveAction;
		}
		if(data.voluntaryCompliance != undefined){
			inspectionInfo.voluntaryCompliance = data.voluntaryCompliance;
		}
		if(data.reinspectionScheduled != undefined){
			inspectionInfo.reinspectionScheduled = data.reinspectionScheduled;
		}
		if(data.voluntaryDisposal != undefined){
			inspectionInfo.voluntaryDisposal = data.voluntaryDisposal;
		}
		if(data.employeeRestriction != undefined){
			inspectionInfo.employeeRestrictionExclusion = data.employeeRestriction;
		}
		if(data.emergencySuspension != undefined){
			inspectionInfo.emergencySuspension = data.emergencySuspension;
		}
		if(data.emergencyClosure != undefined){
			inspectionInfo.emergecyClosure = data.emergencyClosure;
		}
			
		var inspectionQuery = querystring.stringify(inspectionInfo);
		if(inspectionQuery != ""){
			queryBy.inspection = true;
		}
		
		//TODO: need to parse the codeViolations incase there are multiple codes seperated by spaces or commas
		var violationInfo = {};
		if(data.codeViolations!= undefined){
			violationInfo.codeReference = data.codeViolations;
		}
		var violationQuery = querystring.stringify(violationInfo);
		if(violationQuery != ""){
			queryBy.violation = false
		}
		
		//TODO: use attributes to query database and get relevant results
		
		
		
		//the parser makes it so the owner and the inspections are fields in the 
		//restaurant, the violations are in the inspections, and the numbers that 
		//refer to strings in other tables have been replaced with the strings.
		//It also adds a date object to the inspections which is calculated from timein
		var fakeDBResults = {
			restaurants:[
				{
					ID:"0", 
					PROPERTYID:"0", 
					NAME:"Test0", 
					ADDRESS:"", 
					OWNERID:"", 
					PERSONINCHARGE:""
				}
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
			property:[{ID:"0", GPSCOORDINATES:"", ADDRESS:"", TOWN:"", STATE:"", ZIPCODE:"", PLOTNUMBER:""}],
			typeOfOperations:[{ID:"0", OPERATIONTYPE:""}],
			typeOfInspection:[{ID:"0", INSPECTIONTYPE:""}],
			reasonings:[{ID:"0", REASONING:"Because"}]
		};
		var DBResults = fakeDBResults;
		
		
		
		results = {restaurants:[]};
		for(i = 0; i<DBResults.restaurants.length; i++)
		{
			var restaurant = DBResults.restaurants[i];
			
			for(j = 0; j<DBResults.owners.length; j++)
			{
				if(DBResults.owners[j].ID == restaurant.OWNERID)
				{
					restaurant.Owner = DBResults.owners[j];
					break;
				}
			}
			
			if(queryBy.owner && restaurant.Owner == undefined){
				continue;
			}
			
			
			for(j = 0; j<DBResults.property.length; j++)
			{
				if(DBResults.property[j].ID == restaurant.PROPERTYID)
				{
					restaurant.property = DBResults.property[j];
					break;
				}
			}
			if(queryBy.property && restaurant.property == undefined){
				continue;
			}
			
			restaurant.inspections = [];
			
			//TODO: Add link to property information
			for(j = 0; j<DBResults.inspections.length; j++)
			{
				if(DBResults.inspections[j].RestaurantID != DBResults.restaurants[i].ID){
					continue;
				}
				
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
					if(DBResults.violations[k].RestaurantInspectionID != DBResults.inspections[j].ID){
						continue;
					}
					
					var violation = DBResults.violations[k];
					
					
					inspection.violations.push(violation);
				}
				
				if(!queryBy.violation || inspection.violations.length != 0){
					restaurant.inspections.push(inspection);
				}
				
			}
			if(!queryBy.inspection || restaurant.inspections.length != 0){
				results.restaurants.push(restaurant);
			}
		}
		
		
		
		//TODO: Sort formated results
	}
	//if septic tank
	else if(searchType == searchTypes.septic)
	{
		var fakeDBResults = {
			septic:[{ID:"", PROPERTYID:"", OWNERID:""}],
			owner:[{ID:"0", OWNERNAME:"", TELEPHONENUMBER:""}],
			property:[{ID:"", GPSCOORDINATES:"", ADDRESS:"", TOWN:"", STATE:"", ZIPCODE:"", PLOTNUMBER:""}],
			systemPumpingRecord:[{
				ID:"", 
				SEPTICID:"", 
				PUMPINGDATE:"", 
				QUANTITYPUMPED:"", 
				SYSTEMQUALITYOTHER:"", 
				EFFLUENTTEEFILTERPRESENT:"", 
				IFYESWASITCLEANED:"", 
				OBSERVEDCONDITION:"", 
				SYSTEMPUMPEDBYNAME:"", 
				SYSTEMPUMPEDBYLICENSE:"", 
				SYSTEMPUMPEDBYCOMPANY:"", 
				LOCATIONWHERECONTENTSWEREDISPOSED:"", 
				HAULER:"", 
				HAULERDATE:"", 
				RECEIVINGFACILITY:"", 
				RECEIVINGFACILITYDATE:""
			}],
			septicPumpingRecord:[{ID:"", OPTION:""}],
			septicInspection:[{
				ID:"", 
				NAMEOFINSPECTOR:"", 
				COMPANYNAME:"", 
				COMPANYADDRESS:"",
				CITY:"", 
				STATE:"", 
				ZIPCODE:"", 
				TELEPHONENUMBER:"", 
				LICENSENUMBER:"", 
				DEPAPPROVAL:"", 
				SYSTEMPASSES:"", 
				SYSTEMPASSESCOMMENTS:"", 
				SYSTEMCONDITIONALLYPASSES:"", 
				SYSTEMCONDITIONALLYPASSESWILLPASSIFREPLACED:"", 
				SYSTEMCONDITIONALLYPASSESCOMMENTS:"", 
				SYSTEMCONDITIONALLYPASSESALARMS:"", 
				SYSTEMCONDITIONALLYPASSESSEWAGE:"", 
				SYSTEMCONDITIONALLYPASSESSEWAGEPIPE:"", 
				SYSTEMCONDITIONALLYPASSESSEWAGEPIPECOMMENTS:"", 
				SYSTEMCONDITIONALLYPASSESSEWAGEOBSTRUCTION:"", 
				SYSTEMCONDITIONALLYPASSESSEWAGEOBSTRUCTIONCOMMENTS:"", 
				SYSTEMCONDITIONALLYPASSESSEWAGEDISTRIBUTION:"", 
				SYSTEMCONDITIONALLYPASSESSEWAGEDISTRIBUTIONCOMMENTS:"", 
				SYSTEMCONDITIONALLYPASSESFOURPUMPS:"", 
				SYSTEMCONDITIONALLYPASSESFOURPUMPSPIPE:"", 
				SYSTEMCONDITIONALLYPASSESFOURPUMPSPIPECOMMENTS:"", 
				SYSTEMCONDITIONALLYPASSESFOURPUMPSOBSTRUCTION:"", 
				SYSTEMCONDITIONALLYPASSESFOURPUMPSOBSTRUCTIONCOMMENTS:"", 
				FURTHEREVALUATION:"", 
				FURTHEREVALUATIONSYSTEMWILLPASSIF:"", 
				FURTHEREVALUATIONSYSTEMWILLFAILIF:"", 
				FURTHEREVALUATIONFIFTYTOONEHUNDRED:"", 
				FURTHEREVALUATIONMETHODUSEDTODETERMINE:"", 
				FURTHEREVALUATIONCOMMENTS:"", 
				SYSTEMFAILUREBACKUP:"", 
				SYSTEMFAILUREDISCHARGE:"", 
				SYSTEMFAILURESTATICLIQUID:"", 
				SYSTEMFAILURELIQUIDDEPTH:"", 
				SYSTEMFAILUREREQUIREDPUMPING:"", 
				SYSTEMFAILUREBELOWHIGHGROUNDWATER:"", 
				SYSTEMFAILURESURFACEWATERSUPPLY:"", 
				SYSTEMFAILUREPUBLIC:"", 
				SYSTEMFAILUREPRIVATE:"", 
				SYSTEMFAILUREPRIVATEGREATER:"", 
				SYSTEMFAILUREGPD:"", 
				SYSTEMFAILUREFORREAL:"", 
				LARGESYSTEMSSURFACEDRINKING:"", 
				LARGESYSTEMSTRIBUTARY:"", 
				LARGESYSTEMSNITROGEN:"", 
				CHECKLISTINFORMATIONPROVIDED:"", 
				CHECKLISTPUMPEDOUTTWOWEEKS:"", 
				CHECKLISTNORMALFLOW:"", 
				CHECKLISTLARGEVOLUMESINTRODUCED:"", 
				CHECKLISTPLANSEXAMINED:"", 
				CHECKLISTBACKUPINSPECTED:"", 
				CHECKLISTBREAKOUTINSPECTED:"", 
				CHECKLISTCOMPONENTSONSITE:"", 
				CHECKLISTINTERIORINSPECTION:"", 
				CHECKLISTFACILITYOWNER:"", 
				CHECKLISTEXISTINGINFORMATION:"", 
				CHECKLISTDETERMINED:"", 
				RESIDENTIALBEDROOMSDESIGN:"", 
				RESIDENTIALBEDROOMSACTUAL:"", 
				RESIDENTIALDESIGNFLOW:"", 
				RESIDENTIALCOMMENTS:"", 
				RESIDENTIALRESIDENTS:"", 
				RESIDENTIALGARBAGEGRINDER:"", 
				RESIDENTIALLAUNDRYSEPARATE:"", 
				RESIDENTIALLAUNDRYINSPECTION:"", 
				RESIDENTIALSEASONALUSE:"", 
				RESIDENTIALWATERMETERREADINGS:"", 
				RESIDENTIALWATERMETERCOMMENTS:"", 
				RESIDENTIALSUMPPUMP:"", 
				RESIDENTIALDATEOFOCCUPANCY:"", 
				COMMERCIALTYPE:"", 
				COMMERCIALDESIGNFLOW:"",
				COMMERCIALBASISOFDESIGNFLOW:"", 
				COMMERCIALGREASETRAP:"", 
				COMMERCIALINDUSTRIALWASTE:"", 
				COMMERCIALWASTEDISCHARGE:"", 
				COMMERCIALWATERMETERREADINGS:"", 
				COMMERCIALDATEOFOCCUPANCY:"", 
				COMMERCIALCOMMENTS:"", 
				GENERALSOURCE:"", 
				GENERALPUMPED:"",
				GENERALVOLUMEPUMPED:"",
				GENERALQUANTITYDETERMINED:"",
				GENERALREASONFORPUMPED:"",
				GENERALTYPEOFSYSTEM:"", 
				GENERALTYPEOFSYSTEMCOMMENT:"", 
				GENERALCOMPONENTAGE:"",
				GENERALCOMPONENTDATE:"", 
				GENERALCOMPONENTSOURCE:"",
				GENERALSEWAGEODORS:"",
				BUILDINGSEWERDEPTHBELOWGRADE:"", 
				BUILDINGSEWERMATERIAL:"", 
				BUILDINGSEWERMATERIALCOMMENT:"", 
				BUILDINGSEWERDISTANCEFROMPRIVATE:"", 
				BUILDINGSEWERCOMMENTS:"", 
				SEPTICTANKDEPTHBELOWGRADE:"",
				SEPTICTANKMATERIAL:"", 
				SEPTICTANKMATERIALCOMMENT:"", 
				SEPTICTANKMETALAGE:"",
				SEPTICTANKCOMPLIANCE:"", 
				SEPTICTANKDIMENSIONS:"", 
				SEPTICTANKSLUDGEDEPTH:"",
				SEPTICTANKDISTANCEFROMTOPOFSLUDGE:"",
				SEPTICTANKSCUMTHICKNESS:"",
				SEPTICTANKDISTANCEFROMTOPOFSCUM:"", 
				SEPTICTANKDISTANCEFROMBOTTOMOFSCUM:"", 
				SEPTICTANKDIMENSIONSOBTAINED:"", 
				SEPTICTANKCOMMENTS:"", 
				GREASETRAPDEPTHBELOWGRADE:"",
				GREASETRAPMATERIAL:"", 
				GREASETRAPMATERIALCOMMENT:"", 
				GREASETRAPDIMENSIONS:"", 
				GREASETRAPSCUMTHICKNESS:"",
				GREASETRAPDISTANCEFROMTOPOFSCUM:"",
				GREASETRAPDISTANCEFROMBOTTOMOFSCUM:"", 
				GREASETRAPDATEOFLASTPUMPING:"", 
				GREASETRAPCOMMENTS:"", 
				TIGHTORHOLDINGTANKDEPTHBELOWGRADE:"", 
				TIGHTORHOLDINGTANKMATERIAL:"", 
				TIGHTORHOLDINGTANKMATERIALCOMMENT:"", 
				TIGHTORHOLDINGTANKDIMENSIONS:"", 
				TIGHTORHOLDINGTANKCAPACITY:"", 
				TIGHTORHOLDINGTANKDESIGNFLOW:"", 
				TIGHTORHOLDINGTANKALARMPRESENT:"", 
				TIGHTORHOLDINGTANKALARMLEVEL:"",
				TIGHTORHOLDINGTANKALARMWORKING:"", 
				TIGHTORHOLDINGTANKDATEOFLASTPUMPING:"",
				TIGHTORHOLDINGTANKCOMMENTS:"",
				DISTRIBUTIONBOXDEPTHOFLIQUID:"",
				DISTRIBUTIONBOXCOMMENTS:"", 
				PUMPCHAMBERPUMPSWORK:"", 
				PUMPCHAMBERALARMWORK:"",
				PUMPCHAMBERCOMMENTS:"",
				SOILABSORPTIONSYSTEMCOMMENTS:"",
				SOILABSORPTIONLEACHINGPITS:"",
				SOILABSORPTIONLEACHINGPITSNUMBER:"",
				SOILABSORPTIONLEACHINGCHAMBERS:"",
				SOILABSORPTIONLEACHINGCHAMBERSNUMBER:"",
				SOILABSORPTIONLEACHINGGALLERIES:"",
				SOILABSORPTIONLEACHINGGALLERIESNUMBER:"",
				SOILABSORPTIONLEACHINGTRENCHES:"",
				SOILABSORPTIONLEACHINGTRENCHESNUMBER:"",
				SOILABSORPTIONLEACHINGTRENCHESLENGTH:"",
				SOILABSORPTIONLEACHINGFIELDS:"",
				SOILABSORPTIONLEACHINGFIELDSNUMBER:"",
				SOILABSORPTIONLEACHINGFIELDSDIMENSION:"",
				SOILABSORPTIONOVERFLOWCESSPOOL:"",
				SOILABSORPTIONOVERFLOWCESSPOOLNUMBER:"",
				SOILABSORPTIONINNOVATIVE:"",
				SOILABSORPTIONINNOVATIVENAME:"",
				SOILABSORPTIONCOMMENTS:"",
				CESSPOOLSNUMBER:"",
				CESSPOOLSCONFIGURATION:"",
				CESSPOOLSDEPTHTOP:"",
				CESSPOOLSDEPTHSOLID:"",
				CESSPOOLSDEPTHSCUM:"",
				CESSPOOLSDIMENSION:"",
				CESSPOOLSMATERIAL:"",
				CESSPOOLSINDICATIONOFGROUNDWATER:"",
				CESSPOOLSCOMMENTS:"",
				PRIVYMATERIAL:"",
				PRIVYDIMENSIONS:"",
				PRIVYDEPTHOFSOLIDS:"",
				PRIVYCOMMENTS:"",
				SITEEXAMCHECKSLOPE:"",
				SITEEXAMSURFACEWATER:"",
				SITEEXAMCHECKCELLAR:"",
				SITEEXAMSHALLOWWELLS:"",
				SITEEXAMDEPTHTOHIGHGROUNDWATER:"",
				SITEEXAMMETHODSDESIGNPLANS:"",
				SITEEXAMMETHODSDESIGNPLANSDATE:"",
				SITEEXAMMETHODSOBSERVEDSITE:"",
				SITEEXAMMETHODSCHECKEDWITHBOARDOFHEALTH:"",
				SITEEXAMMETHODSCHECKEDWITHBOARDOFHEALTHCOMMENTS:"",
				SITEEXAMMETHODSCHECKEDWITHLOCALEXCAVATORS:"",
				SITEEXAMMETHODSACCESSEDUSGS:"",
				SITEEXAMMETHODSACCESSEDUSGSCOMMENTS:"",
				SITEEXAMDESCRIBE:"",
				REPORTCOMPLETENESSABCDE:"",
				REPORTCOMPLETENESSD:"",
				REPORTCOMPLETENESSSYSTEMINFORMATION:""
			}]
		};
		
		var DBResults = fakeDBResults;
		
		results = {septics:[]};
		
		for(i = 0; i<DBResults.septic.length; i++)
		{
			var septic = DBResults.septic[i];
			
			for(k = 0; k<DBResults.owner.length; k++)
			{
				if(septic.OWNERID == DBResults.owner[k].ID)
				{
					septic.owner = DBResults.owner[k];
					break;
				}
			}
			
			for(k = 0; k<DBResults.property.length; k++)
			{
				if(septic.PROPERTYID == DBResults.property[k].ID)
				{
					septic.property = DBResults.property[k];
					break;
				}
			}
			
			septic.systemPumpingRecords = [];
			
			for(k = 0; k<DBResults.systemPumpingRecord.length; k++)
			{
				if(DBResults.systemPumpingRecord[k].SEPTICID == septic.ID)
				{
					septic.systemPumpingRecords.push(DBResults.systemPumpingRecord[k]);
				}
			}
			
			//TODO: Need to link septic pumping records and septicinspections
			
			results.septics.push(septic);
		}
	}
	//if well
	else if(searchType == searchTypes.well)
	{
		var fakeDBResults = {
			well:[{ID:"", PROPERTYID:"", OWNERID:""}],
			owner:[{ID:"0", OWNERNAME:"", TELEPHONENUMBER:""}],
			property:[{ID:"", GPSCOORDINATES:"", ADDRESS:"", TOWN:"", STATE:"", ZIPCODE:"", PLOTNUMBER:""}],
			waterQualityReport:[{
				ID:"", 
				WELLID:"",
				CLIENTNAME:"",
				COLLECTEDBY:"",
				PROJECTNAME:"",
				PROJECTNUMBER:"",
				DATECOLLECTED:"",
				SAMPLEIDENTIFICATION:"",
				LABNUMBER:"",
				TOTALCOLIFORMBACTERIA:"",
				TOTALCOLIFORMBACTERIAUNITS:"",
				NITRATENITROGEN:"",
				NITRATENITROGENUNITS:"",
				PH:"",
				PHUNITS:"",
				IRON:"",
				IRONUNITS:"",
				HARDNESSASCACO3:"",
				HARDNESSASCACO3UNITS:"",
				SULFATESULFUR:"",
				SULFATESULFUREUNITS:"",
				CHLORIDE:"",
				SPECIFICCONDUCTANCE:"",
				SPECIFICCONDUCTANCEUNITS:"",
				THISWATERSAMPLEPASSESDRINKINGWATERSTANDARDS:"",
				SUBMITTEDBY:"",
				ADDITIONALNOTES:""
			}]
		};
		
		var DBResults = fakeDBResults;
		
		results = {wells:[]};
		
		for(i = 0; i<DBResults.well.length; i++)
		{
			var well = DBResults.well[i];
			
			for(k = 0; k<DBResults.owner.length; k++)
			{
				if(well.OWNERID == DBResults.owner[k].ID)
				{
					well.owner = DBResults.owner[k];
					break;
				}
			}
			
			for(k = 0; k<DBResults.property.length; k++)
			{
				if(well.PROPERTYID == DBResults.property[k].ID)
				{
					well.property = DBResults.property[k];
					break;
				}
			}
			
			well.waterQualityReports = [];
			
			for(k = 0; k<DBResults.waterQualityReport.length; k++)
			{
				if(DBResults.waterQualityReport[k].WELLID == well.ID)
				{
					well.waterQualityReports.push(DBResults.waterQualityReport[k]);
				}
			}
			
			
			results.wells.push(well);
		}
	}
	
	
	
	
	
	
	
	
	
	// Test 
	res.render('results', results);
});

// Example route
router.get('/', function(req, res) {
	res.render('search');
});

module.exports = router;