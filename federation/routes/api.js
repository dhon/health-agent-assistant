var express = require('express');
var router = express.Router();
var sqlQuery = require('../controller/sqlQueryWriter')
var db = require('../controller/dbCommunicator')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * NOTES:
 * See each function for the return values.
 * They each return a boolean success value.
 * If success is false, it will return an error object.
 * If success is true, it might return a data object.
 * Contents of the data object are defined for each api call.
 * */

//Return value contains:
//	success: true/false
//	if !success, error
//	if success, data
//	data: id of added row
router.post('/add', function(req, res, next) {
	if (!hasValidLocation(req.body) || !hasValidType(req.body)) {
		res.send("Invalid data");
		return;
	}
	//TODO: Check permissions
	var query = sqlQuery.writeSQLAdd(req.body);
	db.run(req.body.location, query, function(err, lastId) {
		if (err.length == 0) {
			res.json({'success': false, 'error': err});
		}
		else {
			res.json({'success': true, 'data': lastId});
		}
	});
});

//Return value contains:
//	success: true/false
//	if !success, error
router.post('/edit', function(req, res, next) {
	if (!hasValidLocation(req.body) || !hasValidType(req.body)) {
		res.send("Invalid data");
		return;
	}

	var query = sqlQuery.writeSQLEdit(req.body);
	db.run(req.body.location, query, function(err) {
		if (err.length == 0) {
			res.json({'success': false, 'error': err});
		}
		else {
			res.json({'success': true});
		}
	});
});

//Return value contains:
//	success: true/false
//	if !success, error
router.post('/remove', function(req, res, next) {
	if (!hasValidLocation(req.body) || !hasValidType(req.body)) {
		res.send("Invalid data");
		return;
	}

	var query = sqlQuery.writeSQLRemove(req.body);
	db.run(req.body.location, query, function(err) {
		if (err.length == 0) {
			res.json({'success': false, 'error': err});
		}
		else {
			res.json({'success': true});
		}
	});
	res.send(sqlQuery.writeSQLRemove(req.body));	
});

//Return value contains:
//	success: true/false
//	if !success, error
//	if success, data: array of result rows
router.post('/get', function(req, res, next) {
	if (!hasValidLocation(req.body) || !hasValidType(req.body)) {
		res.send("Invalid data");
		return;
	}

	var query = sqlQuery.writeSQLGet(req.body);
	db.all(req.body.location, query, function(err, rows) {
		console.log("Got callback");
		if (err.length == 0) {
			res.json({'success': false, 'error': err});
		}
		else {
			res.json({'success': true, 'data': rows});
		}
	});
});

//TODO: Return database...
router.post('/database', function(req, res, next) {
	if (!hasValidLocation(req.body)) {
		res.send("Invalid data");
		return;
	}
	
});

function hasValidLocation(data) {
	if (!data.hasOwnProperty('location')) {
		return false;
	}

	//TODO
	//if (!data.location.isArray()) {
	//	data.location = [data.location];
	//}

	return true;
}

function hasValidType(data) {
	if (!data.hasOwnProperty('type')) {
		return false;
	}

	return true;
}

module.exports = router;
