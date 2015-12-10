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
var api_get1 = {
	"location": ["Leverett"],
	"type": "Restaurant",
	"Name": "WcDonalds",
	"Address": "999 Lois Lane",
	"Telephone": "1113335555",
	"Owner": "Bobby Malone",
	"PIC": "Frederick Malone"
};

function log(str) {
	console.log(str + '\n');
}

describe('Invalid queries', function() {
	it('Should get errors for invalid queries', function(done) {
		this.timeout(999999);
		var error = 'NO';
		db.run(['Leverett'], 'SELECT * FROM NOT_A_TABLE', function (errors) {
			assert.equal(true, errors.length == 1);
			error = errors[0];
			describe(error);
			log(error);
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
