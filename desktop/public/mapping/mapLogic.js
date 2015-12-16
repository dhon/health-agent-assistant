var pins = [];
var map;

var featureLayer;

function addPin(data) {

  // WIP
  /*
  data.innerHTML = "Location : " + data.coords.lat + ", " + data.coords.long "<br>" +
                   "Tank Status : <u style='color:red'>" + data.status + "</u> <br>";
  */
  // override until we have a real data object
  data.innerHTML = 'Location : 50:40 (Lat:Lon) <br> Lot #3<br> Tank Status : <u style="color:red">Poor</u><br> Trending : <br> <div style="background-color: red; width: 100%; height : 15px"></div>';

  pins.splice(pins.length,0,{
    // this feature is in the GeoJSON format: see geojson.org
    // for the full specification
    type: 'Feature',
    geometry: {
        type: 'Point',
        // coordinates here are in longitude, latitude order because
        // x, y is the standard for GeoJSON and many formats
        coordinates: data.coords
    },
    properties: {
        title: data.name,
        description: data.innerHTML, // cool we can inject in here
        // one can customize markers by adding simplestyle properties
        // https://www.mapbox.com/guides/an-open-platform/#simplestyle
        'marker-size': 'large',
        'marker-color': '#3366ff',
        'marker-symbol': data.type
    }
    });
    featureLayer.setGeoJSON(pins);
}

function populateMap(data) {
  for (var i = 0; i<data.length; i++) {
    pin = data[i];
    addPin({name : pin.name, type : "water",  innerHTML : "<center>Placeholder</center>"});
  }
}

function clearMap() {
  if (featureLayer)
    map.removeLayer(featureLayer);
  pins = [];
  featureLayer = L.mapbox.featureLayer().addTo(map);
}
function ajaxError(code) { console.log(code); }

function updateMap() {
  $.ajax({
   url: '/mapping/fetchMapData',
   error: ajaxError,
   dataType: 'json',
   success: function(data) {
     console.log("Map data retrieved");
     if (data.error)
        console.log("INVALID DATA ERROR");
     else {
       clearMap();
       populateMap(data);
     }
   },
   type: 'GET'
  });
}

function initializeMap() {
  // this just creates the map object. The size is still specified in the map.handlebars
  L.mapbox.accessToken = 'pk.eyJ1IjoiYXNoYWJseWdpbiIsImEiOiJjaWhwM2R4YWEwMWhwdDZtNGxuMXVobjYwIn0.wKvqtULva4f_BiM5KgWZYQ';
  map = L.mapbox.map('map', 'ashablygin.ocg5flkb').setView([42.474, -72.598], 13);
  clearMap();
  updateMap();
  // testing to see if it actually clears it
  // "1" is a key
  //
  //
  //Example Data object
  // {
  // type : "water"
  //  they swapped the freaking coordinates ^, so friggin annoying
  //            longitude, latitude
  // coords : [-72.5170, 42.3670]
  // }

  addPin({name : "well #1", type : "water", coords : [-72.5170, 42.3670]});
  addPin({name : "septic #1", type : "cafe", coords : [-72.5170, 42.3640]});
}


$(document).ready(initializeMap);
