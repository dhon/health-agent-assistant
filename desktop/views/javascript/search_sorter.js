//data: JSON array
//sortBy: string
//attributeType: typeof sortBy (e.g. number, string). Can be found using typeof
//Throws JSONTypeEror, 
function sort(data, sortBy, attributeType) {
	if(data == undefined || sortBy == undefined){
		var e = new Error('Missing parameters');
		e.name = 'missingParameterError';
		throw e;
	}
	attributeType = typeof attributeType !== 'undefined' ?  b : "string"; //If attributeType not included, default is string
	console.log("Sort " + JSON.stringify(data) + " by " + sortBy);
	

	try{
		var type = getType(data);
	}
	catch(e)
	{
		throw e; //Recieved bad data, cannot continue
	}
	var unsorted = data[type];
	console.log(unsorted);
	
	function compare(field1, field2) {
		val1= field1[sortBy]
		val2= field2[sortBy]
		if(val1 == undefined){
			if(val2 == undefined) return 0; //Both missing field
			else return -1; //since field2 has attribute and field1 does not
		}
		else if(val2 == undefined) {
			return 1; //field1 has attribute, field2 does not
		}
		if(attributeType == "number") {console.log("number"); return val1 - val2;}
		else return val1.localeCompare(val2); //compare strings
	}

		return unsorted.sort(compare);
}
//TODO: check for multiple types
function getType(data) {
	if(data.restaurant != undefined) return "restaurant";
	if(data.septic != undefined) return "septic";
	if(data.well != undefined) return "well";
	else {
		console.log("JSON " + JSON.stringify(data) + " does not have valid type");
		console.log(data);
		var e = new Error("Recieved JSON without restaurant, septic, or well type");
		e.name="JSONtypeError";
		throw e;
	}
}


data = { restaurant:
   [ { ID: '0',
       PROPERTYID: '0',
       NAME: 'Test0',
       ADDRESS: '',
       OWNERID: '',
       PERSONINCHARGE: '',
       property: [Object],
       inspection: [Object] }, 
	   
	   { ID: '1',
       PROPERTYID: '1',
       NAME: 'Test1',
       ADDRESS: '',
       OWNERID: '',
       PERSONINCHARGE: '',
       property: [Object],
       inspection: [Object] } 
	   ] }
sort(data, "NAME");