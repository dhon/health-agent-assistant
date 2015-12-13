var db = require('../controller/dbCommunicator');
var sqlQuery = require('../controller/sqlQueryWriter');
var user = require('../controller/user');
var async = require('async');
var assert = require('assert');
var http = require('http');
var querystring = require('querystring');

describe('User login', function() {
  describe('#userCreation()', function (done) {
    it('Success should return true if account was successfully created', function () {
      var user1 = querystring.stringify({
        username: "dhon",
        passwordhash: "hello"
      });

      var post_options = {
        host: 'localhost',
        port: '3000',
        path: '/api/user/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(user1)
        }
      };

      var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (jsonResponse) {
          assert.equal(jsonResponse.success,true);
          done();
        });
      });

      post_req.write(user1);
      post_req.end();
    });
  });
  describe('#userGoodLogin()', function () {
    it('Success should return true since user:george pass:wordpress exists in DB', function (done) {
      var user2 = querystring.stringify({
        username: "george",
        passwordhash: "wordpress"
      });

      var post_options = {
        host: 'localhost',
        port: '3000',
        path: '/api/user/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(user2)
        }
      };

      var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (jsonResponse) {
          assert.equal(jsonResponse.success,true);
          done();
        });
      });

      post_req.write(user2);
      post_req.end();
    });
  });
  describe('#userMixLogin()', function () {
    it('Success should return false since user:dhon pass:wordpress does not exists in DB', function (done) {
      var user3 = querystring.stringify({
        username: "dhon",
        passwordhash: "wordpress"
      });

      var post_options = {
        host: 'localhost',
        port: '3000',
        path: '/api/user/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(user3)
        }
      };

      var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (jsonResponse) {
          assert.equal(jsonResponse.success,false);
          done();
        });
      });

      post_req.write(user3);
      post_req.end();
    });
  });
  describe('#userBadLogin()', function () {
    it('Success should return false since user:wrong pass:input does not exists in DB', function (done) {
      var user4 = querystring.stringify({
        username: "wrong",
        passwordhash: "input"
      });

      var post_options = {
        host: 'localhost',
        port: '3000',
        path: '/api/user/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(user4)
        }
      };

      var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (jsonResponse) {
          assert.equal(jsonResponse.success,false);
          done();
        });
      });

      post_req.write(user4);
      post_req.end();
    });
  });
  describe('#userDeletion()', function () {
    it('test not made', function (done) {
      // Test Code Goes Here
    });
  });
});

var api_add1 = {
	"location": ["Leverett"],
	"type": "Property",
	"gpscoordinates": 5,
	"Address": "999 Lois Lane",
	"Town": "Leverett",
	"State": "Massachusetts",
	"ZipCode": 02494,
	"PlotNumer": 1
};
var api_add2 = {
	"location": ["Leverett"],
	"type": "Property",
	"gpscoordinates": 5,
	"Address": "992 Lois Lane",
	"Town": "Leverett",
	"State": "Massachusetts",
	"ZipCode": 02494,
	"PlotNumer": 2
};
var api_get1 = {
	"location": ["Leverett"],
	"type": "Property",
	"Town": "Leverett",
	"State": "Massachusetts",
	"ZipCode": 02494,
};
var api_remove1 = {
	"location": ["Leverett"],
	"type": "Property",
};

describe('Invalid queries', function() {
	it('Should get errors for invalid queries', function(done) {
		var error = 'NO';
		db.run(['Leverett'], 'SELECT * FROM NOT_A_TABLE', function (errors) {
			assert.equal(1, errors.length);
			errors.forEach(function(error) {
				console.log(error);
			});
			done();
		});
	});
});

describe('Database add', function() {
  describe('addition', function () {
    it('Should not get any errors[1]', function(done) {
      var query = sqlQuery.writeSQLAdd(api_add1);
			db.run(api_add1.location, query, function callback(errors) {
				errors.forEach(function(error) {
					console.log(error);
				});
				assert.equal(0, errors.length);
				done();
			});
		});
		it('Should not get any errors[2]', function(done) {
			var query2 = sqlQuery.writeSQLAdd(api_add2);
			db.run(api_add2.location, query2, function callback(errors) {
				errors.forEach(function(error) {
					console.log(error);
				});
				assert.equal(0, errors.length);
				done();
			});
    });
  });
	var rowIds = [];
	describe('retrieval', function() {
		it('Should get the added data with no errors', function(done) {
			var query = sqlQuery.writeSQLGet(api_get1);
			db.all(api_get1.location, query, function callback(errors, rows) {
				assert.equal(0, errors.length);
				assert.equal(true, rows.length >= 1);
				errors.forEach(function(error) {
					console.log(error);
				});
				rows.forEach(function(row) {
					rowIds.push(row['ID']);
					console.log(row);
				});
				done();	
			});
		});
	});
	describe('remove all new rows', function() {
		async.each(rowIds, function(id, callback) {
			api_remove1.id = id;
			it('Should remove one of the new rows', function(done) {
				var query = sqlQuery.writeSQLRemove(api_remove1);
				db.run(api_remove1.location, query, function callback(errors) {
					assert.equal(0, errors.length);
					errors.forEach(function(error) {
						console.log(error);
					});
					console.log("Deleted row");
					done();	
				});
			});
			callback();
		});
	});
});
//Testing /api/get
//One record matches info provided

var api_get3 = {
	"location": ["Leverett"],
	"type": "Restaurant",
	"Telephone":"1113335555",
	"Owner":"Bobby Malone"
};
//Multiple records match info provided
var api_get4 = {
	"location": ["Leverett"],
	"type": "Restaurant",
};
//No records match info provided
var api_get5 = {
	"location": ["Leverett"],
	"type": "Restaurant",
	"Telephone":"15845453535",
};

describe('Database (all) gets', function() {
  describe('one record', function () {
    it('should return an array.length>=1 when the value is present', function () {
		var query = sqlQuery.writeSQLAdd(api_add1);
			db.run(api_get3.location, query, function callback(errors) {
				errors.forEach(function(error) {
					console.log(error);
				});
				assert.equal(true, errors.length==1);
			});
    });
  });
});

describe('Database (all) gets', function() {
  describe('multiple records', function () {
    it('should return >1 when there are multple results', function () {
		var query = sqlQuery.writeSQLAdd(api_add1);
			db.run(api_get3.location, query, function callback(errors) {
				errors.forEach(function(error) {
					console.log(error);
				});
				assert.equal(true, errors.length>1);
			});
    });
  });
});

describe('Database (all) gets', function() {
  describe('zero records', function () {
    it('should return length 0 when there are zero results', function () {
		var query = sqlQuery.writeSQLAdd(api_add1);
			db.run(api_get3.location, query, function callback(errors) {
				errors.forEach(function(error) {
					console.log(error);
				});
				assert.equal(0, errors.length);
			});
    });
  });
});

/*describe('Database gets', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});*/

describe('Database edit', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});

describe('Database remove', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});
