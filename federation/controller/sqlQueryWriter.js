exports.writeSQLAdd = function(data) {
	//TODO: Verify valid request?
	var str = 'INSERT INTO ' + data.type + '(';
	var ln2 = 'VALUES (';
	for (var key in data) {
		if (data.hasOwnProperty(key) && key.toLowerCase() != 'location' && key.toLowerCase() != 'type') {
			var keyStr = key.toUpperCase();
			var dataStr = data[key].toString();
			str += keyStr + ',';
			if (typeof key === 'string') {
				ln2 += '\'' + dataStr + '\',';
			}
			else {
				ln2 += dataStr + ',';
			}
		}
	}
	str = str.substring(0, str.length-1) + ')';
	ln2 = ln2.substring(0, ln2.length-1) + ');';
//	console.log(str + '\n' + ln2);
	return str + '\n' + ln2;
}

exports.writeSQLEdit = function(data) {
	var str = 'UPDATE ' + data.type;
	var ln2 = 'SET ';
	for (var key in data) {
		if (data.hasOwnProperty(key) && key.toLowerCase() != 'location' && key.toLowerCase() != 'type' && key.toLowerCase() != 'id') {
			var keyStr = key.toUpperCase();
			var dataStr = data[key].toString();
			if (typeof key === 'string') {
				ln2 += keyStr + '=\'' + dataStr + '\',';
			}
			else {
				ln2 += keyStr + '=' + dataStr + ',';
			}
		}
	}
	ln2 = ln2.substring(0, ln2.length-1);
	var where = 'WHERE id=' + data.id + ';';

	return str + '\n' + ln2 + '\n' + where;
}

exports.writeSQLRemove = function(data) {
	var str = 'DELETE FROM ' + data.type;
	var where = 'WHERE id=' + data.id + ';';

	return str + '\n' + where;
}

exports.writeSQLGet = function(data) {
	var str =  "SELECT * FROM " + data.type;
	var where = 'WHERE ';
	for (var key in data) {
		if (data.hasOwnProperty(key) && key.toLowerCase() != 'location' && key.toLowerCase() != 'type') {
			var keyStr = key.toUpperCase();
			var dataStr = data[key].toString();
			if (isTimeVariable(key)) {
				where += keyStr + '>=' + dataStr.substring(0, dataStr.indexof('-')) +
					' AND ' + keyStr + '<=' + dataStr.substring(dataStr.indexof('-') + 1);
			}
			//True for all keys?
			else if (typeof key === 'string') {
				where += keyStr + '=\'' + dataStr + '\'';
			}
			else {
				where += keyStr + '=' + dataStr;
			}
			where += ' AND ';
		}
	}
	where = where.substring(0, where.length-5) + ';';
	console.log(str + '\n' + where);
	return str + '\n' + where;
}

function isTimeVariable(key){
	if(key == 'Date Collected'|| key == 'Pumping Date' || 
			key == 'Time In' || key == 'Time Out'||
			key == 'Date Verified'|| key == 'Previous Inspection Date') {
		return true;
	}
	else
		return  false;
}
//TODO: /api/database command
