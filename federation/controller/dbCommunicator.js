var sqlite3 = require('sqlite3').verbose();
//TODO: Handle separate databases
//TODO: Get actually database locations
var db = {'leverett': new sqlite3.Database('./database/leverett', sqlite3.OPEN_READWRITE),
						'sunderland': new sqlite3.Database('./database/sunderland', sqlite3.OPEN_READWRITE)};
//var database = new sqlite3.Database('./database/leverett');

//Runs a command with no direct return value
//callback: function(errors, lastId)
//	lastId: id of last row changed, for add this is the id of the new row
exports.run = function(location, queryString, callback) {
	var num = location.length;
	var errors = [];
	var cb = function(error) {
		if (error != null) {
			errors = errors.concat(error);
		}
		num -= 1;
		if (num == 0) {
			callback(errors, this.lastId);
		}
	}

	location.forEach(function(loc) {
		db[loc.toLowerCase()].run(queryString, [], cb);
	});
}

//Gets the first matching row
//callback: function(error, row)
//	This is executed only for the first row returned
exports.get = function(location, queryString, callback) {
	var num = location.length;
	var result = -1;
	var rows = [];
	var cb = function(error, row) {
		num -= 1;
		rows.push({'error': error, 'row': row});
		if (row != undefined && result == -1) {
			result = rows.length - 1;
		}

		if (num == 0) {
			if (rows.length == 0) {
				callback(["No such row found."], undefined);
			}
			else if (result != -1) {
				//Asumes no error on successful return which should be true
				callback([], rows[result].row);
			}
			else {
				callback([rows[0].error], undefined);
			}		
		}
		
	}
	location.forEach(function(loc) {
		db[loc.toLowerCase()].get(queryString, [], cb);
	});
}

//Gets all matching rows
//callback: function(errors, rows)
//	This is executed on a list of rows
exports.all = function(location, queryString, callback) {
	var num = location.length;
	var allRows = [];
	var errors = [];
	var cb = function(error, rows) {
		num -= 1;
		if (error == null) {
			allRows.concat(rows);
		}
		else {
			errors = errors.concat(error);
		}
		if (num == 0) {
			callback(errors, rows);
		}
	}
	location.forEach(function(loc) {
		db[loc.toLowerCase()].all(queryString, [], cb);
	});
}

//Gets each matching row separately
//callback: function(errors, row)
//	This is executed on each row returned separately
//complete: function(error, numRows)
//	This is called once all row callbacks have been called
//While all() requires the results to be in memory, this
//is much more efficient for large queries
exports.each = function(location, queryString, callback, complete) {
	var num = location.length;
	var numRows = 0;
	var errors = [];
	var completionCallback = function(error, _numRows) {
		num -= 1;
		if (error == null) {
			numRows += _numRows;
		}
		else {
			errors = errors.concat(error);
		}
		if (num == 0) {
			complete(errors, rows);
		}
	}
	location.forEach(function(loc) {
		db[loc.toLowerCase()].each(queryString, [], callback, completionCallback);
	});
}
