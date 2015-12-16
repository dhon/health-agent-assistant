//data: JSON array
//sortBy: string
//attributeType: typeof sortBy (e.g. number, string). Can be found using typeof
//Throws JSONTypeErorr
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
	
	//do not call compareNoErrors directly, use compare instead.
	//compareNoErrors has no errorChecking
	var compareNoErrors;
			if(attributeType == "number") {
				compareNoErrors = function(val1, val2) {return val1 - val2;};
			}
			else if(attributeType == "string") {
				compareNoErrors = function(val1, val2) {return val1.localeCompare(val2);};
			}
			else {
				//TODO Do something if attributeType is not known besides return 0 on compare
				compareNoErrors = function(val1, val2) {return 0};
			}
	
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

		return compareNoErrors(val1, val2);
	}

		return unsorted.sort(compare);
}
//TODO: check for multiple types
function getType(data) {
	if(data.restaurant != undefined) return "restaurant";
	if(data.septics != undefined) return "septic";
	if(data.well != undefined) return "well";
	else {
		console.log("JSON " + JSON.stringify(data) + " does not have valid type");
		console.log(data);
		var e = new Error("Recieved JSON without restaurant, septic, or well type");
		e.name="JSONtypeError";
		throw e;
	}
}

module.exports = {
	sort : sort
};

//TODO: delete following test data
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
// sort(data, "NAME");