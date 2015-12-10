exports.writeSQLAdd = function(data) {
	//TODO: Verify valid request?
	var str = 'INSERT INTO ' + data.type + '(';
	var ln2 = 'VALUES (';
	for (var key in data) {
		if (data.hasOwnProperty(key) && key != 'location' && key != 'type') {
			str += key + ',';
			if (typeof key === 'string') {
				ln2 += '\'' + data[key] + '\',';
			}
			else {
				ln2 += data[key] + ',';
			}
		}
	}
	str = str.substring(0, str.length-1) + ')';
	ln2 = ln2.substring(0, ln2.length-1) + ');';
	console.log(str + '\n' + ln2);
	return str + '\n' + ln2;
}

exports.writeSQLEdit = function(data) {
	var str = 'UPDATE ' + data.type;
	var ln2 = 'SET ';
	for (var key in data) {
		if (data.hasOwnProperty(key) && key != 'location' && key != 'type' && key != 'id') {
			if (typeof key === 'string') {
				ln2 += key + '=\'' + data[key] + '\',';
			}
			else {
				ln2 += key + '=' + data[key] + ',';
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
		if (data.hasOwnProperty(key) && key != 'location' && key != 'type') {
			if (isTimeVariable(key)) {
				where += key + '>=' + data[key].substring(0, data[key].indexof('-')) +
					' AND ' + key + '<=' + data[key].substring(data[key].indexof('-') + 1);
			}
			else if (typeof key === 'string') {
				where += key + '=\'' + data[key] + '\'';
			}
			else {
				where += key + '=' + data[key];
			}
			where += ' AND ';
		}
	}
	where = where.substring(0, where.length-5) + ';';
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
