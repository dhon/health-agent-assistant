var sqlite3 = require('sqlite3').verbose();
//TODO: Handle separate databases
//TODO: Get actually database locations
var database = new sqlite3.Database('./database/leverett');

//callback: function(error)
//	this.lastID is the last inserted row ID
//	this.changes is the # of rows affected
//
exports.run = function(location, queryString, callback) {
	database.run(queryString, [], callback);
}

//callback: function(error, row)
//	This is executed only for the first row returned
exports.get = function(location, queryString, callback) {
	database.get(queryString, [], callback);
}

//callback: function(error, rows)
//	This is executed on a list of rows
exports.all = function(location, queryString, callback) {
	database.all(queryString, [], callback);
}

//callback: function(error, row)
//	This is executed on each row returned separately
//complete: function(error, #rows)
//	This is called once all row callbacks have been called
//While all() requires the results to be in memory, this
//is much more efficient for large queries
exports.each = function(location, queryString, callback, complete) {
	database.each(queryString, [], callback, complete)
}
