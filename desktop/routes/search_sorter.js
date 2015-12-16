//data: JSON array
//sortBy: string or array of strings. If array, strings must be in order of attributes
//The array of strings is used as a path to get to the attribute to sortBy
//E.g. [attr1, attr2, attr3] would sort by the attr1.attr2.attr3 values in the JSON
//attributeType: typeof sortBy (e.g. number, string). Can be found using typeof
//Throws JSONTypeError, missingParameterError
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
	
	//Create function to get sort by value from each field or piece of data
	//Different because sortBy can be string or string array
	var getVal;
		if (typeof sortBy == 'string') {
			getVal = function(field) {return field[sortBy];};
		}
		else if (Array.isArray(sortBy)) {
			getVal = function(field) {
				var val = field;
				for (var v in sortBy) {
					if (sortBy[v] == undefined) return undefined;
					val = val[sortBy[v]];
				}

				return val;
			}
		}
		else {
			//TODO: Throw some error or some other error checking
		}
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
		val1= getVal(field1, sortBy);
		val2= getVal(field2, sortBy);
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


//Compatibility with older browsers
if (!Array.isArray) {
    Array.isArray = function(obj) {
      return Object.prototype.toString.call(obj) == '[object Array]';
    }
}
//TODO: delete following test data
data = { restaurant:
   [ { ID: '0',
       PROPERTYID: '0',
       NAME: 'Test0',
       ADDRESS: '',
       OWNERID: '',
       PERSONINCHARGE: '',
       property: [Object],
       inspection: [Object],
		TEST: {Test:'b'}
		}, 
	   
	   { ID: '1',
       PROPERTYID: '1',
       NAME: 'Test1',
       ADDRESS: '',
       OWNERID: '',
       PERSONINCHARGE: '',
       property: [Object],
       inspection: [Object],
		TEST: {Test:'a'}
		} 
	   ] }
console.log(sort(data, "NAME"));

document.getElementById('test').addEventListener('click', function() {console.log(sort(data, ['TEST', 'Test']));}, false);


//End testing area

module.exports = {
	sort : sort
}; 