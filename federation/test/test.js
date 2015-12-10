var db = require('../controller/dbCommunicator');
var sqlQuery = require('../controller/sqlQueryWriter');
var user = require('../controller/user');
var assert = require('assert');

describe('User login', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
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

describe('Database add', function() {
  describe('addition', function () {
    it('Should not get any errors', function () {
      var query = sqlQuery.writeSQLAdd(api_add1);
			db.run(api_add1.location, query, function callback(errors) {
				errors.forEach(function(error) {
					console.log(error);
				});
				assert.equal(0, errors.length);
			});
    });
  });
	describe('retrieval', function() {

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
