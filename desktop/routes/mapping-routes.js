var express = require('express');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

// Example post
router.post('/post', function(req, res) {console.log("posted");});

// Example route
router.get('/', function(req, res) {
	res.render("map");
});

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));

router.get('/fetchMapData', function(req, res) {
	// need the data in this format :
	// { #Wells and septic tanks
	//	name : #some name to identify the well or septic tank
	//	location : {latitude, longitude}
	//	lot_number : #don't know about this one, but if u can get it
	//	status : #status of the water quality or septic quality
	//	## Septic tank specific, but use the same object
	//	lastpump : #date
	//	## well specific
	//	waterQuality : [{date, quality}] #quality over time
	//
	// }
	var data; // This get sent to the client
	var success = () => {
		// Put success Code here
		res.send(data);
	};
	//remove this once you implement it
	res.send({error : true});
});

// remove this, and replace any calls to this with the correct query codes
function skeleton_fetch() { }

// This message is recieved as soon as the map application loads up and is ready to go
// It uses this to start retreiving data, then sends the data back to the client after
// said data is retreived.
function skeleton_mapInitialized(client) {
	//Jake/Ben, we should start the querying process here.

	var data = skeleton_fetch();

	//TODO : use ajax to give
	// note : client doesn't actaully mean anything right now

	// something like client.sendData(data) needs to happen.
}


module.exports = router;
