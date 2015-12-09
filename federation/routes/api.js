var express = require('express');
var router = express.Router();
var sqlQuery = require('../controller/sqlQueryWriter')
var db = require('../controller/dbCommunicator')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add', function(req, res, next) {
	if (!hasValidLocation(req.body) || !hasValidType(req.body)) {
		res.send("Invalid data");
		return;
	}
	//TODO: Check permissions
	var query = sqlQuery.writeSQLAdd(req.body);
	db.run(req.body.location, query, function(err) {
		if (err) {
			res.json({'success': false, 'error': err});
		}
		else {
			res.json({'success': true, 'data': this.lastID});
		}
	});
});

router.post('/edit', function(req, res, next) {
	if (!hasValidLocation(req.body) || !hasValidType(req.body)) {
		res.send("Invalid data");
		return;
	}

	var query = sqlQuery.writeSQLEdit(req.body);
	db.run(req.body.location, query, function(err) {
		if (err) {
			res.json({'success': false, 'error': err});
		}
		else {
			res.json({'success': true});
		}
	});
});

router.post('/remove', function(req, res, next) {
	if (!hasValidLocation(req.body) || !hasValidType(req.body)) {
		res.send("Invalid data");
		return;
	}

	var query = sqlQuery.writeSQLRemove(req.body);
	db.run(req.body.location, query, function(err) {
		if (err) {
			res.json({'success': false, 'error': err});
		}
		else {
			res.json({'success': true});
		}
	});
	res.send(sqlQuery.writeSQLRemove(req.body));	
});

router.post('/get', function(req, res, next) {
	if (!hasValidLocation(req.body) || !hasValidType(req.body)) {
		res.send("Invalid data");
		return;
	}

	var query = sqlQuery.writeSQLGet(req.body);
	db.all(req.body.location, query, function(err, rows) {
		if (err) {
			res.json({'success': false, 'error': err});
		}
		else {
			res.json({'success': true, 'data': rows});
		}
	});
});

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
