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

describe('Database gets', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});

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
