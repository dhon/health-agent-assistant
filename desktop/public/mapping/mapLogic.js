var pins = {};
var map;

function initializeMap() {
  // this just creates the map object. The size is still specified in the map.handlebars
  L.mapbox.accessToken = 'pk.eyJ1IjoiYXNoYWJseWdpbiIsImEiOiJjaWhwM2R4YWEwMWhwdDZtNGxuMXVobjYwIn0.wKvqtULva4f_BiM5KgWZYQ';
  map = L.mapbox.map('map', 'ashablygin.ocg5flkb').setView([42.474, -72.598], 13);
}

function addPin(key, data) {
  data.innerHTML = 'Location : 50:40 (Lat:Lon) <br> Lot #3<br> Tank Status : <u style="color:red">Poor</u><br> Trending : <br> <div style="background-color: red; width: 100%; height : 15px"></div>';

  var featureLayer = L.mapbox.featureLayer({
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
          title: data.type + ' #' + key,
          description: data.innerHTML, // cool we can inject in here
          // one can customize markers by adding simplestyle properties
          // https://www.mapbox.com/guides/an-open-platform/#simplestyle
          'marker-size': 'large',
          'marker-color': '#3366ff',
          'marker-symbol': data.type
      }
  }).addTo(map);

  pins[key] = featureLayer;
}

// deletes a pin
function deletePin(key) {
  map.removeLayer(pins[key]);
  delete pins[key];
}

// clears the map of markers
function clearMap() {
  for (var cur in pins) {
    deletePin(cur);
  }
}

initializeMap();
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

addPin("1", {type : "water", coords : [-72.5170, 42.3670]});
addPin("2", {type : "cafe", coords : [-72.5170, 42.3640]});
//clearMap();
