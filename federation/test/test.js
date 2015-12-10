var db = require('../controller/dbCommunicator');
var sqlQuery = require('../controller/sqlQueryWriter');
var user = require('../controller/user');
var assert = require('assert');
var http = require('http');
var querystring = require('querystring');

describe('User login', function() {
  describe('#userCreation()', function (done) {
    it('jsonResponse field should have success as true', function () {
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

      // post the data
      post_req.write(user1);
      post_req.end();
    });
  });
  describe('#userCreation()', function () {
    it('jsonResponse field should have success as true', function (done) {
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
          assert.equal(jsonResponse.success,false);
          done();
        });
      });

      // post the data
      post_req.write(user2);
      post_req.end();
    });
  });
  describe('#userCreation()', function () {
    it('jsonResponse field should have success as true', function (done) {
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

      // post the data
      post_req.write(user3);
      post_req.end();
    });
  });
  describe('#userCreation()', function () {
    it('jsonResponse field should have success as true', function (done) {
      var user4 = querystring.stringify({
        username: "wrong",
        passwordhash: "in"
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

      // post the data
      post_req.write(user4);
      post_req.end();
    });
  });
});

var api_add1 = {
	"location": ["Leverett"],
	"type": "Restaurant",
	"Name": "WcDonalds",
	"Address": "999 Lois Lane",
	"Telephone": "1113335555",
	"Owner": "Bobby Malone",
	"PIC": "Frederick Malone"
};
var api_add2 = {
	"location": ["Leverett"],
	"type": "Restaurant",
	"Name": "McDonalds",
	"Address": "The Street",
	"Telephone": "9997874014",
	"Owner": "Calvin",
	"PIC": "Susie Derkins"
};
var api_get1 = {
	"location": ["Leverett"],
	"type": "Restaurant",
	"Name": "WcDonalds",
	"Address": "999 Lois Lane",
	"Telephone": "1113335555",
	"Owner": "Bobby Malone",
	"PIC": "Frederick Malone"
};

describe('Invalid queries', function() {
	it('Should get errors for invalid queries', function(done) {
		this.timeout(999999);
		var error = 'NO';
		db.run(['Leverett'], 'SELECT * FROM NOT_A_TABLE', function (errors) {
			errors.forEach(function(error) {
				console.log('Got da error: ' + error);
			});
			assert.equal(1, errors.length);
			done();
		});
	});
});

describe('Database add', function() {
  describe('addition', function () {
    it('Should not get any errors', function (done) {
      var query = sqlQuery.writeSQLAdd(api_add1);
			db.run(api_add1.location, query, function callback(errors) {
				errors.forEach(function(error) {
					console.log(error);
				});
				assert.equal(0, errors.length);
			});
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
	describe('retrieval', function() {
		it('Should get the added data with no errors', function() {
			var query = sqlQuery.writeSQLGet(api_add1);
			db.all(api_add1.location, query, function callback(errors, rows) {
				assert.equal(0, errors.length);
				assert.equal(true, rows.length >= 1);
				rows.forEach(function(row) {
					for (var key in row) {
						if (data.hasOwnProperty(key)) {
							
						}
					}
					console.log(row);
				});	
			});
		});
	});
});
//Testing /api/get
//One record matches info provided

var api_get0 = {
	"location": ["Leverett"],
	"type": "Restaurant",
	"Telephone":"1113335555",
	"Owner":"Bobby Malone"
};
//Multiple records match info provided
var api_get1 = {
	"location": ["Leverett"],
	"type": "Restaurant",
};
//No records match info provided
var api_get2 = {
	"location": ["Leverett"],
	"type": "Restaurant",
	"Telephone":"15845453535",
};

describe('Database (all) gets', function() {
  describe('one record', function () {
    it('should return an array.length>=1 when the value is present', function () {
		var query = sqlQuery.writeSQLAdd(api_add1);
			db.run(api_get0.location, query, function callback(errors) {
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
			db.run(api_get0.location, query, function callback(errors) {
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
			db.run(api_get0.location, query, function callback(errors) {
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
