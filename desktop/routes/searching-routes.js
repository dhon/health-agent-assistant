var express = require('express');
var querystring = require('querystring');
var http = require('http');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

// Example post
router.post('/', function(req, res) {
	var data = req.body; //Data takes type of json object
	
	// for(var attribute in data){
		// console.log(attribute+": "+data[attribute]);
	// }
	// console.log();
	
	var searchTypes = {restaurant:0, septic:1, well:2};
	var searchType = -1;
	if(data.restName != undefined){
		searchType = searchTypes.restaurant;
	}
	else if(data.tankLocation != undefined)
	{
		searchType = searchTypes.septic;
	}
	else if(data.wellLocation != undefined)
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
	
	
	var results;
	//TODO: Validate attributes? May be someone else's job
	
	//searched for restaurant
	if(searchType == searchTypes.restaurant)
	{
		//breaks up all of the searchable terms into queries to the DB tables they refer to
		
		//TODO: need to handle restDateBefore, restDateAfter, numviolation, and restKeyword
		
		var queryBy = {
			restaurant:false, 
			property:false, 
			owner:false, 
			inspection:false, 
			violation:false
		};
		
		var query = {
			restaurant:"", 
			property:"", 
			owner:"", 
			inspection:"", 
			violation:""
		};
		
		var restaurantInfo = {};
		if(data.restName!=undefined){
			restaurantInfo.name = data.restName;
			queryBy.restaurant = true;
		}
		
		restaurantInfo.location = ["Leverett", "Sunderland"];
		restaurantInfo.type = "restaurant";
		query.restaurant = JSON.stringify(restaurantInfo);
		
		
		
		
		var propertyInfo = {};
		if(data.restLocation != undefined){
			propertyInfo.address = data.restLocation;
			queryBy.property = true;
		}
		if(data.restaurantTown != undefined){
			propertyInfo.town = data.restaurantTown;
			propertyInfo.location = [data.restaurantTown];
			queryBy.property = true;
		}
		
		propertyInfo.type = "property";
		if(propertyInfo.location == undefined){
			propertyInfo.location = ["Leverett", "Sunderland"];
		}
		query.property = JSON.stringify(propertyInfo);
		
		
		var ownerInfo = {};
		if(data.ownerName!= undefined){
			ownerInfo.ownername = data.ownerName;
			queryBy.owner = true;
		}
		if(data.ownerNumber != undefined){
			ownerInfo.telephonenumber = data.ownerNumber
			queryBy.owner = true;
		}
		ownerInfo.location = ["Leverett", "Sunderland"];
		ownerInfo.type = "owner";
		query.owner = JSON.stringify(ownerInfo);
		
		
		var inspectionInfo = {};
		if(data.inspectorname != undefined){
			inspectionInfo.inspector = data.inspectorname;
			queryBy.inspection = true;
		}
		if(data.time_in != undefined){
			inspectionInfo.timein=data.time_in;
			queryBy.inspection = true;
		}
		if(data.time_out != undefined){
			inspectionInfo.timeout=data.time_out;
			queryBy.inspection = true;
		}
		if(data.HACCP != undefined){
			inspectionInfo.haccp=data.HACCP;
			queryBy.inspection = true;
		}
		if(data.operation != undefined){
			inspectionInfo.typeofoperation= data.operation;
			queryBy.inspection = true;
		}
		if(data.inspection != undefined){
			inspectionInfo.typeofinspection = data.inspection;
			queryBy.inspection = true;
		}
		if(data.correctiveAcction != undefined){
			inspectionInfo.correctiveactionrequired = data.correctiveAction;
			queryBy.inspection = true;
		}
		if(data.voluntaryCompliance != undefined){
			inspectionInfo.voluntaryCompliance = data.voluntaryCompliance;
			queryBy.inspection = true;
		}
		if(data.reinspectionScheduled != undefined){
			inspectionInfo.reinspectionScheduled = data.reinspectionScheduled;
			queryBy.inspection = true;
		}
		if(data.voluntaryDisposal != undefined){
			inspectionInfo.voluntaryDisposal = data.voluntaryDisposal;
			queryBy.inspection = true;
		}
		if(data.employeeRestriction != undefined){
			inspectionInfo.employeeRestrictionExclusion = data.employeeRestriction;
			queryBy.inspection = true;
		}
		if(data.emergencySuspension != undefined){
			inspectionInfo.emergencySuspension = data.emergencySuspension;
			queryBy.inspection = true;
		}
		if(data.emergencyClosure != undefined){
			inspectionInfo.emergecyClosure = data.emergencyClosure;
			queryBy.inspection = true;
		}
		
		inspectionInfo.location = ["Leverett", "Sunderland"];
		inspectionInfo.type = "restaurant inspection";
		query.inspection = JSON.stringify(inspectionInfo);
		
		
		//TODO: need to parse the codeviolation incase there are multiple codes seperated by spaces or commas
		var violationInfo = {};
		if(data.codeviolation!= undefined){
			violationInfo.codeReference = data.codeviolation;
			queryBy.violation = true;
		}
		
		violationInfo.location = ["Leverett", "Sunderland"];
		violationInfo.type = "violations";
		query.violation = JSON.stringify(violationInfo);
		
		
		//TODO: use attributes to query database and get relevant results
		
		var DBResults = queryDatabase(query);
		
		
		
		
		
		
		
		// var post_options = {
			// host: 'localhost',
			// port: '3000',
			// path: '/api/get',
			// method: 'POST',
			// headers: {
				// 'Content-Type': 'application/x-www-form-urlencoded',
				// 'Content-Length': Buffer.byteLength(query.property)
			// }
		// };
		
		// var post_req = http.request(post_options, function(res) {
			// res.setEncoding('utf8');
			// res.on('data', function (jsonResponse) {
				
				
				// console.log("Starting returned data");
				// console.log(jsonResponse);
				
				// console.log("Ending Returned data");
				
				// // done();
			// });
		// });
		// console.log(query.property);
		// post_req.write(query.property);
		// post_req.end();
		
		
		
		
		
		//the parser makes it so the owner and the inspection are fields in the 
		//restaurant, the violation are in the inspection, and the numbers that 
		//refer to strings in other tables have been replaced with the strings.
		//It also adds a date object to the inspection which is calculated from timein
		var fakeDBResults = {
			restaurant:[
				{
					ID:"0", 
					PROPERTYID:"0", 
					NAME:"Test0", 
					ADDRESS:"", 
					OWNERID:"", 
					PERSONINCHARGE:""
				}
			],
			
			inspection:[{ID:"0",
				RESTAURANTID:"0",
				INSPECTOR:"",
				RISKLEVEL:"",
				HACCP:"",
				TIMEIN:"1450045320337",
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
			violation:[{ID:"0", RESTRAUNTINSPETIONID:"0", CODEREFERENCE:"123", CRITICALORREDITEM:"", DESCRIPTIONOFVIOLATIONCORRECTIONPLAN:"Here is some text", DATEVERIFIED:""}],
			owner:[{ID:"0", OWNERNAME:"", TELEPHONENUMBER:""}],
			property:[{ID:"0", GPSCOORDINATES:"", ADDRESS:"1234 1st Street", TOWN:"", STATE:"", ZIPCODE:"", PLOTNUMBER:""}],
			typeOfOperations:[{ID:"0", OPERATIONTYPE:""}],
			typeOfInspections:[{ID:"0", INSPECTIONTYPE:""}],
			reasonings:[{ID:"0", REASONING:"Because"}]
		};
		DBResults = fakeDBResults;
		
		
		
		results = {restaurant:[]};
		for(i = 0; i<DBResults.restaurant.length; i++)
		{
			var restaurant = DBResults.restaurant[i];
			
			for(j = 0; j<DBResults.owner.length; j++)
			{
				if(DBResults.owner[j].ID == restaurant.OWNERID)
				{
					restaurant.Owner = DBResults.owner[j];
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
			
			restaurant.inspection = [];
			
			//TODO: Add link to property information
			for(j = 0; j<DBResults.inspection.length; j++)
			{
				if(DBResults.inspection[j].RESTAURANTID != DBResults.restaurant[i].ID){
					continue;
				}
				
				
				var inspection = DBResults.inspection[j];
				inspection.date = new Date(parseInt(inspection.TIMEIN));
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
				
				inspection.violation = [];
				
				for(k = 0; k<DBResults.violation.length; k++)
				{
					if(DBResults.violation[k].RESTRAUNTINSPETIONID != DBResults.inspection[j].ID){
						continue;
					}
					
					var violation = DBResults.violation[k];
					
					
					inspection.violation.push(violation);
				}
				
				if(!queryBy.violation || inspection.violation.length != 0){
					restaurant.inspection.push(inspection);
				}
				
				
			}
			if(!queryBy.inspection || restaurant.inspection.length != 0){
				results.restaurant.push(restaurant);
			}
		}
		
		
		
		//TODO: Sort formated results
	}
	//if septic tank
	else if(searchType == searchTypes.septic)
	{
		var queryBy = {
			septic:false, 
			property:false, 
			owner:false, 
			systemPumpingRecord:false, 
			septicPumpingRecord:false, 
			septicInspection:false
		};
		
		var query = {
			septic:"", 
			property:"", 
			owner:"", 
			systemPumpingRecord:"", 
			septicPumpingRecord:"", 
			septicInspection:""
		};
		
		
		var septicInfo = {};
		septicInfo.location = ["Leverett", "Sunderland"];
		septicInfo.type = "septic";
		query.septic = JSON.stringify(septicInfo);
		
		
		var propertyInfo = {};
		
		if(data.tankLocation != undefined){
			propertyInfo.address = data.tankLocation;
			queryBy.property = true;
		}
		if(data.septicTown != undefined){
			propertyInfo.town = data.septicTown;
			propertyInfo.location = [data.septicTown];
			queryBy.property = true;
		}
		
		propertyInfo.type = "property";
		if(propertyInfo.location == undefined){
			propertyInfo.location = ["Leverett", "Sunderland"];
		}
		query.property = JSON.stringify(propertyInfo);
		
		
		var ownerInfo = {};
		if(data.ownerName!= undefined){
			ownerInfo.ownername = data.ownerName;
			queryBy.owner = true;
		}
		ownerInfo.location = ["Leverett", "Sunderland"];
		ownerInfo.type = "owner";
		query.owner = JSON.stringify(ownerInfo);
		
		
		//TODO: make sure date is in same format as DB uses
		//TODO: Implement low/up boundQuantityPumped
		//TODO: Make condition keyword work for cases besides being exactly equal
		var systemPumpingRecordInfo = {};
		if(data.pumpingDate != undefined){
			systemPumpingRecordInfo.pumpingDate = data.pumpingDate;
			queryBy.systemPumpingRecord = true;
		}
		if(data.systemQuality != undefined){
			systemPumpingRecordInfo.systemQualityOther = data.systemQuality;
			queryBy.systemPumpingRecord = true;
		}
		if(data.conditionKeyword != undefined){
			systemPumpingRecordInfo.observedCondition = data.conditionKeyword;
			queryBy.systemPumpingRecord = true;
		}
		if(data.systemPmpByName != undefined){
			systemPumpingRecordInfo.systemPumpedByName = data.systemPmpByName;
			queryBy.systemPumpingRecord = true;
		}
		if(data.systemPmpByLic != undefined){
			systemPumpingRecordInfo.systemPumpedByLicense = data.systemPmpByLic;
			queryBy.systemPumpingRecord = true;
		}
		if(data.systemPmpByCompany != undefined){
			systemPumpingRecordInfo.systemPumpedByCompany = data.systemPmpByCompany;
			queryBy.systemPumpingRecord = true;
		}
		if(data.disposalLocation != undefined){
			systemPumpingRecordInfo.LOCATIONWHERECONTENTSWEREDISPOSED = data.disposalLocation;
			queryBy.systemPumpingRecord = true;
		}
		if(data.hauler != undefined){
			systemPumpingRecordInfo.hauler = data.hauler;
			queryBy.systemPumpingRecord = true;
		}
		if(data.haulerDate != undefined){
			systemPumpingRecordInfo.haulerDate = data.haulerDate;
			queryBy.systemPumpingRecord = true;
		}
		if(data.receivingFacility != undefined){
			systemPumpingRecordInfo.receivingFacility = data.receivingFacility;
			queryBy.systemPumpingRecord = true;
		}
		if(data.receivingFacilityDate != undefined){
			systemPumpingRecordInfo.receivingFacilityDate = data.receivingFacilityDate;
			queryBy.systemPumpingRecord = true;
		}
		systemPumpingRecordInfo.location = ["Leverett", "Sunderland"];
		systemPumpingRecordInfo.type = "systemPumpingRecord";
		query.systemPumpingRecord = JSON.stringify(systemPumpingRecordInfo);
		
		
		var septicPumpingRecordInfo = {};
		if(data.option != undefined){
			septicPumpingRecordInfo.option = data.option;
			queryBy.septicPumpingRecord = true;
		}
		septicPumpingRecordInfo.location = ["Leverett", "Sunderland"];
		septicPumpingRecordInfo.type = "septicPumpingRecord";
		query.septicPumpingRecord = JSON.stringify(septicPumpingRecordInfo);
		
		
		
		var septicInspectionInfo = {};
		septicInspectionInfo.location = ["Leverett", "Sunderland"];
		septicInspectionInfo.type = "septicInspection";
		query.septicInspection = JSON.stringify(septicInspectionInfo);
		
		
		
		
		
		
		var DBResults = queryDatabase(query);
		
		
		
		
		
		//TODO: need to make sure that the fakeDBResults match latest DB
		var fakeDBResults = {
			septic:[{ID:"", PROPERTYID:"", OWNERID:""}],
			owner:[{ID:"0", OWNERNAME:"", TELEPHONENUMBER:""}],
			property:[{ID:"", GPSCOORDINATES:"", ADDRESS:"", TOWN:"", STATE:"", ZIPCODE:"", PLOTNUMBER:""}],
			systemPumpingRecord:[{
				ID:"", 
				SEPTICID:"", 
				PUMPINGDATE:"", 
				QUANTITYPUMPED:"", 
				COMPONENT:"",
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
				SEPTICID:"",
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
			if(queryBy.owner && septic.owner == undefined){
				continue;
			}
			
			
			for(k = 0; k<DBResults.property.length; k++)
			{
				if(septic.PROPERTYID == DBResults.property[k].ID)
				{
					septic.property = DBResults.property[k];
					break;
				}
			}
			if(queryBy.property && septic.property == undefined){
				continue;
			}
			
			septic.systemPumpingRecords = [];
			
			for(k = 0; k<DBResults.systemPumpingRecord.length; k++)
			{
				if(DBResults.systemPumpingRecord[k].SEPTICID == septic.ID)
				{
					septic.systemPumpingRecords.push(DBResults.systemPumpingRecord[k]);
				}
			}
			if(queryBy.systemPumpingRecord && septic.systemPumpingRecords.length == 0){
				continue;
			}
			
			//TODO: Need to link septic pumping records
			
			septic.septicInspection = [];
			
			for(k = 0; k<DBResults.septicInspection.length; k++)
			{
				if(DBResults.septicInspection[k].SEPTICID == septic.ID)
				{
					septic.septicInspection.push(DBResults.septicInspection[k]);
				}
			}
			if(queryBy.septicInspection && septic.septicInspection.length == 0){
				continue;
			}
			
			results.septics.push(septic);
		}
	}
	//if well
	else if(searchType == searchTypes.well)
	{
		var queryBy = {
			well:false, 
			property:false, 
			owner:false, 
			waterQualityReport:false
		};
		
		var query = {
			well:"", 
			property:"", 
			owner:"", 
			waterQualityReport:""
		};
		
		var wellInfo = {};
		wellInfo.location = ["Leverett", "Sunderland"];
		wellInfo.type = "well";
		query.well = JSON.stringify(wellInfo);
		
		
		
		var propertyInfo = {};
		if(data.wellLocation != undefined){
			propertyInfo.address = data.wellLocation;
			queryBy.property = true;
		}
		if(data.wellTown != undefined){
			propertyInfo.town = data.wellTown;
			propertyInfo.location = [data.wellTown];
			queryBy.property = true;
		}
		propertyInfo.type = "property";
		if(propertyInfo.location == undefined){
			propertyInfo.location = ["Leverett", "Sunderland"];
		}
		query.property = JSON.stringify(propertyInfo);
		
		
		
		var ownerInfo = {};
		if(data.ownerName!= undefined){
			ownerInfo.ownername = data.ownerName;
			queryBy.owner = true;
		}
		if(data.ownerNumber != undefined){
			ownerInfo.telephonenumber = data.ownerNumber
			queryBy.owner = true;
		}
		ownerInfo.location = ["Leverett", "Sunderland"];
		ownerInfo.type = "owner";
		query.owner = JSON.stringify(ownerInfo);
		
		
		var waterQualityReportInfo = {};
		if(data.collectorName != undefined){
			waterQualityReportInfo.collectedBy = data.collectorName;
			queryBy.waterQualityReport = true;
		}
		if(data.projctName != undefined){
			waterQualityReportInfo.projectName = data.projectName;
			queryBy.waterQualityReport = true;
		}
		if(data.projectNumber != undefined){
			waterQualityReportInfo.projectNumber = data.projectNumber;
			queryBy.waterQualityReport = true;
		}
		//TODO: make sure that the dates are formated the same as in the DB
		if(data.dateCollected != undefined){
			waterQualityReportInfo.dateCollected = data.dateCollected;
			queryBy.waterQualityReport = true;
		}
		if(data.sampleID != undefined){
			waterQualityReportInfo.sampleIdentification = data.sampleID;
			queryBy.waterQualityReport = true;
		}
		if(data.labNumber != undefined){
			waterQualityReportInfo.labNumber = data.labNumber;
			queryBy.waterQualityReport = true;
		}
		if(data.amtColiformBac != undefined){
			waterQualityReportInfo.TOTALCOLIFORMBACTERIA = data.amtColiformBac;
			queryBy.waterQualityReport = true;
		}
		if(data.unitColiformBac != undefined){
			waterQualityReportInfo.TOTALCOLIFORMBACTERIAUNITS = data.unitColiformBac;
			queryBy.waterQualityReport = true;
		}
		if(data.amtNitrogen != undefined){
			waterQualityReportInfo.NITRATENITROGEN = data.amtNitrogen;
			queryBy.waterQualityReport = true;
		}
		if(data.unitNitrogen != undefined){
			waterQualityReportInfo.NITRATENITROGENUNITS = data.unitNitrogen;
			queryBy.waterQualityReport = true;
		}
		if(data.pHLevel != undefined){
			waterQualityReportInfo.PH = data.pHLevel;
			queryBy.waterQualityReport = true;
		}
		if(data.unitpH != undefined){
			waterQualityReportInfo.PHUNITS = data.unitpH;
			queryBy.waterQualityReport = true;
		}
		if(data.amtIron != undefined){
			waterQualityReportInfo.IRON = data.amtIron;
			queryBy.waterQualityReport = true;
		}
		if(data.unitIron != undefined){
			waterQualityReportInfo.IRONUNITS = data.unitIron;
			queryBy.waterQualityReport = true;
		}
		if(data.hardnessLevel != undefined){
			waterQualityReportInfo.HARDNESSASCACO3 = data.hardnessLevel;
			queryBy.waterQualityReport = true;
		}
		if(data.unitHardness != undefined){
			waterQualityReportInfo.HARDNESSASCACO3UNITS = data.unitHardness;
			queryBy.waterQualityReport = true;
		}
		if(data.amtSulfur != undefined){
			waterQualityReportInfo.SULFATESULFUR = data.amtSulfur;
			queryBy.waterQualityReport = true;
		}
		if(data.unitSulfur != undefined){
			waterQualityReportInfo.SULFATESULFUREUNITS = data.unitSulfur;
			queryBy.waterQualityReport = true;
		}
		if(data.amtChloride != undefined){
			waterQualityReportInfo.CHLORIDE = data.amtChloride;
			queryBy.waterQualityReport = true;
		}
		if(data.amtConductance != undefined){
			waterQualityReportInfo.SPECIFICCONDUCTANCE = data.amtConductance;
			queryBy.waterQualityReport = true;
		}
		if(data.unitConductance != undefined){
			waterQualityReportInfo.SPECIFICCONDUCTANCEUNITS = data.unitConductance;
			queryBy.waterQualityReport = true;
		}
		if(data.testerName != undefined){
			waterQualityReportInfo.SUBMITTEDBY = data.testerName;
			queryBy.waterQualityReport = true;
		}
		//TODO: make it so the notes act as a keyword instead of only checking for equality
		if(data.additionalNote != undefined){
			waterQualityReportInfo.ADDITIONALNOTES = data.additionalNote;
			queryBy.waterQualityReport = true;
		}
		
		waterQualityReportInfo.location = ["Leverett", "Sunderland"];
		waterQualityReportInfo.type = "waterQualityReport";
		query.waterQualityReport = JSON.stringify(waterQualityReportInfo);
		
		
		
		var DBResults = queryDatabase(query);
		
		
		
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
		
		DBResults = fakeDBResults;
		
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
			if(queryBy.owner && well.owner == undefined){
				continue;
			}
			
			for(k = 0; k<DBResults.property.length; k++)
			{
				if(well.PROPERTYID == DBResults.property[k].ID)
				{
					well.property = DBResults.property[k];
					break;
				}
			}
			if(queryBy.property && well.property == undefined){
				continue;
			}
			
			well.waterQualityReport = [];
			
			for(k = 0; k<DBResults.waterQualityReport.length; k++)
			{
				if(DBResults.waterQualityReport[k].WELLID == well.ID)
				{
					well.waterQualityReport.push(DBResults.waterQualityReport[k]);
				}
			}
			if(queryBy.waterQualityReport && well.waterQualityReport.length == 0){
				continue;
			}
			
			
			results.wells.push(well);
		}
	}
	
	
	
	
	
	
	
	
	
	// Test 
	res.render('results', results);
});




function queryDatabase(query)
{
	var DBResults = {};
	for(var attribute in query)
	{
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "POST", 'http://localhost:3000/api/get', false ); // false for synchronous request
		xmlHttp.setRequestHeader('Content-Type', 'application/json');
		
		console.log("Sending query:"+query[attribute]);
		console.log();
		xmlHttp.send( query[attribute] );
		
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
			DBResults[attribute] = data.rows;
		}
		else{
			console.log("Error getting information from DB");
		}
		console.log();
		console.log();
	}
	
	return DBResults;
}













// Example route
router.get('/', function(req, res) {
	res.render('search');
});

module.exports = router;
