var sqlQuery = require('./sqlQueryWriter');
var db = require('./dbCommunicator');

exports.registerNewUser = function(user, callback) {
	//do the queries, define string error based on the query
	var result = {};
	user.location = ['Sunderland', 'Leverett'];
	user.type = 'USER';
	//TODO: Fix privilege level
	// user.privilegeLevel = 1;
	var query = sqlQuery.writeSQLAdd(user);
	db.run(user.location, query, function(err) {
		if (err) {
			//TODO: return only the error message, not the object
			console.log(err);
			result.error = err;
			result.success = false;
		}
		else {
			result.success = true;
		}
		callback(result);
	});
}

exports.editPassword = function(user, callback){
	//do the queries, define string error based on the query
	user.location = ['Sunderland', 'Leverett'];
	user.type = 'User';
	var query = sqlQuery.writeSQLEdit(user);

	db.run(user.location, query, function(err) {
		if (err) {
			result.error = err;
			result.success = false;
		}
		else {
			result.success = true;
		}
		callback(result);
	});
}

exports.loginUser = function(user, callback){
	//do the queries, define string error based on the query
	user.location = ['Sunderland', 'Leverett'];
	user.type = 'User';
	var query = sqlQuery.writeSQLGet(user);
	var result = {};
	console.log("exports.longUser");
	db.get(user.location, query, function(err, row) {
	    console.log("db callback", row);
		if (err) {
			result.error = err;
			result.success = false;
		}
		else if (row == undefined) {
			result.error = 'No user found.';
			result.success = false;
		}
		else {
			result.data = row;
			result.success = true;
		}
		callback(result);
	});
}

exports.addSearch = function(user, callback){
	user.location = ['Sunderland', 'Leverett'];
	//TODO: Ensure correct query generation, etc. for Multi-Word tables
	user.type = 'Saved Searches';
	var query = sqlQuery.writeSQLAdd(user);

	db.run(user.location, query, function(err) {
		if (err) {
			result.error = err;
			result.success = false;
		}
		else {
			result.data = this.lastID;
			result.success = true;
		}
		callback(result);
	});
}

exports.removeSearch = function(user, callback){
	user.location = ['Sunderland', 'Leverett'];
	user.type = 'Saved Searches';
	var query = sqlQuery.writeSQLRemove(user);

	db.get(user.location, query, function(err, row) {
		if (err) {
			result.error = err;
			result.success = false;
		}
		else {
			result.success = true;
		}
		callback(result);
	})
}

exports.getSearches = function(user, callback){
	//do the queries, define string error based on the query
	user.location = ['Sunderland', 'Leverett'];
	user.type = 'Saved Searches';
	var query = sqlQuery.writeSQLGet(user);

	db.all(user.location, query, function(err, rows) {
		if (err) {
			result.error = err;
			result.success = false;
		}
		else if (rows.length == 0) {
			result.error = 'No searches found.';
			result.success = false;
		}
		else {
			result.data = rows;
			result.success = true;
		}
		callback(result);
	})
}
