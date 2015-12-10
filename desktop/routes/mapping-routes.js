var express = require('express');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

// Example post
router.post('/post', function(req, res) {console.log("posted");});

// Example route
router.get('/', function(req, res) {
	console.log("routed");
	res.render("map");
});

router.get('/welldemo', function(req, res) {
	res.render("welldemo");
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
